import React, { useState } from "react";

function ToDolist(props) {
  // input 에 변화가 있을때마다 콘솔에 찍어보기
  // ==> 값을 가지고 있어야한다. ==> 관리를 해야한다. ==> state 로 만들어야한다.
  const [toDo, setToDo] = useState("");
  const [toDoList, setToDoList] = useState([]);
  const [toDoInput, settoDoInput] = useState("");
  const onChange = (e) => {
    setToDo(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setToDoList((prevItems) => [...prevItems, toDo]);
  };
  // 버튼 클릭했을때(form 태그 안에 있으니 submit 이벤트로) 화면에 나오도록 해야한다.
  // 화면에 나오는 todoList 는 계속 추가가 되어야 한다. ==> 배열
  // 배열의 원소 갯수만큼 화면에 렌더링 되어야 한다.
  // 배열의 원소 갯수만큼 숫자가 표시 되어야 한다.
  return (
    <div>
      <h1>My To Do (0)</h1>
      <form onSubmit={handleSubmit} action="">
        <input onChange={onChange} />
        <button>Add To Do</button>
      </form>
      <hr />
      <ul>
        {toDoList.map((item, idx) => {
          <li>
            {item}
            {item}
          </li>;
        })}
      </ul>
    </div>
  );
}

export default ToDolist;
