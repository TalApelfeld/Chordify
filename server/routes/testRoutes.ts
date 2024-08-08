import express from "express";
import {
  createDoc,
  findDoc,
  updateDoc,
  deleteDoc,
  getFlightStats,
} from "../controllers/testControllers";
import { protect } from "../controllers/authController";

const router = express.Router();

router.post("/", createDoc);

// "protect" willl be first
router.get("/", protect, findDoc);
router.get("/flight-stats", getFlightStats);
router.patch("/:id", updateDoc);
router.delete("/:id", deleteDoc);

export default router;
