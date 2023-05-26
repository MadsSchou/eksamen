import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import NavItem from "./NavItem";
import logo from "logo.svg";
import { imgContext } from "@/context/ImgContext";
import { auth } from "@/firebase";
import { useAuth } from "@/context/AuthContext";

const MENU_LIST = [
  {
    text: "Tidsplan",
    href: "/scheduledates",
  },
  {
    text: "Bands",
    href: "/bands",
  },
  {
    text: "KØB BILLETTER",
    href: "/TicketsAndTents",
    isButton: true,
  },
];

function Navbar() {
  const { currentUser } = useAuth();
  const [navActive, setNavActive] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);
  const { images, setImages } = useContext(imgContext);

  async function fetchImages() {
    return await fetch("/api/imgApi")
      .then((res) => res.json())
      .then((data) => setImages(data));
  }

  useEffect(() => {
    if (images) {
      return;
    } else {
      fetchImages();
    }
  }, [images, setImages]);
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
        <div className="login">
          {currentUser ? (
            <Link href={"/dashboard"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </Link>
          ) : (
            <Link href={"/signUp"}>
              <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
              </svg>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
