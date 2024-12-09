import { BenefitsMain } from "@/components/pages/home/benefits-main/benefits-main";
import { CommunityMain } from "@/components/pages/home/community-main/community-main";
import { Main } from "@/components/pages/home/upper-main/upper-main";
import { BottomSection } from "@/components/pages/home/bottom-section/bottom-section";

export default function Home() {
  return (
    <>
      <div className="relative bg-center min-h-screen">
        <Main />
        <BenefitsMain />
        <CommunityMain />
        <BottomSection />
      </div>
    </>
  );
}
