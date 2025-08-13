"use client";

import { X } from "lucide-react";
import Link from "next/link";

type TCustomToastProps = {
  title?: string;
  body?: string;
  url?: string;
  duration?: number;
};

const CustomToast = ({ title, body, url = "/notification" }: TCustomToastProps) => {
  return (
    <Link href={url} className='block'>
      <div className='bg-white rounded-lg shadow-lg overflow-hidden transition-all hover:shadow-xl border border-gray-200'>
        <div className='p-4 relative'>
          <button className='absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition-colors'>
            <X size={20} />
            <span className='sr-only'>Close</span>
          </button>
          <h3 className='font-semibold text-lg text-gray-800 mb-2'>{title}</h3>
          <p className='text-gray-600 text-sm'>{body}</p>
        </div>
        <div className='bg-gray-50 px-4 py-3 border-t border-gray-100'>
          <p className='text-xs text-gray-500'>Click to view all</p>
        </div>
      </div>
    </Link>
  );
};

export default CustomToast;
