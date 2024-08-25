import express from "express";
import { createChord, getChords } from "../controllers/visualAidsControllers";
import { protect } from "../controllers/authController";

const router = express.Router();

// router.post("/", createChord);
router.get("/", getChords);

export default router;
