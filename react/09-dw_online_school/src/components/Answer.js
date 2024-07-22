import React from "react";
import Card from "./Card";
import Writer from "./Writer";
import { useLocation } from "react-router-dom";
import DateText from "./DateText";

function Answer() {
  const props = useLocation();
  const { state } = props;
  console.log(state);
  return (
    <Card>
      <p>{state.question.answers[0].content}</p>
      <div>
        <div>
          {<DateText value={new Date(state.question.answers[0].createdAt)} />}
        </div>
        <Writer />
      </div>
    </Card>
  );
}

export default Answer;
