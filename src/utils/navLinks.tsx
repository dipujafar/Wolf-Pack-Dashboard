import { RiDashboardHorizontalFill, RiLogoutCircleLine } from "react-icons/ri";
import { GoPeople } from "react-icons/go";
import Link from "next/link";
import {
  AlignJustify,
  Award,
  ChartColumnIncreasing,
  ClipboardList,
  Handshake,
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
    label: <Link href={"/admin/dashboard"}>Dashboard</Link>,
  },
  {
    key: "closer",
    icon: <GoPeople size={18} />,
    label: <Link href={"/admin/closer"}>Closers Management</Link>,
  },
  {
    key: "client",
    icon: <AlignJustify size={18} />,
    label: <Link href={"/admin/client"}>Clients Management</Link>,
  },
  {
    key: "deals",
    icon: <Handshake size={18} />,
    label: <Link href={"/admin/deals"}>Deals Approval</Link>,
  },
  {
    key: "tracks-sales",
    icon: <ChartColumnIncreasing size={18} />,
    label: <Link href={"/admin/tracks-sales"}>Tracks Sales</Link>,
  },
  {
    key: "earning",
    icon: <Wallet size={18} />,
    label: <Link href={"/admin/earning"}>Earning</Link>,
  },
  //{
  //  key: "league",
  //  icon: <ClipboardList size={18} />,
  //  label: <Link href={"/admin/league"}>League Management</Link>,
  //},
  {
    key: "prize",
    icon: (
      <svg
        width='14'
        height='14'
        viewBox='0 0 14 14'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M10.2445 12.2504C10.1523 12.2504 10.0595 12.2289 9.97438 12.1845L6.99996 10.6305L4.02613 12.1845C3.82896 12.2866 3.59096 12.2691 3.41246 12.1384C3.2328 12.0078 3.14355 11.7867 3.18146 11.5679L3.74788 8.28494L1.34455 5.96036C1.18471 5.80578 1.12696 5.57361 1.19521 5.36128C1.26346 5.15011 1.44605 4.99553 1.66655 4.96403L4.99155 4.48103L6.47788 1.49086C6.67505 1.09419 7.32546 1.09419 7.52263 1.49086L9.00896 4.48103L12.334 4.96403C12.5545 4.99553 12.737 5.15011 12.8053 5.36128C12.8735 5.57361 12.8158 5.80578 12.656 5.96036L10.2526 8.28494L10.819 11.5679C10.857 11.7867 10.7671 12.0078 10.588 12.1384C10.4865 12.2131 10.3658 12.2504 10.2445 12.2504Z'
          fill='white'
        />
        <mask
          id='mask0_43209_7128'
          style={{ maskType: "alpha" }}
          maskUnits='userSpaceOnUse'
          x='1'
          y='1'
          width='18'
          height='18'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M10.2445 12.2504C10.1523 12.2504 10.0595 12.2289 9.97438 12.1845L6.99996 10.6305L4.02613 12.1845C3.82896 12.2866 3.59096 12.2691 3.41246 12.1384C3.2328 12.0078 3.14355 11.7867 3.18146 11.5679L3.74788 8.28494L1.34455 5.96036C1.18471 5.80578 1.12696 5.57361 1.19521 5.36128C1.26346 5.15011 1.44605 4.99553 1.66655 4.96403L4.99155 4.48103L6.47788 1.49086C6.67505 1.09419 7.32546 1.09419 7.52263 1.49086L9.00896 4.48103L12.334 4.96403C12.5545 4.99553 12.737 5.15011 12.8053 5.36128C12.8735 5.57361 12.8158 5.80578 12.656 5.96036L10.2526 8.28494L10.819 11.5679C10.857 11.7867 10.7671 12.0078 10.588 12.1384C10.4865 12.2131 10.3658 12.2504 10.2445 12.2504Z'
            fill='white'
          />
        </mask>
        <g mask='url(#mask0_43209_7128)'>
          <rect width='14' height='14' fill='#DDAD2E' />
        </g>
      </svg>
    ),
    label: <Link href={"/admin/prize"}>Prize Management</Link>,
  },
  //{
  //  key: "manage-badge",
  //  icon: <Award size={18} />,
  //  label: <Link href={"/admin/manage-badge"}>Manage Badges</Link>,
  //},
  {
    key: "settings",
    icon: <IoSettingsOutline size={18} />,
    label: <Link href={"/admin/settings"}>Settings</Link>,
  },
  {
    key: "logout",
    icon: <LogOut size={18} />,
    label: (
      <Link href={"/login"} className='!text-[#5F1011]'>
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
