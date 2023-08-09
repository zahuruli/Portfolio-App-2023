import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import PortfolioRouter from "./routes/portfolioRoute.js";

//esmodulefix:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//dotenv config:
dotenv.config();

//rest object:
const app = express();

//middlewear:
app.use(cors());
app.use(express.json());

//static path:
app.use(express.static(path.join(__dirname, "./client/dist")));

//app use:
app.use("/api/v1/portfolio", PortfolioRouter);

// routes:
app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist/index.html"));
});

//port:
const PORT = process.env.PORT || 8080;
const hostName = "127.0.0.1";

//listen:
app.listen(PORT, () => {
  console.log(`Server is running on http://${hostName}:${PORT}`);
});
