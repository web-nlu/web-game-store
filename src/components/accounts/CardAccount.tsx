'use client'
import Link from "next/link";
import {formatPrice} from "@/utils";

export default function CardAccount({account} : {account: Account}) {
  return (
    <div key={account.id}
         className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative h-48 bg-gray-200">
        {/* Đây là phần hiển thị hình ảnh - thực tế cần thay bằng Image của Next.js */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          {/* Thay thế bằng hình ảnh thực khi có */}
          <span className="text-6xl">{
            account.category === 'moba' ? '🎮' :
              account.category === 'fps' ? '🔫' :
                account.category === 'rpg' ? '⚔️' :
                  account.category === 'strategy' ? '🧠' : '⚽'
          }</span>
        </div>
      </div>

      <div className="p-4">
        <Link href={`/${account.id}`}>
          <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition">{account.title}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3">{account.info}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-red-600">{formatPrice(account.price)}</span>
          <Link href={`/${account.id}`}>
                      <span className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-sm">
                        Chi tiết
                      </span>
          </Link>
        </div>
      </div>
    </div>
  )
}