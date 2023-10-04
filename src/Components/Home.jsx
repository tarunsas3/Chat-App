import React from "react";
import { SideBar } from "./SideBar";
import { Chat } from "./Chat";

export const Home = () => {
  return (
    <div className="Home">
      <div className="leftSide">
        <SideBar />
        <Chat />
      </div>
    </div>
  );
};
