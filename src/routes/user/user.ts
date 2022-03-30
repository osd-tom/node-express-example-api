import { Router } from "express"
import { 
  getUserList, 
  getUser, 
  createUser, 
  updateUser, 
  deleteUser 
} from "../../controllers/users"

const router: Router = Router()

router.get("/user-list", getUserList)
router.get("/user/:id", getUser)
router.post("/create-user", createUser)
router.put("/edit-user/:id", updateUser)
router.delete("/delete-user/:id", deleteUser)

export default router