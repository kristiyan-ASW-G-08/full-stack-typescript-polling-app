import React, { FC, useEffect, Suspense } from "react";
import Loader from "components/Loader";
import axios from "axios";

const Polls: FC = () => {
  useEffect(() => {});
  return (
    <section
      style={{ height: "90vh" }}
      className="flex justify-center  w-screen"
    >
      <Suspense fallback={<Loader />} />
    </section>
  );
};

export default Polls;
