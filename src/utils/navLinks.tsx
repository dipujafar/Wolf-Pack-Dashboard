import { RiDashboardHorizontalFill, RiLogoutCircleLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import Link from "next/link";
import {
  AlignJustify,
  Award,
  ChartColumnIncreasing,
  ListChecks,
  LogOut,
  Star,
  Wallet,
  WalletCards,
} from "lucide-react";
import { IoSettingsOutline } from "react-icons/io5";

export const navLinks = [
  {
    key: "dashboard",
    icon: <RiDashboardHorizontalFill size={18} />,
    label: <Link href={"/dashboard"}>Dashboard</Link>,
  },
  {
    key: "closer",
    icon: <GoPeople size={18} />,
    label: <Link href={"/closer"}>Closers Management</Link>,
  },
  {
    key: "client",
    icon: <AlignJustify size={18} />,
    label: <Link href={"/client"}>Clients Management</Link>,
  },
  {
    key: "tracks-sales",
    icon: <ChartColumnIncreasing size={18} />,
    label: <Link href={"/tracks-sales"}>Tracks Sales</Link>,
  },
  {
    key: "earning",
    icon: <Wallet size={18} />,
    label: <Link href={"/earning"}>Earning</Link>,
  },
  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/settings"}>Settings</Link>,
  },
  {
    key: "logout",
    icon: <LogOut size={18} />,
    label: (
      <Link href={"/login"} className="!text-[#5F1011]">
        Logout
      </Link>
    ),
  },
  //   {
  //     key: "user-request",
  //     icon: <PiListPlusFill size={20} />,
  //     label: <Link href={"/user-request"}>User Request</Link>,
  //   },
  // {
  //     key: "team-member",
  //     icon: <GoPeople size={18} />,
  //     label: <Link href={"/user"}>Team Member</Link>,
  //   },

  //   {
  //     key: "settings",
  //     icon: <IoSettingsOutline size={18} />,
  //     label: <Link href={"/settings"}>Settings</Link>,
  //   },
];
