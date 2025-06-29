"use client";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Link from "next/link";
import faviconLogo from "@/assets/image/faviconLogo.png";
import logo from "@/assets/image/logo.png";
import { navLinks } from "@/utils/navLinks";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { cn } from "@/lib/utils";

const SidebarContainer = ({ collapsed }: { collapsed: boolean }) => {
  const [current, setCurrent] = useState("dashboard");
  const currentPath = usePathname();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "logout") {
      localStorage.removeItem("activeNav");
      return;
    }
    localStorage.setItem("activeNav", e.key);
  };

  useEffect(() => {
    const activeKey = localStorage.getItem("activeNav");
    if (!activeKey) return;
    if (activeKey && currentPath !== "/dashboard") {
      setCurrent(activeKey as string);
    } else {
      setCurrent("dashboard");
    }
  }, []);

  return (
    <Sider
      width={260}
      theme="light"
      collapsible
      collapsed={collapsed}
      trigger={null}
      style={{
        paddingInline: `${collapsed ? "5px" : "8px"}`,
        backgroundColor: "#000",
        maxHeight: "100vh",
        overflowY: "auto",
        minHeight: "100vh",
      }}
    >
      {/* =============== Logo ===============  */}

      <div className="    bottom-1 flex justify-center items-center px-2">
        <div className="pflex flex-col justify-center items-center gap-y-5 pt-2 pb-1 ">
          <Link href={"/"}>
            <Image
              src={logo}
              alt="logo_Image"
              className={cn(`lg:px-1 h-[150px] w-[160px] `, collapsed && "hidden")}
            />
          </Link>
          <Link href={"/"}>
            <Image
              src={faviconLogo}
              alt="logo_Image"
              className={cn(`lg:px-1`, !collapsed && "hidden")}
            />
          </Link>
        </div>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[current]}
        mode="inline"
        className="sidebar-menu text-lg bg-main-color !mt-1"
        items={navLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
