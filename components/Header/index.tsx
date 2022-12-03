import React from "react";
import UploadForm from "../Form/UploadForm";
import Navbar from "../Navbar";
import Wallet from "../Wallet";

type Props = {};

const Header = (props: Props) => {
  return (
    <>
      <div className="flex w-full px-10 justify-right">
        <Navbar />
      </div>
    </>
  );
};

export default Header;
