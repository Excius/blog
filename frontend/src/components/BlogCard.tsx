import { memo } from "react";
import { Link } from "react-router-dom";

interface BlogCardProps {
  blogId: string;
  authorName: string;
  title: string;
  content: string;
  publishedDate: string;
}

export const BlogCard = memo(
  ({ blogId, authorName, title, content, publishedDate }: BlogCardProps) => {
    return (
      <Link to={`/blog/${blogId}`}>
        <div className="border-b border-slate-200 p-4 w-screen max-w-screen-lg cursor-pointer">
          <div className="flex">
            <div className="flex items-center">
              <Avatar authorName={authorName} size={"small"} />
            </div>
            <div className="font-extralight pl-2 text-md flex items-center">
              {authorName}
            </div>
            <div className="flex items-center pl-2">
              <Circle />
            </div>
            <div className="pl-2 font-thin text-slate-500 text-md flex items-center">
              {publishedDate}
            </div>
          </div>
          <div className="text-xl font-semibold pt-2">{title}</div>
          <div className="text-md font-thin">
            {content.slice(0, 100) + "..."}
          </div>
          <div className="text-sm text-slate-500 font-thin pt-3">
            {`${Math.ceil(content.length / 100)} minute(s) read`}
          </div>
        </div>
      </Link>
    );
  }
);

export const Avatar = memo(
  ({ authorName, size }: { authorName: string; size: string }) => {
    return (
      <div
        className={`relative inline-flex items-center justify-center overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}
      >
        <span
          className={`${
            size === "small" ? "text-sm w-6 h-6" : "text-xl w-9 h-9"
          } text-gray-600 dark:text-gray-300 flex justify-center items-center font-semibold`}
        >
          {authorName[0].toUpperCase()}
        </span>
      </div>
    );
  }
);

function Circle() {
  return <div className="h-1 w-1 rounded-full bg-slate-500"></div>;
}
