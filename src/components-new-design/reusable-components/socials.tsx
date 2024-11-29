import { SocialButton } from "@/components-new-design/reusable-components/SocialButton"

export const Socials = (props: {
    discord: string;
    twitter: string;
    telegram: string;
}) => {
    return <div className="flex flex-col items-center">
        <div className="w-[250px] h-[50px] pb-16 pt-5 flex flex-row justify-around" >
            <SocialButton link={props.discord} src={"/images/discord_icon.svg"} />
            <SocialButton link={props.twitter} src={"/images/twitter_icon.svg"} />
            <SocialButton link={props.telegram} src={"/images/telegram_icon.svg"} />
        </div>
        <div className="copyright-text">
            Copyright @2024 PHOENIX. All rights reserved.
        </div>
    </div>
}
