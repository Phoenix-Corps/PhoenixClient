import Image from "next/image";
import Link from "next/link";

import PhoenixMini from "@public/pages/home/logo.png";

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
