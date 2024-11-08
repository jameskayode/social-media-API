import mongoose, { model } from "mongoose";
const Schema =mongoose.Schema



// Define user schema and model
const blogSchema=new Schema({
    title: {type:String, required:true},
    content: {type:String, required:true},
    image: {type:String, required:true},
    author: {type:mongoose.Types.ObjectId,
        ref:"User",
        required:true}
})


const Blog=mongoose.model("Blog", blogSchema)

export default Blog;