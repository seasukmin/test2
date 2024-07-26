import { useLocale } from "../contexts/LocaleConext";

// dictionary 자료형 구조 사용
const dict = {
  ko: {
    "confirm button": "확인",
    "cancel button": "취소",
    "edit button": "수정",
    "delete button": "삭제",
    "title placeholder": "이름을 입력해주세요.",
    "content placeholder": "내용을 작성해 주세요.",
    "terms of service": "서비스 이용약관",
    "privary policy": "개인정보 처리방침",
    "load more": "더 보기",
    newest: "최신순",
    calorie: "칼로리순",
  },
  en: {
    "confirm button": "OK",
    "cancel button": "Cancel",
    "edit button": "Edit",
    "delete button": "Delete",
    "title placeholder": "Typing name",
    "content placeholder": "Typing content",
    "terms of service": "Terms of Service",
    "privary policy": "Privacy Policy",
    "load more": "Load More",
    newest: "Newest",
    calorie: "calorie",
  },
};

function useTranslate() {
  const locale = useLocale();
  const translate = (key) => dict[locale][key] || "";
  //   function translate(key) {
  //     return dict[locale][key] || '';
  //   }
  return translate;
}

export default useTranslate;
