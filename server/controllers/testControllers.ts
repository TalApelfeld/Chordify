import { Request, Response, NextFunction } from "express";
import flight from "../models/Flights";

export async function createDoc(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    const data = await flight.create(req.body);
    res.json(data);
  } catch (error) {
    // res.json(error);
    next(error);
  }
}

export async function findDoc(req: Request, res: Response, next: NextFunction) {
  try {
    //* Filtering
    const queryObj = { ...req.query };
    const excludedFields = ["page", "sort", " limit", "fields"];
    excludedFields.forEach((el) => delete queryObj[el]);

    //* Advanced filtering
    let quryStr = JSON.stringify(queryObj);
    // it gets the 'gte' 'lt' but missing the $ sign in the query so we need to put it there, because thats how you query mongo
    quryStr = quryStr.replace(/\bgte|gt|lte|lt\b/g, (match) => `$${match}`);

    console.log(req.query, queryObj);

    let query = flight.find();

    //* Sorting
    const sortQuery: string = req.query.sort as string;
    if (sortQuery) {
      query = query.sort(sortQuery);
    }

    //* Fields, when you want just some of the data in the doc, used to reduce the bandwith of the data transfers when its large.
    let fields: string = req.query.fields as string;
    console.log(req.query.fields);

    if (fields) {
      fields = fields.split(",").join(" ");
      console.log(fields);
      query = query.select(fields);
    }

    //* Pagination
    const pageParam = req.query.page;
    const limitParam = req.query.limit;

    const page1: number =
      typeof pageParam === "string" ? parseInt(pageParam, 10) : 1; // Default to page 1 if conversion fails or not a string

    const limit1: number =
      typeof limitParam === "string" ? parseInt(limitParam, 10) : 1; // Default to page 1 if conversion fails or not a string

    const page = page1 * 1 || 1;
    const limit = limit1 * 1 || 100;
    const skip = (page - 1) * limit;

    // if (pageParam) {
    //   const numOfFlights = await flight.countDocuments();
    //   if (skip >= numOfFlights) throw new Error("This page does not exist");
    // } else {
    //   query = query.skip(skip).limit(limit);
    // }

    const data = await query;
    res.status(200).json({ items: data.length, data });
    //
  } catch (error) {
    // res.json(error);
    next(error);
  }
}

export async function updateDoc(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await flight.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      // need to be set to 'true' or it wont check for validators
      runValidators: true,
    });

    res.status(200).json({ status: "success", data: { data } });
  } catch (error) {
    // res.status(404).json({ status: "fail", message: error });
    next(error);
  }
}

export async function deleteDoc(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await flight.findByIdAndDelete(req.params.id);

    res.status(200).json({ status: "success", data: { data } });
  } catch (error) {
    // res.status(404).json({ status: "fail", message: error });
    next(error);
  }
}

//* Aggregation
export async function getFlightStats(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const stats = await flight.aggregate([
      { $match: { price: { $gte: 600 } } },
      // need to grou by, so we chose the id and if it null it will take all the docs
      {
        $group: {
          _id: "$price",
          avaragePrice: { $avg: "$price" },
          minPrice: { $min: "$price" },
          maxPrice: { $max: "$price" },
        },
      },
    ]);
    res.status(200).json(stats);
  } catch (error) {}
}
