import React, { useContext, useState } from "react";
import { GrSend } from "react-icons/gr";
import { MdAttachFile } from "react-icons/md";
import { FcAddImage } from "react-icons/fc";
import {
  Timestamp,
  arrayUnion,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

export const Input = () => {
  const [error, setError] = useState(false);
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (image) {
      const storageRef = ref(storage, uuid());
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        (err) => {
          setError(true);
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                image: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    setText("");
    setImage(null);
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Type a Message"
        onChange={(event) => setText(event.target.value)}
        value={text}
      />
      <div className="send">
        <MdAttachFile />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(event) => setImage(event / target.files[0])}
        />
        <label htmlFor="file">
          <FcAddImage />
        </label>
        <GrSend onClick={handleSend} />
      </div>
    </div>
  );
};
