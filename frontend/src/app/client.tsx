"use client";
import styles from "@/styles/pages/ConversationClient.module.scss";
import classNames from "classnames/bind";
import Image from "next/image";
import AIVolution from "@/public/assets/aivolution.png";
import ConversationBoard from "@/components/common/board/conversationBoard";
import ConversationInput from "@/components/common/input/conversationInput";
import ConversationProvider from "@/states/partial/conversation/ConversationProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import ConnectButton from "@/components/common/button/connectButton";

const cx = classNames.bind(styles);

const HomeClient = () => {
  const { connected, connecting } = useWallet();

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
      {!connected && !connecting && (
        <div className={cx("connect-button-wrapper")}>
          <ConnectButton />
        </div>
      )}
    </div>
  );
};

export default HomeClient;
