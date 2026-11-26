import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import Hero from '../components/Hero'
import Card from '../components/Card'
import RecipeCard from '../components/RecipeCard'
import Spinner from '../components/Spinner'
import { getLatestRecipes } from '../services/recipesApi'

const HomePage = () => {
  const [recentRecipes, setRecentRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let ignore = false

    const fetchRecent = async () => {
      try {
        setLoading(true)
        const data = await getLatestRecipes(3)
        if (!ignore) {
          setRecentRecipes(data)
          setError(null)
        }
      } catch (err) {
        if (!ignore) {
          setError(err.message || 'Ocurrió un error al cargar las recetas recientes')
        }
      } finally {
        if (!ignore) {
          setLoading(false)
        }
      }
    }

    fetchRecent()
    return () => {
      ignore = true
    }
  }, [])

  return (
    <>
      <title>CookBook | Inicio</title>
      <meta name="description" content="Explora y comparte recetas caseras en CookBook" />

      <Hero />

      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card bg="bg-white">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Para curiosos</h2>
            <p className="text-gray-600 mb-4 text-sm">
              Explora desayunos, almuerzos, postres y bebidas con ingredientes claros y pasos detallados.
            </p>
            <Link
              to="/recipes"
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Explorar recetas
            </Link>
          </Card>

          <Card bg="bg-rose-50">
            <h2 className="text-xl font-bold text-gray-900 mb-2">Para cocineros</h2>
            <p className="text-gray-600 mb-4 text-sm">
              ¿Tienes una receta especial? Compártela con la comunidad en pocos minutos.
            </p>
            <Link
              to="/add-recipe"
              className="inline-block bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
            >
              Publicar receta
            </Link>
          </Card>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-14">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
          Recetas más recientes
        </h2>

        {loading && <Spinner loading={loading} />}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg text-center">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {recentRecipes.map((recipe) => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>

            <div className="text-center mt-10">
              <Link
                to="/recipes"
                className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-semibold px-8 py-3 rounded-xl transition"
              >
                Ver todas las recetas
              </Link>
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default HomePage