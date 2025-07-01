import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import "./App.css";

const Signup = React.lazy(() => import("./pages/Signup"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Blogs = React.lazy(() => import("./pages/Blogs"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Publish = React.lazy(() => import("./pages/Publish"));

function App() {
  return (
    <div>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/publish" element={<Publish />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="*" element={<h2>Page not found</h2>} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
