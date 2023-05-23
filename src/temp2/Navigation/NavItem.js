import React from "react";
import Link from "next/link";

const NavItem = ({ href, text, active }) => {
  return (
    <Link href={href}>
      <span className={`nav_link ${active ? "acive" : ""}`}>{text}</span>
    </Link>
  );
};

export default NavItem;
