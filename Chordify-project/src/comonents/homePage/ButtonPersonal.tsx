import { useState } from "react";

interface ButtonPersonalProps {
  onSetCurAnswer: (answer: string) => void;
  option: string;
}

export default function ButtonPersonal({
  option,

  onSetCurAnswer,
}: ButtonPersonalProps) {
  const [style, setStyle] = useState("background-black");
  return (
    <li>
      <button
        onClick={() => {
          onSetCurAnswer(option);
          setStyle("background-test-modal");
        }}
        className={`mb-5 bg-${style} border-primary border rounded-full inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-[#1B44C8] hover:border-[#1B44C8] disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-[#1B44C8] active:border-[#1B44C8]`}
      >
        {option}
      </button>
    </li>
  );
}
