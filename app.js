const express = require("express");
const mysql = require("mysql");
const dotenv = require("dotenv");
const tasks = require("./routes/tasks");

const app = express();
dotenv.config();

//mysql concection
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

// Middleware
app.use(express.json());

// Routes
app.get("/hello", (req, res) => {
  res.send("Task Manager App");
});

app.use("/api/v1/tasks", tasks);

const port = 8000;
app.listen(port, () => {
  connection.connect((error) => {
    if (error) throw error;
    console.log(`connected to MySQL Database:${process.env.DB_NAME}`);
  });
  console.log(`Server is listening on port:${port}`);
});
