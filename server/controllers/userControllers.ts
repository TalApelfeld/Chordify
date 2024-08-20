import { Request, Response, NextFunction } from "express";
import User from "../models/userModel";
import { ISong } from "../models/songsModel";

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const users = await User.find();
  const length = users.length;

  console.log(length);
  // const users = await query;
  res.status(200).json({ message: "success", length, data: { users } });
}

export async function getOneUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // const user = await User.findOne({ _id: req.params.id }).populate<{
    //   songs: ISong;
    // }>("songs");

    // res.status(200).json({ message: "success", data: { user } });

    const user = await User.findOne({ _id: req.params.id }).populate("songs");
    res.status(200).json({ message: "success", data: { user } });
  } catch (error) {
    res.status(404).json({ message: "faild", data: { error } });
  }
}

export async function updateMe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // 1) Create error if user posts password data
    if (req.body.password || req.body.passwordConfirm)
      return next("its not the route for changing password !");

    // 2) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user?.id,
      {
        // need to be careful and watch that only the fields that we want are inputed because someone can input the 'role'
        name: req.body.name,
        email: req.body.email,
      },
      { new: true, runValidators: true }
    );

    res.status(200).json({ status: "success", data: { user: updatedUser } });
  } catch (error) {
    return next(error);
  }
}

export async function deleteMe(
  req: Request,
  res: Response,
  next: NextFunction
) {
  await User.findByIdAndUpdate(req.user?.id, { active: false });

  res.status(204).json({ status: "success", data: null });
}
