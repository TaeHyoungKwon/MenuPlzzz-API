const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const app = express();

app.use(morgan("dev"));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.listen(3000, () => console.log(`Start Server`));

app.get("/", function(req, res, err) {
  res.send("Server Start!!!");
});

app.use("/api", require("./routes/api"));

module.exports = app;
