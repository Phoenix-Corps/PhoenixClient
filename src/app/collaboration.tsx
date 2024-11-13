export default function CollaborationSection() {
  return (
    <section className="mt-10">
      <h1
        className="title text-yellow-r max-w-[90%]"
        style={{
          margin: "auto",
          textAlign: "center"
        }}
      >
        True community funded capital {""}
      </h1>

      <h1
        className="subtitle text-3xl md:text-[42px] md:text-black max-w-[90%]"
        style={{ margin: "auto", textAlign: "center" }}
      >
        to build and operate your project
      </h1>

      <div className="dark-card max-w-[1000px] pt-[28px]">
        <div className="divider" style={{ marginTop: -1 }} />

        <div
          className="dark-card-inner"
          style={{
            display: "flex",
            flexDirection: "row"
          }}
        >
          <p
            className="text noto-serif font-extralight text-xl"
            style={{
              width: "50%",
              textAlign: "left",
              // fontWeight: 200,
              marginRight: "30px"
            }}
          >
            Projects that choose to collaborate with Phoenix to raise their
            starting capital will have access to a{" "}
            <span className="text-bold noto-serif">
              vast network of representatives from all over the world and
              thousands of crypto communities
            </span>{" "}
            to have a substantial and diverse financial injection. <br />
            <br />
            Instead of having a few big investors scooping up all of the
            project's most attractive offerings in secret seed sales thus giving
            them the power to destroy projects by dumping on them you will have
            tons of smaller holders instead.
          </p>

          <p
            className="text noto-serif font-extralight text-xl"
            style={{ width: "50%", textAlign: "left" }}
          >
            This leads to a far more stable price action after launch + a way
            bigger and more committed and involved community.{" "}
            <span className="text-bold noto-serif">
              Phoenix is the key solution{" "}
            </span>
            to ensure a sustainable, fair and smooth way to raise the required
            capital while Phoenix handles all the tracking and compensation.
            <br /> <br /> The link to the application form for projects and
            startups is located on the bottom of the website.
          </p>
        </div>
      </div>
    </section>
  );
}
