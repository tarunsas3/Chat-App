import { signOut } from "firebase/auth";
import React, { useContext } from "react";
import { FiLogOut } from "react-icons/fi";
import { RiChatNewLine } from "react-icons/ri";
import { auth } from "../firebase";
import { AuthContext } from "../Context/AuthContext";

export const Header = ({ onNewConversationClick }) => {
  const { currentUser } = useContext(AuthContext);
  return (
    <div className="header">
      <div className="user">
        <div className="userInfo">
          <img src={currentUser.photoURL} />
          <h6>{currentUser.displayName}</h6>
        </div>
        <div className="icons">
          <RiChatNewLine
            className="newConversationIcon"
            onClick={onNewConversationClick}
          />
          <FiLogOut className="logoutIcon" onClick={() => signOut(auth)} />
        </div>
      </div>
    </div>
  );
};
