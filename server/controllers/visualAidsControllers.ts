import { Request, Response, NextFunction } from "express";
import Chords from "../models/Chords";

export async function createChord(
  req: Request,
  res: Response,
  next: NextFunction
) {
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
}

export async function getChords(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const docs = await Chords.find();

    console.log(docs);

    res.json({ data: docs });
  } catch (error) {
    res.json(error);
    next(error);
  }
}
