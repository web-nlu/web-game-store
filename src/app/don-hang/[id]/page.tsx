'use client'
import {formatPrice, formatVietnamTime} from "@/utils";
import {Calendar, CheckCircle, Clock, CreditCard, Package, XCircle} from "lucide-react";
import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import CommonLoading from "@/components/common/commonLoading";
import _ from "lodash";

export default function OrderPage() {
  const [loading, setLoading] = useState(true);
  const {id} = useParams();
  const [order, setOrder] = useState({} as Order)
  useEffect(() => {
    if(!id) {
      window.location.href = "/"
      return;
    }
    init().then((res) => setOrder(res))
  }, [])

  useEffect(() => {
    if(!_.isEmpty(order)) {
      setLoading(false);
    }
  }, [JSON.stringify(order)]);

  const init = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/s/order/${id}`);
    const { order } = await res.json();
    if(!order) {
      window.location.href = "/"
      return;
    }
    return order;
  }

  const getStatusText = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'Hoàn thành';
      case 'pending':
        return 'Đang xử lý';
      case 'cancelled':
        return 'Đã hủy';
      default:
        return status;
    }
  };
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'pending':
        return <Clock className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return loading ? <CommonLoading /> : (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <div className="h-6 w-px bg-gray-300"></div>
            <h1 className="text-2xl font-bold text-gray-900">Chi tiết đơn hàng #{order.id}</h1>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Trạng thái đơn hàng</h2>
                <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-2">{getStatusText(order.status)}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Ngày đặt hàng</p>
                    <p className="font-medium">{formatVietnamTime(order.createdAt)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Phương thức thanh toán</p>
                    <p className="font-medium">{order.paymentMethod}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Products & Account Details */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <Package className="w-5 h-5 mr-2" />
                  Sản phẩm đã mua
                </h2>
              </div>

              <div className="divide-y divide-gray-200">
                {order.orderDetails.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-1">{item.productName}</h3>
                        <p className="text-sm text-gray-500">ID sản phẩm: {item.productId}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-lg text-blue-600">{formatPrice(item.price)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Order Summary */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tóm tắt đơn hàng</h3>

              <div className="space-y-3">
                {order.orderDetails.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 truncate pr-2">{item.productName}</span>
                    <span className="font-medium">{formatPrice(item.price)}</span>
                  </div>
                ))}

                <div className="pt-3 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Tổng cộng</span>
                    <span className="text-xl font-bold text-blue-600">{formatPrice(order.totalPrice)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Info */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin thanh toán</h3>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Mã thanh toán</span>
                  <span className="font-mono text-sm">{order.paymentLinkId}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Phương thức</span>
                  <span className="font-medium">{order.paymentMethod}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">Cập nhật lần cuối</span>
                  <span className="text-sm">{formatVietnamTime(order.updatedAt)}</span>
                </div>
              </div>
            </div>

            {/* Support */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Cần hỗ trợ?</h3>
              <p className="text-blue-700 text-sm mb-4">
                Liên hệ với chúng tôi nếu bạn gặp vấn đề với đơn hàng này.
              </p>
              <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                Liên hệ hỗ trợ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}