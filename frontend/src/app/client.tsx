"use client";
import styles from "@/styles/pages/ConversationClient.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import AIVolution from "@/public/assets/aivolution.png";
import ConversationBoard from "@/components/common/board/conversationBoard";
import ConversationInput from "@/components/common/input/conversationInput";
import ConversationProvider from "@/states/partial/conversation/ConversationProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL, getModal, SET_MODAL } from "@/states/global/slice/modal";
import { RootState } from "@/states/global/store";
import TokenCreationModal from "@/components/common/modal/tokenCreationModal";
import { ModalParamManager } from "@/shared/types/ui/modal";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const cx = classNames.bind(styles);

const HomeClient = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { connected, connecting } = useWallet();
  const tokenCreationModal = useSelector((state) =>
    getModal(state as RootState, "tokencreation-modal")
  );

  useEffect(() => {
    return () => {
      dispatch(CLOSE_MODAL({ key: "tokencreation-modal" }));
    };
  }, []);

  return (
    <div className={cx("client-container")}>
      <div className={cx("client-inner")}>
        <div className={cx("aivolution-wrapper")}>
          <Image
            src={AIVolution}
            alt="AIVolution"
            fill
            quality={100}
            priority
            className={cx("aivolution-image")}
          />
        </div>
        <div className={cx("text-wrapper")}>
          <h1 className={cx("main-title")}>strategy tokenization</h1>
          <div className={cx("main-desc-wrapper")}>
            <p className={cx("main-desc")}>
              Your AI agent-led funds are evolving to tokenize your trading
              strategy.
            </p>
            <p className={cx("main-desc")}>
              Envisioning DeFAI ETF infrastructure.
            </p>
          </div>
        </div>

        <div className={cx("button-wrapper")}>
          {!connected && (
            <button
              className={cx("button")}
              onClick={() => dispatch(SET_MODAL({ key: "wallet-modal" }))}
            >
              CONNECT WALLET
            </button>
          )}
          <button
            className={cx("button")}
            onClick={() => router.push("/dashboard")}
          >
            GO TO DASHBOARD
          </button>
        </div>
        {connected && (
          <ConversationProvider>
            <div className={cx("board-wrapper")}>
              <ConversationBoard />
            </div>
            <div className={cx("input-wrapper")}>
              <ConversationInput />
            </div>
          </ConversationProvider>
        )}
      </div>
      {tokenCreationModal && (
        <TokenCreationModal
          params={
            tokenCreationModal.params as (typeof ModalParamManager)["tokencreation-modal"]
          }
        />
      )}
    </div>
  );
};

export default HomeClient;
