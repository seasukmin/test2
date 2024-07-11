import React from "react";
import styles from "./ColorInput.module.css";

function ColorInput({ colorCodeValue, handleChange }) {
  const onChange = (e) => {
    handleChange(e.target.value);
  };
  const isValidColorCode = (colorCodeValue) => {
    // 첫자리 #, 뒤에 여섯자리는 영소문자 a-f, 영대문자 A-f, 숫자 0-9
    const regxp = /^#[a-fA-f0-9]{6}$/;
    return regxp.test(colorCodeValue);
  };
  const handleBlur = () => {
    if (!isValidColorCode(colorCodeValue)) {
      // 잘못된 코드를 입력했을 때
      alert(
        "컬러코드는 #과 함께 영소문자 a-f, 영대문자 A-F, 숫자 0-9를 조합한 7자리를 입력하세요."
      );
      handleChange("#000000");
    }
  };
  return (
    <div className={styles.colorInputContainer}>
      <input
        className={styles.colorInput}
        value={colorCodeValue}
        maxLength={7}
        onChange={onChange}
        onBlur={handleBlur}
      />
      <span
        className={styles.colorInputChip}
        style={{ backgroundColor: colorCodeValue }}
      ></span>
    </div>
  );
}
// blur 커서가 사라질때 이벤트 focus 커서가 있을때 이벤트
export default ColorInput;
