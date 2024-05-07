import express from "express";
import cors from "cors";
import homeRoutes from "./routes/homeRoutes";
import searchRoutes from "./routes/searchRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/home", homeRoutes);
app.use("/search", searchRoutes);

export default app;
