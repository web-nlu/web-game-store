'use client'
import {formatPrice} from "@/utils";
import {ImageIcon, Trash2} from "lucide-react";
import React from "react";
import {CldImage} from "next-cloudinary";

type Props = {
  item: CartItem,
  index: number,
  onRemove(index: number): void,
}

export default function CartItem({item, index, onRemove}: Props) {
  const remove = async () => {
    const delResponse = await fetch(`/api/s/cart/${item.id}`, {method: "DELETE"})
    if (delResponse.ok) {
      onRemove(index);
    }
  }

  return (
    <li key={item.id} className="p-6">
      <div className="flex flex-col sm:flex-row items-start">
        {/* Hình ảnh sản phẩm */}
        <div className="bg-gray-200 rounded-lg w-full sm:w-24 h-24 flex items-center justify-center mb-4 sm:mb-0 flex-shrink-0">
          { item.image ? (
            <CldImage alt={"Hình ảnh tài khoản"} src={item.image} width={200} height={200} crop={"fill"} className="rounded-lg" />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 rounded-lg">
              <ImageIcon className="w-6 h-6 text-gray-400"/>
            </div>
          )}
        </div>
        {/* Thông tin sản phẩm */}
        <div className="ml-0 sm:ml-4 flex-grow">
          <div className="flex flex-col sm:flex-row sm:justify-between">
            <div>
              <h3 className="font-medium text-gray-900">{item.title}</h3>
              <p className="text-sm text-blue-600">{item.game}</p>
            </div>
            <div className="mt-2 sm:mt-0 text-lg font-bold text-gray-900">
              {formatPrice(item.salePrice || item.price)}
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={remove}
              className="cursor-pointer text-red-600 hover:text-red-800 transition flex items-center"
              aria-label="Xóa sản phẩm"
            >
              <Trash2 size={18} className="mr-1"/>
              <span>Xóa</span>
            </button>
          </div>
        </div>
      </div>
    </li>
  )
}