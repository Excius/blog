import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export const useBlog = (id: string) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<Blog>({
    id: "",
    title: "",
    content: "",
    author: { name: "" },
  });

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/blog/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching blog:", error);
        setLoading(false);
        navigate("/blogs");
      });
  }, [id, navigate]);

  return { loading, blog };
};

export const useBlogs = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/blog/bulk`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setBlogs(response.data);
        setLoading(false);
      });
  }, []);

  return { loading, blogs };
};
