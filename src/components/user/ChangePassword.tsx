import React, {useEffect, useState} from "react";
import {Eye, EyeOff, Lock, Save} from "lucide-react";
import toast from "react-hot-toast";
import {useUserStore} from "@/service/user/userService";

export default function UserChangePassword() {
  const {user, changePassword} = useUserStore()

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });

  const togglePasswordVisibility = (field: 'new' | 'confirm') => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const handlePasswordSubmit = async () => {
    if (formData.newPassword.length < 8) {
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("")
      return;
    }

    await changePassword(formData.newPassword, user)

    setFormData({
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Lock className="w-6 h-6 text-blue-600"/>
        <h3 className="text-xl font-semibold text-gray-800">Thay đổi mật khẩu</h3>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showPasswords.new ? 'text' : 'password'}
              value={formData.newPassword}
              onChange={(e) => setFormData(prev => ({...prev, newPassword: e.target.value}))}
              placeholder="Nhập mật khẩu mới (ít nhất 8 ký tự)"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('new')}
              className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.new ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Xác nhận mật khẩu mới
          </label>
          <div className="relative">
            <input
              type={showPasswords.confirm ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => setFormData(prev => ({...prev, confirmPassword: e.target.value}))}
              placeholder="Nhập lại mật khẩu mới"
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility('confirm')}
              className="cursor-pointer absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPasswords.confirm ? <EyeOff className="w-5 h-5"/> : <Eye className="w-5 h-5"/>}
            </button>
          </div>
        </div>

        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Lưu ý:</strong> Mật khẩu mới phải có ít nhất 8 ký tự và nên bao gồm chữ cái, số và ký tự đặc biệt.
          </p>
        </div>

        <button
          onClick={handlePasswordSubmit}
          className="cursor-pointer flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Save className="w-5 h-5 mr-2"/>
          Cập nhật mật khẩu
        </button>
      </div>
    </div>
  )
}