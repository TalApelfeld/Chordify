import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";
import AppError from "../utils/appError";
import { IRequestObjwithUserId } from "./authController";
import User from "../models/userModel";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function getLearningPlanFromGPT(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newReqObj = req as IRequestObjwithUserId;

  if (!req.body) {
    console.log("no body");
    res.status(404).json({ status: "failed req, no body in req" });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are the most professional guitar teacher in the world who is able to teach people to play guitar via the internet",
        },
        {
          role: "user",
          content: `I am looking for a learning program for playing the guitar that relies on the following questions and answers:
          1) What is your current skill level with the guitar?
          A:${req.body.data[0]}
  
          2) How much time can you dedicate to practicing each week?
          A:${req.body.data[1]}
  
          3) What are your main goals for learning guitar?
          A:${req.body.data[2]}
  
          4) Do you have any musical background or play other instruments?
          A:${req.body.data[3]}
  
          5) "What genres of music are you most interested in playing?",
          A:${req.body.data[4]}
  
          6) "Do you prefer learning through video tutorials, written materials, or both?",
          A:${req.body.data[5]}
  
          7) "How do you prefer to receive feedback on your progress?",
          A: ${req.body.data[6]}
  
          I want you to create a learning plan as detailed as possible that is divided into weeks, where each week has a list of goals that need to be studied according to the questions and answers above in the json format:
  
          for example: [
      {
        title: "week: 1",
        goals: [
          "Learn G chord",
          "Make practice with friend",
          "Learn C chord",
          "Learn strumming patterns",
          "Buy guitar",
        ],
      },
      {
        title: "week: 2",
        goals: [
          "Learn G chord",
          "Make practice with friend",
          "Learn C chord",
          "Learn strumming patterns",
          "Buy guitar",
        ],
        }]
        `,
        },
      ],
      response_format: { type: "json_object" },
      store: true,
    });

    if (!completion.choices[0].message.content) return;
    const resFromGpt = JSON.parse(completion.choices[0].message.content);

    const user = await User.updateOne(
      { _id: newReqObj.userId },
      { learningPlan: resFromGpt.learning_plan }
    );

    console.log(resFromGpt.learning_plan);

    res.status(200).json({ status: "success", data: resFromGpt });
  } catch (err) {
    console.log(err);
    res.status(404).json({ status: "failed", message: "req failed" });
  }

  // if (!req.userId) {
  //   return res
  //     .status(404)
  //     .json({ status: "fail", message: "req header forwarding didnt work" });
  // }
}

export async function getPlanFromDB(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newReq = req as IRequestObjwithUserId;

  const plan = await User.find({ _id: newReq.userId }).select("learningPlan");

  res.status(200).json({ status: "success", plan });
}
