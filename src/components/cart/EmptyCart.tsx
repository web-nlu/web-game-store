'use client'
import {ShoppingBag} from "lucide-react";
import {routePage} from "@/utils";

export default function EmptyCart() {
  return (
    <div className="text-center py-16">
      <div className="inline-flex justify-center mb-6">
        <ShoppingBag size={64} className="text-gray-300"/>
      </div>
      <h2 className="text-2xl font-bold mb-4">Giỏ hàng của bạn đang trống</h2>
      <p className="text-gray-500 mb-8">Hãy khám phá các tài khoản game của chúng tôi để tìm cho mình tài khoản phù hợp nhất.</p>
      <div onClick={() => routePage("/game-accounts")}>
        <button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
          Tìm tài khoản game
        </button>
      </div>
    </div>
  );
}