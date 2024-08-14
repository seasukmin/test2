import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getUserAuth, joinUser, syncCart } from "../../../firebase";
import { setUser } from "../../../store/user/UserSlice";
import { signInWithEmailAndPassword } from "firebase/auth";
import { syncCartAndStorage } from "../../../store/cart/cartSlice";

function SignIn(props) {
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();
  const auth = getUserAuth();
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { user } = userCredential;
      //   로컬 스토리지에서 장바구니 데이터 읽기
      const cartItems = JSON.parse(localStorage.getItem("cartProducts")) || [];

      dispatch(syncCartAndStorage({ uid: user.uid, cartItems }));
      dispatch(
        setUser({ email: user.email, token: user.refreshToken, uid: user.uid })
      );
      // await joinUser(user.uid, user.email);
      // await syncCart(user.uid, cartItems);

      navigate("/");
    } catch (error) {
      console.log(error);
      setFirebaseError("이메일 또는 비밀번호가 틀렸습니다.");
    }
  };
  return (
    <Form
      title={"로그인"}
      getDataForm={handleLogin}
      firebaseError={firebaseError}
    />
  );
}

export default SignIn;
