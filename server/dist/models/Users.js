"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const mongoose_1 = __importStar(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const validator_1 = __importDefault(require("validator"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "Name needs to be provided !"],
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        validate: [validator_1.default.isEmail, "Please provide a valid Email "],
    },
    password: {
        type: String,
        required: [true, "Password need to be provided !"],
        minlength: 7,
        // wont show the password in the output, in the 'res', only on creation, but on 'find' ,'findOne' etc... it wont show
        select: false,
    },
    passwordConfirm: {
        type: String,
        required: [true, "Password confirmation need to be provided !"],
        validate: {
            //* this only work on 'create()' and 'save()' !!!
            validator: function (el) {
                return el === this.password; // Now `this` is explicitly an IUser
            },
            message: "Passwords are not the same",
        },
    },
    photo: { type: String },
    passwordChangedAt: Date,
});
// happen between getting the data and right before storing it in the Database
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!this.isModified("password"))
            return next();
        this.password = yield bcrypt_1.default.hash(this.password, 12);
        this.passwordConfirm = "";
        next();
    });
});
//* instance method
// a method that is available on all docs of a certain collection
// in other words its creating a function to be available on the model later
userSchema.methods.correctPassword = function (candidatePassword, userPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(candidatePassword, userPassword);
    });
};
//* check if user changed his password
userSchema.methods.changedPasswordAfter = function (JWTtimestamp) {
    return __awaiter(this, void 0, void 0, function* () {
        if (this.passwordChangedAt) {
            const changedTimeStamp = this.passwordChangedAt.getTime() / 1000;
            console.log(changedTimeStamp, JWTtimestamp);
            return JWTtimestamp < changedTimeStamp;
        }
    });
};
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
