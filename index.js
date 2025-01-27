import { Elysia } from "elysia";

const app = new Elysia();

// Home route
app.get("/", () => ({ message: "Welcome to Bun API with Elysia!" }));

// In-memory users database
const users = new Map();

// Get all users
app.get("/users", () => Array.from(users.values()));

// Get a user by ID
app.get("/users/:id", ({ params }) => {
  const user = users.get(Number(params.id));
  return user ? user : { error: "User not found" };
});

// Create a user
app.post("/users", ({ body }) => {
  if (!body || !body.name) return { error: "Name is required" };

  const id = users.size + 1;
  const user = { id, name: body.name };
  users.set(id, user);
  return user;
});

// Update a user
app.put("/users/:id", ({ params, body }) => {
  const id = Number(params.id);
  if (!users.has(id)) return { error: "User not found" };
  if (!body || !body.name) return { error: "Name is required" };

  const updatedUser = { id, name: body.name };
  users.set(id, updatedUser);
  return updatedUser;
});

// Delete a user
app.delete("/users/:id", ({ params }) => {
  const id = Number(params.id);
  if (!users.has(id)) return { error: "User not found" };

  users.delete(id);
  return { message: "User deleted successfully" };
});

// Start server
app.listen(3000, () => {
  console.log("🚀 Server is running on http://localhost:3000");
});

