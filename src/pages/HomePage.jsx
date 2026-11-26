import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { toast } from 'react-toastify'
import Hero from '../components/Hero'
import RecipeCard from '../components/RecipeCard'
import Spinner from '../components/Spinner'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { getLatestRecipes } from '../services/recipesApi'

const HomePage = () => {
  const [latestRecipes, setLatestRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [favoriteIds, setFavoriteIds] = useLocalStorage('cookbook_favorite_ids', [])

  useEffect(() => {
    let active = true

    async function loadLatest() {
      try {
        setLoading(true)
        setError('')
        const data = await getLatestRecipes(3)
        if (active) {
          setLatestRecipes(Array.isArray(data) ? data : [])
        }
      } catch (err) {
        if (active) {
          setError(err.message || 'Ocurrió un error al cargar las recetas.')
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    loadLatest()

    return () => {
      active = false
    }
  }, [])

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
    <>
      <title>Inicio | CookBook</title>
      <meta
        name="description"
        content="Explora preparaciones recientes, filtra por categoría o publica tu propia receta."
      />

      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-4">
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
          <div className="text-slate-600">
            <span className="font-bold text-slate-900">¿Tienes una receta en mente?</span>{' '}
            Guarda tus ingredientes, pasos y tiempos de preparación en el catálogo.
          </div>
          <Link
            to="/favorites"
            className="text-indigo-600 hover:text-indigo-800 font-semibold shrink-0"
          >
            Ver mis favoritas ({favoriteIds.length}) →
          </Link>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pt-4 pb-14">
        <div className="flex items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            Últimas recetas
          </h2>
          <Link
            to="/recipes"
            className="bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
          >
            Ver todas
          </Link>
        </div>

        {loading && <Spinner loading={loading} />}

        {!loading && error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl"
          >
            {error}
          </div>
        )}

        {!loading && !error && latestRecipes.length === 0 && (
          <p className="text-slate-600">
            Aún no hay recetas registradas para mostrar.
          </p>
        )}

        {!loading && !error && latestRecipes.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                isFavorite={favoriteIds.includes(String(recipe.id))}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        )}
      </section>
    </>
  )
}

export default HomePage