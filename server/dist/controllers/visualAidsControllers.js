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
exports.createChord = createChord;
exports.getChords = getChords;
const Chords_1 = __importDefault(require("../models/Chords"));
function createChord(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        //   try {
        //     const docs = [
        //       {
        //         name: "G Major (G)",
        //         url: "https://www.shutterstock.com/shutterstock/photos/2210636093/display_1500/stock-vector-guitar-chord-basic-and-hand-position-for-guitar-chord-vector-freestyle-chord-2210636093.jpg",
        //         bulletPoints: [
        //           "Place your ring finger on the 3rd fret of the high E string (1st string)",
        //           "Place your middle finger on the 2nd fret of the A string (5th string)",
        //           "Place your index finger on the 1st fret of the B string (2nd string)",
        //           "Strum all strings",
        //         ],
        //       },
        //       {
        //         name: "D Major (D)",
        //         url: "https://www.shutterstock.com/shutterstock/photos/2210636095/display_1500/stock-vector-guitar-chord-basic-and-hand-position-for-guitar-chord-vector-freestyle-chord-2210636095.jpg",
        //         bulletPoints: [
        //           "Place your ring finger on the 3rd fret of the B string (2nd string)",
        //           "Place your middle finger on the 2nd fret of the high E string (1st string)",
        //           "Place your index finger on the 1st fret of the G string (3rd string)",
        //           "Strum from the D string (4th string) down",
        //         ],
        //       },
        //       {
        //         name: "A Major (A)",
        //         url: "https://www.shutterstock.com/image-vector/guitar-chord-basic-hand-position-260nw-2210636089.jpg",
        //         bulletPoints: [
        //           "Place your ring finger on the 2nd fret of the B string (2nd string)",
        //           "Place your middle finger on the 2nd fret of the D string (4th string)",
        //           "Place your index finger on the 2nd fret of the G string (3rd string)",
        //           "Strum from the A string (5th string) down",
        //         ],
        //       },
        //       {
        //         name: "E Major (E)",
        //         url: "https://www.shutterstock.com/shutterstock/photos/2258807655/display_1500/stock-vector-guitar-chord-basic-and-hand-position-for-guitar-chord-vector-isolated-on-white-background-2258807655.jpg",
        //         bulletPoints: [
        //           "Place your ring finger on the 2nd fret of the A string (5th string)",
        //           "Place your middle finger on the 2nd fret of the D string (4th string)",
        //           "Place your index finger on the 1st fret of the G string (3rd string)",
        //           "Strum all strings",
        //         ],
        //       },
        //       {
        //         name: "A Minor (Am)",
        //         url: "https://www.shutterstock.com/shutterstock/photos/2210636091/display_1500/stock-vector-guitar-chord-basic-and-hand-position-for-guitar-chord-vector-freestyle-chord-2210636091.jpg",
        //         bulletPoints: [
        //           "Place your ring finger on the 2nd fret of the G string (3rd string)",
        //           "Place your middle finger on the 2nd fret of the D string (4th string)",
        //           "Place your index finger on the 1st fret of the B string (2nd string)",
        //           "Strum from the A string (5th string) down",
        //         ],
        //       },
        //       {
        //         name: "E Minor (Em)",
        //         url: "https://www.shutterstock.com/shutterstock/photos/2210636087/display_1500/stock-vector-guitar-chord-basic-and-hand-position-for-guitar-chord-vector-freestyle-chord-2210636087.jpg",
        //         bulletPoints: [
        //           "Place your ring finger on the 2nd fret of the A string (5th string)",
        //           "Place your middle finger on the 2nd fret of the D string (4th string)",
        //           "Strum all strings",
        //         ],
        //       },
        //       {
        //         name: "D Minor (Dm)",
        //         url: "https://www.shutterstock.com/shutterstock/photos/2258807659/display_1500/stock-vector-guitar-chord-basic-and-hand-position-for-guitar-chord-vector-isolated-on-white-background-2258807659.jpg",
        //         bulletPoints: [
        //           "Place your ring finger on the 3rd fret of the B string (2nd string)",
        //           "Place your middle finger on the 2nd fret of the G string (3rd string)",
        //           "Place your index finger on the 1st fret of the high E string (1st string)",
        //           "Strum from the D string (4th string) down",
        //         ],
        //       },
        //     ];
        //     console.log(req.body);
        //     const data = await Chords.create(docs);
        //     res.json(data);
        //   } catch (error) {
        //     // res.json(error);
        //     next(error);
        //   }
    });
}
function getChords(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const docs = yield Chords_1.default.find();
            console.log(docs);
            res.json(docs);
        }
        catch (error) {
            res.json(error);
            next(error);
        }
    });
}
