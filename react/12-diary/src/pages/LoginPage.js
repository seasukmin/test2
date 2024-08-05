import React, { useContext } from "react";
import "./LoginPage.css";
import * as FcIcons from "react-icons/fc";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";
function LoginPage(props) {
  const { auth } = useContext(DiaryStateContext);
  const Navigate = useNavigate();
  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    Navigate("/", { replace: true });
  };
  return (
    <div className="login_box">
      <button onClick={signInWithGoogle}>
        <FcIcons.FcGoogle />
        <span>Continue with Google</span>
      </button>
    </div>
  );
}

export default LoginPage;
