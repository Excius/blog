import { verify } from "hono/jwt";
import { Context, Next } from "hono";

const authMiddleware = async (c: Context, next: Next) => {
  try {
    const token = c.req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return c.json(
        {
          message: "Authorization token is required",
        },
        401
      );
    }

    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload) {
      return c.json(
        {
          error: "Invalid or expired token",
        },
        401
      );
    }

    c.set("userId", payload.userId as string);
    return await next();
  } catch (err) {
    console.error("JWT verification error:", err);
    return c.json(
      {
        error: "Invalid or expired token",
      },
      401
    );
  }
};
export default authMiddleware;
