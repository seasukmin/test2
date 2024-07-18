import React, { useEffect, useState } from "react";
import personImg from "../assets/person.png";
import { Link } from "react-router-dom";
import styles from "./UserMenu.module.css";

function UserMenu(props) {
  const [isOpen, setIsOpen] = useState(false);

  const isLogined = JSON.parse(localStorage.getItem("member"));
  const handleButton = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
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

  const LogOutButton = () => {
    localStorage.removeItem("member");
  };

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
          {!isLogined ? (
            <Link to="/login">
              <li>로그인</li>
            </Link>
          ) : (
            <Link to="/login" onClick={LogOutButton}>
              <li>로그아웃</li>
            </Link>
          )}
        </ul>
      )}
    </div>
  );
}

export default UserMenu;
