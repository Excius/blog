import { Hono } from "hono";
import auth from "./routes/auth";
import blog from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<{
  Bindings: {
    JWT_SECRET: string;
  };
}>();

// // Global error handler
//   app.onError((err, c) => {
//   console.error("Global error:", err);

//   // Check if it's a validation error or known error type
//   if (err.message.includes("validation")) {
//     return c.json(
//       {
//         error: "Validation failed",
//         message: err.message,
//       },
//       400
//     );
//   }

//   // Database connection errors
//   if (err.message.includes("database") || err.message.includes("prisma")) {
//     return c.json(
//       {
//         error: "Database error",
//         message: "Unable to connect to database",
//       },
//       503
//     );
//   }

//   // Default server error
//   return c.json(
//     {
//       error: "Internal Server Error",
//       message: "Something went wrong",
//     },
//     500
//   );
// });
app.use("/*", cors());

app.get("/", (c) => {
  return c.text("Welcome to the API!");
});

app.route("/api/v1/auth", auth);
app.route("/api/v1/blog", blog);

app.all("*", (c) => {
  return c.json(
    {
      error: "Not Found",
    },
    404
  );
});

export default app;
