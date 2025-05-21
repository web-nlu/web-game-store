'use client'
import React from "react";
import {useSearchParams} from "next/navigation";

export default function SortAccounts() {
  const params = useSearchParams();

  const onChange =(value: string) =>  {
    const queryParams = new URLSearchParams(params.toString());
    queryParams.delete("keyword");
    queryParams.delete("lowPrice");
    queryParams.delete("highPrice");
    queryParams.set("sortBy", value);
    window.location.href = `/san-pham?${queryParams}`;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp:</label>
      <select
        value={params.get("sortBy") ?? "none"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="none">Mặc định</option>
        <option value="price_asc">Giá: Thấp đến cao</option>
        <option value="price_desc">Giá: Cao đến thấp</option>
        <option value="title_asc">Tên: A - Z</option>
        <option value="title_asc">Tên: Z - A</option>
      </select>
    </div>
  )
}