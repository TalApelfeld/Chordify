import express from "express";
import testNode from "../controllers/homeControllers";

const router = express.Router();

router.post("/learningplan", testNode);

export default router;
