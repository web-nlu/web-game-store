'use client'
import {CldImage} from "next-cloudinary";
import {routePage} from "@/utils";

export default function HeroBanner() {
  return (
    <div className="relative bg-gradient-to-r from-blue-600 to-indigo-800 rounded-lg shadow-lg mb-8 overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-pattern"></div>
      <div className="relative py-12 px-8 md:px-16 text-white flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2 space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold">Mua tài khoản game chính hãng</h1>
          <p className="text-lg opacity-90">Uy tín - Nhanh chóng - Bảo hành 24/7</p>
          <div className="flex space-x-4 pt-4">
            <div onClick={() => routePage("/san-pham")} className="cursor-pointer bg-white text-blue-800 hover:bg-blue-100 px-6 py-3 rounded-md font-bold">
              Xem sản phẩm
            </div>
            <div onClick={() => routePage("/huong-dan")}
                  className="cursor-pointer bg-transparent border-2 border-white hover:bg-white hover:text-blue-800 px-6 py-3 rounded-md font-bold">
              Hướng dẫn mua
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex justify-end mt-8 md:mt-0">
          <div className="bg-white rounded-lg p-2 shadow-xl">
            <div className="w-64 h-48 bg-gray-300 rounded relative overflow-hidden">
              <CldImage alt={"Banner"} src={"assets/otxz2dvndxggzb16m3s5"} fill />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}