import Image from "next/image";
import REPRESENTATIVE from "../../../public/images/representative.png";

export default function RepresentativeSection() {
  return (
    <section className="representative-card">
      <div
        className="representative-card-inner"
        style={{
          display: "flex",
          flexDirection: "column",
          marginRight: "0px",
        }}
      >
        <h2 className="subtitle-phoenix-r">
          Benefits for Phoenix'{" "}
          <span className="representative-title">representatives</span>
        </h2>
      
        <Image
          src={REPRESENTATIVE}
          style={{ width: "100%", maxWidth: "314px", alignSelf: "flex-end", marginLeft: 100 }}
          alt="representative"
        />
      </div>

      <p
        className="representative-text"
        style={{ color: "#000", width: "100%", maxWidth: "958px" }}
      >
        Representatives of all ranks of all promotion teams will receive a % in
        commissions, either in stablecoin or native token (Ethereum or BNB for
        example) depending on the project being promoted in proportion to their
        effectiveness and reach, creating a{" "}
        <span className="representative-text-italic">
          "Work hard, earn hard"{" "}
        </span>{" "}
        situation for every participant.
        <br /> <br />
        No money will ever be required to become a representative.
      </p>
    </section>
  );
}
