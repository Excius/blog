import { Hono } from "hono";
import { sign } from "hono/jwt";
import bcrypt from "bcryptjs";
import zod from "zod";
import { withAccelerate } from "@prisma/extension-accelerate";
import { PrismaClient } from "../../generated/prisma/edge";

const signupSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
  name: zod.string().min(3).optional(),
});

const signinSchema = zod.object({
  email: zod.string().email(),
  password: zod.string().min(8),
});

const auth = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

auth.post("/signup", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsedBody = signupSchema.safeParse(body);
    if (!parsedBody.success) {
      return c.json(
        {
          error: "Validation failed",
          message: parsedBody.error.message,
        },
        400
      );
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: hashedPassword,
        name: body.name,
      },
    });

    if (!user) {
      return c.json(
        {
          error: "User creation failed",
        },
        400
      );
    }

    const token = await sign(
      { userId: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6 },
      c.env.JWT_SECRET
    );

    return c.json(
      {
        message: "User created successfully",
        token: token,
      },
      200
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json(
      {
        error: "Failed to create user",
      },
      500
    );
  }
});

auth.post("/signin", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsedBody = signinSchema.safeParse(body);
    if (!parsedBody.success) {
      return c.json(
        {
          error: "Validation failed",
          message: parsedBody.error.message,
        },
        400
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: body.email,
      },
    });

    if (!user || !(await bcrypt.compare(body.password, user.password))) {
      return c.json(
        {
          error: "Invalid email or password",
        },
        401
      );
    }
    const token = await sign(
      { userId: user.id, exp: Math.floor(Date.now() / 1000) + 60 * 60 * 6 },
      c.env.JWT_SECRET
    );

    return c.json({
      message: "User signed in successfully",
      token: token,
    });
  } catch (error) {
    console.error("Error signing in:", error);
    return c.json(
      {
        error: "Failed to sign in",
      },
      500
    );
  }
});

export default auth;
