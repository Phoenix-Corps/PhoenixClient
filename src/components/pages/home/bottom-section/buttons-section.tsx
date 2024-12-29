import { Logo } from "@/components/Page/Logo";
import { Socials } from "@/components/Page/Socials";
import { ButtonYellow } from "@/components/Buttons/ButtonYellow";
import { ButtonHollow } from "@/components/Buttons/ButtonHollow";

import pageConfig from "@/config/page.json";

export const ButtonsSection = () => {
  return (
    <div className="w-[80%] pt-20">
      <div className="flex flex-col w-full items-center justify-between flex-wrap pb-20 md:items-end md:flex-row">
        <Logo width={519} />
        <Socials
          discord={pageConfig.socials.discord}
          twitter={pageConfig.socials.twitter}
          telegram={pageConfig.socials.telegram}
        />
      </div>
      <div className="flex flex-col md:flex-row w-full justify-between flex-wrap gap-10  items-center">
        <div className="flex flex-col flex-wrap gap-5 md:flex-row items-center">
          <ButtonYellow
            width={280}
            mainText={"Dashboard"}
            link={"/dashboard"}
            rightText={"Sign Up"}
          />
          <ButtonYellow
            width={280}
            mainText={"Project / Startup"}
            link={pageConfig.forms.projects}
            target="_blank"
            rightText={"Sign Up"}
          />
          <ButtonYellow
            width={280}
            mainText={"Manage a team"}
            link={pageConfig.forms.teamManager}
            target="_blank"
            rightText={"Apply"}
          />
        </div>
        <div className="text-[#00ffff]">
          <ButtonHollow
            mainText={"READ THE DOCS"}
            link={pageConfig.documentation}
          />
        </div>
      </div>
    </div>
  );
};
