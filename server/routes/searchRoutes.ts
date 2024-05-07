import express from "express";
import searchTest from "../controllers/searchControllers";

const router = express.Router();

router.get("/", searchTest);
export default router;
