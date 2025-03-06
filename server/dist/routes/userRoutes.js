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
userRouter.get("/checkauth", authController_1.protect, authController_1.checkAuth);
// signup/login functionality
userRouter.post("/signup", authController_1.signup);
userRouter.post("/login", authController_1.login);
// root path
userRouter
    .route("/")
    .get(authController_1.protect, (0, authController_1.restrict)(["admin", "lead-guide", "user"]), userControllers_1.getAllUsers);
// handle users themselfs
userRouter.post("/forgotpassword", authController_1.forgotPassword);
userRouter.patch("/resetpassword/:token", authController_1.resetPassword);
userRouter.patch("/updatemypassword", authController_1.protect, authController_1.updatePassword);
userRouter.patch("/updateme", authController_1.protect, userControllers_1.updateMe);
userRouter.patch("/deleteme", authController_1.protect, userControllers_1.deleteMe);
userRouter.post("/logout", authController_1.protect, userControllers_1.logOut);
// get one user back
userRouter.get("/:id", userControllers_1.getOneUser);
exports.default = userRouter;
