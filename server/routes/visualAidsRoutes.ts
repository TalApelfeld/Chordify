import express from "express";
import { getChords } from "../controllers/visualAidsControllers";

const router = express.Router();

// router.post("/", createChord);
router.get("/", getChords);

export default router;
