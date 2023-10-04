import React, { useState } from "react";
import "../assets/styles.css";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

export const Login = () => {
  const [err, setError] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(true);
      console.log(err);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <h3>LOGIN</h3>
        <input type="text" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <input type="submit" value="SUBMIT" className="submit" />
        <h6>
          New User? <Link to="/register">Register</Link>
        </h6>
      </form>
    </div>
  );
};
