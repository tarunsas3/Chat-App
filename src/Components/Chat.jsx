import React, { useContext } from "react";
import {BsFillLockFill} from "react-icons/bs"
import { BsCameraVideoFill } from "react-icons/bs";
import { RiUserAddLine, RiMoreFill } from "react-icons/ri";
import { Messages } from "./Messages";
import { Input } from "./Input";
import { ChatContext } from "../Context/ChatContext";

export const Chat = () => {
  const { data } = useContext(ChatContext);
  return (
    <div className="chat">
      {!data.loading && (
        <>
          <div className="chatInfo">
            <h3>{data.user.displayName}</h3>
            <div className="infoIcons">
              <BsCameraVideoFill />
              <RiUserAddLine />
              <RiMoreFill />
            </div>
          </div>
          <Messages />
          <Input />
        </>
      )}
      {data.loading && (
        <div className="splashScreen">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCofkluYzq9r_ap_kucTa_zknHnJdVTTkzGw&usqp=CAU" />
          <h3>Hello There, Welcome!</h3>
          <p>
            Make calls, share your screen and get a faster experience when you
            use the app.
          </p>
          <span>
            <BsFillLockFill />
            Your personal messages are end-to-end encrypted
          </span>
        </div>
      )}
    </div>
  );
};
