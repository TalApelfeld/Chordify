import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import AppError from "../utils/appError";

// declare global {
//   namespace Express {
//     interface Request {
//       answers: string[]; // Adjust the type as needed
//     }
//   }
// }

const openai = new OpenAI();

export default async function testNode(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.body.answers || !Array.isArray(req.body.answers)) {
    // Checking if 'answers' exists and is an array
    return next(
      new AppError("No answers provided or format is incorrect", "400")
    );
  }
  console.log(process.env);
  console.log(process.env.OPENAI_API_KEY);

  const frontData = req.body.answers;

  // const frontData = [
  //   "Beginner",
  //   "1-3 hours",
  //   "Playing for fun",
  //   "No",
  //   "Rock",
  //   "Video",
  //   "Online community reviews",
  // ]; // Example static data

  const options = {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },

    body: JSON.stringify({
      model: "gpt-3.5-turbo",

      messages: [
        {
          role: "user",
          content: `im building an web app that generates a leraning plan based on few questions and it will be specific for guitar:
                    1) What is your current skill level with the guitar?
                    Options: Absolute Beginner, Beginner, Intermediate, Advanced

                     2) How much time can you dedicate to practicing each week?
                     Options: Less than 1 hour, 1-3 hours, 3-5 hours, More than 5 hours

                    3) What are your main goals for learning guitar?
                    Options: Playing for fun, Joining a band, Professional development, Songwriting

                    4) Do you have any musical background or play other instruments?
                    Yes/No follow-up: If yes, which instruments and for how long?

                    5) What genres of music are you most interested in playing?
                    Options: Rock, Blues, Jazz, Classical, Pop, Folk, Other

                    6) Do you prefer learning through video tutorials, written materials, or both?
                    Options: Video, Written, Both

                    7) How do you prefer to receive feedback on your progress?
                    Options: Self-assessment, Online community reviews, Regular check-ins with a mentor

                    

                    i want to make a learning plan as detailed as possibale , divided into weeks , and for each week, a list of things need to be learned in each day, make me a learning plan as apecific as you can for the first week that will include practical things in the next format:
                    <h1>week : # 1 </h1>
                    <h2>day : #</h2>
                    <ul>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                     </ul> 

                     based on those answers:
                     ${frontData[0]},
                     ${frontData[1]},
                     ${frontData[2]},
                     ${frontData[3]},
                     ${frontData[4]},
                     ${frontData[5]},
                     ${frontData[6]},
                     `,
        },
      ],
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );

    const data = await response.json();

    res.json({ message: `${data.choices[0].message.content}` });

    // res.send(data);
  } catch (error) {
    console.error(error);
  }
}

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
