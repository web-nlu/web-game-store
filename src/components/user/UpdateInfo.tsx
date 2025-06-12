'use client'
import {Phone, Save} from "lucide-react";
import React, {useEffect, useState} from "react";
import {useUserStore} from "@/service/user/userService";
import _ from "lodash";

export default function UpdateInfo() {
  const {user, update} = useUserStore()
  const [formData, setFormData] = useState({
    phoneNumber: '',
  } as UserInfo);

  useEffect(() => {
    setFormData({
      phoneNumber: user?.phoneNumber || '',
    })
  }, [JSON.stringify(user)])

  const onSubmit = () => {
    update(formData, user);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Phone className="w-6 h-6 text-blue-600"/>
        <h3 className="text-xl font-semibold text-gray-800">Thay đổi số điện thoại</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại hiện tại
          </label>
          <input
            type="text"
            value={user?.phoneNumber}
            disabled
            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Số điện thoại mới
          </label>
          <input
            type="tel"
            value={formData.phoneNumber}
            onChange={(event) => setFormData({phoneNumber: event.target.value})}
            placeholder="Nhập số điện thoại mới"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <button
          onClick={onSubmit}
          className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5 mr-2"/>
          Cập nhật số điện thoại
        </button>
      </div>
    </div>
  )
}