import React from "react";
import styles from "./ResultModal.module.css";
import { useNavigate } from "react-router-dom"; // useNavigate를 import합니다.

const ResultModal = ({ setModalstate, linkTo }) => {
  const navigate = useNavigate(); // useNavigate를 사용하여 navigate 함수를 얻습니다.

  const handleNavigate = () => {
    setModalstate(false); // 모달을 닫습니다.
    navigate(linkTo); // 지정된 링크로 페이지 이동을 수행합니다.
  };

  return (
    <div className={styles.modal}>
      <div className={styles.script}>
        <h5>입력완료되었습니다</h5>
      </div>
      <div className={styles.buttonBox}>
        <p onClick={handleNavigate}>목록으로 이동</p>
        <p onClick={(e) => (setModalstate(false), window.location.reload())}>
          확인
        </p>
      </div>
    </div>
  );
};
export default ResultModal;
