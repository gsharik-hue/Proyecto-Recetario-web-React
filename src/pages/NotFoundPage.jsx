import { Link } from 'react-router'
import { FaExclamationTriangle } from 'react-icons/fa'

const NotFoundPage = () => {
  return (
    <section className="max-w-xl mx-auto px-4 py-20 text-center">
      <title>404 - Página no encontrada | CookBook</title>

      <FaExclamationTriangle className="text-amber-500 text-5xl mx-auto mb-4" />
      <h1 className="text-4xl font-extrabold text-gray-900 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-6">
        Lo sentimos, la página que buscas no existe en nuestro recetario.
      </p>
      <Link
        to="/"
        className="inline-block bg-rose-600 hover:bg-rose-700 text-white font-semibold px-6 py-2.5 rounded-lg transition"
      >
        Volver al inicio
      </Link>
    </section>
  )
}

export default NotFoundPage