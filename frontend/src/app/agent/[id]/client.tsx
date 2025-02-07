"use client";
import React from "react";
import styles from "@/styles/pages/AgentDetailClient.module.scss";
import classNames from "classnames/bind";
import ArrowLineLeftIcon from "@/public/icon/arrow-line-left-icon.svg";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "@/shared/constants/api";
import { getAgentMetadata, getAgentStat } from "@/shared/api/agent/api";
import {
  AgentMetadataType,
  AgentStatType,
} from "@/shared/types/data/agent.type";
import AgentStatTable from "@/components/common/table/agentStatTable";
import PortfolioContainer from "@/components/container/portfolioContainer";
import LinkBadge from "@/components/common/badge/linkBadge";
import { useCopy } from "@/shared/hooks/useCopy";
import CopyIcon from "@/public/icon/copy-icon.svg";
import CopyCheckIcon from "@/public/icon/copy-check-icon.svg";

const cx = classNames.bind(styles);

type Props = {
  id: string;
};

const AgentDetailClient = ({ id }: Props) => {
  const router = useRouter();
  const { textCopy, isCopied } = useCopy();
  const { data: metadata, isLoading: metadataLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_AGENT_METADATA, id],
    queryFn: () => getAgentMetadata(id) as Promise<AgentMetadataType | null>,
  });

  const { data: stat, isLoading: statLoading } = useQuery({
    queryKey: [QUERY_KEY.GET_AGENT_STAT, id],
    queryFn: () => getAgentStat(id) as Promise<AgentStatType | null>,
  });

  return (
    <div className={cx("client-container")}>
      <div className={cx("page-head")}>
        <button
          onClick={() => router.back()}
          aria-label="back-button"
          className={cx("back-button")}
        >
          <ArrowLineLeftIcon viewBox="0 0 24 22" className={cx("icon")} />
        </button>
        <div className={cx("metadata-wrapper")}>
          <h1 className={cx("agent-title")}>{metadata?.name}</h1>
          <div className={cx("text-wrapper")}>
            <span className={cx("text-label")}>CA</span>
            <div className={cx("ca-wrapper")}>
              <p
                className={cx("ca-address")}
                onClick={() => {
                  textCopy(metadata?.address as string);
                }}
              >
                {metadata?.address}
                <button
                  className={cx("copy-button")}
                  onClick={() => textCopy(metadata?.address as string)}
                >
                  {isCopied ? (
                    <CopyCheckIcon
                      viewBox="0 0 24 24"
                      className={cx("copy-button-icon")}
                    />
                  ) : (
                    <CopyIcon
                      viewBox="0 0 24 24"
                      className={cx("copy-button-icon")}
                    />
                  )}
                </button>
              </p>
            </div>
          </div>
          <div className={cx("text-wrapper")}>
            <span className={cx("text-label")}>Links</span>
            <div className={cx("link-wrapper")}>
              <LinkBadge
                type="Solscan"
                link={`https://solscan.io/token/${metadata?.address}?cluster=devnet`}
              />
              <LinkBadge type="Website" link={``} disabled={true} />
              <LinkBadge type="Twittter" link={``} disabled={true} />
              <LinkBadge type="Telegram" link={``} disabled={true} />
            </div>
            {/* <span className={cx("text-value")}>{metadata.}</span> */}
          </div>
          <div className={cx("text-wrapper")}>
            <span className={cx("text-label")}>Strategy</span>
            <span className={cx("text-value")}>{metadata?.strategy}</span>
          </div>
          <div className={cx("text-wrapper")}>
            <span className={cx("text-label")}>Fund Amount</span>
            <span
              className={cx("text-value")}
            >{`${metadata?.fundAmount} $SOL virtual fund`}</span>
          </div>
        </div>
        <div className={cx("stat-wrapper")}>
          <span className={cx("text-label")}>Stats</span>
          {metadata && stat && (
            <AgentStatTable
              name={metadata?.name}
              fundId={metadata?.fundId}
              nav={stat?.nav}
              realizedProfit={stat?.realizedProfit}
              unrealizedProfit={stat?.unrealizedProfit}
              totalPnL={stat?.totalPnL}
              createdAt={metadata?.createdAt}
            />
          )}
        </div>
        <div className={cx("portfolio-wrapper")}>
          <PortfolioContainer id={id} />
        </div>
      </div>
    </div>
  );
};

export default AgentDetailClient;
