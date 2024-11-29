import Image from "next/image";
import { useCallback, useMemo, useState } from "react"

export const SellerLinkBar = (props: {
    url: string;
}) => {
    const [isCodeCopied, setIsCodeCopied] = useState(false);

    const handleCopyCode = useCallback((code: string) => {
        navigator.clipboard.writeText(code).then(() => {
            setIsCodeCopied(true);
        });
    }, [setIsCodeCopied]);

    return <div className="w-[90%] md:w-[80%] max-w-[800px] flex flex-row din p-5 gap-[5px] items-center border rounded border-[rgba(255, 255, 255, 0.15)]">
        <div className="text-[24px] w-[200px]">
            BEING A SELLER?
        </div>
        <div className="aeroport text-[10px]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
        </div>
        <button onClick={() => handleCopyCode(props.url)}>
            <div className="relative p-2 w-[200px] text-[16px] flex flex-row gap-[5px] bg-[rgba(0,255,255,0.15)]">
                {props.url}
                <Image
                    src="/buy/copy_link.svg"
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
}