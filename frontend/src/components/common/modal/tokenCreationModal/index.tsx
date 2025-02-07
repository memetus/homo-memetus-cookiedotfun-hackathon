import React, { useState } from "react";
import styles from "@/components/common/modal/tokenCreationModal/TokenCreationModal.module.scss";
import classNames from "classnames/bind";
import { ModalParamManager } from "@/shared/types/ui/modal";
import ConfirmIcon from "@/public/icon/confirm-icon.svg";
import Link from "next/link";
import { useCopy } from "@/shared/hooks/useCopy";
import CopyIcon from "@/public/icon/copy-icon.svg";
import CopyCheckIcon from "@/public/icon/copy-check-icon.svg";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { MUTATION_KEY } from "@/shared/constants/api";
import { createAgent } from "@/shared/api/agent/api";
import { getCookie } from "cookies-next";
import Confetti from "react-confetti";

const cx = classNames.bind(styles);

type Props = {
  params: (typeof ModalParamManager)["tokencreation-modal"];
};

const TokenCreationModal = ({ params }: Props) => {
  const [page, setPage] = useState<1 | 2>(1);
  const [tokenAddress, setTokenAddress] = useState<string | null>(null);
  const { isCopied, textCopy } = useCopy();
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();

  const createTokenMutation = useMutation({
    mutationKey: [MUTATION_KEY.CREATE_AGENT, params.token],
    mutationFn: createAgent,
    onSuccess: (data) => {
      if (data !== null) {
        setId(data._id);
        setName(data.name);
        setTokenAddress(data.address);
        setPage(2);
      }
    },
  });

  return (
    <section className={cx("modal-container")}>
      {page === 1 ? (
        <div className={cx("first-inner")}>
          <h3 className={cx("modal-title")}>BEFORE YOU GO ON...</h3>
          <p className={cx("modal-text")}>
            This product version is live for the Cookie DeFAI hackathon.
          </p>
          <p className={cx("modal-text")}>
            Token creation is available via SendAI Solana Agent Kit, but Raydium
            pool creation is currently disabled for users.
          </p>
          <p className={cx("modal-text")}>
            For full Raydium pool creation code, visit our
            <Link href={"https://github.com/memetus"} target="_blank">
              <span className={cx("modal-text-link")}>GitHub repository</span>
            </Link>
            .
          </p>
          <div className={cx("future-update")}>
            <span className={cx("future-update-title")}>
              Future updates will include:
            </span>
            <ul className={cx("text-wrapper")}>
              <li className={cx("text-ul")}>
                Fundraising stage with your trading strategy
              </li>
              <li className={cx("text-ul")}>
                Token launch on Raydium upon raising 100 $SOL
              </li>
              <li className={cx("text-ul")}>
                Token allocation to AI agent-led fund investors
              </li>
              <li className={cx("text-ul")}>
                Fund distribution to token holders at maturity
              </li>
            </ul>
          </div>
          <p className={cx("check-text")}>
            ➡️ Ready to proceed with token creation to test our product?
          </p>
          <button
            className={cx("button")}
            role="button"
            onClick={() => {
              const accessToken = getCookie("accessToken");
              if (params.token && params.strategy && accessToken) {
                createTokenMutation.mutate({
                  symbol: params.token,
                  strategyPrompt: params.strategy,
                  accessToken: accessToken as string,
                });
              }
            }}
          >
            <ConfirmIcon viewBox="0 0 18 15" className={cx("icon")} />
            Yes
          </button>
        </div>
      ) : (
        <div className={cx("second-inner")}>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            tweenDuration={2000}
            run={true}
          />
          <h3 className={cx("modal-title")}>TOKEZNIED 🎉</h3>
          <p className={cx("modal-text")}>
            ${params.token} has been successfully tokenized with its own agent!
          </p>
          <div className={cx("ca-wrapper")}>
            <p className={cx("ca-text")}>CA: </p>
            <p
              className={cx("ca-address")}
              onClick={() => {
                textCopy(tokenAddress as string);
              }}
            >
              {tokenAddress}
              <button
                className={cx("copy-button")}
                onClick={() => textCopy(tokenAddress as string)}
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
          <p className={cx("modal-dashboard")}>
            Go to Dashboard to see how it trades according to your strategy.
          </p>
          <button
            className={cx("button")}
            onClick={() => router.push(`/agent/${id}?name=${name}`)}
          >
            Check Dashboard
          </button>
        </div>
      )}
    </section>
  );
};

export default TokenCreationModal;
