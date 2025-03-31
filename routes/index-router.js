const express = require("express");
const router = express.Router();
const {
  getAllMessages,
  insertMessage,
  getMessageById,
  searchMessages,
} = require("../database/queries");

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

router.get("/search", async (req, res) => {
  try {
    const { input } = req.query;
    if (!input) return res.redirect("/");
    const search = await searchMessages(input);
    res.render("search", { search });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).send("Search failed");
  }
});

router.get("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await getMessageById(id);
    res.render("message", { message });
  } catch (error) {
    console.log("error", error);
    res.status(500).send("error");
  }
});

router.post("/new", (req, res) => {
  const { message, user } = req.body;
  insertMessage(message, user);
  res.redirect("/");
});

module.exports = router;
