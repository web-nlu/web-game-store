'use client'
import {Camera, User} from "lucide-react";
import React, {useEffect, useState} from "react";
import {CldImage, CldUploadWidget, CloudinaryUploadWidgetInfo} from "next-cloudinary";
import Button from "@/components/common/button";
import {useUserStore} from "@/service/user/userService";

type Props = {
  image?: string;
}

export default function UploadAvatar({ image = "" }: Props) {
  const [publicId, setPublicId] = useState("");
  const {user, uploadAvatar} = useUserStore();
  useEffect(() => {
    setPublicId(image)
  }, [image]);

  const upload = async () => {
    uploadAvatar(publicId, user);
  }

  return (
    <div className="flex flex-col gap-3 items-center space-x-4">
      <CldUploadWidget
        uploadPreset="pujjdcar"
        options={{multiple: false, folder: "avatars"}}
        onSuccess={(result, { widget }) => {
          setPublicId((result.info as CloudinaryUploadWidgetInfo ).public_id || "");
        }}
        onQueuesEnd={(result, { widget }) => {
          widget.close();
        }}
      >
        {({ open }) => {
          return (
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Camera className="w-6 h-6 text-blue-600"/>
                <h3 className="text-xl font-semibold text-gray-800">Thay đổi ảnh đại diện</h3>
              </div>

              <div
                className="flex flex-col items-center space-y-6 p-8 border-2 border-dashed border-gray-300 rounded-xl">
                <div
                  className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 flex items-center justify-center overflow-hidden">
                  {publicId ? (
                    <CldImage src={publicId} alt="Avatar" width={150} height={150} crop={"fill"}/>
                  ) : (
                    <User className="w-16 h-16 text-white"/>
                  )}
                </div>
                <div onClick={() => open()} className="cursor-pointer text-center">
                  <label
                    className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                    <Camera className="w-5 h-5 mr-2"/>
                    Chọn ảnh mới
                  </label>
                  <p className="text-sm text-gray-500 mt-2">Hỗ trợ JPG, PNG. Tối đa 5MB</p>
                </div>
              </div>
            </div>
          );
        }}
      </CldUploadWidget>
      <Button onClick={upload} label={"Cập nhật"} style={"filled"} className={"px-5"}/>
    </div>
  )
}