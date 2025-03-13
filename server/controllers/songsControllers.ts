import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import Song from "../models/songsModel";
import User from "../models/userModel";
import { IRequestObjwithUserId } from "./authController";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getSearchedSongs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newReqObj = req as IRequestObjwithUserId;

  try {
    const user = await User.findById(newReqObj.userId).select("songs");

    res.status(200).json({ data: user?.songs });
  } catch (error) {
    res.status(404).json({ messgae: error });
  }
}

export async function getNewSong(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newReqObj = req as IRequestObjwithUserId;

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You know the lyrics, the chords, and the strumming pattern for every guitar song there is.",
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
      const user = await User.updateOne(
        { _id: newReqObj.userId },
        { $addToSet: { songs: JSON.parse(songJsonObjFromGPT) } }
      );

      const userSongs = await User.findById(newReqObj.userId).select("songs");

      res.status(200).json({
        status: "success",
        data: userSongs?.songs,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(404).json({ status: "failed", message: error });
  }
}

export async function getBegginerSongs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const begginerSongs = await Song.find({});

    res.status(200).json(begginerSongs);
  } catch (error) {
    res.status(404).json({ messgae: error });
  }
}
