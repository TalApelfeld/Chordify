"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
// the schema get two arguments:
// 1) object with the propeties
// 2) object with options
const flightSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "please provide name!"],
        MaxLength: [10, "Name need to be under 10 char"],
        //* custom validator
        //
        validate: {
            validator: function (val) {
                if (val === "tal") {
                    return false;
                }
            },
            message: "Cant make flight with this name : ({VALUE})",
        },
    },
    price: {
        type: Number,
        required: [true, "Price need to be provided !"],
    },
    distance: {
        type: Number,
        required: [true, "distance need to be provided !"],
    },
    rating: {
        type: Number,
        required: [true, "rating need to be provided !"],
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        // does not send this property back in the query by default, used when you dont want sensitive data to be sent back on the api
        select: false,
    },
    testMiddleware: {
        type: String,
    },
    secerteFlight: {
        type: Boolean,
        default: false,
    },
}, 
// this the second argument(object with options), with this options the virtual properties gets sent back when requesting the api
{ toJSON: { virtuals: true }, toObject: { virtuals: true } });
//* We use virtual properties when we want property in the doc but we dont want to store it in the DB, like storing price in shekel or dollar,
//* we can convert from one to another so we dont need to store the two together, we can store one and convert to the other
// the properties gets sent each time there is a get request
flightSchema.virtual("priceToDollars").get(function () {
    return this.price / 3.4;
});
//*  Middleware 4 types: 'Document', 'query', 'aggregate', 'model'
//* DOCUMENT middleware: runs before .save() and .create()
//* 'save' , find' also called hooks
flightSchema.pre("save", function (next) {
    this.name = "test from pre middleware";
    next();
});
flightSchema.post("save", function (next) {
    this.testMiddleware = "test from post middleware";
});
//* QUERY middleware
// flightSchema.pre("find", function (next) {
//   this.find({ secerteFlight: { $eq: true } });
//   next();
// });
//* AGGREGATION middleware
flightSchema.pre("aggregate", function (next) {
    this.pipeline().unshift({ $match: { secerteFlight: { $ne: true } } });
    next();
});
const flight = mongoose_1.default.model("Flight", flightSchema);
exports.default = flight;
