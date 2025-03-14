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
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const LyricLineSchema = new mongoose_1.Schema({
    chords: { type: [String], required: true },
    text: { type: String, required: true },
});
const SectionSchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    chords: { type: [String] },
    lyrics: { type: [LyricLineSchema] },
});
const SongSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    chords: { type: Map, of: String, required: true },
    strumming_pattern: { type: [String], required: true },
    sections: { type: [SectionSchema], required: true },
});
const Song = mongoose_1.default.model("Song", SongSchema);
exports.default = Song;
