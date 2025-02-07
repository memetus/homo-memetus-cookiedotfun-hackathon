import React, { useMemo } from "react";
import styles from "@/components/common/card/tokenUserCard/TokenUserCard.module.scss";
import classNames from "classnames/bind";
import ProfileBadge from "@/components/common/badge/profileBadge";

const cx = classNames.bind(styles);

type Props = {
  token: string;
};

const TokenUserCard = ({ token }: Props) => {
  const symbol = useMemo(() => {
    if (token.startsWith("$")) return token;
    return `$${token}`;
  }, [token]);
  return (
    <div className={cx("user-container")}>
      <div className={cx("inner")}>
        <span className={cx(`user-text`)}>{symbol}</span>
        <div className={cx("badge")}>
          <ProfileBadge text="U" />
        </div>
      </div>
    </div>
  );
};

export default TokenUserCard;
