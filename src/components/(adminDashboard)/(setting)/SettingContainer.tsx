"use client";
import ChangePasswordModal from "@/components/(adminDashboard)/(setting)/changePassword/ChangePasswordModal";
import Link from "next/link";
import { useState } from "react";
import { IoIosArrowForward } from "react-icons/io";

// Import SVG icons for each setting item
import { FiMail, FiUser, FiLock, FiFileText, FiShield } from "react-icons/fi";

const links = [
  {
    label: "Promotional Messages",
    path: "admin/promotional-message",
    icon: <FiMail size={24} className='text-white' />,
  },
  {
    label: "Personal Information",
    path: "admin/personal-information",
    icon: <FiUser size={24} className='text-white' />,
  },
  {
    label: "Change Password",
    path: "changePassword",
    icon: <FiLock size={24} className='text-white' />,
  },
  {
    label: "Terms & Condition",
    path: "admin/terms-condition",
    icon: <FiFileText size={24} className='text-white' />,
  },
  {
    label: "Privacy Policy",
    path: "admin/privacy-policy",
    icon: <FiShield size={24} className='text-white' />,
  },
];

const SettingContainer = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className='grid grid-cols-1 gap-6'>
      {links.map((link, inx) => {
        return (
          <div key={link.path}>
            {link.path === "changePassword" ? (
              <div
                onClick={() => setOpen(!open)}
                className='bg-primary-light-gray shadow-md p-5 rounded flex justify-between items-center cursor-pointer hover:bg-primary-light hover:shadow-lg transition-all duration-200'
              >
                <div className='flex items-center gap-3'>
                  {link.icon}
                  <h4 className='text-text-color font-medium text-lg'>{link.label}</h4>
                </div>
                <IoIosArrowForward size={18} color='#000' />
              </div>
            ) : (
              <Link key={link.path} href={`/${link.path}`}>
                <div className='bg-primary-light-gray shadow-md p-5 rounded flex justify-between items-center hover:bg-primary-light hover:shadow-lg transition-all duration-200'>
                  <div className='flex items-center gap-3'>
                    {link.icon}
                    <h4 className='text-text-color font-medium text-lg'>{link.label}</h4>
                  </div>
                  <IoIosArrowForward size={18} color='#000' />
                </div>
              </Link>
            )}
          </div>
        );
      })}
      <ChangePasswordModal open={open} setOpen={setOpen} />
    </div>
  );
};

export default SettingContainer;
