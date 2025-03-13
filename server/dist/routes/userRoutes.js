"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const userControllers_1 = require("../controllers/userControllers");
const userRouter = express_1.default.Router();
// for the frontend to send back a user based on if there is a cookie
userRouter.get("/checkcookielogin", authController_1.checkCookieLogin);
userRouter.get("/checkcookie", authController_1.checkCookie);
// userRouter.get("/checkauth", protect, checkAuth);
// signup/login functionality
userRouter.post("/signup", authController_1.signup);
userRouter.post("/login", authController_1.login);
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
userRouter.post("/logout", userControllers_1.logOut);
// get one user back
userRouter.get("/:id", userControllers_1.getOneUser);
exports.default = userRouter;
