"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const songSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
    },
    chordsUsed: {
        type: [String],
    },
    chordProgression: { type: [[String]] },
    strummingPattern: { type: [String] },
    difficulty: { type: String },
});
const Song = mongoose_1.default.model("song", songSchema);
exports.default = Song;
