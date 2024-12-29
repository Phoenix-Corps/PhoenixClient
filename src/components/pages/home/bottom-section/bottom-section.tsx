import { ButtonsSection } from "./buttons-section";
import { RepCard } from "./rep-card";
import WhitepapersSection from "./whitepapers-main";

import "./bottom-section.css";

export const BottomSection = () => {
  return (
    <div className="pt-20 pb-20 bottom-section-wrapper flex flex-col items-center gap-10">
      <WhitepapersSection />
      <RepCard />
      <ButtonsSection />
    </div>
  );
};
