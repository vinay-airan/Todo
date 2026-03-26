import Todo from "../model/todo.js";
import jwt from "jsonwebtoken";



export const createTodo = async (req, res) => {
    try {
        const { title, description } = req.body; 
        console.log(title);
        console.log("desc",description);

        const token  = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"token not found"});
        }
        let decode;
        try{
            decode = jwt.verify(token,process.env.SECRET_KEY);
        }catch(error){
            return res.status(401).json({message:"invalid token "});
        } 
        const userId = decode.userId;
        console.log(userId);

        if (!title || !description ) {
            return res.status(400).json({ message: "Please provide title and description" });
        }
        const newTodo = new Todo({userId,title, description });
        await newTodo.save();
        res.status(201).json({
            success:true,
            message: "Todo created successfully" });
    } catch (error) {
    console.error("CREATE TODO ERROR:", error);
    res.status(500).json({ message: error.message });

        // console.error(error);
        // res.status(500).json({ message: "Server error" });
    }
};

export const getTodos = async (req, res) => {   
    try {
        const token  = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"token not found"});
        }
        const decode = jwt.verify(token,process.env.SECRET_KEY);
        const userId = decode.userId;
        const todos = await Todo.find({userId});
        res.status(200).json(todos);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message});
    }
};

export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, completed } = req.body;

    const updateFields = {};

    if (title !== undefined) updateFields.title = title;
    if (description !== undefined) updateFields.description = description;
    if (completed !== undefined) updateFields.completed = completed;

    const updatedTodo = await Todo.findByIdAndUpdate(
      id,
      updateFields,
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json({
      success: true,
      todo: updatedTodo
    });

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const deleteTodo = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTodo = await Todo.findByIdAndDelete(id);
        if (!deletedTodo) {
            return res.status(404).json({ message: "Todo not found" });
        }
        res.status(200).json({ message: "Todo deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};



