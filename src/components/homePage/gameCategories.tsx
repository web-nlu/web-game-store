import Link from "next/link";
import {JSX} from "react";

type Props = {
  categories: Category[];
}

export default function GameCategories({categories}: Props): JSX.Element {
  return (
    <section className="mb-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Danh mục game nổi bật</h2>
        <Link href="/san-pham" className="text-blue-600 hover:text-blue-800 font-medium">
          Xem tất cả
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((game) => (
          <Link href={`/san-pham?categoryId=${game.id}`} key={game.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="h-32 bg-gray-100 relative">
              {/* Placeholder for game image */}
              <div className="absolute inset-0 text-4xl flex items-center justify-center text-gray-500">
                {game.icon}
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-bold text-gray-800 mb-1">{game.name}</h3>
              {/*<p className="text-sm text-gray-600">{game.count} tài khoản</p>*/}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}