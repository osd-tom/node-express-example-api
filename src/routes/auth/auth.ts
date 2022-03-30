import { Router } from "express"
import { 
  registration
} from "../../controllers/auth"

const router: Router = Router()

router.post("/register", registration)

export default router