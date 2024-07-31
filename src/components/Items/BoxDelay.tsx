import React from "react";
import { Box } from "./Box";

interface BoxDelayProps {
  time: string;
}

export const BoxDelay: React.FC<BoxDelayProps> = ({ time }) => {
  return (
    <>
      <Box className="border-pink-700 bg-pink-600">
        <div>Delay</div>
        <span className="mx-2 rounded-full border border-pink-800 bg-white px-2 text-black">
          {time}
        </span>
        <div>second(s)</div>
      </Box>
    </>
  );
};
