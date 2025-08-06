"use client";
import logo from "@/assets/image/logo.png";
import { cn, Success_model } from "@/lib/utils";
import { logout } from "@/redux/features/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { navLinks } from "@/utils/navLinks";
import { Menu, MenuProps } from "antd";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SidebarContainer = ({ collapsed }: { collapsed: boolean }) => {
  const [current, setCurrent] = useState("dashboard");
  const currentPath = usePathname();

  const dispatch = useAppDispatch();
  const router = useRouter();

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
    if (e.key === "logout") {
      dispatch(logout());
      router.refresh();
      router.push("/login");

      Success_model({ title: "Logout successful" });
    }
    localStorage.setItem("activeNav", e.key);
  };

  useEffect(() => {
    const activeKey = localStorage.getItem("activeNav");
    if (!activeKey) return;
    if (activeKey && currentPath !== "/admin/dashboard") {
      setCurrent(activeKey as string);
    } else {
      setCurrent("dashboard");
    }
  }, []);

  return (
    <Sider
      width={260}
      theme='light'
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

      <div className='    bottom-1 flex justify-center items-center px-2'>
        <div className='flex flex-col justify-center items-center gap-y-5 pt-2 pb-1 '>
          <Link href={"/admin"}>
            <Image
              src={logo}
              alt='logo_Image'
              className={cn(`lg:px-1 h-[150px] w-[160px] `, collapsed && "hidden")}
            />
          </Link>
          <Link href={"/"}>
            <Image src={logo} alt='logo_Image' className={cn(`lg:px-1`, !collapsed && "hidden")} />
          </Link>
        </div>
      </div>

      <Menu
        onClick={onClick}
        defaultSelectedKeys={["dashboard"]}
        selectedKeys={[current]}
        mode='inline'
        className='sidebar-menu text-lg bg-main-color !mt-1'
        items={navLinks}
      />
    </Sider>
  );
};

export default SidebarContainer;
