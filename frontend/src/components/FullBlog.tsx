import { memo } from "react";
import { Appbar } from "./Appbar";
import type { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const FullBlog = memo(({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-screen pt-12 max-w-screen-2xl">
          <div className="col-span-8">
            <div className="text-5xl font-extrabold ">{blog.title}</div>
            <div className="text-slate-500 pt-2">
              Post on 21nd November 2024
            </div>
            <div className="pt-4">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex">
              <div className="pr-4 flex items-center">
                <Avatar authorName={blog.author.name} size="big" />
              </div>
              <div>
                <div className="text-xl font-bold">
                  {blog.author.name || "Anon"}
                </div>
                <div className="pt-2 text-slate-500">
                  Random Catch phrase about the author's ability to grab the
                  user's attention
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});
