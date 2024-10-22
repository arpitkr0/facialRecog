import express from "express";
import { signup, login } from "../controllers/userController.js";

const router = express.Router();

router.get("/login", (req, res) => res.render("login"));

router.get("/signup", (req, res) => res.render("signup"));

router.post("/login", login);

router.post("/signup", signup);

export default router;
