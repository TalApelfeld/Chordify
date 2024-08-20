import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import AppError from "./utils/appError";
import { globalErrorHndler } from "./controllers/errorController";
import userRoutes from "./routes/userRoutes";
import homeRoutes from "./routes/homeRoutes";
import visualAidsRoutes from "./routes/visualAidsRoutes";
import searchRoutes from "./routes/searchRoutes";
import testRoutes from "./routes/testRoutes";
import songsRouter from "./routes/songsRoutes";
import { protect } from "./controllers/authController";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", // Adjust this to match your frontend's URL
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());

app.use("/kittens", testRoutes);
app.use("/songs", songsRouter);
app.use("/users", userRoutes);
app.use("/home", homeRoutes);
app.use("/visualaids", visualAidsRoutes);
app.use("/search", searchRoutes);

//* handle all UNhandeld routes
// need to be last because as we know the middleware goes line by line so the first route that matches the url entered and if it was first
// then all the routes would led to this error
app.all("*", (req, res, next) => {
  // res.status(404).json({
  //   status: "fail",
  //   message: `Can't find ${req.originalUrl} on this server!`,
  // });

  // when we pass an argument to the 'next' function express automaticlally knows it is error so in the error middleware it will be 'err'
  next(
    new AppError(
      `Can't find ${req.originalUrl} on this server!22222222222222`,
      "404"
    )
  );
});

// express comes built-in with middleware handlers and it knows its a middleware of error handling because of the 4 parameters,
// the 'err' parameter is the argument passed in the 'next()' function
app.use(globalErrorHndler);

export default app;
