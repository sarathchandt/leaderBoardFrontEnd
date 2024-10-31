import React, { useEffect, useState } from "react";
import OnBoardingTemplate from "../components/OnBoardingTemplate";
import { itemArray } from "../lib/constants";
import EnterScoreComponent from "../components/EnterScoreComponent";
import { useStore } from "../store/store";
import axiosInstance from "../lib/client";
import { getAccessToken } from "../lib/tokenStorage";
import GradientButton from "../components/GradientButton";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [leaderBoard, setLeaderBoard] = useState<any>([]);
  const [currentPosition, setCurrentPosition] = useState<number>(0);
  const [rank,setRank] = useState(0)
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate()
  const setLogin = useStore((state) => state.setIsUserLoggedIn);


  const user = useStore((state) => state.userData);

  console.log(leaderBoard);
  
  

  const fetchLeaderboardData = async () => {
    const token = getAccessToken()
    axiosInstance.defaults.headers['Authorization']  = `Bearer ${token}`

    const data = await axiosInstance.get('/leaderBoard')

    if(data.data.rank > 10){
      setLeaderBoard([...data.data.players,data.data.player])
      setCurrentPosition(10)
      setRank(data.data.rank)
    }else{
      setLeaderBoard(data.data.players)
      setCurrentPosition(data.data.rank-1)
      setRank(data.data.rank)
    }
    

  }



  useEffect(()=>{
    fetchLeaderboardData()
  },[])

  const reArnange =  async(newScore) => {
      try {
        await axiosInstance.post('/updateUserScore',{score:newScore})
        fetchLeaderboardData()
      } catch (error) {
        setErrorMessage(
          "Couldn't update the value"
        );
      }
  };



  return (
    <OnBoardingTemplate
      mainTitle={rank  + " "+user?.name}
      firstRoundGradientStyle="absolute md:top-[10%] top-[15%]   left-[10%] md:left-0  rotate-90  bg-gradient-to-r from-indigo-500 to-purple-990 "
      secondRoundGradientStyle="absolute bottom-[10%]  right-[10%]  rotate-[40deg]  bg-gradient-to-r from-indigo-900 to-purple-990 "
    >
      <div className="h-full w-full md:p-10 overflow-y-scroll  custom-scroll overflow-hidden rounded-[20px]">
        <EnterScoreComponent onSubmit={reArnange} />
        {errorMessage.length != 0 && (
            <p className="text-red-600 ">{errorMessage}</p>
          )}
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
            {leaderBoard.map((item:any, i) => {
              return (
                <tr
                  key={i}
                  className={i == currentPosition ? "bg-white  text-black" : ""}
                >
                  <td className="border border-dashed border-whiteV1 text-center p-4">
                    { user?.email== item?.email?rank : i+1}
                  </td>
                  <td className="border border-dashed border-whiteV1 text-center p-4">
                    {item?.name}
                  </td>
                  <td className="border border-dashed border-whiteV1 text-center p-4">
                    {item?.score}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <GradientButton
          title="Logout"
          onClick={()=>{
            localStorage.removeItem('refresh_token')
            localStorage.removeItem('access_token')
            setLogin(false)
            navigate("/")

          }}
          additionalStyles="w-[100px]  mt-6   top-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  p-2 text-white font-bold  rounded-[10px] "
        />
      </div>
    </OnBoardingTemplate>
  );
};

export default Home;
