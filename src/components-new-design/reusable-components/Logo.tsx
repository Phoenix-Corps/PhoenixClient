import Image from "next/image";
import PhoenixMini from "@public/home/Logo.png";

export const Logo = (props: { width: number }) => {
    const width = props.width;
    const height = width / 162 * 35;
    return <div className={`w-[${width}px] h-[${height}px] relative`}>
        <Image
            src={PhoenixMini.src}
            width={width}
            height={height}
            alt="phoenix-mini"
        />
    </div >;
}