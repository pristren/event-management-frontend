import { tailChase } from "ldrs";

tailChase.register();

import "./Loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="flex justify-center items-center h-full">
        <l-tail-chase size="40" speed="1.75" color="black"></l-tail-chase>
      </div>
    </div>
  );
};

export default Loader;
