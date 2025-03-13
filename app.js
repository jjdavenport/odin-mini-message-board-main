require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 3000;

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index", { messages: messages });
});

app.listen(PORT, () => {
  console.log(`listening on http://${HOSTNAME}:${PORT}`);
});
