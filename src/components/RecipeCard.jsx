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

  const description = recipe?.description || ''
  const isLongText = description.length > MAX_LENGTH
  const displayedDescription =
    showFullDescription || !isLongText
      ? description
      : `${description.slice(0, MAX_LENGTH).trim()}...`

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
    <article className="bg-white rounded-2xl border-t-4 border-t-amber-600 border-x border-b border-stone-200/90 shadow-xs p-6 flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              {recipe.category}
            </span>
            <span className="text-xs font-medium bg-stone-100 text-stone-700 px-3 py-1 rounded-full">
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
              className="p-1.5 rounded-full hover:bg-rose-50 text-rose-600 transition cursor-pointer"
            >
              {optimisticFavorite ? (
                <FaHeart className="text-base" />
              ) : (
                <FaRegHeart className="text-base" />
              )}
            </button>
          )}
        </div>

        <h3 className="text-xl font-extrabold text-stone-900 mb-2 leading-snug">
          {recipe.title}
        </h3>

        <p className="text-sm text-stone-600 mb-2">{displayedDescription}</p>

        {isLongText && (
          <button
            type="button"
            onClick={() => setShowFullDescription((prev) => !prev)}
            className="text-xs font-semibold text-amber-700 hover:text-amber-900 mb-3 cursor-pointer"
          >
            {showFullDescription ? 'Ver menos' : 'Ver más'}
          </button>
        )}
      </div>

      <div className="pt-4 mt-4 border-t border-stone-100">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
          <span className="flex items-center gap-1.5">
            <FaClock className="text-amber-600/80" />
            {recipe.prepTime} min
          </span>
          <span className="flex items-center gap-1.5">
            <FaUserFriends className="text-amber-600/80" />
            {recipe.servings} porciones
          </span>
        </div>

        <Link
          to={`/recipes/${recipe.id}`}
          className="block w-full text-center bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition"
        >
          Ver receta
        </Link>
      </div>
    </article>
  )
}

export default RecipeCard