import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import RecipeCard from '../components/RecipeCard'
import Spinner from '../components/Spinner'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getAllRecipes } from '../services/recipesApi'

const FavoritesPage = () => {
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
          setError(err.message || 'No se pudieron cargar las recetas favoritas')
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

  const favoriteRecipes = recipes.filter((recipe) =>
    favoriteIds.includes(String(recipe.id))
  )

  const handleToggleFavorite = async (recipeId, nextIsFavorite) => {
    const idStr = String(recipeId)
    setFavoriteIds((prev) =>
      nextIsFavorite
        ? prev.includes(idStr)
          ? prev
          : [...prev, idStr]
        : prev.filter((item) => item !== idStr)
    )
    toast.info(nextIsFavorite ? 'Agregada a favoritas' : 'Quitada de favoritas')
  }

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <title>Mis recetas favoritas | CookBook</title>
      <meta name="description" content="Tus recetas guardadas como favoritas en CookBook" />

      <h1 className="text-3xl font-bold text-gray-900 mb-6">Recetas favoritas</h1>

      {loading && <Spinner loading={loading} />}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
          {error}
        </div>
      )}

      {!loading && !error && favoriteRecipes.length === 0 && (
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center space-y-4">
          <p className="text-gray-600">
            Aún no tienes recetas marcadas como favoritas.
          </p>
          <Link
            to="/recipes"
            className="inline-block bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition"
          >
            Explorar recetas
          </Link>
        </div>
      )}

      {!loading && !error && favoriteRecipes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {favoriteRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              isFavorite={true}
              onToggleFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default FavoritesPage