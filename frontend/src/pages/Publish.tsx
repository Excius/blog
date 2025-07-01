import { memo, useCallback, useState } from "react";
import { Appbar } from "../components/Appbar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

const Publish = () => {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");

  const navigate = useNavigate();

  const handleTitleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTitle(e.target.value);
    },
    []
  );

  const handleContentChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setContent(e.target.value);
    },
    []
  );

  return (
    <div>
      <Appbar />
      <div className="flex justify-center w-screen pt-8">
        <div className="max-w-screen-lg w-full">
          <input
            type="text"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full p-2.5 mb-2 focus:outline-none"
            placeholder="Title"
            onChange={handleTitleChange}
          />
          <TextEditor onChange={handleContentChange} />
          <button
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800 my-4"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/blog`,
                { title, content },
                {
                  headers: {
                    Authorization: `Bearer ${
                      localStorage.getItem("token") || ""
                    }`,
                  },
                }
              );
              navigate(`/blog/${response.data.id}`);
            }}
          >
            Publish Blog
          </button>
        </div>
      </div>
    </div>
  );
};

const TextEditor = memo(
  ({
    onChange,
  }: {
    onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  }) => {
    return (
      <div>
        <textarea
          id="message"
          rows={5}
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-none"
          placeholder="Write your thoughts here..."
          onChange={onChange}
        />
      </div>
    );
  }
);

export default Publish;
