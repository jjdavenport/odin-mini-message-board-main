require("dotenv").config();
const { Client } = require("pg");
const HOSTNAME = process.env.DB_HOSTNAME;
const USER = process.env.USER;
const DATABASE = process.env.DATABASE;
const PASSWORD = process.env.PASSWORD;
const PORT = process.env.DB_PORT;

const messages = [
  { text: "Hi there!", user: "Amando", added: new Date() },
  { text: "Hello World!", user: "Charles", added: new Date() },
];

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(255) NOT NULL,
  "user" VARCHAR(255) NOT NULL,
  added TIMESTAMP NOT NULL
);

${messages
  .map(
    (msg) => `
INSERT INTO messages (text, "user", added) 
VALUES ('${msg.text}', '${msg.user}', '${msg.added.toISOString()}');
`
  )
  .join("\n")}
`;

async function initDB() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${USER}:${PASSWORD}@${HOSTNAME}:${PORT}/${DATABASE}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

module.exports = initDB;
