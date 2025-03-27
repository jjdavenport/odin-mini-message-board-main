require("dotenv").config();
const { Client } = require("pg");

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
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

module.exports = initDB;
