import { useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import {
  FaArrowLeft,
  FaClock,
  FaUserFriends,
  FaEdit,
  FaTrash,
  FaUser,
  FaEnvelope,
} from 'react-icons/fa'
import { deleteRecipe } from '../services/recipesApi'

const RecipeDetailPage = () => {
  const recipe = useLoaderData()
  const navigate = useNavigate()
  const [deleting, setDeleting] = useState(false)

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `¿Seguro que deseas eliminar la receta "${recipe.title}"? Esta acción no se puede deshacer.`
    )
    if (!confirmed) return

    try {
      setDeleting(true)
      await deleteRecipe(recipe.id)
      toast.success('Receta eliminada correctamente')
      navigate('/recipes')
    } catch (error) {
      toast.error(error.message || 'No se pudo eliminar la receta')
      setDeleting(false)
    }
  }

  return (
    <section className="max-w-4xl mx-auto px-4 py-10">
      <title>{recipe.title} | CookBook</title>
      <meta name="description" content={recipe.description} />

      <div className="mb-6">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-rose-600 hover:text-rose-800 transition"
        >
          <FaArrowLeft />
          <span>Volver al listado</span>
        </Link>
      </div>

      <article className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide bg-rose-100 text-rose-700 px-3 py-1 rounded-full">
                {recipe.category}
              </span>
              <span className="text-xs font-medium bg-amber-100 text-amber-800 px-3 py-1 rounded-full">
                Dificultad: {recipe.difficulty}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Link
                to={`/edit-recipe/${recipe.id}`}
                className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition"
              >
                <FaEdit />
                <span>Editar</span>
              </Link>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting}
                className="inline-flex items-center gap-1.5 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition cursor-pointer"
              >
                <FaTrash />
                <span>{deleting ? 'Eliminando...' : 'Eliminar'}</span>
              </button>
            </div>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-gray-900 mb-3">
            {recipe.title}
          </h1>

          <p className="text-gray-600 text-base leading-relaxed mb-6">
            {recipe.description}
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-gray-50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center gap-2.5">
              <FaClock className="text-rose-600 text-lg" />
              <div>
                <p className="text-xs text-gray-500">Preparación</p>
                <p className="text-sm font-bold text-gray-900">{recipe.prepTime} min</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <FaUserFriends className="text-rose-600 text-lg" />
              <div>
                <p className="text-xs text-gray-500">Porciones</p>
                <p className="text-sm font-bold text-gray-900">{recipe.servings}</p>
              </div>
            </div>

            <div className="col-span-2 sm:col-span-1 flex items-center gap-2.5">
              <div>
                <p className="text-xs text-gray-500">Publicada</p>
                <p className="text-sm font-semibold text-gray-800">
                  {recipe.createdAt
                    ? new Date(recipe.createdAt).toLocaleDateString('es-CO')
                    : 'Reciente'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-8 border-b border-gray-100">
          {/* Ingredientes */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Ingredientes</h2>
            <ul className="space-y-2.5">
              {(recipe.ingredients || []).map((item, idx) => (
                <li
                  key={`${item.name}-${idx}`}
                  className="flex items-center justify-between bg-rose-50/60 px-3.5 py-2.5 rounded-lg border border-rose-100 text-sm"
                >
                  <span className="font-medium text-gray-800">{item.name}</span>
                  <span className="text-rose-700 font-semibold">{item.quantity}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pasos numerados */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Preparación</h2>
            <ol className="space-y-3">
              {(recipe.steps || []).map((step, index) => (
                <li key={`${index}-${step.slice(0, 12)}`} className="flex gap-3 text-sm">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-600 text-white font-bold text-xs flex items-center justify-center mt-0.5">
                    {index + 1}
                  </span>
                  <p className="text-gray-700 leading-relaxed">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Autor */}
        <div className="p-6 sm:p-8 bg-gray-50">
          <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-3">
            Sobre el autor
          </h2>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <p className="font-bold text-gray-900 flex items-center gap-2">
                <FaUser className="text-rose-600 text-sm" />
                <span>{recipe.author?.name || 'Autor anónimo'}</span>
              </p>
              {recipe.author?.bio && (
                <p className="text-sm text-gray-600 mt-1">{recipe.author.bio}</p>
              )}
            </div>
            {recipe.author?.email && (
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaEnvelope className="text-rose-600" />
                <span>{recipe.author.email}</span>
              </p>
            )}
          </div>
        </div>
      </article>
    </section>
  )
}

export default RecipeDetailPage