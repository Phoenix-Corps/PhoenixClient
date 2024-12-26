import { useCallback, useState } from "react";

import Image from "next/image";

import Icon_Copy from "@public/icons/copy.svg";

type Props = {
  value: string;
  text?: string;
  className?: string;
  textClassName?: string;
  iconClassName?: string;
};

export const CopyField: React.FC<Props> = (props: Props) => {
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  const handleCopy = useCallback(
    (code: string) => {
      navigator.clipboard.writeText(code).then(() => {
        setIsCodeCopied(true);
      });
    },
    [setIsCodeCopied]
  );

  return (
    <button
      onClick={() => handleCopy(props.value)}
      className="md:w-auto w-full"
    >
      <div
        className={`relative p-2 flex flex-row gap-[5px] items-center justify-center ${
          props.className ?? ""
        }`}
      >
        <div className={`${props.textClassName ?? ""}`}>
          {props.text ?? props.value}
        </div>
        <Icon_Copy
          className={`${props.iconClassName ?? ""}`}
          width={18}
          height={18}
        />
        {isCodeCopied && (
          <p
            className="flex added-fade-out absolute -right-2 -top-2"
            onAnimationEnd={() => setIsCodeCopied(false)}
          >
            Copied!
          </p>
        )}
      </div>
    </button>
  );
};
