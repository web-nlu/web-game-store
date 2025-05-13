"use client"
import Link from "next/link";
import React, {useState} from "react";
import EmptyCart from "@/components/cart/EmptyCart";
import {formatPrice} from "@/utils";
import {CreditCard, Minus, Plus, Trash2} from "lucide-react";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      title: 'Tài khoản Liên Minh Huyền Thoại Rank Thách Đấu',
      price: 2500000,
      game: 'Liên Minh Huyền Thoại',
      quantity: 1,
      image: '/images/account-lol-1.jpg'
    },
    {
      id: 4,
      title: 'Tài khoản Mobile Legends VIP',
      price: 1500000,
      game: 'Mobile Legends',
      quantity: 1,
      image: '/images/account-ml-1.jpg'
    },
    {
      id: 6,
      title: 'Tài khoản Valorant Full Rank Bất Tử',
      price: 1800000,
      game: 'Valorant',
      quantity: 1,
      image: '/images/account-valorant-1.jpg'
    }
  ]);
  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  // Tính phí dịch vụ (giả sử 5% của tổng giá trị)
  const calculateServiceFee = () => {
    return calculateSubtotal() * 0.05;
  };

  // Tính tổng thanh toán
  const calculateTotal = () => {
    return calculateSubtotal() + calculateServiceFee();
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/game-accounts" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition">
            {/*<ChevronLeft size={20}/>*/}
            <span>Tiếp tục mua sắm</span>
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">Giỏ Hàng</h1>

        {cartItems.length === 0 ? (
          <EmptyCart/>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200">
                  <h2 className="text-xl font-semibold mb-0">Sản phẩm ({cartItems.length})</h2>
                </div>

                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item) => (
                    <li key={item.id} className="p-6">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center">
                        {/* Hình ảnh sản phẩm */}
                        <div
                          className="bg-gray-200 rounded-lg w-full sm:w-24 h-24 flex items-center justify-center mb-4 sm:mb-0 flex-shrink-0">
                          <span className="text-4xl">
                            {item.game.includes('Liên Minh') ? '🎮' :
                              item.game.includes('Mobile Legends') ? '📱' : '🔫'}
                          </span>
                        </div>

                        {/* Thông tin sản phẩm */}
                        <div className="ml-0 sm:ml-4 flex-grow">
                          <div className="flex flex-col sm:flex-row sm:justify-between">
                            <div>
                              <h3 className="font-medium text-gray-900">{item.title}</h3>
                              <p className="text-sm text-blue-600">{item.game}</p>
                            </div>
                            <div className="mt-2 sm:mt-0 text-lg font-bold text-gray-900">
                              {formatPrice(item.price)}
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center border border-gray-300 rounded">
                              <button
                                className="px-3 py-1 hover:bg-gray-100 transition"
                                aria-label="Giảm số lượng"
                              >
                                <Minus size={16}/>
                              </button>
                              <span className="px-4 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                              <button
                                className="px-3 py-1 hover:bg-gray-100 transition"
                                aria-label="Tăng số lượng"
                              >
                                <Plus size={16}/>
                              </button>
                            </div>
                            <button
                              className="text-red-600 hover:text-red-800 transition flex items-center"
                              aria-label="Xóa sản phẩm"
                            >
                              <Trash2 size={18} className="mr-1"/>
                              <span>Xóa</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Thông tin thanh toán */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-6">Thông tin đơn hàng</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tạm tính</span>
                    <span className="font-medium">{formatPrice(calculateSubtotal())}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí dịch vụ (5%)</span>
                    <span className="font-medium">{formatPrice(calculateServiceFee())}</span>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-semibold">Tổng thanh toán</span>
                    <span className="text-lg font-bold text-red-600">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition flex items-center justify-center">
                    <CreditCard size={20} className="mr-2"/>
                    <span>Tiến hành thanh toán</span>
                  </button>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Chúng tôi chấp nhận</h3>
                  <div className="flex space-x-2">
                    <div className="bg-gray-200 rounded px-3 py-1 text-sm">VISA</div>
                    <div className="bg-gray-200 rounded px-3 py-1 text-sm">MasterCard</div>
                    <div className="bg-gray-200 rounded px-3 py-1 text-sm">Momo</div>
                    <div className="bg-gray-200 rounded px-3 py-1 text-sm">VNPay</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}