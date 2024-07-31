import React from "react";
import { StateProp } from "../../types";
import { Box } from "./Box";

interface BoxLEDProps {
  state: StateProp | string;
  bg?: string;
}

export const BoxLED: React.FC<BoxLEDProps> = ({ state, bg = "bg-white" }) => {
  return (
    <>
      <Box className="border-blue-700 bg-blue-600">
        <text>LED</text>
        <span
          className={`ml-2 rounded border border-blue-800 px-2 ${bg === "bg-white" ? "bg-white text-gray-800" : bg}`}
        >
          {state}
        </span>
      </Box>
    </>
  );
};
