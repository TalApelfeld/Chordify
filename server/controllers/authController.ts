import { Request, Response, NextFunction } from "express";
import { sign, verify, JwtPayload } from "jsonwebtoken";
import User from "../models/Users";
import AppError from "../utils/appError";

const signToken = function (id: string) {
  // according to documation "sign()" return the json web token as string
  return sign({ id: id }, "secret", { expiresIn: "90d" });
};

export async function signUp(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await User.create({
      // in this way we store only the relevent data we need and some other user cant register himself as an admin.
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      passwordChangedAt: req.body.passwordChangedAt,
    });

    const token = signToken(newUser._id);

    res.status(201).json({
      status: "success",
      token: token,
      data: {
        user: newUser,
      },
    });
  } catch (error) {
    next(error);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    // const email = req.body.eamil;
    // const password = req.body.password;

    //* the same
    const { email, password } = req.body;

    // 1) check if email and password exist
    if (!email || !password) {
      // we put 'return' to make sure the funcction finishes after it calling 'next()'
      return next(new AppError("Please provide email and password", "400"));
    }

    // 2) check if user exsits && password is correct

    //* same as below
    // const user = User.findOne({ email });
    // used 'select' because we set it in the schema as false
    const user = await User.findOne({ email: email }).select("+password");

    if (!user || !(await user.correctPassword(password, user.password))) {
      return next(new AppError("Incorrect email or password", "401"));
    }

    // 3) if everthing ok, send token to client
    const token = signToken(user._id);

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function protect(req: Request, res: Response, next: NextFunction) {
  // 1) getting token and checking if it exist
  let token;

  //* there is a standard of sending the token in the header, the key is 'Authorization' and the value starts with 'Bearer' --> 'Bearer adsf3423'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    // use return becuse there is no "else" and we want to cut the proccess so we return the next() from the "protect" controller function and
    // the next takes it to the error handler
    return next(
      new AppError("You are not logged in, please log in to get access", "401")
    );
  }
  try {
    // 2) varifaction of the token to see if it is a valid JWT
    const decoded = (await verify(token, "secret")) as JwtPayload;
    console.log(decoded);

    // 3) check if user still exists
    const freshUser = await User.findById(decoded.id);

    if (!freshUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist",
          "404"
        )
      );
    }
    // 4) check if user changed password after the token was issued
    if (
      decoded.iat !== undefined &&
      (await freshUser.changedPasswordAfter(decoded.iat))
    ) {
      return next(
        new AppError(
          "User recently changed password! Please log in again",
          "401"
        )
      );
    }

    next();
  } catch (error) {}
}
