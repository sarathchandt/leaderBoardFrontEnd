import React, { useState } from "react";
import OnBoardingTemplate from "../components/OnBoardingTemplate";
import { itemArray } from "../lib/constants";
import EnterScoreComponent from "../components/EnterScoreComponent";
import { reArangeArray } from "../lib/util";

const Home = () => {

    const [leaderBoard,setLeaderBoard] = useState(itemArray)
    const [currentPosition,setCurrentPosition] = useState<number >(17)

    console.log(currentPosition);
    

    const reArnange = (newScore) => {
        
        let arr = reArangeArray(leaderBoard,Number(newScore),currentPosition)
        console.log(arr);
        setLeaderBoard(arr.arr)
        setCurrentPosition(arr.index)
        
    }
    



  return (
    <OnBoardingTemplate
      mainTitle={currentPosition+1+` Sarath Chand T`}
      firstRoundGradientStyle="absolute md:top-[10%] top-[15%]   left-[10%] md:left-0  rotate-90  bg-gradient-to-r from-indigo-500 to-purple-990 "
      secondRoundGradientStyle="absolute bottom-[10%]  right-[10%]  rotate-[40deg]  bg-gradient-to-r from-indigo-900 to-purple-990 "
    >
      <div className="h-full w-full md:p-10 overflow-y-scroll  custom-scroll overflow-hidden rounded-[20px]">
        <EnterScoreComponent onSubmit={reArnange} />
        <table className="min-w-full  text-white">
          <thead>
            <tr className="">
              <th className="border border-dashed border-whiteV1 border-b text-center p-4">
                Rank
              </th>
              <th className="border border-dashed border-whiteV1 text-center p-4">
                Name
              </th>
              <th className="border border-dashed border-whiteV1 text-center p-4">
                Score
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderBoard.map((item, i) => {
              return (
                <tr key={i} className={i == currentPosition ? "bg-white text-black" : ""}>
                  <td className="border border-dashed border-whiteV1 text-center p-4">
                    {i + 1}
                  </td>
                  <td className="border border-dashed border-whiteV1 text-center p-4">
                    {item.name}
                  </td>
                  <td className="border border-dashed border-whiteV1 text-center p-4">
                    {item.score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </OnBoardingTemplate>
  );
};

export default Home;
