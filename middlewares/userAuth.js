import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const checkUserAuth = async (req, res, next) => {
  const token = req.cookies.uid;
  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);
      const user = await userModel.findById(userId).select("-password");
      req.user = user;
      next();
    } catch {
      return res.clearCookie("uid").redirect("/user/login");
    }
  } else {
    return res.redirect("/user/login");
  }
};
