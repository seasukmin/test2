import { useEffect, useState } from "react";
import { getUserAuth } from "./api/firebase";
import "./App.css";
import SignIn from "./components/SignIn";
import { onAuthStateChanged } from "firebase/auth";
import ChatRoom from "./components/ChatRoom";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const auth = getUserAuth();
  // const user = auth.currentUser;
  const [user] = useAuthState(auth);
  // const [loginUser, setLoginUser] = useState();
  const handleLogout = () => {
    auth.signOut();
  };

  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     setLoginUser(user);
  //   });
  // 인증정보가 달라지면 user가 바뀌고.. 바뀔때마다 use스테이드 바뀌고~!
  // });
  return (
    <div className="App">
      <header>
        <h4>🙏소원을 빌어주세요.</h4>
        <button className="sign-out" onClick={handleLogout}>
          로그아웃
        </button>
      </header>
      <section>
        {user ? <ChatRoom auth={auth} /> : <SignIn auth={auth} />}
      </section>
    </div>
  );
}

export default App;
