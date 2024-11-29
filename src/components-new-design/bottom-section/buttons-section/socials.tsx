import Image, { StaticImageData } from "next/image";
import DISCORD from "@public/images/discord_icon.svg";
import TWITTER from "@public/images/twitter_icon.svg";
import TELEGRAM from "@public/images/telegram_icon.svg";

const SocialButton = (props: {
    link: string;
    src: string;
}) => {
    return <a
        href={props.link}
        target="_blank"
        rel="noreferrer"
        className="w-[50px] h-[50px]"
    >
        <Image
            alt="cursor discord"
            className="social-icon"
            src={props.src}
            width={50}
            height={50}
        />
    </a>
}

export const Socials = () => {
    return <div className="flex flex-col items-center">
        <div className="w-[250px] h-[50px] pb-16 pt-5 flex flex-row justify-around" >
            <SocialButton link="https://discord.gg/f8WQJyZGy8" src={"/images/discord_icon.svg"} />
            <SocialButton link="https://x.com/PhoenixCorpsHQ" src={"/images/twitter_icon.svg"} />
            <SocialButton link="https://t.me/PhoenixcorpsOfficial" src={"/images/telegram_icon.svg"} />
        </div>
        <div className="copyright-text">
            Copyright @2024 PHOENIX. All rights reserved.
        </div>
    </div>
}