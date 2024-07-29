import { useState } from "react";

function useAsync(asyncFunction) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  const wrappedFunction = async (...args) => {
    // 여기서 ...args 스프레드 연산법이 아니라..하나의 문법이다. 나머지 파라미터를 다 받을 수 있는..
    // 함수 선언구..
    try {
      setError(null);
      setPending(true);
      return await asyncFunction(...args);
      //   함수 실행하는 부분
      //   스프레드 연산법이다.
    } catch (error) {
      setError(error);
      return;
    } finally {
      // 오류가 나던 안나던 무조건 실행하는 부분
      setPending(false);
    }
  };
  return [pending, error, wrappedFunction];
}

export default useAsync;
// what is args?
// ..args는 파라미터의 값을 배열로 받아줌.
// 아주 유용한 기능.
