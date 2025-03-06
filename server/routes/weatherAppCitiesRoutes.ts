import express from "express";

import { getCities } from "../controllers/weatherAppController";

const cityRouter = express.Router();

cityRouter.get("/", getCities);

export default cityRouter;
