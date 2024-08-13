import React, { useState } from "react";
import Form from "../../../components/form/Form";
import { useDispatch } from "react-redux";
import { getUserAuth } from "../../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

function SingUp(props) {
  const [firebaseError, setFirebaseError] = useState("");
  const dispatch = useDispatch();
  const auth = getUserAuth();

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
      const userObj = {
        uid: user.uid,
        email: user.email,
        cart: cartItems,
      };
    } catch (error) {
      console.log("??");
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
