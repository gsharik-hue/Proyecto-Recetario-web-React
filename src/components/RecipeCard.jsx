import { useOptimistic, useState, startTransition } from 'react'
import { Link } from 'react-router'
import { FaClock, FaUserFriends, FaHeart, FaRegHeart, FaUtensils } from 'react-icons/fa'
import { toast } from 'react-toastify'

const MAX_LENGTH = 90

const RecipeCard = ({ recipe, isFavorite = false, onToggleFavorite }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)
  const [imgError, setImgError] = useState(false)
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

  const hasValidImage = Boolean(recipe?.image) && !imgError

  return (
    <article className="bg-white rounded-2xl border-t-4 border-t-amber-600 border-x border-b border-stone-200/90 shadow-xs overflow-hidden flex flex-col justify-between hover:shadow-md transition">
      <div>
        <div className="relative h-56 sm:h-60 w-full bg-stone-50 border-b border-stone-100 overflow-hidden flex items-center justify-center p-2">
          {hasValidImage ? (
            <img
              src={recipe.image}
              alt={recipe.title}
              onError={() => setImgError(true)}
              className="w-full h-full object-contain rounded-lg transition duration-300 hover:scale-[1.02]"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-amber-100 via-amber-50 to-stone-100 text-amber-800 gap-2 rounded-lg">
              <FaUtensils className="text-2xl text-amber-600" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-900/80">
                {recipe.category || 'Receta casera'}
              </span>
            </div>
          )}

          {onToggleFavorite && (
            <button
              type="button"
              onClick={handleHeartClick}
              aria-label={
                optimisticFavorite
                  ? `Quitar ${recipe.title} de favoritas`
                  : `Marcar ${recipe.title} como favorita`
              }
              className="absolute top-3 right-3 p-2 rounded-full bg-white/95 hover:bg-white shadow-xs text-rose-600 transition cursor-pointer"
            >
              {optimisticFavorite ? (
                <FaHeart className="text-base" />
              ) : (
                <FaRegHeart className="text-base" />
              )}
            </button>
          )}
        </div>

        <div className="p-6 pb-0">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-xs font-semibold bg-amber-100 text-amber-900 px-3 py-1 rounded-full">
              {recipe.category}
            </span>
            <span className="text-xs font-medium bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full">
              {recipe.difficulty}
            </span>
          </div>

          <h3 className="text-xl font-extrabold text-stone-900 mb-2 leading-snug">
            {recipe.title}
          </h3>

          <p className="text-sm text-stone-600 mb-2">{displayedDescription}</p>

          {isLongText && (
            <button
              type="button"
              onClick={() => setShowFullDescription((prev) => !prev)}
              className="text-xs font-semibold text-amber-700 hover:text-amber-900 mb-2 cursor-pointer"
            >
              {showFullDescription ? 'Ver menos' : 'Ver más'}
            </button>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-4 mt-4 border-t border-stone-100">
        <div className="flex items-center justify-between text-xs text-stone-500 mb-4">
          <span className="flex items-center gap-1.5">
            <FaClock className="text-amber-600" />
            {recipe.prepTime} min
          </span>
          <span className="flex items-center gap-1.5">
            <FaUserFriends className="text-emerald-700" />
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