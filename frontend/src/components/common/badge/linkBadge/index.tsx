import React from "react";
import styles from "@/components/common/badge/linkBadge/LinkBadge.module.scss";
import classNames from "classnames/bind";
import LinkIcon from "@/public/icon/link-icon.svg";
import Link from "next/link";

const cx = classNames.bind(styles);

type Props = {
  link: string;
  type: string;
  disabled?: boolean;
};

const LinkBadge = ({ link, type, disabled = false }: Props) => {
  if (disabled) {
    return (
      <div className={cx("badge", { disabled })}>
        <span className={cx("badge-text")}>{type}</span>
        <LinkIcon viewBox="0 0 24 24" className={cx("icon")} />
      </div>
    );
  }

  return (
    <Link href={link} target="_blank">
      <div className={cx("badge", { disabled })}>
        <span className={cx("badge-text")}>{type}</span>
        <LinkIcon viewBox="0 0 24 24" className={cx("icon")} />
      </div>
    </Link>
  );
};

export default LinkBadge;
