const express = require("express");
const router = express.Router();
const { getAllMessages, insertMessage } = require("../database/queries");

router.get("/", async (req, res) => {
  try {
    const messages = await getAllMessages();
    res.render("index", { messages });
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).send("Error fetching messages");
  }
});

router.get("/new", (req, res) => {
  res.render("form");
});

router.post("/new", (req, res) => {
  const { message, user } = req.body;
  insertMessage(message, user);
  res.redirect("/");
});

module.exports = router;
