import express from "express";
import { getAllUsers, login, signup } from "../controller/userController";

 const router = express.Router();
router.get("/",getAllUsers)
router.post("/signup",signup)
router.get("/login",login)

export default router;

