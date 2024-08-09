"use client";
import { useState } from "react";

type Prop = {
  title: string;
  children: any;
};
const Accordion: React.FC<Prop> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-gray-200 rounded border-b">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-blue-700 p-4 text-left hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <div className="flex items-center justify-between text-slate-100">
          <span>{title}</span>
          <span className="text-3xl">{isOpen ? "-" : "+"}</span>
        </div>
      </button>
      {isOpen && <div className="bg-white p-4">{children}</div>}
    </div>
  );
};

export default Accordion;
