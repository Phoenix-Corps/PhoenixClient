import BenefitsMain from "@/components-new-design/benefits-main/benefits-main";
import CommunityMain from "@/components-new-design/community-main/community-main";
import Main from "@/components-new-design/upper-main/upper-main";
export default function Home() {
  return (
    <>
      <div className="relative bg-center min-h-screen">
        <Main />
        <BenefitsMain />
        <CommunityMain />
      </div>
    </>
  );
}
