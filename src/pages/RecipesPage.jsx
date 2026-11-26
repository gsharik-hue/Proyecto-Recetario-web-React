import { useEffect, useState } from 'react'
import RecipeCard from '../components/RecipeCard'
import Spinner from '../components/Spinner'
import { getAllRecipes } from '../Services/recipesApi'

const RecipesPage = () => {
  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  return (
    <section className="max-w-6xl mx-auto px-4 py-10">
      <title>CookBook | Todas las recetas</title>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      )}
    </section>
  )
}

export default RecipesPage