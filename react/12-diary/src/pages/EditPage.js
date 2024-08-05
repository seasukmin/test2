import React, { useContext, useEffect, useState } from "react";
import DiaryEditor from "../components/DiaryEditor";
import { useNavigate, useParams } from "react-router-dom";
import { DiaryStateContext } from "../App";
import { emotionList } from "./../util/Emotion";
import Button from "../components/Button";
import { changeTitle } from "../util/changeTitle";

function EditPage(props) {
  const { id } = useParams();
  const { diaryList } = useContext(DiaryStateContext);
  const [data, setData] = useState();
  const Navigate = useNavigate();
  useEffect(() => {
    changeTitle(`감정일기장 - ${id}번 일기 수정`);
  }, []);

  useEffect(() => {
    if (diaryList.length > 0) {
      const targetDiary = diaryList.find((diary) => diary.id == id);
      if (targetDiary) {
        setData(targetDiary);
      } else {
        alert("잘못된 접근입니다.");
        Navigate("/", { replace: true });
      }
    }
  }, [diaryList]);

  return (
    <div className="EditPageEditor">
      {data && <DiaryEditor originData={data} isEdit={true} />}
    </div>
  );
}

export default EditPage;
