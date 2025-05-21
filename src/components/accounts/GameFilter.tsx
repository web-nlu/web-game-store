'use client'
import React from "react";

type Props = {
  games: Game[]
}

export default function GameFilter({games}: Props) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Trò chơi:</label>
      <select
        // onChange={(e) => setSelectedGame(e.target.value)}
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