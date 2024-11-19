import Image from "next/image";
import BACKGROUND_IMAGE from "@public/images/BACKGROUND.webp";
import REPRESENTATIVE_IMAGE from "../../public/images/representative.png";
import Slider from "../components/slider/slider";
import Hero from "../components/hero/hero";
import HeadingSection from "../components/heading/heading";
import CommunitySection from "../components/community/community";
import RepresentativeSection from "../components/representative/representative";
import CollaborationSection from "./collaboration";
import Footer from "@/components/footer/footer";
import ProjectsSection from "@/components/projects/projects";


export default function Home() {
  return (
    <>
      <div
        className="relative bg-no-repeat bg-center min-h-screen"
        style={{
          backgroundImage: `url(${BACKGROUND_IMAGE.src})`,
          backgroundSize: "100% 100%",
          backgroundPosition: "center",
          backgroundAttachment: "scroll",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Hero />

        <HeadingSection />

        <ProjectsSection />

        <CommunitySection />

        <RepresentativeSection />

        <CollaborationSection />

        <div className="paper-container max-w-[100%] mt-10">
          <h2 className="paper"> WHITEPAPERS</h2>
          <div className="button-group">
            <span className="button-container">
              <button className="button">
                <span className="button-label">Whitepaper for</span>
                <span className="button-text">representatives</span>
              </button>
            </span>

            <span className="button-container button-container-purple">
              <button className="button button-purple">
                <span className="button-label">Whitepaper for</span>
                <span className="button-text">Projects and startups</span>
              </button>
            </span>

            <span className="button-container button-container-yellow">
              <button className="button button-yellow">
                <span className="button-label">Whitepaper for</span>
                <span className="button-text">investors</span>
              </button>
            </span>
          </div>
        </div>

        {/* <section className="become-phoenix-card mt-10 w-[1000px]"> */}
        <section className="become-phoenix-card mt-10 w-[1000px] max-w-[95%]">
          <div
            className="representative-card-inner"
            style={{ marginBottom: 20, marginRight: 20 }}
          >
            <h2 className="subtitle-phoenix">
              Become a Phoenix{" "}
              <span
                className="representative-title"
                style={{ textTransform: "uppercase" }}
              >
                representative
              </span>
            </h2>

            <Image
              src={REPRESENTATIVE_IMAGE}
              style={{ width: "314px", marginLeft: "40px" }}
              alt="representative"
            />
          </div>

          <p
            className="text font-light noto-serif text-xl"
            style={{
              width: "100%",
              textAlign: "left",
              marginLeft: 0
            }}
          >
            Join Phoenix, humanity's wings of financial freedom. Be part of a
            vast network of representatives by applying for a free “Shinobi”
            account by pressing the “Sign up” button and fill pit the form (no
            KYC required) or get a head start in commission % by finding a
            representative with a{" "}
            <span className="text-bold noto-serif">
              “Phoenix General of army”, “Phoenix Colonel”
            </span>
            or{" "}
            <span className="text-bold noto-serif">
              “Phoenix Seargant Major”
            </span>{" "}
            account and have them sign you up as one of their representatives
            and becoming part of their team.
            <br />
            <br /> For the exact details please read the whitepaper and see what
            the best option is for you. Sign up link for the “Shinobi alliance”
            aka the solo player's team can be found on the bottom of the
            website.
          </p>
        </section>

        <div className="slider-wrapper mt-10">
          <h2
            className="subtitle text-black"
            style={{ margin: "auto", textAlign: "center" }}
          >
            How to get started
          </h2>
          <h2
            className="title text-yellow-r"
            style={{ margin: "auto", textAlign: "center" }}
          >
            as a project
          </h2>
          <div className="divider" />
        </div>

        <Slider />
      </div>

      <Footer />
    </>
  );
}
