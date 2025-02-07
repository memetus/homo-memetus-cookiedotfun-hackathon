import React from "react";
import styles from "@/components/common/card/confirmCard/ConfirmCard.module.scss";
import classNames from "classnames/bind";
import ProfileBadge from "@/components/common/badge/profileBadge";
import useTypingAnim from "@/shared/hooks/useTypingAnim";

const cx = classNames.bind(styles);

const ConfirmCard = () => {
  const { current } = useTypingAnim({
    text: "Please enter a ticker for your token.",
  });
  return (
    <div className={cx("assistant-container")}>
      <div className={cx("inner")}>
        <div className={cx("badge")}>
          <ProfileBadge text="A" />
        </div>
        <div className={cx("text-wrapper")}>
          <span className={cx(`assistant-text`)}>Confirmed!</span>
          <span className={cx(`assistant-text`)}>{current}</span>
        </div>
      </div>
    </div>
  );
};

export default ConfirmCard;
