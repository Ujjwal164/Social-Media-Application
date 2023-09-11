const router = require("express").Router();
const User = require("../Modals/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const VerificationToken = require("../Modals/VerificationToken");
const Post = require("../Modals/Post");
const { verifyToken } = require("./verifytoken");
const { generateOTP } = require("./Extra/mail");
const JWTSEC = "@2@2@2gyhfur !@"; // Replace this with a secure secret key
const nodemailer = require('nodemailer');
const crypto = require("crypto");
const ResetToken = require("../Modals/ResetToken")
// CREATE USER
router.post("/create/user",
  body('email').isEmail(),
  body('password').isLength({ min: 6 }),
  body('username').isLength({ min: 5 }),
  body('phonenumber').isLength({ min: 5 }),
  async (req, res) => {
    // try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res.status(200).json("Please login with correct password"  );
      }

      const salt = await bcrypt.genSalt(10);
      const secpass = await bcrypt.hash(req.body.password, salt);

      user = await User.create({
        username: req.body.username,
        email: req.body.email,
        password: secpass,
        profile: req.body.profile,
        phonenumber: req.body.phonenumber
      });

      const accessToken = jwt.sign({
        id: user._id,
        username: user.username
      }, JWTSEC);

      const OTP = generateOTP();
      const verificationToken = await VerificationToken.create({
        user: user._id,
        token: OTP
      });

      verificationToken.save();
      await user.save();

      var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: process.env.USER, // Replace with your Mailtrap username
          pass: process.env.PASS  // Replace with your Mailtrap password
        }
      });

      transport.sendMail({
        from: "socialmedia@gmail.com",
        to: user.email,
        subject: "Verify your email using OTP",
        html: `<h1>Your OTP code is ${OTP}</h1>`
      });

      res.status(200).json({ state: "pending", msg: "Please check your email", user: user._id });
    // } catch (error) {
    //   console.error(error);
    //   return res.status(500).json({ msg: "Internal error occurred" });
    // }
});

//verify email
router.post("/verify/email" , async(req,res)=>{
    const{user , OTP} = req.body;
    const mainuser = await User.findById(user);
    if(!mainuser) return res.status(400).json("user not found");
    if(mainuser.verifed === true){
        return res.status(400).json("user already verifed")
    };
    const token = await VerificationToken.findOne({user:mainuser._id});
    if(!token){
        return res.status(400).json("token is not valid")
    }
    const isMatch = await bcrypt.compareSync(OTP , token.token);
    if(!isMatch){return res.status(400).json("token is not valid")};

    mainuser.verifed = true;
    await VerificationToken.findByIdAndDelete(token._id);
    await mainuser.save();
    const accessToken = jwt.sign({
        id:mainuser._id,
        username:mainuser.username
    }, JWTSEC);
    const {password , ...others} = mainuser._doc;
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
          user: process.env.USER, // Replace with your Mailtrap username
          pass: process.env.PASS  // Replace with your Mailtrap password
        }
      });

      transport.sendMail({
        from: "socialmedia@gmail.com",
        to: mainuser.email,
        subject: "successfully Verify your email",
        html: `now you can login in social app`
      })
      return res.status(200).json({others , accessToken})
})

// CREATE LOGIN
router.post("/login" , 
 body('email').isEmail(),
 body('password').isLength({ min:6 }),
 async(req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json("some error occured")
    }
     try {
    const user =await User.findOne({email:req.body.email});
    if(!user){
        return res.status(400).json("user not found");
    }
    const comparepassword = await bcrypt.compare(req.body.password, user.password);
    if(!comparepassword){
        return res.status(400).json("password error")
    }
    const accessToken = jwt.sign({
        id:user._id,
        username:user.username
    },JWTSEC)
    const {password , ...other}= user._doc
    res.status(200).json({other, accessToken});
} catch (error) {
    return res.status(500).json("internal error occured")       
}})

//forget password
router.post("/forget/password", async(req,res)=>{
    const {email} = req.body;
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(400).json("user not found");
    }
    const token = await ResetToken.findOne({user:user._id});
    if(token){
        return res.status(400).json("after one hour you can request for another token");
    }

    const RandomTxt = crypto.randomBytes(20).toString('hex');
    const resetToken = new ResetToken({
        user:user._id,
        token:RandomTxt
    });
    await resetToken.save();
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
          user: process.env.USER, // Replace with your Mailtrap username
          pass: process.env.PASS  // Replace with your Mailtrap password
        }
      });

      transport.sendMail({
        from:"socialmedia@gmail.com",
        to:user.email,
        subject: "Reset Token",
        html:`http://localhost:5000/reset/password?token=${RandomTxt}&_id=${user._id}`
      })
      return res.status(200).json("check you mail to reset password")
})
// reset password
router.put("/reset/password" , async(req,res)=>{
    const {token , _id} = req.query;
    if(token || !_id){
        return res.status(400).json("invalid req");
    }
    const user =await User.findOne({_id:_id});
    if(!user){
        return res.status(400).json("reset token is not found")
    }
    const resetToken =await ResetToken.findOne({_id:_id});
    if(!resetToken){
      return res.status(400).json("reset token is not found")
    }
    console.log(resetToken.token)
    const isMatch = await bcrypt.compareSync(token , resetToken.token);
    if(!isMatch){
        return res.status(400).json("token is not valid")
    }
    const {password} = req.body;
    // const salt = await bcrypt.getSalt(10);
    const secpass = await bcrypt.hash(password, 10);
    user.password = secpass;
    await user.save();
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 587,
        auth: {
          user: process.env.USER, // Replace with your Mailtrap username
          pass: process.env.PASS  // Replace with your Mailtrap password
        }
      });

      transport.sendMail({
        from:"socialmedia@gmail.com",
        to:user.email,
        subject:"your password reset succcessfully",
        html:`now you can login with new password`
      })
      return res.status(200).json("email has sent")
})

// update user details
router.put("/update/:id", verifyToken, async (req, res) => {
    
    try {
        if(req.params.id === req.user.id){
      if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        const secpass = await bcrypt.hash(req.body.password, salt);
        req.body.password = secpass;
      }
      const updatedUser = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json(updatedUser);
    }else {
        return res.status(500).json("you are not allow to update this user detail");
    }
    } catch (error) {
      return res.status(500).json("Internal server error");
    }

    
  });

// delete user account

router.delete("/delete/:id", verifyToken , async(req,res)=>{
    try {
        if(req.params.id !== req.user.id){
            return res.status(400).json("account doesn't match");
        }else{
            await User.findOneAndDelete(req.params.id);
            return res.status(400).json("your account has been deleted");
        }
    } catch (error) {
        return res.status(500).json("Internal server error");
    }
})

// get user detail

router.get("/post/user/details/:id" ,async(req,res)=>{
    try {
        const user = await User.findById(req.params.id);
        if(!user){
            return res.status(400).json("user not found")
        }
        const {email, password , phonenumber , Followers , Following , ...others}= user._doc;
        res.status(200).json(others);
    } catch (error) {
        return res.status(500).json("internal server error")
    }
})

//get user to follow
router.get("/all/user" , verifyToken , async(req,res)=>{
    try {
        const allUser  = await User.find();
        const user = await User.findById(req.user.id);
        const followinguser = await Promise.all(
            user.Following.map((item)=>{
                return item;
            })
        )
        let UserToFollow = allUser.filter((val)=>{
            return !followinguser.find((item)=>{
                return al._id.toString()== item;
            })
        })

        let filteruser = await Promise.all(
            UserToFollow.map((item)=>{
                const{email, phonenumber , Followers , Following , password, ...others} = item._doc;
                return others
            })
        )
        res.status(200).json(filteruser)
    } catch (error) {
        return res.status(500).json("internal server error")
    }
})
  
module.exports = router;
