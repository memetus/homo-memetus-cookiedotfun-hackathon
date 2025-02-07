import React from "react";
import styles from "@/components/common/card/starCard/StartCard.module.scss";
import classNames from "classnames/bind";
import ProfileBadge from "@/components/common/badge/profileBadge";
import useTypingAnim from "@/shared/hooks/useTypingAnim";
import { promptAgentIntroduce } from "@/shared/constants/agent";

const cx = classNames.bind(styles);

const StartCard = () => {
  const { current } = useTypingAnim({ text: promptAgentIntroduce });

  return (
    <div className={cx("assistant-container")}>
      <div className={cx("inner")}>
        <div className={cx("badge")}>
          <ProfileBadge text="A" />
        </div>
        <div className={cx("text-wrapper")}>
          <span className={cx(`assistant-text`)}>{current}</span>
        </div>
      </div>
    </div>
  );
};

export default StartCard;
