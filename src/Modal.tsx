import React from "react";

type propTypes = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<propTypes> = ({ open, children }) => {
  return (
    <div
      className={`fixed inset-0 flex items-center justify-center transition-colors ${open ? "visible bg-black/20" : "invisible"}`}
    >
      <div
        className={`rounded-lg bg-white p-6 shadow transition-all ${open ? "scale-100 opacity-100" : "scale-110 opacity-0"}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};
