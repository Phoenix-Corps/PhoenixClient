import Image from "next/image";
import Arrow from "@public/buy/buy_now_arrow.svg"

export const BuyButton = (props: {
    onClick: () => void;
}) => {
    return (
        <div>
            <button className={`flex din button-front-yellow justify-between items-center text-[28px] p-4 rounded h-[61px] w-[200px]`}
                onClick={props.onClick}
            >
                <div className="main-text-button-front h-[34px]">BUY NOW</div>

                <Image
                    className="ml-[12px]"
                    src="/buy/buy_now_arrow.svg"
                    width={20}
                    height={10}
                    alt="right"
                />
            </button>
        </div >
    );
}