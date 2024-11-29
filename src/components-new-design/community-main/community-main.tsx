import React, { ReactChildren, ReactNode } from "react";
import ArrowBullet from "@public/arrow-bullet.svg";
import LineBullet from "@public/line-bullet.svg";
import Image from "next/image";

const Item = (props: { children: ReactNode[] }) => {
  return <div className="item-row flex items-center text-justify">
    <div className="w-[50px]">
      <ArrowBullet />
    </div>
    <div className="justify-center ml-8 pt-2 max-w-[650px]">
      {...props.children}
    </div>
  </div>
}

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
          <Item>
              Projects that choose to collaborate with Phoenix to raise their
              starting capital will have access to a{" "}
              <b>
                vast network of representatives from all over the world and
                thousands of crypto communities
              </b>{" "}
              to have a substantial and diverse financial injection.
          </Item>
          <Item>

              Instead of having a few big investors scooping up all of the
              project's most attractive offerings in secret seed sales thus
              giving them the power to destroy projects by dumping on them you
              will have tons of smaller holders instead.

            <div></div>
          </Item>
          <Item>

              This leads to a far more stable price action after launch + a way
              bigger and more committed and involved community.{" "}
              <b>Phoenix is the key solution</b> to ensure a sustainable, fair
              and smooth way to raise the required capital while Phoenix handles
              all the tracking and compensation.
          </Item>
          <Item>

              The link to the <b>application form</b> for projects and startups
              is located on the bottom of the website.
          </Item>
        </div>
      </div>
    </section>
  );
};

export default CommunityMain;
