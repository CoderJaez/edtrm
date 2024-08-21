import React from "react";

type Prop = {
  name: string;
  label: string;
  value?: string;
  placeholder: string;
};

const Input: React.FC<Prop> = ({ name, label, value, placeholder }) => {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-black dark:text-white">
        {label}
      </label>
      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent px-5 py-3 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
      />
    </div>
  );
};

export default Input;
