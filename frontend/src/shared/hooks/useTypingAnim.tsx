import React, { useEffect, useState } from "react";

type Props = {
  text: string;
  ms?: number;
};

const useTypingAnim = ({ text, ms = 10 }: Props) => {
  const [current, setCurrent] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setCurrent((prev) => prev + text[index]);
        setIndex(index + 1);
      }, ms);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return {
    current,
  };
};

export default useTypingAnim;
