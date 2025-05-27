import CategoryFilter from "@/components/accounts/CategoriesFilter";
import React from "react";
import LazyLoadingList from "@/components/accounts/LazyLoadingList";
import SearchAccounts from "@/components/accounts/SearchAccounts";
import GameFilter from "@/components/accounts/GameFilter";
import SortAccounts from "@/components/accounts/SortAccounts";
import SortRangePrice from "@/components/accounts/SortRangePrice";

type SearchParams = Promise<{
  categoryId: number,
  keyword: string
}>

export default async function AccountsPage({searchParams}: {searchParams: SearchParams}) {
  const {categoryId, ...params} = await searchParams
  const queryProductParams: {[key: string]: string} = {
    ...params,
    page: "1"
  };
  if(categoryId) {
    queryProductParams["categoryId"] = categoryId.toString();
  }
  const [requestCategories, requestAccounts] = await Promise.all([
    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'force-cache',
      next: {revalidate: 60}
    }),
    fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/accounts?${new URLSearchParams(queryProductParams)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    }),
  ]);
  const { categories } = (await requestCategories.json());
  const { accounts } = (await requestAccounts.json());
  console.log(categories);
  let games = []
  if(categoryId) {
    const gameRequest = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_HOST}/api/games/${categoryId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    games = (await gameRequest.json()).games;
  }

  return (
    <main className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-center">Danh Sách Tài Khoản Game</h1>
        
        {/* Danh mục game */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Danh Mục Game</h2>
          <CategoryFilter categories={categories} selectedCategory={categoryId} />
        </div>

        <div className="bg-white rounded-lg p-6 mb-8 shadow">
          <h2 className="text-lg font-semibold mb-4">Bộ Lọc</h2>
          {/* Tìm kiếm theo tên */}
          <SearchAccounts />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Lọc theo tên trò chơi */}
            <GameFilter games={games} />

            {/* Sắp xếp */}
            <SortAccounts />

            {/* Lọc theo khoảng giá */}
            <SortRangePrice />
          </div>
        </div>


          {/* Hiển thị danh sách tài khoản */}
        <div>
          {!params.keyword && (<h2 className="text-xl font-semibold mb-4">
            {!categoryId
              ? 'Tất Cả Tài Khoản'
              : `Tài Khoản ${categories.find((c: Category) => c.id == categoryId)?.name || ''}`}
          </h2>)}
          {params.keyword && (<h2 className="text-xl font-semibold mb-4">
            Tìm kiếm: {params.keyword}
          </h2>)}

          {accounts.length === 0 ? (
            <div className="bg-white rounded-lg p-8 text-center">
              <p className="text-gray-500">Không tìm thấy tài khoản game nào trong danh mục này.</p>
            </div>
          ) : <LazyLoadingList availableAccounts={accounts} /> }
        </div>
      </div>
    </main>
)
} 