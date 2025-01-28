const express = require("express");
const cors = require("cors");
import http from "http";

const app = express();

// Enable CORS for any client
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// In-memory user storage
const users = new Map();

// Home route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express API!" });
});

// Get all users
app.get("/users", (req, res) => {
  res.json(Array.from(users.values()));
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const user = users.get(Number(req.params.id));
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: "User not found" });
  }
});

// Create a new user
app.post("/users", (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const id = users.size + 1;
  const newUser = { id, name };
  users.set(id, newUser);
  res.status(201).json(newUser);
});

// Update a user
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!users.has(id)) {
    return res.status(404).json({ error: "User not found" });
  }
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }
  const updatedUser = { id, name };
  users.set(id, updatedUser);
  res.json(updatedUser);
});

// Delete a user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  if (!users.has(id)) {
    return res.status(404).json({ error: "User not found" });
  }
  users.delete(id);
  res.json({ message: "User deleted successfully" });
});

const server = http.createServer(app);
const PORT = process.env.PORT || 3003;
server.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});
