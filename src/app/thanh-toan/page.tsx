"use client"
import {useEffect, useState} from "react";
import {CheckCircle, ChevronLeft, Clock, Copy, CreditCard, RefreshCw, Smartphone} from "lucide-react";
import Link from "next/link";
import {formatPrice} from "@/utils";

export default function PaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState('bank');
  const [copied, setCopied] = useState({
    accountNumber: false,
    accountName: false,
    transactionId: false,
    amount: false,
    phoneNumber: false,
    momoName: false,
    momoAmount: false,
    momoTransactionId: false

  });
  const [countdown, setCountdown] = useState(900); // 15 phút = 900 giây
  const [orderStatus, setOrderStatus] = useState('pending'); // pending, completed, cancelled

  // Thông tin giao dịch
  const transactionInfo = {
    orderId: 'ORD-23042025-9871',
    transactionId: 'GD284719562',
    amount: 5985000,
    bankInfo: {
      bankName: 'Vietcombank',
      accountNumber: '1023456789',
      accountName: 'CONG TY TNHH GAME VIET',
      branch: 'Chi nhánh Hà Nội'
    },
    momoInfo: {
      phoneNumber: '0987654321',
      accountName: 'GAME VIET'
    },
    createdAt: new Date().toLocaleString('vi-VN')
  };

  // Đếm ngược thời gian
  useEffect(() => {
    if (countdown > 0 && orderStatus === 'pending') {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && orderStatus === 'pending') {
      setOrderStatus('expired');
    }
  }, [countdown, orderStatus]);

  // Format thời gian đếm ngược
  const formatCountdown = () => {
    const minutes = Math.floor(countdown / 60);
    const seconds = countdown % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopied({...copied, [field]: true});
        setTimeout(() => {
          setCopied({...copied, [field]: false});
        }, 2000);
      })
      .catch(err => {
        console.error('Không thể copy: ', err);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link href="/cart" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition">
          <ChevronLeft size={20}/>
          <span>Quay lại giỏ hàng</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Thông Tin Thanh Toán</h1>

        {/* Trạng thái đơn hàng */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">Đơn hàng #{transactionInfo.orderId}</h2>
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${
              orderStatus === 'completed' ? 'bg-green-100 text-green-800' :
                orderStatus === 'expired' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
            }`}>
              {orderStatus === 'completed' ? 'Đã thanh toán' :
                orderStatus === 'expired' ? 'Đã hết hạn' :
                  'Chờ thanh toán'}
            </div>
          </div>

          <div
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-t border-gray-200 pt-4">
            <div className="text-gray-600">
              <p>Tổng tiền: <span
                className="font-bold text-lg text-gray-900">{formatPrice(transactionInfo.amount)}</span></p>
              <p className="text-sm">Ngày tạo: {transactionInfo.createdAt}</p>
            </div>

            {orderStatus === 'pending' && (
              <div className="mt-4 sm:mt-0 flex items-center bg-orange-50 text-orange-700 px-4 py-2 rounded-lg">
                <Clock size={20} className="mr-2"/>
                <span>Đơn hàng sẽ tự động hủy sau: {formatCountdown()}</span>
              </div>
            )}
          </div>
        </div>

        {/* Phương thức thanh toán */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Phương thức thanh toán</h2>

          <div className="flex space-x-2 mb-6">
            <button
              onClick={() => setPaymentMethod('bank')}
              className={`flex-1 py-3 px-4 rounded-lg border transition flex items-center justify-center ${
                paymentMethod === 'bank'
                  ? 'border-blue-600 bg-blue-50 text-blue-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <CreditCard size={20} className="mr-2"/>
              <span>Chuyển khoản ngân hàng</span>
            </button>

            <button
              onClick={() => setPaymentMethod('momo')}
              className={`flex-1 py-3 px-4 rounded-lg border transition flex items-center justify-center ${
                paymentMethod === 'momo'
                  ? 'border-pink-600 bg-pink-50 text-pink-600'
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Smartphone size={20} className="mr-2"/>
              <span>Ví Momo</span>
            </button>
          </div>

          {/* Thông tin ngân hàng */}
          {paymentMethod === 'bank' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-gray-200 overflow-hidden">
                <div className="p-4 bg-gray-50 border-b border-gray-200">
                  <h3 className="font-medium">{transactionInfo.bankInfo.bankName}</h3>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Số tài khoản</span>
                      <button
                        onClick={() => handleCopy(transactionInfo.bankInfo.accountNumber, 'accountNumber')}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        {copied.accountNumber ? (
                          <>
                            <CheckCircle size={16} className="mr-1"/>
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-1"/>
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div
                      className="bg-gray-100 p-3 rounded font-mono text-lg">{transactionInfo.bankInfo.accountNumber}</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Tên chủ tài khoản</span>
                      <button
                        onClick={() => handleCopy(transactionInfo.bankInfo.accountName, 'accountName')}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        {copied.accountName ? (
                          <>
                            <CheckCircle size={16} className="mr-1"/>
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-1"/>
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-100 p-3 rounded font-medium">{transactionInfo.bankInfo.accountName}</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Số tiền cần chuyển</span>
                      <button
                        onClick={() => handleCopy(transactionInfo.amount.toString(), 'amount')}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        {copied.amount ? (
                          <>
                            <CheckCircle size={16} className="mr-1"/>
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-1"/>
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div
                      className="bg-gray-100 p-3 rounded font-bold text-lg text-red-600">{formatPrice(transactionInfo.amount)}</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Nội dung chuyển khoản</span>
                      <button
                        onClick={() => handleCopy(transactionInfo.transactionId, 'transactionId')}
                        className="text-blue-600 hover:text-blue-800 text-sm flex items-center"
                      >
                        {copied.transactionId ? (
                          <>
                            <CheckCircle size={16} className="mr-1"/>
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-1"/>
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-100 p-3 rounded font-mono font-medium">{transactionInfo.transactionId}</div>
                    <p className="text-sm text-gray-500 mt-1">Vui lòng nhập chính xác nội dung chuyển khoản để hệ thống
                      xác nhận thanh toán tự động</p>
                  </div>
                </div>
              </div>

              <div className="flex justify-center py-4">
                <div
                  className="w-64 h-64 bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-center">
                  {/* Đây là placeholder cho QR code, trong thực tế sẽ sử dụng thư viện tạo QR */}
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-gray-200 rounded relative overflow-hidden">
                      <div className="absolute inset-4 border-2 border-gray-400 rounded"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                        Mã QR Code
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Quét mã để thanh toán</p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-blue-800">
                <h4 className="font-medium mb-2">Chú ý khi thanh toán</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Quý khách vui lòng thanh toán trong vòng 15 phút</li>
                  <li>Nhập chính xác nội dung chuyển khoản để được xác nhận tự động</li>
                  <li>Nếu cần hỗ trợ vui lòng liên hệ hotline: <a href="tel:1900123456" className="font-medium">1900 123
                    456</a></li>
                </ul>
              </div>
            </div>
          )}

          {/* Thông tin Momo */}
          {paymentMethod === 'momo' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-pink-200 overflow-hidden">
                <div className="p-4 bg-pink-50 border-b border-pink-200">
                  <h3 className="font-medium text-pink-700">Ví Momo</h3>
                </div>

                <div className="p-4 space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Số điện thoại</span>
                      <button
                        onClick={() => handleCopy(transactionInfo.momoInfo.phoneNumber, 'phoneNumber')}
                        className="text-pink-600 hover:text-pink-800 text-sm flex items-center"
                      >
                        {copied.phoneNumber ? (
                          <>
                            <CheckCircle size={16} className="mr-1"/>
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-1"/>
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div
                      className="bg-gray-100 p-3 rounded font-mono text-lg">{transactionInfo.momoInfo.phoneNumber}</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Tên người nhận</span>
                      <button
                        onClick={() => handleCopy(transactionInfo.momoInfo.accountName, 'momoName')}
                        className="text-pink-600 hover:text-pink-800 text-sm flex items-center"
                      >
                        {copied.momoName ? (
                          <>
                            <CheckCircle size={16} className="mr-1"/>
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-1"/>
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-100 p-3 rounded font-medium">{transactionInfo.momoInfo.accountName}</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Số tiền cần chuyển</span>
                      <button
                        onClick={() => handleCopy(transactionInfo.amount.toString(), 'momoAmount')}
                        className="text-pink-600 hover:text-pink-800 text-sm flex items-center"
                      >
                        {copied.momoAmount ? (
                          <>
                            <CheckCircle size={16} className="mr-1"/>
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-1"/>
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div
                      className="bg-gray-100 p-3 rounded font-bold text-lg text-pink-600">{formatPrice(transactionInfo.amount)}</div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-gray-600 text-sm">Nội dung chuyển khoản</span>
                      <button
                        onClick={() => handleCopy(transactionInfo.transactionId, 'momoTransactionId')}
                        className="text-pink-600 hover:text-pink-800 text-sm flex items-center"
                      >
                        {copied.momoTransactionId ? (
                          <>
                            <CheckCircle size={16} className="mr-1"/>
                            <span>Đã sao chép</span>
                          </>
                        ) : (
                          <>
                            <Copy size={16} className="mr-1"/>
                            <span>Sao chép</span>
                          </>
                        )}
                      </button>
                    </div>
                    <div className="bg-gray-100 p-3 rounded font-mono font-medium">{transactionInfo.transactionId}</div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center py-4">
                <div
                  className="w-64 h-64 bg-white border border-gray-300 rounded-lg p-4 flex items-center justify-center">
                  {/* QR code placeholder cho Momo */}
                  <div className="text-center">
                    <div className="w-48 h-48 mx-auto bg-pink-100 rounded relative overflow-hidden">
                      <div className="absolute inset-4 border-2 border-pink-400 rounded"></div>
                      <div className="absolute inset-0 flex items-center justify-center text-pink-400">
                        Mã QR Momo
                      </div>
                    </div>
                    <p className="mt-2 text-sm text-gray-600">Quét mã Momo để thanh toán</p>
                  </div>
                </div>
              </div>

              <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 text-pink-800">
                <h4 className="font-medium mb-2">Chú ý khi thanh toán qua Momo</h4>
                <ul className="text-sm space-y-1 list-disc list-inside">
                  <li>Bạn có thể mở app Momo và quét mã QR để thanh toán</li>
                  <li>Hoặc chuyển khoản thủ công đến số điện thoại trên</li>
                  <li>Nhập chính xác nội dung chuyển tiền để được xác nhận tự động</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Nút kiểm tra trạng thái và quay lại trang chủ */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition flex items-center justify-center">
            <RefreshCw size={20} className="mr-2"/>
            <span>Kiểm tra trạng thái thanh toán</span>
          </button>

          <Link href="/"
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-3 px-6 rounded-lg transition text-center">
            Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  )
}