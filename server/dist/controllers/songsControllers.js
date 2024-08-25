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
exports.fetchSong = fetchSong;
exports.getSearchedSongs = getSearchedSongs;
exports.getBegginerSongs = getBegginerSongs;
const openai_1 = __importDefault(require("openai"));
const songsModel_1 = __importDefault(require("../models/songsModel"));
const userModel_1 = __importDefault(require("../models/userModel"));
const openai = new openai_1.default({
    apiKey: process.env.OPENAI_API_KEY,
});
//* function parsing the response from GPT
function extractDataFromText(htmlText) {
    return __awaiter(this, void 0, void 0, function* () {
        // Extract the title
        const titleMatch = htmlText.match(/<h1>(.*?)<\/h1>/);
        const title = titleMatch ? titleMatch[1] : null;
        // Extract chords used
        const chordsUsedMatch = htmlText.match(/Chords Used:<\/h2>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
        const chordsUsed = chordsUsedMatch
            ? (chordsUsedMatch[1].match(/<li>(.*?)<\/li>/g) || []).map((li) => li.replace(/<\/?li>/g, ""))
            : [];
        // Extract chord progression
        const chordProgressionMatch = htmlText.match(/Chord Progression:<\/h2>[\s\S]*?<ul>([\s\S]*?)<\/ul>/);
        const chordProgression = chordProgressionMatch
            ? (chordProgressionMatch[1].match(/<li>(.*?)<\/li>/g) || []).map((li) => li.replace(/<\/?li>/g, "").split(" - "))
            : [];
        // Extract strumming pattern and format it by character
        const strummingPatternMatch = htmlText.match(/Strumming Pattern:<\/h2>[\s\S]*?<p>(.*?)<\/p>/);
        const strummingPattern = strummingPatternMatch
            ? strummingPatternMatch[1].split("").filter((char) => char !== " ")
            : [];
        return {
            title,
            chordsUsed,
            chordProgression,
            strummingPattern,
        };
    });
}
function fetchSong(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log("enterd songs route");
        console.log(process.env);
        console.log(process.env.OPENAI_API_KEY);
        try {
            //* Asking GPT and getting promt from chatgpt
            const completion = yield openai.chat.completions.create({
                model: "gpt-4o-mini",
                messages: [
                    {
                        role: "system",
                        content: `you are a guitar teacher, `,
                    },
                    {
                        role: "user",
                        content: `give me the strumming pattern and the chords for the song '${req.body.value}'
           in the order they need to be to played the song and make it in this format:
           <h1>[here should be the song title]</h1>

           <h2>[Chords Used:]</h2>
           <ul>
           <li>[here is the cord]</li>
           <li>[another cord]</li>
           </ul>

           <h2>[Chord Progression:]</h2>
           <ul>
           <li></li>
           <li></li>
           </ul>

           <h2>[Strumming Pattern:]</h2>
           <P> example: D-DU-UDU (stand for down/up) </p>

           of course fill up the template accordingly to the given  song`,
                    },
                ],
            });
            console.log(completion);
            //* using the parsing function
            const songString = completion.choices[0].message.content;
            const songObj = yield extractDataFromText(songString ? songString : "");
            //* Saving song object to DB
            const song = new songsModel_1.default(songObj);
            const newSong = yield song.save();
            //* Saving id of the song Doc to User Doc in the array of id's
            const savedSongIdUser = yield userModel_1.default.findByIdAndUpdate((_a = req.user) === null || _a === void 0 ? void 0 : _a.id, {
                $push: { songs: newSong._id },
            }, { new: true });
            console.log(newSong);
            console.log(savedSongIdUser);
            res.status(200).json({ songObj });
        }
        catch (error) {
            res.json({ error });
        }
    });
}
function getSearchedSongs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        console.log("getSearchedSongs endpoint hit");
        try {
            const user = yield userModel_1.default.findById((_a = req.user) === null || _a === void 0 ? void 0 : _a.id).populate("songs");
            console.log(user);
            res.status(200).json({ data: user === null || user === void 0 ? void 0 : user.songs });
        }
        catch (error) {
            res.status(404).json({ messgae: error });
        }
    });
}
function getBegginerSongs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("getBegginerSongs endpoint hit");
        try {
            const begginerSongs = yield songsModel_1.default.find({
                difficulty: "begginer",
            });
            res.status(200).json({ data: begginerSongs });
        }
        catch (error) {
            res.status(404).json({ messgae: error });
        }
    });
}
