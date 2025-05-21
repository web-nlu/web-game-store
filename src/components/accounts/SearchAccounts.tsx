'use client'
import React, {FormEvent} from "react";
import {useSearchParams} from "next/navigation";
import Button from "@/components/common/button";
import {SearchIcon} from "lucide-react";

export default function SearchAccounts () {
  const params = useSearchParams();
  let value: string = params.get("keyword") ?? "";

  const search = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const searchParams = new URLSearchParams({
      "keyword": value,
      "page": params.get("page") ?? "0",
    });
    window.location.href = `/san-pham?${searchParams}`;
  }

  return (
    <div>
      <form className="flex flex-wrap gap-4 mb-8" onSubmit={search}>
        <input
          type="text"
          placeholder="Nhập từ khóa..."
          onChange={(e) => {
            value = e.target.value
          }}
          defaultValue={value}
          className="flex-2 p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
        />
        <Button className={"flex-none px-3 cursor-pointer"} style={"filled"} label={"Tìm kiếm"} icon={<SearchIcon />}/>
      </form>
    </div>
  )
}