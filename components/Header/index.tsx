import React from "react";
import Navbar from "../Navbar";
import Wallet from "../Wallet";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <div className="w-full px-10 flex justify-right">
        <Navbar />
      </div>
    </>
  );
};

export default Header;
