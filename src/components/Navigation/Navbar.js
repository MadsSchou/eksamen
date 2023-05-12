import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import logo from "logo.svg";

const MENU_LIST = [
  {
    text: "Home",
    href: "/",
  },
  {
    text: "Program",
    href: "/schedule",
  },
  {
    text: "KØB BILLETTER",
    href: "/TicketsAndTents",
    isButton: true,
  },
];

function Navbar() {
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <header>
      <nav className="nav">
        <Link onClick={() => setActiveIdx(0)} href={"/"}>
          <Image src={logo} alt="logo" width="150" height="100" />
        </Link>

        <div onClick={() => setNavActive(!navActive)} className="nav__menu-bar">
          <div></div>
          <div></div>
          <div></div>
        </div>

        <div className={`${navActive ? "active" : ""} nav__menu-list`}>
          {MENU_LIST.map((menu, idx) => (
            <div
              onClick={() => {
                setActiveIdx(idx);
                setNavActive(false);
              }}
              key={menu.text}
            >
              {menu.isButton ? (
                <Link href={menu.href}>
                  <button onClick={() => console.log(`${menu.text} button clicked`)}>{menu.text}</button>
                </Link>
              ) : (
                <NavItem active={activeIdx === idx} {...menu} />
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
