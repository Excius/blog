import { memo } from "react";
import { Auth } from "../components/Auth";
import Quote from "../components/Quote";

const Signin = memo(({ onAuth }: { onAuth: () => void }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div className="w-max-lg">
        <Auth type="signin" onAuth={onAuth} />
      </div>
      <div className="hidden lg:block">
        <Quote />
      </div>
    </div>
  );
});

export default Signin;
