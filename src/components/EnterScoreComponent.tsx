import React, { useState } from "react";
import GradientButton from "./GradientButton";
import { numberTest } from "../lib/util";

type EnterScoreComponentProps = {
  onSubmit: (score) => void;
};

const EnterScoreComponent = ({ onSubmit }: EnterScoreComponentProps) => {
  const [score, setScore] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState("");

  const submitScore = (e) => {
    e.preventDefault();
    const isValid = numberTest(score);
    if (isValid) {
      onSubmit(score);
      setScore('')
    } else {
      setErrorMessage("Please provide a valid number");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full flex flex-row  gap-4 mb-6">
        <div className="flex-1">
          <input
            type="number"
            className="w-full p-2 bg-inherit border-[1px]  border-whiteV1 rounded-[10px] text-white"
            placeholder="Enter New Score"
            value={score}
            onChange={(e) => {
              setScore(e.target.value);
            }}
          />
        </div>
        <GradientButton
          title="Enter"
          onClick={submitScore}
          additionalStyles="w-4/12  bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  p-2 text-white font-bold  rounded-[10px] "
        />
      </div>
      {errorMessage.length != 0 && (
        <p className="text-red-500 pb-2">{errorMessage}</p>
      )}
    </div>
  );
};

export default EnterScoreComponent;
