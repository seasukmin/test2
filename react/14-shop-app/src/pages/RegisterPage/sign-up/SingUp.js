import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { useDispatch } from "react-redux";
import { syncCart, getUserAuth, joinUser } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setUser } from "../../../store/user/UserSlice";
import { useNavigate } from "react-router-dom";

function SingUp(props) {
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleSignupAndLogin = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      //   로컬 스토리지에서 장바구니 데이터 읽기
      const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];
      await joinUser(user.uid, user.email);
      await syncCart(user.uid, cartItems);
      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );
      navigate("/");
    } catch (error) {
      console.log(error);
      setFirebaseError("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };
  return (
    <div>
      <Form
        title={"회원가입"}
        getDataForm={handleSignupAndLogin}
        firebaseError={firebaseError}
      />
    </div>
  );
}

export default SingUp;
