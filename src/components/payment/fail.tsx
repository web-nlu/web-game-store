'use client'
import Link from "next/link";
import {XCircle} from "lucide-react";

export default function Fail() {

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="flex justify-center mb-6">
            <XCircle className="text-red-500 h-16 w-16"/>
          </div>

          <div className="text-center mb-6">
            <h1 className="text-2xl font-bold text-red-600">Thanh Toán Thất Bại</h1>
            <p className="text-gray-600 mt-2">
              Rất tiếc, giao dịch của bạn không thể hoàn tất.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-800">Chi tiết lỗi</h2>

            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Mã đơn hàng:</span>
                <span className="font-medium"></span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Mã lỗi:</span>
                <span className="font-medium text-red-600"></span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Thông báo:</span>
                <span className="font-medium"></span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Thời gian:</span>
                <span className="font-medium"></span>
              </div>
            </div>
          </div>

          <div className="bg-red-50 p-4 rounded-lg mb-6">
            <p className="text-red-800 text-sm">
              Lưu ý: Nếu số tiền đã bị trừ khỏi tài khoản của bạn, vui lòng liên hệ với chúng tôi qua hotline hoặc email
              hỗ trợ. Tài khoản của bạn sẽ được hoàn tiền trong vòng 3-5 ngày làm việc.
            </p>
          </div>

          <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
            <button onClick={() => window.location.reload()}
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-blue-700 transition-colors w-full">
              Thử lại
            </button>

            <Link href="/support"
                  className="bg-gray-600 text-white py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-700 transition-colors w-full">
              Liên hệ hỗ trợ
            </Link>

            <Link href="/"
                  className="bg-gray-200 text-gray-700 py-2 px-4 rounded-lg text-center font-medium hover:bg-gray-300 transition-colors w-full">
              Trở về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}