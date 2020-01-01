import React, { FC, Suspense } from "react";
import Loader from "components/Loader";
import PollsContainer from "components/PollsContainer";

const Polls: FC = () => {
  return (
    <section
      style={{ height: "90vh" }}
      className="flex justify-center  w-screen"
    >
      <Suspense fallback={<Loader />}>
        <PollsContainer />
      </Suspense>
    </section>
  );
};

export default Polls;
