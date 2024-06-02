import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router=Router();
router.route("/register").post(registerUser)

export  default router;






//Now we  have controller and router  now where to import usually we keep index.js clean only environment variable but we have them in app.js 