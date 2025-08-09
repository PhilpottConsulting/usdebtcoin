import React from "react";

const Info = () => {
  const contractAddress = "0xF9744F470247B695A31C7dca737612aCB8Db8512";

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Top section: Image left, text right */}
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <img
          src="/assets/us-debt-coin.png"
          alt="US Debt Coin"
          className="w-full max-w-xs md:max-w-sm rounded-lg shadow-lg"
        />
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-4">US Debt Coin</h1>
          <p className="text-lg text-gray-700">
            USDebtCoin is a unique cryptocurrency representing shares of the US National Debt based on US Population.
            Depending on which numbers you look at, each coin corresponds to approximately $117,000 of US debt.
            Continue reading below to learn more about the balooning US National Debt, our cryptocurrency, and our future plans.
          </p>
        </div>
      </div>

      {/* Cards section: stacked full-width */}
      <div className="space-y-8">
        {/* Card 1: Premise */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-black">
          <h2 className="text-2xl font-semibold mb-3">1. Premise</h2>
          <p className="mb-3">
            At launch, we minted 340.1 million coins, each representing one “share” of the US National Debt.
            Currently, the debt accounted for on the 
                 <a
              href="/assets/fy-2024-us-balance-sheet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mx-1"
            >
              FY 2024 US Balance Sheet
            </a>
            is 39.8838 Trillion (Page 65).  This is approximately 
            $117,000 for each human in the United States.
          </p>
          <p>
            Now, you may think "$39.9 Trillion!, that's way more than what i see on TV?!?!", and you are correct.  We are using the US Net Position.  Learn more about different measurements of the US debt on
            <a
              href="https://www.usdebtclock.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline ml-1"
            >
              US Debt Clock
            </a>
            , the
            <a
              href="https://www.treasurydirect.gov/govt/reports/pd/pd_debttothepenny.htm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mx-1"
            >
              Treasury Direct site
            </a>
            , and others.  These sites generally show the US Public Debt, but don't include the ~4.5T that has recently shown up on the 
                 <a
              href="/assets/fy-2024-us-balance-sheet.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mx-1"
            >
              FY 2024 US Balance Sheet
            </a>.  Check out our 
            
                 <a
              href="/debt-info"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mx-1"
            >
              US Debt Information page
            </a> for more details on past balance sheets and a disturbing new trend for the US net position.
          </p>
        </section>

        {/* Card 2: Contract Info */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-black">
          <h2 className="text-2xl font-semibold mb-3">2. Contract Info & Security</h2>
          <p className="mb-3">
            You can view our Etherscan security reports, source code, and other contract information at the following Contract Address:{" "}
            <a
              href={`https://etherscan.io/address/${contractAddress}#cards`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {contractAddress}
            </a>
          </p>
          <p>
            We have some odd early security scores because no one is trading yet (just launched) and because the contract itself acts as the primary holder of coins. The faucet is designed to allow one claim per wallet address, symbolizing an individual’s $117,000 share of the US National Debt.
            The contract is designed to be simple and transparent, with no complex logic or hidden features.  There is a 2.5% developer fee for future trades, that can be adjusted to 5% Max, which is also being picked up as noteworthy, because it is.
          </p>
        </section>

        {/* Card 3: Future Plans */}
        <section className="bg-white p-6 rounded-lg shadow-md border border-gray-200 text-black">
          <h2 className="text-2xl font-semibold mb-3">3. Future Plans</h2>
          <p>
            We plan to add liquidity, explore utility features, and possibly integrate
            social sharing. The goal is to raise awareness about the scale of the US
            debt in a fun and engaging way.
          </p>
          <p className="mt-3">
            Stay tuned for updates, and consider supporting the project by
            sharing your claim on social media or visiting our 
            <a
              href="/donate"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline mx-1"
            >
              Donate Page!
            </a>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Info;
