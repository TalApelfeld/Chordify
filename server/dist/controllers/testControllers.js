"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createDoc = createDoc;
exports.findDoc = findDoc;
exports.updateDoc = updateDoc;
exports.deleteDoc = deleteDoc;
exports.getFlightStats = getFlightStats;
const Flights_1 = __importDefault(require("../models/Flights"));
function createDoc(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const data = yield Flights_1.default.create(req.body);
            res.json(data);
        }
        catch (error) {
            // res.json(error);
            next(error);
        }
    });
}
function findDoc(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            //* Filtering
            const queryObj = Object.assign({}, req.query);
            const excludedFields = ["page", "sort", " limit", "fields"];
            excludedFields.forEach((el) => delete queryObj[el]);
            //* Advanced filtering
            let quryStr = JSON.stringify(queryObj);
            // it gets the 'gte' 'lt' but missing the $ sign in the query so we need to put it there, because thats how you query mongo
            quryStr = quryStr.replace(/\bgte|gt|lte|lt\b/g, (match) => `$${match}`);
            console.log(req.query, queryObj);
            let query = Flights_1.default.find();
            //* Sorting
            const sortQuery = req.query.sort;
            if (sortQuery) {
                query = query.sort(sortQuery);
            }
            //* Fields, when you want just some of the data in the doc, used to reduce the bandwith of the data transfers when its large.
            let fields = req.query.fields;
            console.log(req.query.fields);
            if (fields) {
                fields = fields.split(",").join(" ");
                console.log(fields);
                query = query.select(fields);
            }
            //* Pagination
            const pageParam = req.query.page;
            const limitParam = req.query.limit;
            const page1 = typeof pageParam === "string" ? parseInt(pageParam, 10) : 1; // Default to page 1 if conversion fails or not a string
            const limit1 = typeof limitParam === "string" ? parseInt(limitParam, 10) : 1; // Default to page 1 if conversion fails or not a string
            const page = page1 * 1 || 1;
            const limit = limit1 * 1 || 100;
            const skip = (page - 1) * limit;
            // if (pageParam) {
            //   const numOfFlights = await flight.countDocuments();
            //   if (skip >= numOfFlights) throw new Error("This page does not exist");
            // } else {
            //   query = query.skip(skip).limit(limit);
            // }
            const data = yield query;
            res.status(200).json({ items: data.length, data });
            //
        }
        catch (error) {
            // res.json(error);
            next(error);
        }
    });
}
function updateDoc(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield Flights_1.default.findByIdAndUpdate(req.params.id, req.body, {
                new: true,
                // need to be set to 'true' or it wont check for validators
                runValidators: true,
            });
            res.status(200).json({ status: "success", data: { data } });
        }
        catch (error) {
            // res.status(404).json({ status: "fail", message: error });
            next(error);
        }
    });
}
function deleteDoc(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield Flights_1.default.findByIdAndDelete(req.params.id);
            res.status(200).json({ status: "success", data: { data } });
        }
        catch (error) {
            // res.status(404).json({ status: "fail", message: error });
            next(error);
        }
    });
}
//* Aggregation
function getFlightStats(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const stats = yield Flights_1.default.aggregate([
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
        }
        catch (error) { }
    });
}
