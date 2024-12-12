import Image from "next/image";
import { useCallback, useMemo, useState } from "react";

export const SellerLinkBar = (props: { url: string }) => {
  const [isCodeCopied, setIsCodeCopied] = useState(false);

  const handleCopyCode = useCallback(
    (code: string) => {
      navigator.clipboard.writeText(code).then(() => {
        setIsCodeCopied(true);
      });
    },
    [setIsCodeCopied]
  );

  return (
    <div className="w-full md:w-[80%] max-w-[800px] flex md:flex-row flex-col din p-5 gap-[5px] items-center border rounded border-[rgba(255, 255, 255, 0.15)] m-auto mt-5">
      <div className="text-[24px] md:w-[200px] w:full text-left w-full">
        BEING A REP.?
      </div>
      <div className="aeroport text-[10px] md:w-auto w-full">
        You can use your own access code here to access the privatesale and have
        your commission money act as a cashback discount on your investment.
      </div>
      <button
        onClick={() => handleCopyCode(props.url)}
        className="md:w-auto w-full"
      >
        <div className="relative p-2 md:w-[200px] text-[16px] flex flex-row gap-[5px] bg-[rgba(0,255,255,0.15)] w-full">
          {props.url}
          <Image
            src="/pages/buy/copy_link.svg"
            width={18}
            height={18}
            alt="right"
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
    </div>
  );
};
