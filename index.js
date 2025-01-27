import { Elysia } from "elysia";

const app = new Elysia();

app.get("/", () => ({ message: "Welcome to Bun API with Elysia!" }));

const users = new Map();

app.get("/users", () => Array.from(users.values()));

app.get("/users/:id", ({ params }) => {
  const user = users.get(Number(params.id));
  return user ? user : { error: "User not found" };
});

app.post("/users", ({ body }) => {
  if (!body || !body.name) return { error: "Name is required" };

  const id = users.size + 1;
  const user = { id, name: body.name };
  users.set(id, user);
  return user;
});

app.put("/users/:id", ({ params, body }) => {
  const id = Number(params.id);
  if (!users.has(id)) return { error: "User not found" };
  if (!body || !body.name) return { error: "Name is required" };

  const updatedUser = { id, name: body.name };
  users.set(id, updatedUser);
  return updatedUser;
});

app.delete("/users/:id", ({ params }) => {
  const id = Number(params.id);
  if (!users.has(id)) return { error: "User not found" };

  users.delete(id);
  return { message: "User deleted successfully" };
});

const PORT = process.env.PORT ?? 8080;
// Start server
app.listen(PORT, () => {
  console.log("🚀 Server is running");
});

