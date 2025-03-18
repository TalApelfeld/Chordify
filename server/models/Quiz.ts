import mongoose from "mongoose";

interface IDailyQuestions {
  question: string;
  answers: string[];
  correctAnswer: number;
  explanation: string;
}

interface IDailyPlan {
  title: string;
  description: string;
  questions: IDailyQuestions[];
}

const dailyQuestionsSchema = new mongoose.Schema<IDailyQuestions>({
  question: String,
  answers: [String],
  correctAnswer: Number,
  explanation: String,
});

const quizSchema = new mongoose.Schema<IDailyPlan>({
  title: String,
  description: String,
  questions: [dailyQuestionsSchema],
});

export const Quiz = mongoose.model<IDailyPlan>("Daily Plan", quizSchema);
