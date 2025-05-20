export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-md overflow-hidden p-8 flex flex-col items-center">
        {/* Spinner với Tailwind */}
        <div className="relative w-20 h-20 mb-6">
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin-element"></div>
          <div
            className="absolute inset-2 rounded-full border-4 border-transparent border-t-blue-400 animate-spin-element"
            style={{animationDuration: '3s'}}></div>
          <div
            className="absolute inset-4 rounded-full border-4 border-transparent border-t-blue-300 animate-spin-element"
            style={{animationDuration: '1.5s'}}></div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center">
          Đang xử lý thanh toán
        </h2>

        <p className="text-gray-600 text-center mb-6">
          Vui lòng đợi trong giây lát, chúng tôi đang xác nhận giao dịch của bạn...
        </p>

        {/* Thanh tiến trình */}
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 overflow-hidden">
          <div className="bg-blue-600 h-full rounded-full animate-pulse-element w-3/4"></div>
        </div>

        <p className="text-sm text-gray-500 italic text-center">
          Vui lòng không tắt hoặc làm mới trang này
        </p>
      </div>
    </div>
  )
}