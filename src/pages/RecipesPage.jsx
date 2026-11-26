import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import RecipeList from '../components/RecipeList'
import Spinner from '../components/Spinner'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getAllRecipes } from '../services/recipesApi'

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [favoriteIds, setFavoriteIds] = useLocalStorage('cookbook_favorite_ids', [])

  useEffect(() => {
    let ignore = false

    const fetchRecipes = async () => {
      try {
        setLoading(true)
        const data = await getAllRecipes()
        if (!ignore) {
          setRecipes(Array.isArray(data) ? data : data.data || [])
          setError(null)
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Error al cargar el listado de recetas')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchRecipes()
    return () => {
      ignore = true
    }
  }, [])

  const handleToggleFavorite = async (recipeId, nextIsFavorite) => {
    const idStr = String(recipeId)
    setFavoriteIds((prev) => {
      const exists = prev.includes(idStr)
      if (nextIsFavorite && !exists) {
        return [...prev, idStr]
      }
      if (!nextIsFavorite && exists) {
        return prev.filter((item) => item !== idStr)
      }
      return prev
    })
    toast.info(nextIsFavorite ? 'Agregada a favoritas' : 'Quitada de favoritas')
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <title>CookBook | Todas las recetas</title>
      <meta name="description" content="Busca, filtra y explora todas las recetas de CookBook" />

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Todas las recetas</h1>

      {loading && <Spinner loading={loading} />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <p className="text-gray-600 bg-white p-6 rounded-xl border border-gray-200 text-center">
          Aún no hay recetas registradas. ¡Anímate a crear la primera!
        </p>
      )}

      {!loading && !error && recipes.length > 0 && (
        <RecipeList
          recipes={recipes}
          favoriteIds={favoriteIds}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </section>
  )
}

export default RecipesPage