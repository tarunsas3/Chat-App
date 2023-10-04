import React, { useState } from "react";
import { Header } from "./Header";
import { Search } from "./Search";
import { Chats } from "./Chats";
import { UsersList } from "./UsersList";

export const SideBar = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [showUsers, setShowUsers] = useState(false);

  const toggleUsers = () => {
    setShowUsers(!showUsers);
  };

  return (
    <div className="sideBar">
      <Header onNewConversationClick={toggleUsers} />
      <Search
        onSearch={() => setIsSearching(true)}
        onSearchEnd={() => setIsSearching(false)}
      />
      {isSearching ? (
        <></>
      ) : showUsers ? (
        <UsersList setShowUsers={setShowUsers} />
      ) : (
        <Chats />
      )}
    </div>
  );
};
