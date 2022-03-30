import { Router } from "express"
import { 
  getTodoList, 
  getTodo, 
  createTodo, 
  updateTodo, 
  deleteTodo 
} from "../../controllers/todos"

const router: Router = Router()

router.get("/todo-list", getTodoList)
router.get("/todo/:id", getTodo)
router.post("/create-todo", createTodo)
router.put("/edit-todo/:id", updateTodo)
router.delete("/delete-todo/:id", deleteTodo)

export default router