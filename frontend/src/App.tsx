import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import "./App.css";
import axios from "axios";
import { BACKEND_URL } from "./config";

const Signup = React.lazy(() => import("./pages/Signup"));
const Signin = React.lazy(() => import("./pages/Signin"));
const Blogs = React.lazy(() => import("./pages/Blogs"));
const Blog = React.lazy(() => import("./pages/Blog"));
const Publish = React.lazy(() => import("./pages/Publish"));

function ProtectedRoute({
  authenticated,
  children,
}: {
  authenticated: boolean;
  children: React.ReactNode;
}) {
  if (!authenticated) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

function App() {
  const [loading, setLoading] = React.useState(true);
  const [authenticated, setAuthenticated] = React.useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get(`${BACKEND_URL}/auth/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          if (response.data.valid) {
            setAuthenticated(true);
            console.log("Token is valid, user authenticated.");
          } else {
            localStorage.removeItem("token");
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error verifying token:", error);
          localStorage.removeItem("token");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <BrowserRouter>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path="/"
              element={
                authenticated ? (
                  <Navigate to={"/blogs"} replace />
                ) : (
                  <Navigate to={"/signin"} replace />
                )
              }
            />
            <Route
              path="/signup"
              element={<Signup onAuth={() => setAuthenticated(true)} />}
            />
            <Route
              path="/signin"
              element={<Signin onAuth={() => setAuthenticated(true)} />}
            />
            <Route
              path="/blogs"
              element={
                <ProtectedRoute authenticated={authenticated}>
                  <Blogs />
                </ProtectedRoute>
              }
            />
            <Route
              path="/publish"
              element={
                <ProtectedRoute authenticated={authenticated}>
                  <Publish />
                </ProtectedRoute>
              }
            />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="*" element={<h2>Page not found</h2>} />
          </Routes>
        </React.Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
