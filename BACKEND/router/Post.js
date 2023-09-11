const router = require("express").Router();
const Post = require("../Modals/Post");
const User = require("../Modals/User");
const { verifyToken } = require("./verifytoken");

// Create post
router.post("/user/post", verifyToken, async (req, res) => {
  try {
    let { title, image, video } = req.body;
    let newpost = new Post({
      title,
      image,
      video,
      user: req.user.id,
    });
    const post = await newpost.save();
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json("Internal error");
  }
});

// Get posts by a user
router.get("/get/post", verifyToken, async (req, res) => {
  try {
    const myposts = await Post.find({ user: req.user.id });
    if (myposts.length === 0) {
      return res.status(400).json("You don't have any posts");
    }
    res.status(200).json(myposts);
  } catch (error) {
    res.status(500).json("Internal server error");
  }
});

// update the user post

router.put("/update/post/:id", verifyToken, async (req, res) => {
    try {
      let post = await Post.findById(req.params.id);
      if (!post) {
        return res.status(400).json("Post not found");
      }
  
      post.title = req.body.title || post.title;
      post.image = req.body.image || post.image;
      post.video = req.body.video || post.video;
  
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } catch (error) {
      res.status(500).json("Internal server error");
    }
  });
  
//following

router.put("/following/:id", verifyToken, async (req, res) => {
      if (req.params.id !== req.body.user) {
        const user = await User.findById(req.params.id);
        const otherUser = await User.findById(req.body.user);
  
        if (!user.Followers.includes(req.body.user)) {
          await user.updateOne({ $push: { Followers: req.body.user } });
          await otherUser.updateOne({ $push: { Following: req.params.id } });
          return res.status(200).json("User has been followed");
        } else {
          return res.status(400).json("You already follow this user");
        }
      } else {
        return res.status(400).json("You can't follow yourself");
      }
  });
  
//fetch post from followers

router.get("/flw/:id" , verifyToken , async(req, res)=>{
    try{
        const user = await User.findById(req.params.id);
        const followersPost = await Promise.all(
            user.Following.map((item)=>{
                return Post.find({user:item})
            })
        )
        const userPost = await Post.find({user:user._id});
        res.status(200).json(userPost.concat(...followersPost));
        // res.status(200).json(followersPost);
    }catch(error){
        return res.status(500).json("internal source error")
    }
})                                                


//like
router.put("/:id/like" ,verifyToken,async(req,res)=>{
    try {
        
            const post = await Post.findById(req.params.id);
            if(!post.like.includes(req.body.user)){
                await post.updateOne({$push:{like:req.body.user}})
                return res.status(200).json("post has been liked")
            }else{
                await post.updateOne({$pull:{like:req.body.user}})
                return res.status(200).json("post has been unliked")
            }
        }catch (error) {
            return res.status(500).json("internal source error")
            }
})
    //dislike
router.put("/:id/dislike" ,verifyToken,async(req,res)=>{
    try {
    const post = await Post.findById(req.params.id);
    if(!post.dislike.includes(req.body.user)){
        await post.updateOne({$push:{dislike:req.body.user}})
        return res.status(200).json("post has been liked")
    }else{
        await post.updateOne({$pull:{dislike:req.body.user}})
        return res.status(200).json("post has been unliked")
    }
}catch (error) {
    return res.status(500).json("internal source error")
    }
})

//comments

router.put("/comment/post", verifyToken, async (req, res) => {
    try {
      const { comment, postid } = req.body;
      const comments = {
        user: req.user.id,
        username: req.user.username,
        comment,
      };
      const post = await Post.findById(postid);
      if (!post) {
        return res.status(400).json("Post not found");
      }
      post.comments.push(comments);
      const updatedPost = await post.save();
      res.status(200).json(updatedPost);
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  });

  // delete post
  router.delete("/delete/post/:id", verifyToken, async (req, res) => {
    try {
     const post = await Post.findById(req.params.id);
     if(post.user === req.user.id){
      const deletepost = await Post.findByIdAndDelete(req.params.id);
      return res.status(200).json("your post has been deleteed")
     }else{
      return res.status(400).json("you are not able to delet this post")
     }
    } catch (error) {
      return res.status(500).json("Internal server error");
    }
  });

  



module.exports = router;
