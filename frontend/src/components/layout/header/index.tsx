import React from "react";
import styles from "@/components/layout/header/Header.module.scss";
import classNames from "classnames/bind";
import ConnectButton from "@/components/common/button/connectButton";
import BaseLogo from "@/components/common/logo/baseLogo";
import Link from "next/link";
import MenuIcon from "@/public/icon/menu-icon.svg";
import { useDispatch } from "react-redux";
import { SET_MODAL } from "@/states/global/slice/modal";
import ButtonBadge from "@/components/common/badge/buttonBadge";
import UseCountBadge from "@/components/common/badge/useCountBadge";

const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useDispatch();
  return (
    <header className={cx("header-container")}>
      <div className={cx("header-inner")}>
        <button
          className={cx("menu-button")}
          aria-label="sidebar-open-button"
          onClick={() => {
            dispatch(SET_MODAL({ key: "side-modal" }));
          }}
        >
          <MenuIcon viewBox="0 0 20 20" className={cx("menu-icon")} />
        </button>
        <BaseLogo />
        <nav className={cx("nav-container")}>
          <Link href={"/theory-of-aivolution"}>
            <div className={cx("nav-text-wrapper")}>
              <span className={cx("nav-text")}>Theory of AIvolution</span>
            </div>
          </Link>
          <Link href={"/building-in-public"}>
            <div className={cx("nav-text-wrapper")}>
              <span className={cx("nav-text")}>Building in Public</span>
            </div>
          </Link>
        </nav>
        <div className={cx("button-wrapper")}>
          {/* {(pathname === "building-in-public" ||
            pathname === "conversation") && <UseCountBadge />} */}
          <UseCountBadge />
          <ConnectButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
