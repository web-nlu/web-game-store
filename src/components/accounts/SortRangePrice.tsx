'use client'
import React, {FormEvent} from "react";
import Button from "@/components/common/button";
import {useSearchParams} from "next/navigation";

export default function SortRangePrice() {
  const params = useSearchParams();
  let lowPrice = params.get("lowPrice") ?? "0";
  let highPrice = params.get("highPrice") ?? "0";
  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = new URLSearchParams(params.toString());
    queryParams.delete("keyword");
    queryParams.delete("sortBy");
    queryParams.set("lowPrice", lowPrice);
    queryParams.set("highPrice", highPrice);
    window.location.href = `/san-pham?${queryParams}`;
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Giá tiền:</label>
      <form className="flex items-center gap-2" onSubmit={onSubmit}>
        <input
          type="number"
          min="0"
          placeholder="Từ"
          defaultValue={params.get("lowPrice") ?? "0"}
          onChange={(e) => {lowPrice = e.target.value}}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <span>-</span>
        <input
          type="number"
          min="0"
          placeholder="Đến"
          defaultValue={params.get("highPrice") ?? "0"}
          onChange={(e) => {highPrice = e.target.value}}
          className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <Button  className={"flex-none px-3"} style={"filled"} label={"Lọc"} />
      </form>
    </div>
  )
}