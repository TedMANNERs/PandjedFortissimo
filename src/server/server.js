const express = require("express");
const app = express();

app.use("/content", express.static(`${__dirname}/content`));

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/views/index.html`);
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000!");
});
