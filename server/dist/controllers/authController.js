"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signup = signup;
exports.login = login;
exports.checkCookieLogin = checkCookieLogin;
exports.checkCookie = checkCookie;
const userModel_1 = __importDefault(require("../models/userModel"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function signup(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //* insted of this way:
            // const newUser = await User.create(req.body);
            //* we use this way, making sure only the data we need gets to the doc and that way nobody can say they are admin
            const newUser = yield userModel_1.default.create({
                // name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
                // passwordChangedAt: req.body.passwordChangedAt,
                // role: req.body.role,
            });
            const secret = process.env.JWT_SECRET;
            const cookieExpires = Number(process.env.JWT_COOKIE_EXPIRES_IN);
            const token = jsonwebtoken_1.default.sign({ id: newUser._id }, secret, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            //* for DEV
            if (process.env.NODE_ENV === "development") {
                res.cookie("jwt", token, {
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                    httpOnly: true, // Recommended to prevent client-side access
                    secure: false, // Set to true in production when using HTTPS //* Set to true on PROD !!!!!
                    sameSite: "lax", //* Set to 'none' on prod !!!!!
                });
            }
            //* for PRODUCTION
            if (process.env.NODE_ENV === "production") {
                res.cookie("jwt", token, {
                    httpOnly: true, // Recommended to prevent client-side access
                    secure: true, // Set to true in production when using HTTPS //* Set to true on PROD !!!!!
                    sameSite: "none", //* Set to 'none' on prod !!!!!
                    domain: "chordify-api.onrender.com",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
            }
            res.status(201).json({ status: "success", token, data: { user: newUser } });
        }
        catch (error) {
            res.status(404).json({ status: "fail", message: error });
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { email, password } = req.body;
        // 1) Check if email and password exist
        if (!email || !password) {
            return next("Please provide email and password!");
        }
        // 2) Check if user exists && password is correct
        try {
            const user = yield userModel_1.default.findOne({ email }).select("+password");
            if (!user) {
                // with this message the attacker dont know if email or password is incorrect
                return next("Incorrect email or password");
            }
            // Note: Now 'user' is a proper document instance where you can access methods like 'correctPassword'
            const correct = yield user.correctPassword(password, user.password);
            if (!correct) {
                return next("Incorrect email or password");
            }
            // 3) If everything ok, send token to client
            const secret = process.env.JWT_SECRET;
            const docID = user._id;
            const token = jsonwebtoken_1.default.sign({ id: docID }, secret, {
                expiresIn: process.env.JWT_EXPIRES_IN,
            });
            const cookieExpires = Number(process.env.JWT_COOKIE_EXPIRES_IN);
            //* for DEV
            if (process.env.NODE_ENV === "development") {
                res.cookie("jwt", token, {
                    expires: new Date(Date.now() + cookieExpires * 24 * 60 * 60 * 1000),
                    httpOnly: true, // Recommended to prevent client-side access
                    secure: false, // Set to true in production when using HTTPS //* Set to true on PROD !!!!!
                    sameSite: "lax", //* Set to 'none' on prod !!!!!
                });
            }
            //* for PRODUCTION
            if (process.env.NODE_ENV === "production") {
                res.cookie("jwt", token, {
                    httpOnly: true, // Recommended to prevent client-side access
                    secure: true, // Set to true in production when using HTTPS //* Set to true on PROD !!!!!
                    sameSite: "none", //* Set to 'none' on prod !!!!!
                    domain: "chordify-api.onrender.com",
                    path: "/",
                    maxAge: 7 * 24 * 60 * 60 * 1000,
                });
            }
            res.status(200).json({ status: "success", token });
        }
        catch (error) {
            next(error);
        }
    });
}
function checkCookieLogin(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.cookies.jwt) {
            console.log("no token");
            return res.status(200).json({ status: "success", message: "test" });
        }
        try {
            const token = req.cookies["jwt"];
            const secret = process.env.JWT_SECRET;
            const test = jsonwebtoken_1.default.verify(token, secret);
            res.status(200).json({ status: "success", message: "valid cookie" });
        }
        catch (error) {
            console.log(error);
            return res.status(404).json({
                status: "failed",
                message: "there is a token but it is NOT a valid one",
            });
        }
    });
}
function checkCookie(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!req.cookies.jwt) {
            console.log("no token");
            return res
                .status(404)
                .json({ status: "failed", message: "no value of token in header" });
        }
        const token = req.cookies.jwt;
        // 2) Verification of  the token
        const secret = process.env.JWT_SECRET;
        const test = jsonwebtoken_1.default.verify(token, secret);
        const newReqObj = req;
        newReqObj.userId = test.id;
        next();
        // res.status(200).json({
        //   status: "success",
        //   data: test.id,
        // });
    });
}
// export async function protect(req: Request, res: Response, next: NextFunction) {
//   if (!req.cookies["jwt"]) {
//     console.log("no token");
//     return next(
//       new AppError("You are not logged in, log in or create an account", "404")
//     );
//   }
//   try {
//     //// 1) Check if we get the token
//     const token = req.cookies["jwt"];
//     //// 2) Verification of  the token
//     const secret = process.env.JWT_SECRET as string;
//     const decoded = (await jwt.verify(token, secret)) as JwtPayload;
//     console.log(decoded);
//     //// 3) Check if user still exists
//     console.log(decoded.id);
//     const freshUser = await User.findById(decoded.id);
//     if (!freshUser)
//       return next("the user belongigng to the token is no longer exists");
//     //// 4) Check if user changed password after the token was issued
//     if (freshUser.changedPasswordAfter(decoded.iat!))
//       return next("User recently changed password, pls log in again");
//     //// GRANT ACCESS TO PROTECTED ROUTE
//     req.user = freshUser;
//     console.log(req.user);
//     next();
//   } catch (error) {
//     next(error);
//   }
// }
// export async function checkAuth(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const user = await User.findById(req.user?._id);
//     res.status(200).json({ data: user });
//   } catch (error) {
//     next(new AppError("you are not authenticated", "404"));
//   }
// }
// export function restrict(roles: string[]) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (req.user) {
//       if (!roles.includes(req.user.role))
//         return next("you do not have premissoin to preform this action ");
//     }
//     next();
//   };
// }
// export async function forgotPassword(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   // 1) Get user based on posted email
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return next("Tere is no user with this email address ");
//   // 2) Generate the random reset token
//   const resetToken = user.createPasswordResetToken();
//   const updatedUser = await user.save({ validateBeforeSave: false });
//   res.json({ updatedUser });
//   // 3) Sent it to user's email
//   //* need to send email
// }
// export async function resetPassword(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     // 1) Get user based on the token
//     const hasedToken = crypto
//       .createHash("sha256")
//       .update(req.params.token)
//       .digest("hex");
//     const user = await User.findOne({
//       passwordResetToken: hasedToken,
//       passwordResetExpires: { $gt: Date.now() },
//     });
//     // 2) If token has not expired and there is user, set the new password
//     if (!user) return next("token is invalid or has expired");
//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     user.passwordResetToken = undefined;
//     user.passwordResetExpires = undefined;
//     await user.save();
//     // 3) Updated 'changedPasswordAt'  property for the user
//     //* updated in the model usin pre middleware
//     // 4) log the user in, send JWT
//     const secret = process.env.JWT_SECRET as string;
//     const token = jwt.sign({ id: user._id }, secret, {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     });
//     res.status(200).json({ status: "success", token });
//   } catch (error) {
//     return next(error);
//   }
// }
// export async function updatePassword(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     ////1) Get user from collection
//     if (!req.user) return next("no user");
//     const user = await User.findById(req.user.id).select("+password");
//     if (!user) return next("you are not sigend in");
//     //// 2) Check if posted current password is correct
//     if (!(await user.correctPassword(req.body.passwordCurrent, user.password)))
//       return next("your current password is wrong");
//     //// 3) if so, update the password
//     user.password = req.body.password;
//     user.passwordConfirm = req.body.passwordConfirm;
//     await user.save();
//     //// 4) Log user in, send JWT
//     const secret = process.env.JWT_SECRET as string;
//     const token = jwt.sign({ id: user._id }, secret, {
//       expiresIn: process.env.JWT_EXPIRES_IN,
//     });
//     res.status(200).json({ status: "success", token });
//   } catch (error) {
//     return next(error);
//   }
// }
