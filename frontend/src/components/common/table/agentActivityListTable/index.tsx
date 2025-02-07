import React from "react";
import styles from "@/components/common/table/agentActivityListTable/AgentActivityListTable.module.scss";
import classNames from "classnames/bind";
import {
  AgentActivityListType,
  AgentActivityType,
} from "@/shared/types/data/portfolio";
import { fetchRelatedTimeDay, fetchUpdatedTime } from "@/shared/utils/date";
import { formatSignPrice } from "@/shared/utils/price";

const cx = classNames.bind(styles);

type Props = {
  data: AgentActivityListType | undefined;
  loading: boolean;
};

const AgentActivityListTable = ({ data, loading }: Props) => {
  return (
    <div className={cx("table-container")}>
      <div className={cx("table-wrapper")}>
        <table className={cx("table")}>
          <thead className={cx("table-header")}>
            <tr className={cx("tr")}>
              <th className={cx("th")}>Type</th>
              <th className={cx("th")}>Token</th>
              <th className={cx("th")}>Total USD</th>
              <th className={cx("th")}>Profit</th>
              <th className={cx("th")}>Age</th>
            </tr>
          </thead>
          <tbody className={cx("table-body")}>
            {loading ? (
              <tr className={cx("tr-loading")}>
                <td className={cx("td")}>Loading..</td>
              </tr>
            ) : (
              data?.results?.map((item: AgentActivityType, index: number) => {
                const profit =
                  item.profit === null
                    ? "-"
                    : formatSignPrice(item.profit.toFixed(2));
                const tatal =
                  item.total === null
                    ? "-"
                    : item.type === "buy"
                    ? `+$${item.total}`
                    : `-$${item.total}`;

                const isEarned = item.profit !== null && item.profit > 0;
                return (
                  <tr
                    key={`${item.token}-{${index}`}
                    className={cx("tr", { isLast: index === 10 })}
                  >
                    <td className={cx("td")}>
                      <button
                        className={cx("type", {
                          buy: item.type === "buy",
                          sell: item.type === "sell",
                        })}
                      >
                        {item.type === "buy" ? "Buy" : "Sell"}
                      </button>
                    </td>
                    <td className={cx("td")}>{item.token}</td>
                    <td
                      className={cx("td", {
                        isPlus: item.type === "buy",
                        isMinus: item.type === "sell",
                      })}
                    >
                      {tatal}
                    </td>
                    <td
                      className={cx("td", {
                        isPlus: isEarned && profit !== "-",
                        isMinus: !isEarned && profit !== "-",
                      })}
                    >
                      {profit}
                    </td>
                    <td className={cx("td")}>
                      {fetchRelatedTimeDay(item.createdAt, true)} ago
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className={cx("update-time-wrapper")}>
        <span className={cx("update-time-text")}>
          updates every 1 hour / last updated
          {` ${fetchUpdatedTime(new Date().toString())}`}
        </span>
        <span className={cx("total-text")}>
          Total {data?.totalCount ?? "-"}
          <span className={cx("name-text")}>transactions</span>
        </span>
      </div>
    </div>
  );
};

export default AgentActivityListTable;
