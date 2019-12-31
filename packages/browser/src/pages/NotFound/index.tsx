import React, { FC } from "react";
import { useHistory } from "react-router-dom";

const NotFound: FC = () => {
  const { goBack, push } = useHistory();
  return (
    <section
      style={{ height: "90vh" }}
      className="flex items-center flex-col  justify-center w-screen"
    >
      <h1 className="text-6xl font-semibold">404</h1>
      <h2 className="text-5xl font-semibold">Not Found</h2>
      <div className="flex items-center justify-between py-4">
        <button
          onClick={() => push("/")}
          className="bg-teal-400 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Home
        </button>
        <button
          onClick={goBack}
          className="text-gray-500 hover:text-gray-600 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="button"
        >
          Go Back
        </button>
      </div>
    </section>
  );
};

export default NotFound;
