require("dotenv").config();
const { Client } = require("pg");
const HOSTNAME = process.env.DATABASE_URL;
const USER = process.env.PGUSER;
const DATABASE = process.env.PGDATABASE;
const PASSWORD = process.env.POSTGRES_PASSWORD;
const PORT = process.env.PGPORT;

const messages = [
  { text: "Hi there!", user: "Amando", added: new Date() },
  { text: "Hello World!", user: "Charles", added: new Date() },
];

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message VARCHAR(255) NOT NULL,
  "user" VARCHAR(255) NOT NULL,
  added TIMESTAMP NOT NULL
);

${messages
  .map(
    (msg) => `
INSERT INTO messages (message, "user", added) 
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
