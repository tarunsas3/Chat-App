import React, { useState } from "react";
import { FcAddImage } from "react-icons/fc";
import "../assets/styles.css";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export const Register = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const file = event.target[0].files[0];
    const username = event.target[1].value;
    const email = event.target[2].value;
    const password = event.target[3].value;

    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const storageRef = ref(storage, username);

      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        (err) => {
          setError(true);
          console.log(err);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(response.user, {
              displayName: username,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", response.user.uid), {
              uid: response.user.uid,
              displayName: username,
              displayNameLower: username.toLowerCase(),
              email,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "userChats", response.user.uid), {});
            navigate("/");
          });
        }
      );
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h3>REGISTER</h3>
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file" className="profilePicInput">
          <FcAddImage className="imageUpload" />
          <span>Upload Profile Picture</span>
        </label>
        <input type="text" placeholder="User Name" />
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="SUBMIT" className="submit" />
        <h6>
          Existing User? <Link to="/login"> Login </Link>
        </h6>
      </form>
    </div>
  );
};
