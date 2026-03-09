import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        // ref:User,
        required:true
    },
    title:{
        type:String,
        required : true
    },
    description:{
        required:true,
        type:String,
    }

});

const Todo = mongoose.model("Todo", todoSchema);
export default Todo;