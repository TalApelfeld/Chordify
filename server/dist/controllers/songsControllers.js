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
exports.getSearchedSongs = getSearchedSongs;
exports.getNewSong = getNewSong;
exports.getBegginerSongs = getBegginerSongs;
const openai_1 = __importDefault(require("openai"));
const songsModel_1 = __importDefault(require("../models/songsModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
function getSearchedSongs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newReqObj = req;
        try {
            const user = yield userModel_1.default.findById(newReqObj.userId).select("songs");
            res.status(200).json({ data: user === null || user === void 0 ? void 0 : user.songs });
        }
        catch (error) {
            res.status(404).json({ messgae: error });
        }
    });
}
function getNewSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const newReqObj = req;
        try {
            const completion = yield openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: "You know the lyrics, the chords, and the strumming pattern for every guitar song there is.",
                    },
                    {
                        role: "user",
                        content: `give me the title, artist, chords, strumming pattern, and the lyrics for '${req.body.data}' guitar song
          in the next format of json (this is an example of the format):
          const songData = {
    title: "Riptide",
    artist: "Vance Joy",
    chords: {
      Am: "x02210",
      G: "320003",
      C: "x32010",
      F: "133211"
    },
    strumming_pattern: ["↓", "↓", "↑", "↓", "↑"],
    sections: [
      {
        type: "intro",
        chords: ["Am", "G", "C", "C", "Am", "G", "C", "C"]
      },
      {
        type: "verse",
        lyrics: [
          { chords: ["Am", "G", "C"], text: "I was scared of dentists and the dark" },
          { chords: ["Am", "G", "C"], text: "I was scared of pretty girls and starting conversations" },
          { chords: ["Am", "G", "C"], text: "Oh, all my friends are turning green" },
          { chords: ["Am", "G", "C"], text: "You're the magician's assistant in their dreams" }
        ]
      },
      {
        type: "pre-chorus",
        lyrics: [
          { chords: ["Am", "G", "C"], text: "Ooh, ooh, ooh" },
          { chords: ["Am", "G", "C"], text: "And they come unstuck" }
        ]
      },
      {
        type: "chorus",
        lyrics: [
          { chords: ["Am"], text: "Lady, running down to the riptide" },
          { chords: ["G", "C"], text: "Taken away to the dark side" },
          { chords: ["C"], text: "I wanna be your left-hand man" },
          { chords: ["Am"], text: "I love you when you're singing that song and" },
          { chords: ["G", "C"], text: "I got a lump in my throat 'cause" },
          { chords: ["C"], text: "You're gonna sing the words wrong" }
        ]
      },
      {
        type: "verse",
        lyrics: [
          { chords: ["Am", "G", "C"], text: "There's this movie that I think you'll like" },
          { chords: ["Am", "G", "C"], text: "This guy decides to quit his job and heads to New York City" },
          { chords: ["Am", "G", "C"], text: "This cowboy's running from himself" },
          { chords: ["Am", "G", "C"], text: "And she's been living on the highest shelf" }
        ]
      },
      {
        type: "pre-chorus",
        lyrics: [
          { chords: ["Am", "G", "C"], text: "Ooh, ooh, ooh" },
          { chords: ["Am", "G", "C"], text: "And they come unstuck" }
        ]
      },
      {
        type: "chorus",
        lyrics: [
          { chords: ["Am"], text: "Lady, running down to the riptide" },
          { chords: ["G", "C"], text: "Taken away to the dark side" },
          { chords: ["C"], text: "I wanna be your left-hand man" },
          { chords: ["Am"], text: "I love you when you're singing that song and" },
          { chords: ["G", "C"], text: "I got a lump in my throat 'cause" },
          { chords: ["C"], text: "You're gonna sing the words wrong" }
        ]
      },
      {
        type: "bridge",
        lyrics: [
          { chords: ["F", "Am"], text: "I just wanna, I just wanna know" },
          { chords: ["F", "Am"], text: "If you're gonna, if you're gonna stay" },
          { chords: ["F", "Am"], text: "I just gotta, I just gotta know" },
          { chords: ["F", "G"], text: "I can't have it, I can't have it any other way" }
        ]
      },
      {
        type: "chorus",
        lyrics: [
          { chords: ["Am"], text: "Lady, running down to the riptide" },
          { chords: ["G", "C"], text: "Taken away to the dark side" },
          { chords: ["C"], text: "I wanna be your left-hand man" },
          { chords: ["Am"], text: "I love you when you're singing that song and" },
          { chords: ["G", "C"], text: "I got a lump in my throat 'cause" },
          { chords: ["C"], text: "You're gonna sing the words wrong" }
        ]
      },
      {
        type: "outro",
        lyrics: [
          { chords: ["Am"], text: "Lady, running down to the riptide" },
          { chords: ["G", "C"], text: "Taken away to the dark side" },
          { chords: ["C"], text: "I wanna be your left-hand man" },
          { chords: ["Am"], text: "I love you when you're singing that song and" },
          { chords: ["G", "C"], text: "I got a lump in my throat 'cause" },
          { chords: ["C"], text: "You're gonna sing the words wrong" }
        ]
      }
    ]
  };
          `,
                    },
                ],
                response_format: { type: "json_object" },
                store: true,
            });
            const songJsonObjFromGPT = completion.choices[0].message.content;
            if (songJsonObjFromGPT) {
                const user = yield userModel_1.default.updateOne({ _id: newReqObj.userId }, { $addToSet: { songs: JSON.parse(songJsonObjFromGPT) } });
                const userSongs = yield userModel_1.default.findById(newReqObj.userId).select("songs");
                res.status(200).json({
                    status: "success",
                    data: userSongs === null || userSongs === void 0 ? void 0 : userSongs.songs,
                });
            }
        }
        catch (error) {
            console.log(error);
            res.status(404).json({ status: "failed", message: error });
        }
    });
}
function getBegginerSongs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const begginerSongs = yield songsModel_1.default.find({});
            res.status(200).json(begginerSongs);
        }
        catch (error) {
            res.status(404).json({ messgae: error });
        }
    });
}
