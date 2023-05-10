import React, { useState } from "react";
import { Menu, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import styles from "@/styles/Home.module.css";

export default function Header() {
  const [openMenu, setOpenMenu] = useState(false);
  return (
    <>
      <div style={{ height: "100vh" }}>
        <div style={{ backgroundColor: "darkgray", padding: 12, height: 30 }} className="menuIcon">
          <MenuOutlined
            style={{ color: "white", fontSize: 30, float: "right" }}
            onClick={() => {
              setOpenMenu(true);
            }}
          />
        </div>
        <span className="headerMenu">
          <AppMenu />
        </span>

        <Drawer
          open={openMenu}
          onClose={() => {
            setOpenMenu(false);
          }}
          closable={false}
          bodyStyle={{ backgroundColor: "darkgray" }}
        >
          <AppMenu isInline />
        </Drawer>
      </div>
    </>
  );
}

function AppMenu({ isInline = false }) {
  return (
    <>
      <Menu
        style={{ backgroundColor: "darkgray", color: "white", fontSize: 20, border: "none" }}
        mode={isInline ? "inline" : "horizontal"}
        items={[
          {
            label: "Home",
            key: "home",
          },
          {
            label: "Om os",
            key: "omos",
          },
          {
            label: "Program",
            key: "program",
          },
        ]}
      ></Menu>
    </>
  );
}
