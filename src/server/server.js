import express from "express";
import bodyParser from "body-parser";
import Config from "./Config.js";
import ApiRoute from "./routes/api/ApiRoute.js";

const app = express();

app.use(bodyParser.json());
app.use("/content", express.static(`${__dirname}/content`));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/search", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.get("/upload", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use("/api/", ApiRoute());

const port = Config.ServerPort() || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
