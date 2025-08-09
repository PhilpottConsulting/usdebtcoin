import React from "react";
import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-[#0f172a] shadow-md">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Left: clickable logo + text */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/assets/us-debt-coin.png"
            alt="USDebtCoin"
            className="h-20 w-20"
          />
          <h1 className="text-2xl font-bold text-white tracking-wide">
            USDebtCoin
          </h1>
        </Link>

        {/* Right: nav links */}
        <nav className="flex space-x-10">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold"
                : "text-gray-300 hover:text-primary"
            }
          >
        
          </NavLink>
          <NavLink
            to="/claim"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold"
                : "text-gray-300 hover:text-primary"
            }
          >
            Claim some USDebtCoin!
          </NavLink>
          <NavLink
            to="/debt-info"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold"
                : "text-gray-300 hover:text-primary"
            }
          >
            US National Debt
          </NavLink>
          <NavLink
            to="/debt-coin"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold"
                : "text-gray-300 hover:text-primary"
            }
          >
            USDBT Coin Info
          </NavLink>
          <NavLink
            to="/legal"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold"
                : "text-gray-300 hover:text-primary"
            }
          >
            Legal
          </NavLink>
          <NavLink
            to="/donate"
            className={({ isActive }) =>
              isActive
                ? "text-primary font-bold"
                : "text-gray-300 hover:text-primary"
            }
          >
            Donate!
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
