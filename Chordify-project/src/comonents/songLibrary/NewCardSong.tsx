// const songData = {
//   title: "Riptide",
//   artist: "Vance Joy",
//   chords: {
//     Am: "x02210",
//     G: "320003",
//     C: "x32010",
//     F: "133211",
//   },
//   strumming_pattern: ["↓", "↓", "↑", "↓", "↑"],
//   sections: [
//     {
//       type: "intro",
//       chords: ["Am", "G", "C", "C", "Am", "G", "C", "C"],
//     },
//     {
//       type: "verse",
//       lyrics: [
//         {
//           chords: ["Am", "G", "C"],
//           text: "I was scared of dentists and the dark",
//         },
//         {
//           chords: ["Am", "G", "C"],
//           text: "I was scared of pretty girls and starting conversations",
//         },
//         {
//           chords: ["Am", "G", "C"],
//           text: "Oh, all my friends are turning green",
//         },
//         {
//           chords: ["Am", "G", "C"],
//           text: "You're the magician's assistant in their dreams",
//         },
//       ],
//     },
//     {
//       type: "pre-chorus",
//       lyrics: [
//         { chords: ["Am", "G", "C"], text: "Ooh, ooh, ooh" },
//         { chords: ["Am", "G", "C"], text: "And they come unstuck" },
//       ],
//     },
//     {
//       type: "chorus",
//       lyrics: [
//         { chords: ["Am"], text: "Lady, running down to the riptide" },
//         { chords: ["G", "C"], text: "Taken away to the dark side" },
//         { chords: ["C"], text: "I wanna be your left-hand man" },
//         {
//           chords: ["Am"],
//           text: "I love you when you're singing that song and",
//         },
//         { chords: ["G", "C"], text: "I got a lump in my throat 'cause" },
//         { chords: ["C"], text: "You're gonna sing the words wrong" },
//       ],
//     },
//     {
//       type: "verse",
//       lyrics: [
//         {
//           chords: ["Am", "G", "C"],
//           text: "There's this movie that I think you'll like",
//         },
//         {
//           chords: ["Am", "G", "C"],
//           text: "This guy decides to quit his job and heads to New York City",
//         },
//         {
//           chords: ["Am", "G", "C"],
//           text: "This cowboy's running from himself",
//         },
//         {
//           chords: ["Am", "G", "C"],
//           text: "And she's been living on the highest shelf",
//         },
//       ],
//     },
//     {
//       type: "pre-chorus",
//       lyrics: [
//         { chords: ["Am", "G", "C"], text: "Ooh, ooh, ooh" },
//         { chords: ["Am", "G", "C"], text: "And they come unstuck" },
//       ],
//     },
//     {
//       type: "chorus",
//       lyrics: [
//         { chords: ["Am"], text: "Lady, running down to the riptide" },
//         { chords: ["G", "C"], text: "Taken away to the dark side" },
//         { chords: ["C"], text: "I wanna be your left-hand man" },
//         {
//           chords: ["Am"],
//           text: "I love you when you're singing that song and",
//         },
//         { chords: ["G", "C"], text: "I got a lump in my throat 'cause" },
//         { chords: ["C"], text: "You're gonna sing the words wrong" },
//       ],
//     },
//     {
//       type: "bridge",
//       lyrics: [
//         { chords: ["F", "Am"], text: "I just wanna, I just wanna know" },
//         { chords: ["F", "Am"], text: "If you're gonna, if you're gonna stay" },
//         { chords: ["F", "Am"], text: "I just gotta, I just gotta know" },
//         {
//           chords: ["F", "G"],
//           text: "I can't have it, I can't have it any other way",
//         },
//       ],
//     },
//     {
//       type: "chorus",
//       lyrics: [
//         { chords: ["Am"], text: "Lady, running down to the riptide" },
//         { chords: ["G", "C"], text: "Taken away to the dark side" },
//         { chords: ["C"], text: "I wanna be your left-hand man" },
//         {
//           chords: ["Am"],
//           text: "I love you when you're singing that song and",
//         },
//         { chords: ["G", "C"], text: "I got a lump in my throat 'cause" },
//         { chords: ["C"], text: "You're gonna sing the words wrong" },
//       ],
//     },
//     {
//       type: "outro",
//       lyrics: [
//         { chords: ["Am"], text: "Lady, running down to the riptide" },
//         { chords: ["G", "C"], text: "Taken away to the dark side" },
//         { chords: ["C"], text: "I wanna be your left-hand man" },
//         {
//           chords: ["Am"],
//           text: "I love you when you're singing that song and",
//         },
//         { chords: ["G", "C"], text: "I got a lump in my throat 'cause" },
//         { chords: ["C"], text: "You're gonna sing the words wrong" },
//       ],
//     },
//   ],

import { ISong } from "../../pages/SongLibraryPage";

// };
interface INewCardSongProps {
  songData: ISong;
}
export default function NewCardSong({ songData }: INewCardSongProps) {
  return (
    <div className="song-container">
      <h1>{songData.title}</h1>
      <h3>{songData.artist}</h3>

      <h4>Strumming Pattern:</h4>
      <div className="strumming-container">
        {songData.strumming_pattern.map((strum, index) => (
          <button
            key={index}
            className={`strum-btn ${strum === "↓" ? "downstroke" : "upstroke"}`}
          >
            {strum}
          </button>
        ))}
      </div>

      {songData.sections.map((section, index) => (
        <div key={index} className="section">
          <h4>{section.type.toUpperCase()}</h4>
          {section.lyrics &&
            section.lyrics.map((line, i) => (
              <div key={i} className="lyric-line">
                <div className="chords-line">
                  {line.chords.map((chord, j) => (
                    <span key={j} className="chord">
                      {chord}
                    </span>
                  ))}
                </div>
                <div className="lyrics-text">{line.text}</div>
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
