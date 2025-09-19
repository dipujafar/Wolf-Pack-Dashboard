"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";
import useGreeting from "@/hooks/useGreeting";
import { cn } from "@/lib/utils";
import { useGetProfileQuery } from "@/redux/api/userApi";
import { TUser } from "@/types";
import { Avatar, Badge, Flex } from "antd";
import { ChevronRight, X } from "lucide-react";
import Link from "next/link";
import { FaBars } from "react-icons/fa6";
import { IoNotificationsOutline } from "react-icons/io5";

type TNavbarProps = {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
};

const Navbar = ({ collapsed, setCollapsed }: TNavbarProps) => {
  const greeting = useGreeting();

  const { data, isLoading } = useGetProfileQuery([]);
  const user = data?.data as TUser;

  const notificationCount = user?._count?.notifications || 0;

  return (
    <div className='flex items-center justify-between w-[97%] font-poppins text-text-color xl:px-8 px-4'>
      {/* Header left side */}
      <Flex align='center' gap={20}>
        <button
          onClick={() => setCollapsed(collapsed ? false : true)}
          className='cursor-pointer hover:bg-gray-300 rounded-full duration-1000'
        >
          {collapsed ? (
            <X size={20} className='text-primary-gray' />
          ) : (
            <FaBars size={20} className='text-primary-gray' />
          )}
        </button>
        <div className='flex flex-col text-white '>
          <h2 className='text-lg  font-medium'>
            Dashboard
            <span className='block  text-sm font-normal'>
              {greeting}, {user?.name}
            </span>
          </h2>
        </div>
      </Flex>

      {/* Header right side */}
      <Flex align='center' gap={20}>
        {/* Notification */}
        <Link href={"/admin/notifications"}>
          <div className='flex justify-center items-center size-10  rounded-full cursor-pointer relative border border-main-color'>
            <IoNotificationsOutline size={24} color='#AB9D6E' />

            {notificationCount > 0 && (
              <Badge
                count={notificationCount}
                style={{
                  border: "none",
                  boxShadow: "none",
                  backgroundColor: "var(--color-main)",
                  color: "#fff",
                  position: "absolute",
                  top: "-24px",
                  right: "-16px",
                  fontSize: "10px",
                }}
              ></Badge>
            )}
          </div>
        </Link>

        {/* user profile */}
        <Menubar className='py-8 border-none shadow-none px-0 border bg-transparent '>
          <MenubarMenu>
            <MenubarTrigger className='shadow-none px-0 bg-[#111827] data-[state=open]:bg-[#111827] active:bg-[#111827]'>
              <div className={cn("text-black flex items-center gap-x-1 cursor-pointer")}>
                <Avatar
                  src={user?.profilePicture}
                  size={40}
                  className='border border-main-color size-16'
                ></Avatar>
                <h4
                  className={cn(
                    "text-base font-medium truncate flex-1 text-white",
                    collapsed && "hidden",
                  )}
                >
                  {user?.name}
                </h4>
              </div>
            </MenubarTrigger>
            <MenubarContent className='text-primary-gray bg-[#111827]'>
              <Link href={"/admin/personal-information"}>
                <MenubarItem className='hover:bg-gray-100 cursor-pointer'>
                  Profile{" "}
                  <MenubarShortcut>
                    <ChevronRight size={16} />
                  </MenubarShortcut>
                </MenubarItem>
              </Link>
              <MenubarSeparator />
              <Link href={"/login"}>
                <MenubarItem className='hover:bg-gray-100 cursor-pointer'>Logout</MenubarItem>
              </Link>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Flex>
    </div>
  );
};

export default Navbar;
