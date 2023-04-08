"use client";

import { useState, useEffect } from "react";
import Highlight, { defaultProps, type Language } from "prism-react-renderer";
import { useTheme } from "next-themes";
import darkTheme from "prism-react-renderer/themes/nightOwl";
import lightTheme from "prism-react-renderer/themes/nightOwlLight";

interface CodeProps {
  code: string;
  show: boolean;
  language: Language;
  animationDelay?: number;
  animated?: boolean;
}

export default function Code({
  code,
  show,
  language,
  animationDelay,
  animated,
}: CodeProps) {
  const [text, setText] = useState(animated ? "" : code);
  const { theme: applicationTheme } = useTheme();

  useEffect(() => {
    if (show && animated) {
      let i = 0;
      setTimeout(() => {
        const intervalId = setInterval(() => {
          setText(code.slice(0, i));
          i += 1;
          if (i > code.length) {
            clearInterval(intervalId);
          }
        }, 15);

        return () => clearInterval(intervalId);
      }, animationDelay || 150);
    }
  }, [code, show, animated, animationDelay]);

  // get number of lines using regex
  const lines = text.split(/\r\n|\r|\n/).length;

  const theme = applicationTheme === "light" ? lightTheme : darkTheme;

  return (
    <Highlight {...defaultProps} code={text} language={language} theme={theme}>
      {({ className, tokens, getLineProps, getTokenProps }) => (
        <pre
          className={`${className}transition-all w-fit bg-transparent duration-100 py-0 no-scrollbar`}
          style={{
            maxHeight: show ? lines * 24 : 0,
            opacity: show ? 1 : 0,
          }}
        >
          {tokens.map((line, index) => {
            // eslint-disable-next-line no-unused-vars
            const { key, ...rest } = getLineProps({ line, key: index });
            return (
              <div
                // eslint-disable-next-line react/no-array-index-key
                key={`line-${index}`}
                style={{ position: "relative" }}
                {...rest}
              >
                {line.map((token, idx) => {
                  const { key: lineKey, ...props } = getTokenProps({
                    token,
                    index,
                  });
                  // eslint-disable-next-line react/no-array-index-key
                  return <span key={`${idx} ${lineKey}`} {...props} />;
                })}
              </div>
            );
          })}
        </pre>
      )}
    </Highlight>
  );
}
