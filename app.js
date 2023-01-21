const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const dbPath = path.join(__dirname, "todoApplication.db");
const app = express();
app.use(express.json());

let db = null;

const intializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("Server Running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

intializeDbAndServer();

app.get("/todos/", async (request, response) => {
  const { status } = request.query;
  console.log(status);
  const getQuery = `SELECT
                    *
                FROM
                    todo
                WHERE
                    status = '${status}';`;
  const dbResponse = await db.all(getQuery);
  response.send(dbResponse);
});

app.get("/todos/", async (request, response) => {
  const { priority } = request.query;
  console.log(priority);
  const getQuery = `SELECT
                    *
                FROM
                    todo
                WHERE
                    priority = '${priority}';`;
  const dbResponse = await db.get(getQuery);
  response.send(dbResponse);
});
