import { Hono } from "hono";
import authMiddleware from "../middlewares/auth";
import { PrismaClient } from "../../generated/prisma/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import zod from "zod";

const postSchema = zod.object({
  title: zod.string().min(3),
  content: zod.string().min(10),
});

const blog = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
  Variables: {
    userId: string;
  };
}>();

blog.use("/*", authMiddleware);

blog.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const parsedBody = postSchema.safeParse(body);
    if (!parsedBody.success) {
      return c.json(
        {
          error: "Validation failed",
          message: parsedBody.error.message,
        },
        400
      );
    }

    const blog = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        authorId: c.get("userId"),
      },
    });

    if (!blog) {
      return c.json(
        {
          error: "Post post creation failed",
        },
        400
      );
    }

    return c.json({ message: "Post created successfully", id: blog.id }, 201);
  } catch (error) {
    console.error("Error creating post:", error);
    return c.json(
      {
        error: "Failed to create post",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

blog.put("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const parsedBody = postSchema.safeParse(body);
    if (!parsedBody.success) {
      return c.json(
        {
          error: "Validation failed",
          message: parsedBody.error.message,
        },
        400
      );
    }

    const post = await prisma.post.update({
      where: { id: body.id },
      data: { title: body.title, content: body.content },
    });

    if (!post) {
      return c.json(
        {
          error: "Post update failed",
        },
        400
      );
    }

    return c.json({ message: "Post updated successfully", id: post.id }, 200);
  } catch (error) {
    console.error("Error updating post:", error);
    return c.json(
      {
        error: "Failed to update post",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

blog.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const posts = await prisma.post.findMany({
      select: {
        content: true,
        title: true,
        id: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    return c.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return c.json(
      {
        error: "Failed to fetch posts",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

blog.get("/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");
    if (!id) {
      return c.json(
        {
          error: "Post ID is required",
        },
        400
      );
    }

    const post = await prisma.post.findUnique({
      where: { id },
      select: {
        id: true,
        title: true,
        content: true,
        author: {
          select: {
            name: true,
          },
        },
      },
    });

    if (!post) {
      return c.json(
        {
          error: "Post not found",
        },
        404
      );
    }

    return c.json(post, 200);
  } catch (error) {
    console.error("Error fetching post:", error);
    return c.json(
      {
        error: "Failed to fetch post",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      500
    );
  }
});

export default blog;
