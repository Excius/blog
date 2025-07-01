import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/BlogCard";
import { Skeleton } from "../components/Skeleton";
import { useBlogs } from "../hooks";

const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return (
      <div>
        <Skeleton />;
        <Skeleton />;
        <Skeleton />;
        <Skeleton />;
      </div>
    );
  }

  return (
    <div>
      <Appbar />
      <div className="flex flex-col items-center">
        {blogs.map((blog) => {
          return (
            <BlogCard
              key={blog.id}
              blogId={blog.id}
              title={blog.title}
              content={blog.content}
              authorName={blog.author.name}
              publishedDate="21 Nov 2024"
            />
          );
        })}
      </div>
    </div>
  );
};
export default Blogs;
