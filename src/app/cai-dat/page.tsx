'use client'
import React, {useEffect, useState} from 'react';
import { Camera, Phone, Lock, User, Save, Eye, EyeOff } from 'lucide-react';
import {useUserStore} from "@/service/user/userService";
import _ from "lodash";
import UploadAvatar from "@/components/user/UploadAvatar";
import {CldImage} from "next-cloudinary";
import UpdateInfo from "@/components/user/UpdateInfo";
import UserChangePassword from "@/components/user/ChangePassword";

export default function PersonalSettings() {
  const {user} = useUserStore()

  const [activeTab, setActiveTab] = useState('avatar');

  // useEffect(() => {
  //   if(_.isEmpty(user)) {
  //     window.location.href = "/";
  //     return;
  //   }
  // }, [JSON.stringify(user)])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
            <h1 className="text-3xl font-bold text-white">Cài Đặt Cá Nhân</h1>
            <p className="text-blue-100 mt-2">Quản lý thông tin và bảo mật tài khoản của bạn</p>
          </div>

          <div className="flex flex-col lg:flex-row">
            {/* Sidebar */}
            <div className="lg:w-1/4 border-r border-gray-200 p-6">
              <nav className="space-y-2">
                {[
                  { id: 'avatar', label: 'Ảnh đại diện', icon: Camera },
                  { id: 'phone', label: 'Số điện thoại', icon: Phone },
                  { id: 'password', label: 'Mật khẩu', icon: Lock }
                ].map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                        activeTab === tab.id
                          ? 'bg-blue-50 text-blue-600 border-l-4 border-blue-600'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className="w-5 h-5 mr-3" />
                      {tab.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4 p-8">
              {/* Profile Summary */}
              <div className="bg-gray-50 rounded-xl p-6 mb-8">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center overflow-hidden">
                      {user?.avatar ? (
                        <CldImage src={user?.avatar} alt="Avatar" width={120} height={120} crop={"fill"} />
                      ) : (
                        <User className="w-10 h-10 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-600">{user?.email}</p>
                    <p className="text-gray-600">{user?.phoneNumber}</p>
                  </div>
                </div>
              </div>

              {/* Avatar Tab */}
              {activeTab === 'avatar' && (
                <UploadAvatar image={user?.avatar} />
              )}

              {/* Phone Tab */}
              {activeTab === 'phone' && (
                <UpdateInfo />
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <UserChangePassword />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}