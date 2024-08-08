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
exports.signUp = signUp;
exports.login = login;
exports.protect = protect;
const jsonwebtoken_1 = require("jsonwebtoken");
const Users_1 = __importDefault(require("../models/Users"));
const appError_1 = __importDefault(require("../utils/appError"));
const signToken = function (id) {
    // according to documation "sign()" return the json web token as string
    return (0, jsonwebtoken_1.sign)({ id: id }, "secret", { expiresIn: "90d" });
};
function signUp(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const newUser = yield Users_1.default.create({
                // in this way we store only the relevent data we need and some other user cant register himself as an admin.
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm,
                passwordChangedAt: req.body.passwordChangedAt,
            });
            const token = signToken(newUser._id);
            res.status(201).json({
                status: "success",
                token: token,
                data: {
                    user: newUser,
                },
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function login(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const email = req.body.eamil;
            // const password = req.body.password;
            //* the same
            const { email, password } = req.body;
            // 1) check if email and password exist
            if (!email || !password) {
                // we put 'return' to make sure the funcction finishes after it calling 'next()'
                return next(new appError_1.default("Please provide email and password", "400"));
            }
            // 2) check if user exsits && password is correct
            //* same as below
            // const user = User.findOne({ email });
            // used 'select' because we set it in the schema as false
            const user = yield Users_1.default.findOne({ email: email }).select("+password");
            if (!user || !(yield user.correctPassword(password, user.password))) {
                return next(new appError_1.default("Incorrect email or password", "401"));
            }
            // 3) if everthing ok, send token to client
            const token = signToken(user._id);
            res.status(200).json({
                status: "success",
                token,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function protect(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // 1) getting token and checking if it exist
        let token;
        //* there is a standard of sending the token in the header, the key is 'Authorization' and the value starts with 'Bearer' --> 'Bearer adsf3423'
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        }
        if (!token) {
            // use return becuse there is no "else" and we want to cut the proccess so we return the next() from the "protect" controller function and
            // the next takes it to the error handler
            return next(new appError_1.default("You are not logged in, please log in to get access", "401"));
        }
        try {
            // 2) varifaction of the token to see if it is a valid JWT
            const decoded = (yield (0, jsonwebtoken_1.verify)(token, "secret"));
            console.log(decoded);
            // 3) check if user still exists
            const freshUser = yield Users_1.default.findById(decoded.id);
            if (!freshUser) {
                return next(new appError_1.default("The user belonging to this token does no longer exist", "404"));
            }
            // 4) check if user changed password after the token was issued
            if (decoded.iat !== undefined &&
                (yield freshUser.changedPasswordAfter(decoded.iat))) {
                return next(new appError_1.default("User recently changed password! Please log in again", "401"));
            }
            next();
        }
        catch (error) { }
    });
}
