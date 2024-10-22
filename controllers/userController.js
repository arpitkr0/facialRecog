import { userModel } from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const {
    studentId,
    name,
    phone,
    email,
    password,
    confirm_password,
    department,
    year,
    semester,
    course,
    gender,
    address,
  } = req.body;

  if (
    studentId &&
    name &&
    phone &&
    email &&
    password &&
    confirm_password &&
    department &&
    year &&
    semester &&
    course &&
    gender &&
    address
  ) {
    if (password === confirm_password) {
      const user = await userModel.findOne({ email: email });
      if (user) {
        return res.render("signup", { message: "Email already registered!" });
      } else {
        try {
          const salt = bcryptjs.genSaltSync(10);
          const hashedPassword = bcryptjs.hashSync(password, salt);

          await userModel.create({
            studentId,
            name,
            phone,
            email,
            password: hashedPassword,
            department,
            year,
            semester,
            course,
            gender,
            address,
          });

          const user = await userModel.findOne({ studentId: studentId });

          //cookie generator
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "5d",
          });

          res.cookie("uid", token, { maxAge: 900000, httpOnly: true });

          return res.redirect("/home");
        } catch {
          return res.render("signup", { message: "Error creating account!" });
        }
      }
    } else {
      return res.render("signup", {
        message: "Password and confirm passsword doesn't match!",
      });
    }
  } else {
    return res.render("signup", {
      message: "All fields are required!",
    });
  }
};

export const login = async (req, res) => {
  const { studentId, password } = req.body;
  if (studentId && password) {
    const user = await userModel.findOne({ studentId: studentId });
    if (user) {
      const isTrue = bcryptjs.compareSync(password, user.password);
      if (isTrue) {
        //cookie generation
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
          expiresIn: "5d",
        });

        res.cookie("uid", token, { maxAge: 900000, httpOnly: true });

        return res.redirect("/home");
      } else {
        return res.render("login", {
          message: "Incorrect studentId or password!",
        });
      }
    } else {
      return res.render("login", { message: "User not registered!" });
    }
  } else {
    return res.render("login", { message: "All fields are required!" });
  }
};
