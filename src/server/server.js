const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const app = express();
const port = 3000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "bingo",
});

connection.connect();

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const query = "SELECT * FROM users WHERE username = ?";

  connection.query(query, [username], (error, results) => {
    if (error) {
      console.error("Error during login:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    } else {
      if (results.length > 0) {
        const user = results[0];

        const hashedPassword = crypto
          .createHash("sha256")
          .update(password)
          .digest("hex");

        if (hashedPassword === user.password) {
          const token = jwt.sign(
            { username: user.username },
            "your-secret-key",
            { expiresIn: "1h" }
          );
          res.json({ success: true, message: "Login successful", token });
          console.log("Login successful for " + username);
        } else {
          res.json({ success: false, message: "Invalid credentials" });
        }
      } else {
        res.json({ success: false, message: "Invalid credentials" });
      }
    }
  });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = crypto
    .createHash("sha256")
    .update(password)
    .digest("hex");

  const query = "INSERT INTO users (username, password) VALUES (?, ?)";
  connection.query(query, [username, hashedPassword], (error, results) => {
    if (error) {
      console.error("Error during registration:", error);
      res
        .status(500)
        .json({ success: false, message: "Internal server error" });
    } else {
      res.json({ success: true, message: "Registration successful" });
      console.log("Registration successful for " + username);
    }
  });
});

// Logout endpoint (just an example)
app.post("/logout", (req, res) => {
  // You might want to perform additional actions during logout
  res.json({ success: true, message: "Logout successful" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
