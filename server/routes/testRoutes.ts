import express from "express";
import {
  createDoc,
  findDoc,
  updateDoc,
  deleteDoc,
  getFlightStats,
  getKitten,
  createKitten,
} from "../controllers/testControllers";

const router = express.Router();

// router.post("/", createDoc);

// // "protect" willl be first
// router.get("/", protect, findDoc);
// router.get("/flight-stats", getFlightStats);
// router.patch("/:id", updateDoc);
// router.delete("/:id", deleteDoc);

router.get("/", getKitten);
router.post("/", createKitten);
export default router;
