import express from "express";
import cors from "cors";
import path from "path";
import multer from "multer";
import { fileURLToPath } from "url";
import { dirname } from "path";
import db from "./config/db.config.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const app = express();
const upload = multer();

//defining middleware
app.use(cors());
app.use(upload.any());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "public")));

// importing routes
import routes_v1 from "./routes/index.js";

// defining routes
app.use("/api/v1/", routes_v1);

export default app;
