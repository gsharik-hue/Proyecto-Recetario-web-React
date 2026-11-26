import { Link, useRouteError, isRouteErrorResponse } from 'react-router'
import { FaUtensils } from 'react-icons/fa'

const RouteErrorBoundary = () => {
  const error = useRouteError()

  let title = 'No encontramos esta receta'
  let message =
    'La receta que intentas consultar no existe o fue eliminada de nuestro recetario.'

  if (isRouteErrorResponse(error)) {
    title = `Error ${error.status}`
    message = error.data?.message || error.statusText || message
  } else if (error instanceof Error && error.message) {
    message = error.message
  }

  return (
    <section className="max-w-xl mx-auto px-4 py-20 text-center">
      <title>{title} | CookBook</title>

      <FaUtensils className="text-rose-500 text-5xl mx-auto mb-4" />
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">{title}</h1>
      <p className="text-gray-600 mb-6">{message}</p>
      <div className="flex items-center justify-center gap-3">
        <Link
          to="/recipes"
          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold px-5 py-2.5 rounded-lg transition"
        >
          Ver todas las recetas
        </Link>
        <Link
          to="/"
          className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold px-5 py-2.5 rounded-lg transition"
        >
          Ir al inicio
        </Link>
      </div>
    </section>
  )
}

export default RouteErrorBoundary