import React, { useContext, useEffect, useState } from "react";
import { doc, onSnapshot, collection, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

export const UsersList = ({ setShowUsers }) => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("uid", "!=", currentUser.uid));

    const unsub = onSnapshot(q, (querySnapshot) => {
      const usersData = [];
      querySnapshot.forEach((doc) => {
        usersData.push(doc.data());
      });
      setUsers(usersData);
    });

    return () => {
      unsub();
    };
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    setShowUsers(false);
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chats">
      {users.map((user) => (
        <div
          className="chatsResult"
          key={user.uid}
          onClick={() => handleSelect(user)}
        >
          <img src={user.photoURL} alt={user.displayName} />
          <div className="userInfo">
            <h3>{user.displayName}</h3>
          </div>
        </div>
      ))}
    </div>
  );
};
