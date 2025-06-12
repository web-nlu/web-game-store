'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {CreditCard, LogOut, Settings, User} from "lucide-react";
import {useUserStore} from "@/service/user/userService";
import toast from "react-hot-toast";
import {signOut} from "next-auth/react";
import {CldImage} from "next-cloudinary";

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

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        }
      });
      const {message} = await res.json();
      if(!res.ok) {
        await signOut()
        toast.success("Đăng xuất thành công")
      } else {
        toast.success(message);
      }

      window.location.href = "/dang-nhap";
    } catch (err) {
       toast.error((err as Error).message);
    } finally {
      setIsOpen(false);
    }
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 group focus:outline-none cursor-pointer"
      > {
          user?.avatar ? (
            <CldImage alt={"Avatar user"} src={user.avatar} width={40} height={40} className="rounded-full" />
          ) : (
            <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
              <User className="w-[20px] h-[20px] text-blue-900"/>
            </div>
          )
        }
      </button>

      {isOpen && (
        <div
        ref={tooltipRef}
        className="absolute w-70  right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200"
        >
          <div className="flex items-center gap-2 px-4 py-2 border-b-1 border-solid border-gray-200">
            {
              user?.avatar ? (
                <CldImage alt={"Avatar user"} src={user.avatar} width={40} height={40} className="rounded-full" />
              ) : (
                <div className="w-[40px] h-[40px] rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                  <User className="w-[20px] h-[20px] text-blue-900"/>
                </div>
              )
            }
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
          <Link
            href="/don-hang"
            className="block flex flex-row gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={() => setIsOpen(false)}
          >
            <CreditCard size={18} />
            Lịch sử mua hàng
          </Link>
          <div
            className="block flex flex-row gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            onClick={logout}
          >
            <LogOut color={"red"} size={18} />
            Đăng xuất
          </div>
        </div>
      )}
    </div>
  );
}