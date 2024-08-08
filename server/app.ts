import express from "express";
import cors from "cors";
import { Request, Response, NextFunction } from "express";
import AppError from "./utils/appError";
import { globalErrorHndler } from "./controllers/errorController";
import userRoutes from "./routes/userRoutes";
import homeRoutes from "./routes/homeRoutes";
import visualAidsRoutes from "./routes/visualAidsRoutes";
import searchRoutes from "./routes/searchRoutes";
import testRoutes from "./routes/testRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use((req: Request, res: Response, next: NextFunction) => {
  if (req.headers) console.log(req.headers);

  next();
});

app.use("/test", testRoutes);
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
