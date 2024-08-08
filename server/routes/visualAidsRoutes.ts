import express from "express";
import { createChord, getChords } from "../controllers/visualAidsControllers";

const router = express.Router();

router.post("/", createChord);
router.get("/", getChords);

export default router;
