import React from "react";
import styles from "./Button.module.css";
import cn from "classnames";
function Button({ variant, ...restProps }) {
  return (
    <button
      {...restProps}
      className={cn(styles.button, variant && styles[variant])}
    />

    // restProps은 모든 ~~ 것들을 가져온다 <button>요 모양일땐 쓸수가 없다리..</button>
    // 무조건<button/>이런 모양일때 쓸 수 있다 모든Props를 불러올 수 있는 넘
  );
}

export default Button;
