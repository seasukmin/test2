import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import { Link } from "react-router-dom";
import ColorSurvey from "../components/ColorSurvey";
import mockItems from "../lib/mock.json";
import { getAllDatas } from "../lib/firebase";

function Home(props) {
  const [items, setItems] = useState([]);
  const nextPageRef = useRef(null);
  // useRef의 null은 초기값 렌더링시의 lastQurey값이 들어가서 유지됨. 그래서
  // console.log로 찍었을때 마지막 value가 나옴.
  console.log(nextPageRef);
  const handleLoad = async () => {
    // 파이어베이스에서 데이터 가져오기
    const { resultData, lastQuery } = await getAllDatas("mbtiColor", "id");
    // items state에 셋팅
    setItems(resultData);
    nextPageRef.current = lastQuery;
  };

  const handleLoadNext = async () => {
    const { resultData, lastQuery } = await getAllDatas(
      "mbtiColor",
      "id",
      nextPageRef.current
    );
    if (resultData.length !== 0) {
      setItems((prevItems) => [...prevItems, ...resultData]);
      nextPageRef.current = lastQuery;
    } else {
      nextPageRef.current = null;
    }
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    function handleScroll() {
      if (!nextPageRef.current) return false;
      // scrollHeight : 문서 전체의 높이
      // scorollTop:문서의 처음부터 화면에 보이기 전까지의 높이(내려온 스크롤 높이)
      // clientHeight: 화면에 보여지는 높이
      // 컴포넌트 렌더링!== 화면에 그려진다
      // 컴포넌트 코드 읽고
      // =>렌더링
      // =>마운트
      // =>화면에 그려짐
      // =>재렌더링 시 컴포넌트가 언마운트 렌더링 마운트 화면에 그려짐
      const { scrollHeight, scrollTop, clientHeight } =
        document.documentElement;
      if (scrollTop + clientHeight >= scrollHeight) {
        handleLoadNext();
      }
      // console.log(
      //   `scrollHeight, scrollTop, clientHeight: ${scrollHeight}, ${scrollTop}, ${clientHeight}
      //   `
      // );
    }
    window.addEventListener("scroll", handleScroll);
    // 리액트 컴포넌트 라이프사이클
    // render() => constructor()=> componentDidMount()=> componentDidUpdate()
    // => componentWillUnmount()

    // render: 컴포넌트의 기능과 모양을 정의하는 함수로 리액트 요소를 반환한다.
    // constructor: 컴포넌트를 만들 때 처음으로 호출되는 함수. 여기에서 state의 초기값이 설정된다.
    // componentDidMount: 컴포넌트를 생성하고 첫 렌더링이 끝났을 때 호출되는 함수이다.
    // 업데이트 시에 실행되는 함수
    // 업데이트 되는 경우: props 값 변경, state 값 변경, 부모 컴포넌트가 리렌더링 될 때
    // componentDidUpdate: 컴포넌트 업데이트 작업이 끝난 후에 호출되는 함수이다.

    // 언마운트
    // 컴포넌트가 DOM에서 제거되는 것.
    // componentWillUnmount: 해당 컴포넌트가 제거되기 직전에 호출된다.
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.headerContainer}>
        <header className={styles.header}>
          <h1 className={styles.heading}>
            MBTI별
            <br />
            <span className={styles.accent}>좋아하는 컬러</span>
          </h1>
          <div>
            <div className={styles.filter}>
              <img className={styles.removeIcon} src="/images/x.svg" />
            </div>
          </div>
        </header>
      </div>
      <main className={styles.content}>
        <Link className={styles.addItem} to="/new">
          + 새 컬러 등록하기
        </Link>
        <ul className={styles.items}>
          {items.map((item, idx) => {
            return <ColorSurvey key={idx} mbtiData={item} />;
          })}
        </ul>
      </main>
    </div>
  );
}

export default Home;
