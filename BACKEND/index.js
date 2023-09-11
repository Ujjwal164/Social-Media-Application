const express = require('express')
const app = express()

const mongoose= require("mongoose")
const useRouter = require("./router/user");
const postRouter = require("./router/Post");
const dotenv = require("dotenv")
const cors = require("cors");
dotenv.config();
mongoose.connect(process.env.MONGODB).then(()=>
    console.log("db connection succesful")).catch((err)=>{
    console.log(`some erre: ${err}`)
})
app.use(cors());
app.use(express.json()) ;  //yeh help krta hai json file pass krna ka liya
app.use("/api/user",useRouter);
app.use("/api/post",postRouter);

app.listen(8000,()=>{
    console.log("server started")
})
