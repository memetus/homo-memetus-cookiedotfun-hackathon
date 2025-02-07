import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import styles from "@/components/common/board/conversationBoard/ConversationBoard.module.scss";
import classNames from "classnames/bind";
import { useConversation } from "@/states/partial/conversation/ConversationContext";
import { ConversationType } from "@/shared/types/data/conversation.type";
import ConversationCard from "@/components/common/card/conversationCard";
import { promptAgentExhausted } from "@/shared/constants/agent";
import { useDispatch } from "react-redux";
import { SET_TOAST } from "@/states/global/slice/toast";
import { getUsedCount, updateUseCount } from "@/shared/api/strategy/api";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEY } from "@/shared/constants/api";
import { getCookie } from "cookies-next";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";
import ConfirmCard from "@/components/common/card/confirmCard";
import TokenCard from "@/components/common/card/tokenCard";
import TokenUserCard from "@/components/common/card/tokenUserCard";
import StartCard from "@/components/common/card/starCard";

const cx = classNames.bind(styles);

const ConversationBoard = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { connected } = useWallet();
  const [isStart, setIsStart] = useState<boolean>(false);
  const [useCount, setUseCount] = useState<number | undefined>(undefined);
  const {
    conversations,
    lastMessage,
    setStatus,
    status,
    strategy,
    setConversations,
    setLastMessage,
    setInput,
    tokenGenerating,
    isLoading,
    token,
  } = useConversation();
  const [loginLoading, setLoginLoading] = useState<boolean>(true);

  const scrollRef = useRef<HTMLDivElement>(null);
  const queryClieint = useQueryClient();

  useEffect(() => {
    setLoginLoading(true);
    setTimeout(() => {
      const accessToken = getCookie("accessToken");
      getUsedCount(accessToken?.toString()).then((data) => {
        data && setUseCount(data.createdNumber);
        queryClieint.invalidateQueries({
          queryKey: [QUERY_KEY.GET_USED_COUNT, accessToken],
        });
        if (data && data.createdNumber >= 5) {
          setStatus("end");
          dispatch(
            SET_TOAST({
              type: "strategy-fail",
              canClose: true,
              autoClose: {
                duration: 5000,
              },
            })
          );
        } else {
          setStatus("processing");
        }
      });
      setTimeout(() => {
        setLoginLoading(false);
      }, 500);
    }, 200);
  }, [connected, isLoading]);

  const handleRestart = useCallback(async () => {
    if (useCount === undefined || useCount >= 5) {
      setStatus("end");
      dispatch(
        SET_TOAST({
          type: "strategy-fail",
          canClose: true,
          autoClose: {
            duration: 5000,
          },
        })
      );
    } else {
      await updateUseCount();
      queryClieint.invalidateQueries({
        queryKey: [QUERY_KEY.GET_USED_COUNT],
      });
      setLastMessage(null);
      setConversations([]);
      setInput("");
      setStatus("processing");
    }
  }, [useCount, dispatch, conversations, lastMessage, status]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [isLoading, tokenGenerating, status]);

  return (
    <div className={cx("board-container")} ref={scrollRef}>
      {status !== "processing" && loginLoading ? null : status !==
          "processing" &&
        (useCount === undefined || useCount >= 5) ? (
        <div className={cx("item-wrapper")}>
          <ConversationCard
            type={"assistant"}
            content={promptAgentExhausted}
            handler={{
              name: "strategy",
              onClick: () => router.push("/strategy"),
            }}
          />
        </div>
      ) : (
        <div className={cx("item-wrapper")}>
          <StartCard />
        </div>
      )}
      {conversations.map((conversation: ConversationType, index: number) => {
        return (
          <div key={index} className={cx("item-wrapper")}>
            <ConversationCard
              type={conversation.type}
              content={conversation.content}
              handler={conversation.handler}
            />
          </div>
        );
      })}
      {lastMessage && (
        <div className={cx("item-wrapper")}>
          <ConversationCard
            type={lastMessage.type}
            content={lastMessage.content}
            handler={lastMessage.handler}
          />
        </div>
      )}
      {(status === "confirm" || status === "token") && (
        <div className={cx("result-wrapper")}>
          <ConfirmCard />
        </div>
      )}
      {status === "token" && token && (
        <div className={cx("item-wrapper")}>
          <TokenUserCard token={token} />
        </div>
      )}
      {status === "token" && token && strategy && (
        <div className={cx("item-wrapper")}>
          <TokenCard token={token} strategy={strategy} />
        </div>
      )}
    </div>
  );
};

export default ConversationBoard;
