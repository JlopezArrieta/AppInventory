import express from "express";
import morgan from "morgan";
import cors from "cors";
import connectionDB from "./database/database";
import routes from "./routes/routes";

const app = express();

//middleswares
app.use(morgan("dev"));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//conexion
connectionDB().then(() => console.log("Conexion Ready"));

//routes
app.use('/api', routes)

export default app;

