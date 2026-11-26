import { useState } from 'react'
import RecipeCard from './RecipeCard'

const CATEGORIES = ['Desayuno', 'Almuerzo', 'Cena', 'Postre', 'Bebida']
const DIFFICULTIES = ['Fácil', 'Media', 'Difícil']
const PER_PAGE = 6

const RecipeList = ({
  recipes,
  favoriteIds = [],
  onToggleFavorite,
  emptyMessage = 'No encontramos recetas con esos filtros.',
}) => {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('Todas')
  const [difficulty, setDifficulty] = useState('Todas')
  const [currentPage, setCurrentPage] = useState(1)

  const normalizedText = search.trim().toLowerCase()
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesText = (recipe.title || '').toLowerCase().includes(normalizedText)
    const matchesCategory = category === 'Todas' || recipe.category === category
    const matchesDifficulty = difficulty === 'Todas' || recipe.difficulty === difficulty
    return matchesText && matchesCategory && matchesDifficulty
  })

  const totalPages = Math.max(1, Math.ceil(filteredRecipes.length / PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const startIndex = (safePage - 1) * PER_PAGE
  const paginatedRecipes = filteredRecipes.slice(startIndex, startIndex + PER_PAGE)

  const handleSearchChange = (e) => {
    setSearch(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryChange = (e) => {
    setCategory(e.target.value)
    setCurrentPage(1)
  }

  const handleDifficultyChange = (e) => {
    setDifficulty(e.target.value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearch('')
    setCategory('Todas')
    setDifficulty('Todas')
    setCurrentPage(1)
  }

  return (
    <section>
      <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <input
          type="search"
          aria-label="Buscar receta por nombre"
          placeholder="Buscar por nombre..."
          value={search}
          onChange={handleSearchChange}
          className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        />

        <select
          aria-label="Filtrar por categoría"
          value={category}
          onChange={handleCategoryChange}
          className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="Todas">Todas las categorías</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          aria-label="Filtrar por dificultad"
          value={difficulty}
          onChange={handleDifficultyChange}
          className="bg-white border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        >
          <option value="Todas">Todas las dificultades</option>
          {DIFFICULTIES.map((d) => (
            <option key={d} value={d}>
              {d}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={clearFilters}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold border border-gray-300 rounded-lg py-2 px-3 text-sm transition cursor-pointer"
        >
          Limpiar filtros
        </button>
      </div>

      <p className="mb-4 text-sm text-gray-600">
        Mostrando {filteredRecipes.length} de {recipes.length} recetas
      </p>

      {filteredRecipes.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-600">
          {emptyMessage}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginatedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoriteIds.includes(String(recipe.id))}
                onToggleFavorite={onToggleFavorite}
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 text-sm font-semibold transition cursor-pointer"
              >
                Anterior
              </button>

              <span className="text-sm font-semibold text-gray-700">
                Página {safePage} de {totalPages}
              </span>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 text-sm font-semibold transition cursor-pointer"
              >
                Siguiente
              </button>
            </div>
          )}
        </>
      )}
    </section>
  )
}

export default RecipeList