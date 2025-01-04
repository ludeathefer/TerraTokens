"use client";

import { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
interface Props {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

const NumberField: React.FC<Props> = ({ value, setValue }) => {
  const handleIncrement = () => {
    setValue(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      setValue(value - 1);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseInt(e.target.value) || 0);
  };

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="ghost"
        size="lg"
        onClick={handleDecrement}
        className="h-8 w-8 rounded"
      >
        <MinusIcon className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        value={value}
        onChange={handleChange} // Use the typed change handler
        min={0}
        className="w-20 rounded-md border border-gray-300 px-2 py-1 text-center text-sm focus:border-gray-500 focus:outline-none dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200"
      />
      <Button
        variant="ghost"
        size="lg"
        onClick={handleIncrement}
        className="h-8 w-8 rounded"
      >
        <PlusIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

function MinusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

export default NumberField;
