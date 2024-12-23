import { SocialButton } from "@/components/Buttons/SocialButton";

export const Socials = (props: {
  discord: string;
  twitter: string;
  telegram: string;
}) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-[250px] h-[50px] pb-16 pt-5 flex flex-row justify-around">
        <SocialButton link={props.discord} src={"/icons/socials/discord.svg"} />
        <SocialButton link={props.twitter} src={"/icons/socials/twitter.svg"} />
        <SocialButton
          link={props.telegram}
          src={"/icons/socials/telegram.svg"}
        />
      </div>
      <div className="copyright-text">
        Copyright @2024 PHOENIX. All rights reserved.
      </div>
    </div>
  );
};
