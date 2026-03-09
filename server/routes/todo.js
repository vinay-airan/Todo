import express from "express";
import { createTodo, getTodos, updateTodo, deleteTodo } from "../controllers/todo.js";
import isauthenticate from "../middleware/isauthenticate.js"
const todoRouter = express.Router();

todoRouter.route("/").post( isauthenticate, createTodo).get(isauthenticate,getTodos);
todoRouter.route("/:id").put(isauthenticate,updateTodo).delete(isauthenticate,deleteTodo);

export default todoRouter;