import { CopyField } from "@/components/Inputs/CopyField";

export const SellerLinkBar = (props: { url: string }) => {
  return (
    <div className="w-full md:w-[80%] max-w-[800px] flex md:flex-row flex-col din p-5 gap-[5px] items-center border rounded border-[rgba(255, 255, 255, 0.15)] m-auto mt-5">
      <div className="text-[24px] md:w-[200px] w:full text-left w-full">
        BEING A REP.?
      </div>
      <div className="aeroport text-[10px] md:w-auto w-full">
        You can use your own access code here to access the privatesale and have
        your commission money act as a cashback discount on your investment.
      </div>
      <CopyField
        value={props.url}
        className="aeroport bg-[rgba(0,255,255,0.15)] text-[10px] md:w-[200px] w-full "
      />
    </div>
  );
};
