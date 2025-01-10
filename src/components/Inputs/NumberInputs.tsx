import Image from "next/image";

type Props = {
  amount?: number | null;
  tokenName?: string;
  imageSrc?: string;
  amountUpdated?: (amount: number | null) => void;
};

export const NumberInput: React.FC<Props> = (props: Props) => {
  return (
    <div className="flex flex-row items-center border border-[rgba(255, 255, 255, 0.3)] rounded w-full bg-gradient-to-b from-white/10 to-blue-300/20 p-2 ">
      <input
        className="flex-1 bg-transparent text-white text-lg font-bold placeholder-white/50 focus:outline-none px-4"
        value={props.amount?.toString() || ""}
        placeholder="0.00"
        onChange={(e: any) => props.amountUpdated?.(e.target.value || null)}
      />
      {props.imageSrc ? (
        <>
          <Image
            src={props.imageSrc}
            alt={props.tokenName ?? "Token Symbol"}
            width={30}
            height={30}
            style={{ objectFit: "contain" }}
          />
          <div className="w-[60px] pl-4 aeroport text-[10px]">
            {props.tokenName ?? ""}
          </div>
        </>
      ) : (
        <span className="text-sm text-white/50">...</span>
      )}
    </div>
  );
};
