// import { useEffect, useState } from "react";
// import ChatBubble from "./ChatBubble";
// import SearchBar from "./SearchBar";

// export default function MiddleContentSearch() {
//   const [searchInputData, setSearchInputData] = useState("");
//   const [usersData, setUsersData] = useState([]);

//   useEffect(() => {
//     const fetchData = async function () {
//       const res = await fetch("http://127.0.0.1:3000/search");

//       const data = await res.json();
//       setUsersData(data);

//       return data;
//     };

//     fetchData().then((data) => {
//       console.log(data);
//     });
//   }, []);

//   return (
//     <div className="bg-background-black text-white">
//       hello from mid
//       <SearchBar
//         setSearchInputData={setSearchInputData}
//         searchInputData={searchInputData}
//       />
//       {usersData.map((el) => {
//         <ChatBubble el={usersData} />;
//       })}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import ChatBubble from "./ChatBubble";
// import SearchBar from "./SearchBar";

// export default function MiddleContentSearch() {
//   const [searchInputData, setSearchInputData] = useState("");
//   const [usersData, setUsersData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const res = await fetch("http://127.0.0.1:3000/search");
//       const data = await res.json();
//       setUsersData(data);
//     };

//     fetchData();
//   }, []);

//   return (
//     <div className="bg-background-black text-white">
//       hello from mid
//       <SearchBar
//         setSearchInputData={setSearchInputData}
//         searchInputData={searchInputData}
//       />
//       {/* {usersData.map((user) => (
//         <ChatBubble key={user._id} userData={user} />
//       ))} */}
//       <div>
//         {/* prettier-ignore */}
//         <p><span className="chord">G</span>             <span className="chord">D</span>           <span className="chord">Am</span><br />
//             Mama, take this badge off of me<br />
//             <span className="chord">G</span>             <span className="chord">D</span>                <span className="chord">C</span><br />
//             I can't use it anymore<br />
//             <span className="chord">G</span>             <span className="chord">D</span>                <span className="chord">Am</span><br />
//             It's getting dark, too dark to see<br />
//             <span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">C</span><br />
//             Feels like I'm knockin' on heaven's door</p>
//         {/* prettier-ignore-end */}
//         {/* prettier-ignore */}
//         <p><span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">Am</span><br />
//             Knock-knock-knockin' on heaven's door<br />
//             <span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">C</span><br />
//             Knock-knock-knockin' on heaven's door<br />
//             <span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">Am</span><br />
//             Knock-knock-knockin' on heaven's door<br />
//             <span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">C</span><br />
//             Knock-knock-knockin' on heaven's door</p>
//         {/* prettier-ignore-end */}
//         {/* prettier-ignore */}
//         <p><span className="chord">G</span>             <span className="chord">D</span>           <span className="chord">Am</span><br />
//             Mama, put my guns in the ground<br />
//             <span className="chord">G</span>             <span className="chord">D</span>                <span className="chord">C</span><br />
//             I can't shoot them anymore<br />
//             <span className="chord">G</span>             <span className="chord">D</span>                <span className="chord">Am</span><br />
//             That long black cloud is comin' down<br />
//             <span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">C</span><br />
//             Feels like I'm knockin' on heaven's door</p>
//         {/* prettier-ignore-end */}
//         {/* prettier-ignore */}
//         <p><span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">Am</span><br />
//             Knock-knock-knockin' on heaven's door<br />
//             <span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">C</span><br />
//             Knock-knock-knockin' on heaven's door<br />
//             <span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">Am</span><br />
//             Knock-knock-knockin' on heaven's door<br />
//             <span className="chord">G</span>             <span className="chord">D</span>              <span className="chord">C</span><br />
//             Knock-knock-knockin' on heaven's door</p>
//         {/* prettier-ignore-end */}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import ChatBubble from "./ChatBubble";
import SearchBar from "./SearchBar";

export default function MiddleContentSearch() {
  const [searchInputData, setSearchInputData] = useState("");
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("http://127.0.0.1:3000/search");
      const data = await res.json();
      setUsersData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="bg-background-black text-white">
      hello from mid
      <SearchBar
        setSearchInputData={setSearchInputData}
        searchInputData={searchInputData}
      />
      {/* {usersData.map((user) => (
        <ChatBubble key={user._id} userData={user} />
      ))} */}
      <div className="lyrics-container">
        <pre>
          {`C                D        Am
So, so you think you can tell
G                   D       C
Heaven from Hell, blue skies from pain
Am                     G               D
Can you tell a green field from a cold steel rail?
C                  Am              G
A smile from a veil? Do you think you can tell?
C                    D       Am
Did they get you to trade your heroes for ghosts?
G                    D          C
Hot ashes for trees? Hot air for a cool breeze?
Am                   G              D
Cold comfort for change? Did you exchange
C                  Am             G
A walk on part in the war for a lead role in a cage?

C              D             Am
How I wish, how I wish you were here
G                 D          C
We're just two lost souls swimming in a fish bowl
Am                     G             D
Year after year, running over the same old ground
C                   Am             G
What have we found? The same old fears
C              D             Am
Wish you were here`}
        </pre>
      </div>
    </div>
  );
}
