const pool = require("./pool");

async function getAllMessages() {
  const { rows } = await pool.query("SELECT * FROM messages");
  return rows;
}

async function insertMessage(message, user) {
  await pool.query(
    `INSERT INTO messages (message, "user", added) VALUES ($1, $2, NOW())`,
    [message, user]
  );
}

module.exports = {
  getAllMessages,
  insertMessage,
};
