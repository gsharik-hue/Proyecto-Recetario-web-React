import { useOptimistic, useState, startTransition } from 'react'
import { Link } from 'react-router'
import { FaClock, FaUserFriends, FaHeart, FaRegHeart } from 'react-icons/fa'
import { toast } from 'react-toastify'

const MAX_LENGTH = 90

const RecipeCard = ({ recipe, isFavorite = false, onToggleFavorite }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [optimisticFavorite, setOptimisticFavorite] = useOptimistic(
    Boolean(isFavorite),
    (_current, nextValue) => nextValue
  )

  const isLongText = recipe.description.length > MAX_LENGTH
  const displayedDescription =
    showFullDescription || !isLongText
      ? recipe.description
      : `${recipe.description.slice(0, MAX_LENGTH).trim()}...`

  const handleHeartClick = () => {
    if (!onToggleFavorite) return
    const nextState = !optimisticFavorite

    startTransition(async () => {
      setOptimisticFavorite(nextState)
      try {
        await onToggleFavorite(recipe.id, nextState)
      } catch {
        toast.error('No se pudo actualizar favorita; se revirtió el cambio')
      }
    })
  }

  return (
    <article className="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex flex-col justify-between hover:shadow-lg transition">
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold uppercase tracking-wide bg-rose-100 text-rose-700 px-2.5 py-1 rounded-full">
              {recipe.category}
            </span>
            <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full">
              {recipe.difficulty}
            </span>
          </div>

          {onToggleFavorite && (
            <button
              type="button"
              onClick={handleHeartClick}
              aria-label={
                optimisticFavorite
                  ? `Quitar ${recipe.title} de favoritas`
                  : `Marcar ${recipe.title} como favorita`
              }
              className="p-2 rounded-full hover:bg-rose-50 text-rose-600 transition cursor-pointer"
            >
              {optimisticFavorite ? (
                <FaHeart className="text-lg" />
              ) : (
                <FaRegHeart className="text-lg" />
              )}
            </button>
          )}
        </div>

        <h3 className="text-lg font-bold text-gray-900 mb-2">{recipe.title}</h3>

        <p className="text-sm text-gray-600 mb-2">{displayedDescription}</p>

        {isLongText && (
          <button
            type="button"
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="text-xs font-semibold text-rose-600 hover:text-rose-800 mb-4 cursor-pointer"
          >
            {showFullDescription ? 'Ver menos' : 'Ver más'}
          </button>
        )}
      </div>

      <div className="pt-4 mt-2 border-t border-gray-100">
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <FaClock className="text-rose-500" />
            {recipe.prepTime} min
          </span>
          <span className="flex items-center gap-1">
            <FaUserFriends className="text-rose-500" />
            {recipe.servings} porciones
          </span>
        </div>

        <Link
          to={`/recipes/${recipe.id}`}
          className="block w-full text-center bg-rose-600 hover:bg-rose-700 text-white text-sm font-semibold py-2 px-4 rounded-lg transition"
        >
          Ver receta
        </Link>
      </div>
    </article>
  )
}

export default RecipeCard