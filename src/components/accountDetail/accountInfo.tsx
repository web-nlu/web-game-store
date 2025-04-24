import {
  ClockIcon,
  CreditCardIcon,
  HeartIcon,
  MessageCircleIcon,
  ShieldCheckIcon,
  ShoppingCartIcon,
  StarIcon
} from "lucide-react";
import {formatPrice} from "@/utils";
import React, {useState} from "react";
import AccountFeature from "@/components/accountDetail/accountFeature";
import ServiceCommitment from "@/components/accountDetail/serviceCommitment";
import AmountForm from "@/components/common/amountForm";
import Button from "@/components/common/button";

export default function AccountInfo(accountDetail: AccountDetail) {

  return (
    <div className="lg:col-span-1">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{accountDetail.title}</h1>

        <div className="flex items-center mb-4">
          <div className="flex items-center mr-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                fill={i < Math.floor(accountDetail.rating) ? "#FBBF24" : "none"}
                stroke={i < Math.floor(accountDetail.rating) ? "#FBBF24" : "#9CA3AF"}
                size={16}
              />
            ))}
            <span className="ml-1 text-sm text-gray-600">{accountDetail.rating}</span>
          </div>
          <span
            className="text-sm text-gray-500">Đã bán: {accountDetail.saleCount} | Lượt xem: {accountDetail.viewCount}</span>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline">
            <span className="text-3xl font-bold text-red-600">{formatPrice(accountDetail.salePrice)}</span>
            {accountDetail.price > accountDetail.salePrice && (
              <span className="ml-2 text-gray-500 line-through">{formatPrice(accountDetail.price)}</span>
            )}
          </div>
          {accountDetail.price > accountDetail.salePrice && (
            <div className="mt-1 inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded-md">
              Giảm {Math.round((accountDetail.price - accountDetail.salePrice) / accountDetail.price * 100)}%
            </div>
          )}
        </div>

        <div className="space-y-2 mb-6">
          <AccountFeature title={"Game:"} value={accountDetail.game} />
          <AccountFeature title={"Server:"} value={accountDetail.server} />
          <AccountFeature title={"Level:"} value={accountDetail.level.toString()} />
          <AccountFeature title={"Trạng thái:"} value={accountDetail.status === 'available' ? 'Còn hàng' : 'Hết hàng'}/>
        </div>

        <AmountForm />

        <div className="space-y-3">
          <button
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md flex items-center justify-center font-medium">
            <ShoppingCartIcon size={20} className="mr-2"/>
            Mua ngay
          </button>
          <div className="flex space-x-3">
            <Button icon={<HeartIcon size={18} className="mr-1"/>} label={"Yêu thích"} />
            <Button icon={<MessageCircleIcon size={18} className="mr-1"/>} label={"Chat"} />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="font-medium text-gray-900 mb-3">Thông tin bảo đảm</h3>
        <div className="space-y-3">
          <ServiceCommitment
            title={`Bảo hành ${accountDetail.warranty}`}
            value={"Hỗ trợ đổi trả nếu có vấn đề"}
            icon={<ShieldCheckIcon size={20} className="text-blue-600"/>}
          />
          <ServiceCommitment
            title={"Thanh toán an toàn"}
            value={"Nhiều phương thức thanh toán"}
            icon={<CreditCardIcon size={20} className="text-blue-600"/>}
          />
        </div>
      </div>
    </div>
  )
}