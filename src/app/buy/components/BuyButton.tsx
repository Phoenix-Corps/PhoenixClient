import Image from "next/image";

export const BuyButton = (props: { onClick: () => void }) => {
  return (
    <div className="md:w-[200px] w-full">
      <button
        className={`flex din button-front-yellow justify-between items-center text-[28px] p-4 rounded h-[61px] md:w-[200px] w-full`}
        onClick={props.onClick}
      >
        <div className="main-text-button-front h-[34px]">BUY NOW</div>

        <Image
          className="ml-[12px]"
          src="/pages/buy/buy_now_arrow.svg"
          width={20}
          height={10}
          alt="right"
        />
      </button>
    </div>
  );
};
