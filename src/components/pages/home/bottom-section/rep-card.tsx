export const RepCard = () => {
  return (
    <div className="md:w-[80%] w-[95%] flex flex-col lg:flex-row rep-card-gradient">
      <div className="flex-1 overflow-auto p-10 md:p-5 pt-20 ">
        <h4 className="pb-5 rep-header-font">
          Become a Phoenix representative
        </h4>
        <p className="pb-5 rep-text-font">
          Join Phoenix, humanity's wings of financial freedom. Be part of a vast
          network of representatives by applying for a free “Shinobi” account by
          pressing the “Sign up” button and fill pit the form (no KYC required)
          or get a head start in commission % by finding a representative with a{" "}
          <b>
            “Phoenix General of army”, “Phoenix Colonel” or “Phoenix Seargant
            Major”
          </b>{" "}
          account and have them sign you up as one of their representatives and
          becoming part of their team.
        </p>
        <p className="pb-5 rep-text-font">
          For the exact details please read the whitepaper and see what the best
          option is for you. Sign up link for the “Shinobi alliance” aka the
          solo player's team can be found on the bottom of the website.
        </p>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="rep-card-image min-h-[400px]" />
      </div>
    </div>
  );
};
