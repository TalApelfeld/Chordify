import mongoose, { Schema, Document } from "mongoose";
import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import validator from "validator";

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  photo?: string;
  passwordChangedAt: Date;
  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;
  changedPasswordAfter(JWTtimestamp: number): Promise<boolean>;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: [true, "Name needs to be provided !"],
  },

  email: {
    type: String,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid Email "],
  },

  password: {
    type: String,
    required: [true, "Password need to be provided !"],
    minlength: 7,
    // wont show the password in the output, in the 'res', only on creation, but on 'find' ,'findOne' etc... it wont show
    select: false,
  },

  passwordConfirm: {
    type: String,
    required: [true, "Password confirmation need to be provided !"],
    validate: {
      //* this only work on 'create()' and 'save()' !!!

      validator: function (this: IUser, el: string) {
        return el === this.password; // Now `this` is explicitly an IUser
      },
      message: "Passwords are not the same",
    },
  },

  photo: { type: String },

  passwordChangedAt: Date,
});

// happen between getting the data and right before storing it in the Database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = "";
  next();
});

//* instance method
// a method that is available on all docs of a certain collection
// in other words its creating a function to be available on the model later
userSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//* check if user changed his password
userSchema.methods.changedPasswordAfter = async function (
  JWTtimestamp: number
) {
  if (this.passwordChangedAt) {
    const changedTimeStamp = this.passwordChangedAt.getTime() / 1000;

    console.log(changedTimeStamp, JWTtimestamp);

    return JWTtimestamp < changedTimeStamp;
  }
};

const User = mongoose.model<IUser>("User", userSchema);

export default User;
