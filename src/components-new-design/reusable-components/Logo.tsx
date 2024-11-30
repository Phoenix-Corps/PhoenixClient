import Image from "next/image";
import PhoenixMini from "@public/home/LOGO.png";
import Link from "next/link";

export const Logo = (props: { width: number }) => {
  const width = props.width;
  const height = (width / 162) * 35;
  return (
    <div className={`w-[${width}px] h-[${height}px] relative`}>
      <Link href="/">
        <Image
          src={PhoenixMini.src}
          width={width}
          height={height}
          alt="phoenix-mini"
        />
      </Link>
    </div>
  );
};
