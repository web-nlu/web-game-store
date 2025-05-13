'use client'

type Props = {
  categories: Category[]
  selectedCategory: number
}

export default function CategoryFilter({categories, selectedCategory}: Props) {

  const setSelectedCategory = async (category: string) => {
    if(category == "0") {
      window.location.href = "/san-pham"
      return
    }
    window.location.href = `/san-pham?${new URLSearchParams({category})}`
  }

  return (
    <div className="flex flex-wrap gap-4 mb-8">
      <button
        onClick={() => setSelectedCategory("0")}
        className={`px-4 py-2 rounded-lg transition ${
          !selectedCategory
            ? 'bg-blue-600 text-white'
            : 'bg-white hover:bg-blue-50'
        }`}
      >
        🎲 Tất cả
      </button>

      {categories.map((category: Category) => (
        <button
          key={category.id}
          onClick={() => setSelectedCategory(category.id.toString())}
          className={`px-4 py-2 rounded-lg transition ${
            selectedCategory == category.id
              ? 'bg-blue-600 text-white'
              : 'bg-white hover:bg-blue-50'
          }`}
        >
          {category.icon} {category.name}
        </button>
      ))}
    </div>
  )
}