import express from "express";
import Config from "./Config.js";
import Api from "./routes/api/Api.js";

const app = express();

app.use("/content", express.static(`${__dirname}/content`));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.use("/api/", Api());

const port = Config.ServerPort() || 5000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}!`);
});
