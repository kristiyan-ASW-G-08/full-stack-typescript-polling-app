import React, { FC } from "react";

interface LoaderProps {
  ref?: (e: HTMLParagraphElement) => void;
}

const Loader: FC<LoaderProps> = ({ ref }) => (
  <p ref={ref} className="text-3xl font-semibold w-full text-center">
    Loading...
  </p>
);

export default Loader;
