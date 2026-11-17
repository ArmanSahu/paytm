import { Router } from "express";
import { signupController } from "../controllers/usercontroller.js";


const router = Router();

router.post("/signup",signupController);



export default router;