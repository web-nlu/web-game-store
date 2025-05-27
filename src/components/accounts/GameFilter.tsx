'use client'
import React from "react";
import {useSearchParams} from "next/navigation";

type Props = {
  games: Game[]
}

export default function GameFilter({games}: Props) {
  const params = useSearchParams();
  const onChange =(value: string) =>  {
    if(value === "all") return
    const queryParams = new URLSearchParams(params.toString());
    queryParams.delete("keyword");
    queryParams.delete("lowPrice");
    queryParams.delete("highPrice");
    queryParams.delete("sortBy");
    queryParams.set("gameId", value);
    window.location.href = `/san-pham?${queryParams}`;
  }
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Trò chơi:</label>
      <select
        value={params.get("gameId") ?? "all"}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="all">Tất cả trò chơi</option>
        {games.map((game) => (
          <option key={game.id} value={game.id}>{game.name}</option>
        ))}
      </select>
    </div>
  )
}