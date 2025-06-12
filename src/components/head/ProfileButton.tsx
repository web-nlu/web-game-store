'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {LogOut, Settings} from "lucide-react";
import {useUserStore} from "@/service/user/userService";

export default function ProfileButton() {
  const [isOpen, setIsOpen] = useState(false);
  const tooltipRef = useRef(null);
  const {user} = useUserStore();

  // Close tooltip when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group focus:outline-none"
      >
        <Image
          src="/default-avatar.webp"
          alt="avatar"
          width={40}
          height={40}
          className="rounded-full border-2 border-transparent group-hover:border-blue-500 transition"
        />
      </button>

      {isOpen && (
        <div
          ref={tooltipRef}
          className="absolute w-70  right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b-1 border-solid border-gray-200">
            <Image
              src="/default-avatar.webp"
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full border-2 border-transparent group-hover:border-blue-500 transition"
            />
            <div className="text-xs text-gray-900 overflow-wrap font-bold">
              <p className="wrap-anywhere">
                {user?.email}
              </p>
            </div>
          </div>
          <Link
            href="/cai-dat"
            className="block flex flex-row gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <Settings size={18} />
            Cài đặt
          </Link>
          <div
            className="block flex flex-row gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <LogOut color={"red"} size={18} />
            Đăng xuất
          </div>
        </div>
      )}
    </div>
  );
}