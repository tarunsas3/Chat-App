import React, { useContext, useState, useEffect } from "react";
import {
  doc,
  collection,
  query,
  where,
  setDoc,
  updateDoc,
  serverTimestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

export const Search = ({ onSearch, onSearchEnd }) => {
  const [userName, setUserName] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  const handleChange = (event) => {
    setUserName(event.target.value);
  };

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (userName.trim() === "") {
        setSearchResults([]);
        onSearchEnd();
        return;
      }

      const usernameLower = userName.toLowerCase();

      const q = query(
        collection(db, "users"),
        where("displayNameLower", ">=", usernameLower),
        where("displayNameLower", "<=", usernameLower + "\uf8ff")
      );

      try {
        const querySnapshot = await getDocs(q);
        const results = [];
        querySnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.uid !== currentUser.uid) {
            results.push(userData);
          }
        });
        setSearchResults(results);
        onSearch();
      } catch (err) {
        setErr(true);
        console.log(err);
      }
    };

    fetchSearchResults();
  }, [userName, currentUser, onSearch, onSearchEnd]);

  const handleSelect = async (user) => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const response = await getDoc(doc(db, "chats", combinedId));
      if (!response.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUserName("");
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="search">
      <div className="searchInput">
        <input
          type="text"
          placeholder="Search or start new conversation"
          value={userName}
          onChange={() => handleChange(event)}
        />
      </div>
      {searchResults.length > 0 && (
        <div className="searchResults">
          {searchResults.map((user) => (
            <div
              className="searchResult"
              key={user.uid}
              onClick={() => handleSelect(user)}
            >
              <img src={user.photoURL} alt={`${user.displayName}'s Profile`} />
              <div className="searchedUserInfo">
                <h3>{user.displayName}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
