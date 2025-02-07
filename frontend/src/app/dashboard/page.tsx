import React from "react";
import DashboardClient from "@/app/dashboard/client";
import { getMetadata } from "@/shared/lib/metadata";
import styles from "@/styles/pages/DashbaordPage.module.scss";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

export const generateMetadata = async () => {
  return getMetadata({
    title: "HOMO MEMETUS | Best Virtual Practice Dashboard",
  });
};

const DashboardPage = async () => {
  return (
    <main className={cx("page-container")}>
      <DashboardClient />
    </main>
  );
};

export default DashboardPage;
