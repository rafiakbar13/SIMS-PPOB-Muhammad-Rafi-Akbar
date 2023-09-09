import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../assets/Logo.png";
const Navbar = () => {
  return (
    <header className="border-b-[1.5px] pt-8">
      <nav className="flex items-center justify-between mb-3 ">
        <NavLink to="/dashboard" className="flex items-center gap-3">
          <img src={Logo} alt="" />
          <span>SIMS PPOB</span>
        </NavLink>
        <div className="flex gap-8">
          <NavLink to="/dashboard/topup">Top Up</NavLink>
          <NavLink to="/dashboard/transaction">Transaction</NavLink>
          <NavLink to="/akun">Akun</NavLink>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
