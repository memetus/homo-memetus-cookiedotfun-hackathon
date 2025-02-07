import React from "react";
import HomeClient from "@/app/client";
import { getMetadata } from "@/shared/lib/metadata";
import styles from "@/styles/pages/HomePage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const generateMetadata = async () => {
  return getMetadata({});
};

const HomePage = async () => {
  return (
    <main className={cx("page-container")}>
      <HomeClient />
    </main>
  );
};

export default HomePage;
