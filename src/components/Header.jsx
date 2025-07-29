import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-black shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Left: site title */}
        <h1 className="text-2xl font-bold text-white tracking-wide">
          USDebtCoin
        </h1>

        {/* Right: nav links */}
        <nav className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "text-gray-300 hover:text-primary"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/debt-info"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "text-gray-300 hover:text-primary"
            }
          >
            US Debt Data
          </NavLink>
          <NavLink
            to="/debt-coin"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "text-gray-300 hover:text-primary"
            }
          >
            DEBT Coin Info
          </NavLink>
          <NavLink
            to="/legal"
            className={({ isActive }) =>
              isActive ? "text-primary font-bold" : "text-gray-300 hover:text-primary"
            }
          >
            Legal Info
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
