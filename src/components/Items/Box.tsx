import React from "react";

interface IBoxProp {
  className?: string;
  children: React.ReactNode;
}

export const Box: React.FC<IBoxProp> = ({
  className = "border-blue-700 bg-blue-600",
  children,
}) => {
  return (
    <>
      <div
        className={`flex h-16 w-full cursor-move items-center rounded-sm border px-2 text-white ${className}`}
      >
        {children}
      </div>
    </>
  );
};
