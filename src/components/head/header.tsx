'use client'
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import {useUserStore} from "@/service/user/userService";
import {useRouter} from "next/navigation";

type Props = {
  user?: UserInfo
}

export default function Header({user}: Props) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {setUser} = useUserStore()
  useEffect(() => {
    if(user) {
      setUser(user)
    }
  }, [user])
  return (
    <header className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-2xl font-bold">Game Shop</div>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link href="/" className="font-medium hover:text-blue-300">Trang chủ</Link>
            <Link href="/san-pham" className="font-medium hover:text-blue-300">Danh mục</Link>
            <Link href="/huong-dan" className="font-medium hover:text-blue-300">Hướng dẫn</Link>
            <Link href="/lien-he" className="font-medium hover:text-blue-300">Liên hệ</Link>
          </div>

          <div className="flex items-center space-x-4">
            <form className="hidden md:flex">
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản..."
                className="px-3 py-2 rounded-l-md text-gray-800 bg-gray-100 focus:outline-none"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md"
              >
                Tìm
              </button>
            </form>

            <Link href="/gio-hang" className="relative">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                   className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span
                className="absolute -top-2 -right-2 bg-red-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </Link>
            {
              !user ?
                (<Link href="/dang-nhap" className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md font-medium">
                  Đăng nhập
                </Link>)
               : (<Link href="/profile" className="flex items-center gap-2 group">
                  <Image
                    src={'/default-avatar.webp'}
                    alt="avatar"
                    width={40}
                    height={40}
                    className="rounded-full border-2 border-transparent group-hover:border-blue-500 transition"
                  />
                </Link>)
            }
            <button
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                   className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <Link href="/" className="block py-2 hover:bg-blue-800 px-2 rounded">Trang chủ</Link>
            <Link href="/san-pham" className="block py-2 hover:bg-blue-800 px-2 rounded">Danh mục</Link>
            <Link href="/huong-dan" className="block py-2 hover:bg-blue-800 px-2 rounded">Hướng dẫn</Link>
            <Link href="/lien-he" className="block py-2 hover:bg-blue-800 px-2 rounded">Liên hệ</Link>
            <form className="mt-2 flex">
              <input
                type="text"
                placeholder="Tìm kiếm tài khoản..."
                className="px-3 py-2 w-full rounded-l-md text-gray-100 focus:outline-none"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-r-md"
              >
                Tìm
              </button>
            </form>
          </div>
        )}
      </div>
    </header>
  )
}