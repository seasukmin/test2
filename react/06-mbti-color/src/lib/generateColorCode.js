function generateRandomHex() {
  const num = Math.floor(Math.random() * 256);
  const hex = num.toString(16).padStart(2, "0").toUpperCase();
  return hex;
}

export default function generateColorCode() {
  const colorCode = `#${generateRandomHex()}${generateRandomHex()}${generateRandomHex()}`;
  return colorCode;
}
// 여러개의 함수를 뺴고 싶으면 export만 쓰면 돼고 하나만 하고 싶다 default를 쓴다.
