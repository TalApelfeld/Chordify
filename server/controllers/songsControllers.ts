import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import Song from "../models/songsModel";
import User from "../models/userModel";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

interface SongData {
  title: string | null;
  chordsUsed: string[];
  chordProgression: string[][];
  strummingPattern: string[];
}

//* function parsing the response from GPT
async function extractDataFromText(htmlText: string): Promise<SongData> {
  // Extract the title
  const titleMatch = htmlText.match(/<h1>(.*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1] : null;

  // Extract chords used
  const chordsUsedMatch = htmlText.match(
    /Chords Used:<\/h2>[\s\S]*?<ul>([\s\S]*?)<\/ul>/
  );
  const chordsUsed = chordsUsedMatch
    ? (chordsUsedMatch[1].match(/<li>(.*?)<\/li>/g) || []).map((li) =>
        li.replace(/<\/?li>/g, "")
      )
    : [];

  // Extract chord progression
  const chordProgressionMatch = htmlText.match(
    /Chord Progression:<\/h2>[\s\S]*?<ul>([\s\S]*?)<\/ul>/
  );
  const chordProgression = chordProgressionMatch
    ? (chordProgressionMatch[1].match(/<li>(.*?)<\/li>/g) || []).map((li) =>
        li.replace(/<\/?li>/g, "").split(" - ")
      )
    : [];

  // Extract strumming pattern and format it by character
  const strummingPatternMatch = htmlText.match(
    /Strumming Pattern:<\/h2>[\s\S]*?<p>(.*?)<\/p>/
  );
  const strummingPattern = strummingPatternMatch
    ? strummingPatternMatch[1].split("").filter((char) => char !== " ")
    : [];

  return {
    title,
    chordsUsed,
    chordProgression,
    strummingPattern,
  };
}

export async function fetchSong(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("enterd songs route");

  try {
    //* Asking GPT and getting promt from chatgpt
    const completion = await openai.chat.completions.create({
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
    const songObj = await extractDataFromText(songString ? songString : "");

    //* Saving song object to DB
    const song = new Song(songObj);
    const newSong = await song.save();

    //* Saving id of the song Doc to User Doc in the array of id's
    const savedSongIdUser = await User.findByIdAndUpdate(
      req.user?.id,
      {
        $push: { songs: newSong._id },
      },
      { new: true }
    );

    console.log(newSong);
    console.log(savedSongIdUser);

    res.status(200).json({ songObj });
  } catch (error) {
    res.json({ error });
  }
}

export async function getSearchedSongs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("getSearchedSongs endpoint hit");
  try {
    const user = await User.findById(req.user?.id).populate("songs");
    console.log(user);

    res.status(200).json({ data: user?.songs });
  } catch (error) {
    res.status(404).json({ messgae: error });
  }
}

export async function getBegginerSongs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.log("getBegginerSongs endpoint hit");
  try {
    const begginerSongs = await Song.find({
      difficulty: "begginer",
    });

    res.status(200).json({ data: begginerSongs });
  } catch (error) {
    res.status(404).json({ messgae: error });
  }
}
