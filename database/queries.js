const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(text, user) {
  await pool.query(
    `INSERT INTO messages (text, "user", added) VALUES ($1, $2, NOW())`,
    [text, user]
  );
}

module.exports = {
  getAllMessages,
  insertMessage,
};
