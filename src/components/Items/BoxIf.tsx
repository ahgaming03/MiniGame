import React from "react";

interface BoxIfElseProps {
  condition: string;
}

export const BoxIf: React.FC<BoxIfElseProps> = ({ condition }) => {
  return (
    <>
      <div className="bg-orange-400 py-1 font-bold uppercase">
        if{" "}
        <span className="mx-2 my-1 rounded border border-green-600 bg-green-500 px-1">
          {condition}
        </span>
      </div>
    </>
  );
};
