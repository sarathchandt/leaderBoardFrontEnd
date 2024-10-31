import React, { useEffect, useState } from "react";
import GradientButton from "../components/GradientButton";
import { useStore } from "../store/store";
import axiosInstance from "../lib/client";
import { getAccessToken } from "../lib/tokenStorage";
import EnterScoreComponent from "../components/EnterScoreComponent";

const AdminHome = () => {
  const setIsAdminLoggedIn = useStore((state) => state.setIsAdminLoggedIn);

  const [selectedItem, setSelectedItem] = useState<any>();
  const [leaderBoard, setLeaderBoard] = useState<any>([]);

  const [selectedindex, setSelectedIndex] = useState(0);

  const selectPlayer = (index) => {
    setSelectedIndex(index);
    setSelectedItem({ ...leaderBoard[index] });
  };

  const fetchTopers = async () => {
    const access_token = getAccessToken();

    axiosInstance.defaults.headers["Authorization"] = `Bearer ${access_token}`;
    const topPlayers = await axiosInstance.get("/admin/leaderBoard");
    setLeaderBoard(topPlayers.data);
    setSelectedItem(topPlayers.data[0]);
  };

  const search = async(keyword) => {
      const players = await axiosInstance.get(`/admin/searchWithName?word=${keyword}`)
      setLeaderBoard(players.data);
      setSelectedItem(players.data[0]);

      setSelectedIndex(0)
      
  }
  const editScore = async (score, id) => {
    const access_token = getAccessToken();

    axiosInstance.defaults.headers["Authorization"] = `Bearer ${access_token}`;
    await axiosInstance.patch("/admin/editScore", {
      score,
      id,
    });
    fetchTopers();
  };

  useEffect(() => {
    fetchTopers();
  }, []);

  return (
    <div className=" w-screen">
      <div className="">
        <div className="flex-row mt-5 justify-between flex">
          <h1 className="text-whiteV1  font-extrabold md:text-5xl text-3xl">
            Leader Board
          </h1>
          <GradientButton
            title="Logout"
            onClick={() => {
              localStorage.removeItem("refresh_token");
              localStorage.removeItem("access_token");
              setIsAdminLoggedIn(false);
            }}
            additionalStyles="w-[100px] top-10 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500  p-2 text-white font-bold  rounded-[10px] "
          />
        </div>
        <div className="w-full h-0 border-t-whiteV1 border-t-2 border-dashed mt-4 "></div>
      </div>
      <div className="md:mt-10 mt-4">
        <EnterScoreComponent type="text"  title="Search By Name" onSubmit={search} />
      </div>

      <div className="grid lg:grid-cols-3 grid-cols-1 md:gap-4  ">
        <div className=" md:mt-10 mt-4 col-span-2">
          <table className="w-full  text-white">
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
                <th className="border border-dashed border-whiteV1 text-center p-4">
                  Email
                </th>
                <th className="border border-dashed border-whiteV1 text-center p-4">
                  Id
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderBoard.map((item: any, i) => {
                return (
                  <tr
                    onClick={(e) => {
                      e.preventDefault();
                      selectPlayer(i);
                    }}
                    key={i}
                    className={
                      i == selectedindex
                        ? "bg-white  text-black cursor-pointer"
                        : "cursor-pointer"
                    }
                  >
                    <td className="border border-dashed border-whiteV1 text-center p-4">
                      {i + 1}
                    </td>
                    <td className="border border-dashed border-whiteV1 text-center p-4">
                      {item.name}
                    </td>
                    <td className="border border-dashed border-whiteV1 text-center p-4">
                      {item.score}
                    </td>
                    <td className="border border-dashed border-whiteV1 text-center p-4">
                      {item.email}
                    </td>
                    <td className="border border-dashed border-whiteV1 text-center p-4">
                      {item._id}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full md:mt-10 border border-dashed text-white  border-whiteV1 mt-4 md:p-10 p-4 col-span-1">
          <p>Name : {selectedItem?.name}</p>
          <p>Email : {selectedItem?.email}</p>
          <p>Score : {selectedItem?.score}</p>
          <p>Id : {selectedItem?._id}</p>
          <div className="mt-10">
            <EnterScoreComponent
              onSubmit={(newScore) => {
                editScore(newScore, selectedItem?._id);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
