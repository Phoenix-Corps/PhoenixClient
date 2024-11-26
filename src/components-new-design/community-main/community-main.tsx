import React from "react";
import ArrowBullet from "@public/arrow-bullet.svg";
import LineBullet from "@public/line-bullet.svg";

const CommunityMain: React.FC = () => {
  return (
    <section className="community-main-gradient">
      <div className="container mx-auto px-6 py-32">
        <h2
          className="font-header text-center"
          style={{ transform: "scaleY(1.3)" }}
        >
          TRUE COMMUNITY FUNDED CAPITAL
        </h2>
        <p
          className="font-subheader text-center"
          style={{ transform: "scaleY(1.3)" }}
        >
          TO BUILD AND OPERATE YOUR PROJECT
        </p>
        <div className="font-items flex flex-col items-center pt-10 relative text-left">
          {/* <LineBullet /> */}
          <div className="item-row flex items-center text-justify">
            <ArrowBullet />
            <div className="justify-center ml-8 pt-2 max-w-[650px]">
              Projects that choose to collaborate with Phoenix to raise their
              starting capital will have access to a{" "}
              <b>
                vast network of representatives from all over the world and
                thousands of crypto communities
              </b>{" "}
              to have a substantial and diverse financial injection.
            </div>
          </div>
          <div className="item-row flex items-center text-justify">
            <ArrowBullet />
            <div className="justify-center ml-8 pt-2 max-w-[650px]">
              Instead of having a few big investors scooping up all of the
              project's most attractive offerings in secret seed sales thus
              giving them the power to destroy projects by dumping on them you
              will have tons of smaller holders instead.
            </div>
          </div>
          <div className="item-row flex items-center text-justify">
            <ArrowBullet />
            <div className="justify-center ml-8 pt-2 max-w-[650px]">
              This leads to a far more stable price action after launch + a way
              bigger and more committed and involved community.{" "}
              <b>Phoenix is the key solution</b> to ensure a sustainable, fair
              and smooth way to raise the required capital while Phoenix handles
              all the tracking and compensation.
            </div>
          </div>
          <div className="item-row flex items-center text-justify">
            <ArrowBullet />
            <div className="justify-center ml-8 pt-2 max-w-[650px]">
              The link to the <b>application form</b> for projects and startups
              is located on the bottom of the website.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunityMain;
