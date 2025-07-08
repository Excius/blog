import axios from "axios";
import { memo, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../config";

type PostInputs = {
  name?: string | undefined;
  email: string;
  password: string;
};

export const Auth = memo(
  ({ type, onAuth }: { type: "signup" | "signin"; onAuth: () => void }) => {
    const navigate = useNavigate();

    const [postInputs, setPostInputs] = useState<PostInputs>({
      name: "",
      email: "",
      password: "",
    });

    const handleNameChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostInputs((prev) => ({ ...prev, name: e.target.value }));
      },
      [],
    );

    const handleEmailChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostInputs((prev) => ({ ...prev, email: e.target.value }));
      },
      [],
    );

    const handlePasswordChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostInputs((prev) => ({ ...prev, password: e.target.value }));
      },
      [],
    );

    async function sendRequest() {
      try {
        const res = await axios.post(
          `${BACKEND_URL}/auth/${type === "signup" ? "signup" : "signin"}`,
          postInputs,
        );
        const token = res.data.token;
        localStorage.setItem("token", token);
        onAuth();
        navigate("/blogs");
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          const errorMessage =
            error.response.data?.error ||
            error.response.data?.message ||
            "An error occurred";
          alert(errorMessage);
        } else {
          alert("Network error. Please try again.");
        }
        console.error("Error during request:", error);
      }
    }
    return (
      <div className="h-screen flex justify-center flex-col">
        <div className="flex justify-center">
          <div className="w-85">
            <div className="">
              <div className="text-3xl font-extrabold text-center">
                {type === "signin"
                  ? "Sign in to your account"
                  : "Create an account"}
              </div>
              <div className="text-gray-600 text-center">
                {type === "signin"
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <Link
                  className="pl-1 underline"
                  to={type === "signin" ? "/signup" : "/signin"}
                >
                  {type === "signin" ? "Sign Up" : "Sign In"}
                </Link>
              </div>
            </div>
            <div className="flex flex-col pt-4">
              {type === "signup" && (
                <LabelledInput
                  label="Name"
                  placeholder="Enter your name"
                  type="text"
                  onChange={handleNameChange}
                />
              )}
              <LabelledInput
                label="Email"
                placeholder="Enter your email"
                type="email"
                onChange={handleEmailChange}
              />
              <LabelledInput
                label="Password"
                placeholder="Enter your password"
                type="password"
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mt-10 w-full"
                onClick={sendRequest}
              >
                {type === "signup" ? "Sign Up" : "Sign In"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

interface LabelledInputTypes {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const LabelledInput = memo(
  ({ label, placeholder, type, onChange }: LabelledInputTypes) => {
    return (
      <div>
        <label className="block mb-2 mt-4 text-md font-semibold text-black">
          {label}
        </label>
        <input
          type={type}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder={placeholder}
          onChange={onChange}
          required
        />
      </div>
    );
  },
);
