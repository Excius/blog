import { memo } from "react";

export const Quote = memo(() => {
  return (
    <div className="bg-gray-100 h-screen flex justify-center flex-col items-center">
      <div className="flex justify-center">
        <div className="text-3xl font-bold max-w-2xl">
          "The first step might seem small, but it's the beginning of something
          great. Sign up and take that step toward your next big achievement."
        </div>
      </div>
      <div className="max-w-2xl text-xl font-semibold w-full pl-5 mt-3 text-gray-600">
        Daksh Rao
      </div>
      <div className="max-w-2xl text-md font-light w-full pl-5 text-gray-600">
        CEO
      </div>
    </div>
  );
});

export default Quote;
