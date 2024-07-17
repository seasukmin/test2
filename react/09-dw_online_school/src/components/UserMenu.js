import React, { useEffect, useState } from "react";
import personImg from "../assets/person.png";
import { Link } from "react-router-dom";
import styles from "./UserMenu.module.css";

function UserMenu(props) {
  const [isOpen, setIsOpen] = useState(false);
  const handleButton = (e) => {
    // setIsOpen(isOpen === false ? true : false);
    e.stopPropagation();
    setIsOpen(!isOpen);
  };
  const [Log, setLog] = useState("로그인");

  const LoginButton = (e) => {
    localStorage.setItem("ID", "Tomato");

    {
      e.target.innerHTML == "로그인" ? setLog("로그아웃") : setLog("로그인");
    }
  };
  useEffect(() => {
    if (!isOpen) return;
    const handleClickOutside = () => {
      setIsOpen(false);
    };
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className={styles.userMenu}>
      <button className={styles.iconButton} onClick={handleButton}>
        <img src={personImg} />
      </button>
      {isOpen && (
        <ul className={styles.popup}>
          <Link to="/wishlist">
            <li>위시리스트</li>
          </Link>
          <li className={styles.disabled}>회원가입</li>
          <Link to="/login" onClick={LoginButton}>
            <li>{Log}</li>
          </Link>
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
