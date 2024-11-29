import { Logo } from "@/components-new-design/reusable-components/Logo"
import { Socials } from "../../reusable-components/socials"
import ButtonYellow from "@/components-new-design/reusable-components/HomeButtonYellow"
import ButtonHollow from "@/components-new-design/reusable-components/HomeButtonHollow"

export const ButtonsSection = () => {
    return <div className="w-[80%] pt-20">
        <div className="flex flex-col w-full items-center justify-between flex-wrap pb-20 md:items-end md:flex-row">
            <Logo width={519} />
            <Socials
                discord="https://discord.gg/f8WQJyZGy8"
                twitter="https://x.com/PhoenixCorpsHQ"
                telegram="https://t.me/PhoenixcorpsOfficial"
            />
        </div>
        <div className="flex flex-col md:flex-row w-full justify-between flex-wrap gap-10  items-center">
            <div className="flex flex-col flex-wrap gap-5 md:flex-row items-center">
                <ButtonYellow width={280} mainText={"Open Dashboard"} link={"/dashboard"} rightText={"Sign Up"} />
                <ButtonYellow width={280} mainText={"Project / Startup"} link={"/"} rightText={"Sign Up"} />
                <ButtonYellow width={280} mainText={"Manage a team"} link={"/"} rightText={"Apply"} />
            </div>
            <div className="text-[#00ffff]">
                <ButtonHollow mainText={"READ THE DOCS"} link={"/"} />
            </div>
        </div>
    </div>
}
