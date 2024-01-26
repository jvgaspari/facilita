import express from "express";
const app = express();
import bodyParser from "body-parser";
import dotenv from "dotenv";
import router from "./routes";
import cors from "cors";

dotenv.config();

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("Node.js listening... " + port);
});
app.use("/", router());
