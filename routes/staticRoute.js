import express from "express";
import { checkUserAuth } from "../middlewares/userAuth.js";

const router = express.Router();

//router level middleware
router.use("/home", checkUserAuth);
router.use("/about", checkUserAuth);
router.use("/logout", checkUserAuth);

router.get("/", (req, res) => res.redirect("/home"));

router.get("/home", (req, res) => res.render("home"));

router.get("/about", (req, res) => res.render("about"));

router.get("/logout", (req, res) =>
  res.clearCookie("uid").redirect("/user/login")
);

export default router;
