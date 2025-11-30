import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes";
import { AppDataSource } from "./data-source";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", router);

const PORT = +(process.env.PORT || 3000);

AppDataSource.initialize().then(() => {
  console.log("Data Source initialized");
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}).catch(err => {
  console.error("Error during Data Source initialization:", err);
});
