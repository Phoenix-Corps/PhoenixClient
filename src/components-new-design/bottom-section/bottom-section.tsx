import { RepCard } from "./rep-card";
import WhitepapersSection from "./whitepapers-main";

export const BottomSection = () => {
  return <div className="pt-20 pb-20 bottom-section-wrapper flex flex-col items-center gap-10">
    <WhitepapersSection />
    <RepCard />
  </div>
}
