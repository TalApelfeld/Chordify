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
exports.getAllUsers = getAllUsers;
exports.getOneUser = getOneUser;
exports.updateMe = updateMe;
exports.deleteMe = deleteMe;
const userModel_1 = __importDefault(require("../models/userModel"));
function getAllUsers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield userModel_1.default.find();
        const length = users.length;
        console.log(length);
        // const users = await query;
        res.status(200).json({ message: "success", length, data: { users } });
    });
}
function getOneUser(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // const user = await User.findOne({ _id: req.params.id }).populate<{
            //   songs: ISong;
            // }>("songs");
            // res.status(200).json({ message: "success", data: { user } });
            const user = yield userModel_1.default.findOne({ _id: req.params.id }).populate("songs");
            res.status(200).json({ message: "success", data: { user } });
        }
        catch (error) {
            res.status(404).json({ message: "faild", data: { error } });
        }
    });
}
function updateMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            // 1) Create error if user posts password data
            if (req.body.password || req.body.passwordConfirm)
                return next("its not the route for changing password !");
            // 2) Update user document
            const updatedUser = yield userModel_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, {
                // need to be careful and watch that only the fields that we want are inputed because someone can input the 'role'
                name: req.body.name,
                email: req.body.email,
            }, { new: true, runValidators: true });
            res.status(200).json({ status: "success", data: { user: updatedUser } });
        }
        catch (error) {
            return next(error);
        }
    });
}
function deleteMe(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        yield userModel_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, { active: false });
        res.status(204).json({ status: "success", data: null });
    });
}
