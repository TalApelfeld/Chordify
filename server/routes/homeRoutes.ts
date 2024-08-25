import express from "express";
import testNode from "../controllers/homeControllers";
import { protect } from "../controllers/authController";

const router = express.Router();

router.post("/learningplan", testNode);

export default router;
