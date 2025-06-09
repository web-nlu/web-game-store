'use client'
import {formatPrice} from "@/utils";
import {ImageIcon} from "lucide-react";
import {CldImage} from "next-cloudinary";

export default function CardAccount({account} : {account: Account}) {
  return (
    <div key={account.id}
         className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
      <div className="relative h-48 bg-gray-200">
        {/* Đây là phần hiển thị hình ảnh - thực tế cần thay bằng Image của Next.js */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          {/* Thay thế bằng hình ảnh thực khi có */}
          {account.image ?
            <CldImage src={account.image} alt={"Hình ảnh"} fill /> :
            <ImageIcon className="w-6 h-6 text-gray-400"/>
          }
        </div>
      </div>

      <div className="p-4">
        <a href={`/${account.id}`} >
          <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition">{account.title}</h3>
        </a>
        <p className="text-gray-600 text-sm mb-3">{account.info}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="text-red-600 font-bold">{formatPrice(account.salePrice || account.price)}</div>
            {account.salePrice ? (
              <div className="text-gray-500 text-sm line-through">{formatPrice(account.price)}</div>
            ) : <></>}
          </div>
          <a href={`/${account.id}`}>
            <span className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-sm">
              Chi tiết
            </span>
          </a>
        </div>
      </div>
    </div>
  )
}