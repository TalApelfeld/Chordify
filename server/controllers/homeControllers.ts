import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import User from "../models/Users";

// const openai = new OpenAI();

// export default async function testNode(req: Request, res: Response) {
//   const options = {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer sk-proj-Xvesv7bXEUdeqVMU7z4QT3BlbkFJ1fRBD3G62PQxS3qJU236`,
//     },
//     body: JSON.stringify({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "user",
//           content: `im building an web app that makes you a leraning plan to know how to play guitar based on some questions:
//           im building an web app that makes you a leraning plan to know how to play guitar based on some questions.

//           suppose the answers to this are:
//            Beginner
//            1-3 hours
//           Playing for fun
//           No
//           Other
//           Written
//           Self-assessment.

//           i want to make a learning plan as ditailed as possibale , divided into 25 weeks , and for each week, a list of things need to be learned in each day, make me a learning plan for the first week in the next format:
//           <h1>week : # 1 </h1>
//           <h2>day : #</h2>
//           <ul>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           <li></li>
//           </ul>`,
//         },
//       ],
//     }),
//   };
//   try {
//     const response = await fetch(
//       "https://api.openai.com/v1/chat/completions",
//       options
//     );

//     response
//       .json()
//       .then((data) =>
//         res.json({ message: `${data.choices[0].message.content}` })
//       );

//     // res.send(data);
//   } catch (error) {
//     console.error(error);
//   }
// }

// interface ValidatorErrorProperties {
//   message: string;
//   type: string;
//   path: string;
// }

// interface ValidatorError {
//   name: string;
//   message: string;
//   properties: ValidatorErrorProperties;
//   kind: string;
//   path: string;
// }
// interface ErrorDetails {
//   password: ValidatorError;
//   // Add more fields here if there are other fields with errors similar to password
// }
// interface ValidationError {
//   errors: ErrorDetails;
//   _message: string;
//   name: string;
//   message: string;
// }

// export default async function testNode(
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) {
//   try {
//     const user = await User.create({ name: req.body.name });

//     console.log(user);

//     res.json(user);
//   } catch (error: unknown) {
//     if (typeof error === "object" && error !== null && "errors" in error) {
//       const validationError = error as ValidationError; // Now it's safe to cast

//       if (validationError.errors && validationError.errors.password) {
//         console.log(validationError.errors.password.message);
//         res.json({ message: validationError.errors.password.message }); // "Password need to be provided !"
//       }
//     } else {
//       // General error handling or log the error
//       console.error("An unexpected error occurred", error);
//     }
//   }
// }
