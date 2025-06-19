'use client'
import {CheckCircle} from "lucide-react";
import {useSearchParams} from "next/navigation";
import {formatPrice, formatVietnamTime, routePage} from "@/utils";

type Props = {
  data: EventPayos
}

export default function Success({data}: Props) {
  const params = useSearchParams();
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="text-green-500 h-16 w-16"/>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-green-600">Thanh Toán Thành Công!</h1>
            <p className="text-gray-600 mt-2">
              Cảm ơn bạn đã mua tài khoản game tại cửa hàng của chúng tôi.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Chi tiết đơn hàng</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-medium">{data.orderCode}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Thành tiền:</span>
                <span className="font-medium text-green-600">{formatPrice(parseInt(params.get("totalPrice") || "0"))}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Ngày thanh toán:</span>
                <span className="font-medium">{formatVietnamTime(Date.now() / 1000)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg mb-6">
            <p className="text-blue-800 text-sm">
              Thông tin đăng nhập tài khoản game đã được gửi đến email của bạn. Vui lòng kiểm tra email và thư mục spam. Nếu không có vui lòng liên hệ hỗ trợ.
            </p>
          </div>

          <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <button onClick={() => window.location.href = `/don-hang/${params.get("orderCode")}`}
                    className="cursor-pointer bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors w-full">
              Xem chi tiết
            </button>

            <div onClick={() => routePage("/lien-he")}
                  className="cursor-pointer bg-gray-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-700 transition-colors w-full">
              Liên hệ hỗ trợ
            </div>

            <div onClick={() => routePage("/")}
                  className="cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-300 transition-colors w-full">
              Trở về trang chủ
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}