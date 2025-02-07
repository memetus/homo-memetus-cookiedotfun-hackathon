import React, { useMemo } from "react";
import styles from "@/components/common/card/tokenCard/TokenCard.module.scss";
import classNames from "classnames/bind";
import ProfileBadge from "@/components/common/badge/profileBadge";
import ConversationButton from "@/components/common/button/conversationButton";
import { useDispatch } from "react-redux";
import { SET_MODAL } from "@/states/global/slice/modal";
import { useConversation } from "@/states/partial/conversation/ConversationContext";
import { QUERY_KEY } from "@/shared/constants/api";
import { useQueryClient } from "@tanstack/react-query";
import useTypingAnim from "@/shared/hooks/useTypingAnim";

const cx = classNames.bind(styles);

type Props = {
  token: string;
  strategy: string;
};

const TokenCard = ({ token, strategy }: Props) => {
  const queryClieint = useQueryClient();
  const { setInput, setToken, setStatus, setLastMessage, setConversations } =
    useConversation();
  const symbol = useMemo(() => {
    if (token.startsWith("$")) return token;
    return `$${token}`;
  }, [token]);
  const dispatch = useDispatch();
  const { current } = useTypingAnim({
    text: `Create ${symbol} token and agent?!`,
  });

  return (
    <div className={cx("assistant-container")}>
      <div className={cx("inner")}>
        <div className={cx("badge")}>
          <ProfileBadge text="A" />
        </div>
        <span className={cx(`assistant-text`)}>{current}</span>
        <div className={cx("button-wrapper")}>
          <ConversationButton
            type={"token"}
            onClick={() => {
              dispatch(
                SET_MODAL({
                  key: "tokencreation-modal",
                  params: { token: token, strategy: strategy },
                })
              );
            }}
          />
          <ConversationButton
            type={"startover"}
            onClick={() => {
              setInput("");
              setToken("");
              setStatus("processing");
              setLastMessage(null);
              setConversations([]);
              queryClieint.invalidateQueries({
                queryKey: [QUERY_KEY.GET_USED_COUNT],
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
