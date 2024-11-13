const CommunitySection = () => {
  return (
    <section className="dark-card-border mt-10 w-[1000px] max-w-[95%]">
      <h2 className="subtitle" style={{ maxWidth: "502px" }}>
        The <span className="text-yellow">power</span> of true and fair
        community fundraising
      </h2>
      <p
        className="text noto-serif"
        style={{
          maxWidth: "537.93px",
          textAlign: "left",
          marginLeft: "unset",
          alignSelf: "flex-end",
          marginTop: "17px",
          fontWeight: 300
        }}
      >
        <span className="text-bold noto-serif">Phoenix</span> empowers it's army
        of representatives to earn money without investing money by{" "}
        <span className="text-bold noto-serif">
          promoting projects, fostering community growth and sharing earned
          commission money
        </span>{" "}
        in a honest and proportional way to ensure sustainability for both
        Phoenix and the projects it will gather funds for and for the investors
        that will be investing in these private sales.
      </p>
    </section>
  );
};

export default CommunitySection;
