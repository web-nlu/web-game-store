"use client"
import React, {useEffect, useState} from "react";
import EmptyCart from "@/components/cart/EmptyCart";
import {formatPrice, routePage} from "@/utils";
import {CreditCard, Trash2} from "lucide-react";
import CartItem from "@/components/cart/cartItem";
import _ from "lodash";
import {checkout} from "@/utils/checkout";
import CommonLoading from "@/components/common/commonLoading";

export default function CartPage() {
  const [cartItems, setCartItems] = useState([] as CartItem[]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    loadCart().then(() => setLoading(false));
  }, [])

  const onCheckout = () => {
    setLoading(true);
    checkout().then((result) => setLoading(result));
  }

  const onRemove = (index: number) => {
    const newItems = _.cloneDeep(cartItems);
    newItems.splice(index, 1);
    setCartItems(newItems);
    loadCart();
  }

  const removeAll = async () => {
    const removeResponse = await fetch(`/api/s/cart/removeAll`,  {method: "DELETE"})
    if (removeResponse.ok) {
      setCartItems([])
    }
  }

  const loadCart = async () => {
    const cartResponse = await fetch("/api/s/cart/me")
    const {accounts, totalPrice} = await cartResponse.json()
    setCartItems(accounts || []);
    setTotalPrice(totalPrice);
  }

  // Tính phí dịch vụ (giả sử 5% của tổng giá trị)
  const calculateServiceFee = () => {
    return totalPrice * 0;
  };

  // Tính tổng thanh toán
  const calculateTotal = () => {
    return totalPrice + calculateServiceFee();
  };

  return loading ? <CommonLoading /> : (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <div onClick={() => routePage("/san-pham")} className="cursor-pointer inline-flex items-center text-blue-600 hover:text-blue-800 transition">
            {/*<ChevronLeft size={20}/>*/}
            <span>Tiếp tục mua sắm</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-8">Giỏ Hàng</h1>

        {cartItems.length === 0 ? (
          <EmptyCart/>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Danh sách sản phẩm */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-gray-200 flex flex-col sm:flex-row sm:justify-between gap-5 ">
                  <h2 className="text-xl font-semibold mb-0">Sản phẩm ({cartItems.length})</h2>
                  <button
                    onClick={removeAll}
                    className="text-red-600 hover:text-red-800 transition flex items-center cursor-pointer"
                    aria-label="Xóa sản phẩm"
                  >
                    <Trash2 size={18} className="mr-1"/>
                    <span>Xóa tất cả</span>
                  </button>
                </div>

                <ul className="divide-y divide-gray-200">
                  {cartItems.map((item, index) =>
                    <CartItem key={item.id} item={item} index={index} onRemove={onRemove}/>
                  )}
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
                    <span className="font-medium">{formatPrice(totalPrice)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-600">Phí dịch vụ (0%)</span>
                    <span className="font-medium">{formatPrice(calculateServiceFee())}</span>
                  </div>

                  <div className="flex justify-between pt-4 border-t border-gray-200">
                    <span className="text-lg font-semibold">Tổng thanh toán</span>
                    <span className="text-lg font-bold text-red-600">{formatPrice(calculateTotal())}</span>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={onCheckout}
                    className="cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition flex items-center justify-center">
                    <CreditCard size={20} className="mr-2"/>
                    <span>Tiến hành thanh toán</span>
                  </button>
                </div>

                <div className="mt-6">
                  <h3 className="font-medium mb-2">Chúng tôi chấp nhận</h3>
                  <div className="flex space-x-2">
                    <div className="bg-gray-200 rounded px-3 py-1 text-sm">Bank</div>
                    {/*<div className="bg-gray-200 rounded px-3 py-1 text-sm">MasterCard</div>*/}
                    {/*<div className="bg-gray-200 rounded px-3 py-1 text-sm">Momo</div>*/}
                    {/*<div className="bg-gray-200 rounded px-3 py-1 text-sm">VNPay</div>*/}
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