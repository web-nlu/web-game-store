import { accounts } from "@/data/accounts";
import { categories } from "@/data/category";
import { formatPrice } from "@/utils";
import Link from "next/link";
import CategoryFilter from "@/components/san-pham/CategoriesFilter";

type SearchParams = Promise<{
  category: number
}>

export default async function AccountsPage({searchParams}: {searchParams: SearchParams}) {
  const {category} = await searchParams
  const requestCategories = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'force-cache',
    next: {revalidate: 60}
  });
  const { categories } = (await requestCategories.json());

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Danh Sách Tài Khoản Game</h1>
        
        {/* Danh mục game */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Danh Mục Game</h2>
          <CategoryFilter categories={categories} selectedCategory={category} />
        </div>

        <div className="bg-white rounded-lg p-6 mb-8 shadow">
          <h2 className="text-lg font-semibold mb-4">Bộ Lọc</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Tìm kiếm theo tên */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tìm kiếm:</label>
              <input
                type="text"
                placeholder="Nhập từ khóa..."
                // onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Lọc theo tên trò chơi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Trò chơi:</label>
              <select
                // onChange={(e) => setSelectedGame(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">Tất cả trò chơi</option>
                {/*{availableGames.map((game) => (*/}
                {/*  <option key={game} value={game}>{game}</option>*/}
                {/*))}*/}
              </select>
            </div>

            {/* Lọc theo khoảng giá */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Giá tiền:</label>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  min="0"
                  placeholder="Từ"
                  // value={priceRange.min}
                  // onChange={(e) => setPriceRange({...priceRange, min: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
                <span>-</span>
                <input
                  type="number"
                  min="0"
                  placeholder="Đến"
                  // value={priceRange.max}
                  // onChange={(e) => setPriceRange({...priceRange, max: Number(e.target.value)})}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Sắp xếp */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sắp xếp:</label>
              <select
                // value={sortOrder}
                // onChange={(e) => setSortOrder(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="none">Mặc định</option>
                <option value="asc">Giá: Thấp đến cao</option>
                <option value="desc">Giá: Cao đến thấp</option>
              </select>
            </div>
          </div>
        </div>


          {/* Hiển thị danh sách tài khoản */}
        <div>
          {/*<h2 className="text-xl font-semibold mb-4">*/}
          {/*  {selectedCategory === 'all'*/}
          {/*    ? 'Tất Cả Tài Khoản'*/}
          {/*    : `Tài Khoản ${categories.find(c => c.id === selectedCategory)?.name || ''}`}*/}
          {/*</h2>*/}

          {/*{isLoading ? (*/}
          {/*  <div className="flex justify-center py-12">*/}
          {/*    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>*/}
          {/*  </div>*/}
          {/*) : filteredAccounts.length === 0 ? (*/}
          {/*  <div className="bg-white rounded-lg p-8 text-center">*/}
          {/*    <p className="text-gray-500">Không tìm thấy tài khoản game nào trong danh mục này.</p>*/}
          {/*  </div>*/}
          {/*) : (*/}
          {/*  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">*/}
          {/*    {filteredAccounts.map((account) => (*/}
          {/*      <div key={account.id}*/}
          {/*           className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">*/}
          {/*        <div className="relative h-48 bg-gray-200">*/}
          {/*          /!* Đây là phần hiển thị hình ảnh - thực tế cần thay bằng Image của Next.js *!/*/}
          {/*          <div className="w-full h-full flex items-center justify-center text-gray-400">*/}
          {/*            /!* Thay thế bằng hình ảnh thực khi có *!/*/}
          {/*            <span className="text-6xl">{*/}
          {/*              account.category === 'moba' ? '🎮' :*/}
          {/*                account.category === 'fps' ? '🔫' :*/}
          {/*                  account.category === 'rpg' ? '⚔️' :*/}
          {/*                    account.category === 'strategy' ? '🧠' : '⚽'*/}
          {/*            }</span>*/}
          {/*          </div>*/}
          {/*        </div>*/}

          {/*        <div className="p-4">*/}
          {/*          <Link href={`/game-accounts/${account.id}`}>*/}
          {/*            <h3 className="font-bold text-lg mb-2 hover:text-blue-600 transition">{account.title}</h3>*/}
          {/*          </Link>*/}
          {/*          <p className="text-gray-600 text-sm mb-3">{account.info}</p>*/}
          {/*          <div className="flex justify-between items-center">*/}
          {/*            <span className="font-bold text-red-600">{formatPrice(account.price)}</span>*/}
          {/*            <Link href={`/game-accounts/${account.id}`}>*/}
          {/*            <span className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition text-sm">*/}
          {/*              Chi tiết*/}
          {/*            </span>*/}
          {/*            </Link>*/}
          {/*          </div>*/}
          {/*        </div>*/}
          {/*      </div>*/}
          {/*    ))}*/}
          {/*  </div>*/}
          {/*)}*/}
        </div>
      </div>
    </main>
)
} 