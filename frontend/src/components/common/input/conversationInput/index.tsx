import React, { useCallback, useEffect, useRef } from "react";
import styles from "@/components/common/input/conversationInput/ConversationInput.module.scss";
import classNames from "classnames/bind";
import SendIcon from "@/public/icon/send-icon.svg";
import { useConversation } from "@/states/partial/conversation/ConversationContext";
import BaseSpinner from "@/components/base/spinner/baseSpinner";

const cx = classNames.bind(styles);

const ConversationInput = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const {
    isLoading,
    input,
    setInput,
    setConversations,
    conversations,
    lastMessage,
    setLastMessage,
    status,
  } = useConversation();

  useEffect(() => {
    inputRef.current?.focus();
  }, [inputRef, isLoading, status]);

  const handleInput = useCallback(
    (text: string) => {
      const line = (text.match(/\n/g) || []).length;
      if (line >= 3 && inputRef.current) {
        inputRef.current.style.height = `${3 * 28}px`;
      } else if (inputRef.current) {
        inputRef.current.style.height = `${line * 28}px`;
      }
      setInput(text);
    },
    [input, isLoading]
  );

  if (status === "end") return null;

  return (
    <form className={cx("input-container")}>
      <textarea
        id="conversation-input"
        ref={inputRef}
        disabled={status !== "processing" || isLoading}
        className={cx("input")}
        placeholder="Create your investment strategy"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        onKeyDown={(e) => {
          // if (e.key === 'Enter') {
          //   e.preventDefault();
          //   e.stopPropagation();
          //   if (input.length > 0) {
          //     lastMessage &&
          //       setConversations([
          //         ...conversations,
          //         { ...lastMessage, handler: undefined },
          //       ]);
          //     setLastMessage({ type: 'user', content: input });
          //     setInput('');
          //   }
          // }
        }}
      />
      {isLoading && (
        <div className={cx("spinner-wrapper")}>
          <BaseSpinner type={"base"} color={"light"} size={16} />
        </div>
      )}
      <button
        className={cx("button")}
        disabled={status !== "processing" || isLoading}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (input.length > 0) {
            lastMessage &&
              setConversations([
                ...conversations,
                { ...lastMessage, handler: undefined },
              ]);
            setLastMessage({ type: "user", content: input });
            setInput("");
          }
        }}
      >
        <SendIcon viewBox="0 0 24 24" className={cx("button-icon")} />
      </button>
    </form>
  );
};

export default ConversationInput;
