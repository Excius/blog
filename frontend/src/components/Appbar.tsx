import { memo } from "react";
import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

export const Appbar = memo(() => {
  return (
    <div className="flex justify-between items-center border-b px-10 py-4">
      <Link to="/blogs" className="font-bold text-2xl cursor-pointer">
        Medium
      </Link>
      <div className="flex items-center">
        <Link to="/publish">
          <button
            type="button"
            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-semibold rounded-full text-sm px-5 py-2 text-center "
          >
            New
          </button>
        </Link>

        <Avatar authorName="Excius" size={"big"} />
      </div>
    </div>
  );
});
