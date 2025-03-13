import express from "express";
import {
  checkCookie,
  checkCookieLogin,
  login,
  signup,
} from "../controllers/authController";
import {
  getAllUsers,
  getOneUser,
  logOut,
} from "../controllers/userControllers";

const userRouter = express.Router();

// for the frontend to send back a user based on if there is a cookie
userRouter.get("/checkcookielogin", checkCookieLogin);
userRouter.get("/checkcookie", checkCookie);
// userRouter.get("/checkauth", protect, checkAuth);

// signup/login functionality
userRouter.post("/signup", signup);
userRouter.post("/login", login);

// root path
// userRouter
//   .route("/")
//   .get(restrict(["admin", "lead-guide", "user"]), getAllUsers);

//// handle users themselfs
// userRouter.post("/forgotpassword", forgotPassword);
// userRouter.patch("/resetpassword/:token", resetPassword);
// userRouter.patch("/updatemypassword", updatePassword);
// userRouter.patch("/updateme", updateMe);
// userRouter.patch("/deleteme", deleteMe);
userRouter.post("/logout", logOut);

// get one user back
userRouter.get("/:id", getOneUser);
export default userRouter;
