import { useEffect, useState } from "react";
import { getUserAuth } from "./api/firebase";
import "./App.css";
import SignIn from "./components/SignIn";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const auth = getUserAuth();
  const user = auth.currentUser;
  const [loginUser, setLoginUser] = useState();
  const handleLogout = () => {
    auth.signOut();
  };
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setLoginUser(user);
    });
    // 인증정보가 달라지면 user가 바뀌고.. 바뀔때마다 use스테이드 바뀌고~!
  });
  return (
    <div className="App">
      <header>
        <h4>🙏소원을 빌어주세요.</h4>
        <button onClick={handleLogout}>로그아웃</button>
      </header>
      <section>
        {loginUser ? (
          "채팅방 호출 할 예정"
        ) : (
          <SignIn auth={auth} login={setLoginUser} />
        )}
      </section>
    </div>
  );
}

export default App;
