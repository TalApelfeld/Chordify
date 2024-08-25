import express from "express";
import {
  checkAuth,
  forgotPassword,
  login,
  protect,
  resetPassword,
  restrict,
  signup,
  updatePassword,
} from "../controllers/authController";
import {
  deleteMe,
  getAllUsers,
  getOneUser,
  logOut,
  updateMe,
} from "../controllers/userControllers";

const userRouter = express.Router();

// for the frontend to send back a user based on if there is a cookie
userRouter.get("/checkauth", protect, checkAuth);

// signup/login functionality
userRouter.post("/signup", signup);
userRouter.post("/login", login);

// root path
userRouter
  .route("/")
  .get(protect, restrict(["admin", "lead-guide", "user"]), getAllUsers)
  .post()
  .delete();

// handle users themselfs
userRouter.post("/forgotpassword", forgotPassword);
userRouter.patch("/resetpassword/:token", resetPassword);
userRouter.patch("/updatemypassword", protect, updatePassword);
userRouter.patch("/updateme", protect, updateMe);
userRouter.patch("/deleteme", protect, deleteMe);
userRouter.post("/logout", protect, logOut);

// get one user back
userRouter.get("/:id", getOneUser);
export default userRouter;
