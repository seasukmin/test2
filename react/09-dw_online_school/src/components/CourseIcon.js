import React from "react";
import styles from "./CourseIcon.module.css";
import cn from "classnames";
import python from "../assets/icon--python.svg";
import algorithm from "../assets/icon--algorithm.svg";
import automation from "../assets/icon--automation.svg";
import architecture from "../assets/icon--computer-architecture.svg";
import datascience from "../assets/icon--data-science.svg";
import deeplearning from "../assets/icon--deep-learning.svg";
import defaultImg from "../assets/icon--default.svg";
import django from "../assets/icon--django.svg";
import ds from "../assets/icon--ds.svg";
import revolution from "../assets/icon--fourth-revolution.svg";
import git from "../assets/icon--git.svg";
import introcomputer from "../assets/icon--intro-to-computer.svg";
import java from "../assets/icon--java.svg";
import jquery from "../assets/icon--jquery.svg";
import js from "../assets/icon--js.svg";
import machinelearning from "../assets/icon--machine-learning.svg";
import nodejs from "../assets/icon--node-js.svg";
import oop from "../assets/icon--oop.svg";
import react from "../assets/icon--react.svg";
import sql from "../assets/icon--sql.svg";
import unix from "../assets/icon--unix.svg";
import webpublishing from "../assets/icon--web-publishing.svg";

const IMAGES = {
  algorithm: algorithm,
  automation: automation,
  "computer-architecture": architecture,
  "data-science": datascience,
  "deep-learning": deeplearning,
  django: django,
  ds: ds,
  "fourth-revolution": revolution,
  git: git,
  "intro-to-computer": introcomputer,
  java: java,
  jquery: jquery,
  js: js,
  "machine-learning": machinelearning,
  "node-js": nodejs,
  oop: oop,
  react: react,
  sql: sql,
  unix: unix,
  "web-publishing": webpublishing,
  python: python,
};

function CourseIcon({ className, photoUrl }) {
  const src = IMAGES[photoUrl];
  return <img className={cn(styles.courseIcon, className)} src={src} />;
}

export default CourseIcon;
