import { memo } from "react";
import { useBlog } from "../hooks";
import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { Skeleton } from "../components/Skeleton";

const Blog = memo(() => {
  const { id } = useParams();
  const { loading, blog } = useBlog(id || "");

  if (loading) {
    return <Skeleton />;
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
});
export default Blog;
