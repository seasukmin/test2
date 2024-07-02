// 컴포넌트쓸때만 파일명 앞에 대문자 사용
// 파이어베이스 컴포넌트랑 비슷하다고 생각하면 된다.
const WINS = {
  rock: "scissor",
  scissor: "paper",
  paper: "rock",
};
function random(n) {
  return Math.ceil(Math.random() * n);
}

export function generateRandomHand() {
  const num = random(3);
  if (num === 1) {
    return "rock";
  } else if (num === 2) {
    return "scissor";
  } else {
    return "paper";
  }
}
