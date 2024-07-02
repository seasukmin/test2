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

export function compareHand(a, b) {
  // 승리 ==> 1, 패배 => -1, 무승부 ==> 0
  if (WINS[a] === b) return 1;
  if (WINS[b] === a) return -1;
  return 0;
}
