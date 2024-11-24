import Image from "next/image";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const sitename = "Rentia";
  const isAdmin = true; 
  const isMod = false;

  return (
    <div>
      <div className="navbar bg-base-100">
        {/* Left Section: Dropdown */}
        <div className="navbar-start">
          <div className="dropdown hidden lg:block">
            <div tabIndex={0} role="button" className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              {/* Admin Section */}
              {isAdmin && (
                <li>
                  <Link href="/admincp">Admin Panel</Link>
                  <span className="ml-4">
                    <Link href="/admincp/categories">Categories</Link>
                  </span>
                  <span className="ml-4">
                    <Link href="/admincp/books">Books</Link>
                  </span>
                </li>
              )}
              {/* Moderator Section */}
              {isMod && (
                <li>
                  <Link href="/mod">Mod Panel</Link>
                </li>
              )}
            </ul>
          </div>

          {/* Mobile Drawer Button */}
          <label htmlFor="my-drawer-2" className="drawer-button md:hidden">
            <div tabIndex={0} role="button" className="mr-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
          </label>
        </div>

        {/* Center Section: Site Name */}
        <div className="navbar-center">
          <a href="/" className="btn btn-ghost text-xl">
            {sitename}
          </a>
        </div>

        {/* Right Section: Theme Toggle and User Icon */}
        <div className="navbar-end">
          <ThemeToggle />
          <Link href="/sign-in">
            <FaUser />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
