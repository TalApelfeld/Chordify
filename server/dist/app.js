"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const appError_1 = __importDefault(require("./utils/appError"));
const errorController_1 = require("./controllers/errorController");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const homeRoutes_1 = __importDefault(require("./routes/homeRoutes"));
const visualAidsRoutes_1 = __importDefault(require("./routes/visualAidsRoutes"));
const searchRoutes_1 = __importDefault(require("./routes/searchRoutes"));
const songsRoutes_1 = __importDefault(require("./routes/songsRoutes"));
const weatherAppCitiesRoutes_1 = __importDefault(require("./routes/weatherAppCitiesRoutes"));
const quizRoutes_1 = require("./routes/quizRoutes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "https://chordify.onrender.com",
        "http://localhost:5173",
        "http://10.0.0.2:5173",
        "https://whether-app-fxu2.onrender.com",
    ],
    credentials: true,
}));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use("/songs", songsRoutes_1.default);
app.use("/quiz", quizRoutes_1.quizRouter);
app.use("/users", userRoutes_1.default);
app.use("/home", homeRoutes_1.default);
app.use("/visualaids", visualAidsRoutes_1.default);
app.use("/search", searchRoutes_1.default);
app.use("/cities", weatherAppCitiesRoutes_1.default);
//* handle all UNhandeld routes
// need to be last because as we know the middleware goes line by line so the first route that matches the url entered and if it was first
// then all the routes would led to this error
app.all("*", (req, res, next) => {
    // res.status(404).json({
    //   status: "fail",
    //   message: `Can't find ${req.originalUrl} on this server!`,
    // });
    // when we pass an argument to the 'next' function express automaticlally knows it is error so in the error middleware it will be 'err'
    next(new appError_1.default(`Can't find ${req.originalUrl} on this server!22222222222222`, "404"));
});
// express comes built-in with middleware handlers and it knows its a middleware of error handling because of the 4 parameters,
// the 'err' parameter is the argument passed in the 'next()' function
app.use(errorController_1.globalErrorHndler);
exports.default = app;
