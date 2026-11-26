import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { FaArrowLeft } from 'react-icons/fa'
import RecipeForm from '../components/RecipeForm'
import { createRecipe } from '../services/recipesApi'

const AddRecipePage = () => {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const handleCreate = async (payload) => {
    try {
      setSubmitting(true)
      const created = await createRecipe(payload)
      toast.success('Receta publicada con éxito')
      navigate(`/recipes/${created.id}`)
    } catch (error) {
      toast.error(error.message || 'No se pudo crear la receta')
      setSubmitting(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-8">
      <title>Publicar nueva receta | CookBook</title>
      <meta
        name="description"
        content="Completa todos los campos para añadir tu receta al catálogo."
      />

      <div className="mb-6">
        <Link
          to="/recipes"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition"
        >
          <FaArrowLeft />
          <span>Volver a recetas</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl border-t-4 border-t-amber-600 border-x border-b border-stone-200/90 shadow-xs p-6 sm:p-8">
        <div className="mb-6">
          <h1 className="text-3xl font-extrabold text-stone-900 mb-1">
            Publicar nueva receta
          </h1>
          <p className="text-sm text-stone-500">
            Completa todos los campos para añadir tu receta al catálogo.
          </p>
        </div>

        <RecipeForm
          onSubmitRecipe={handleCreate}
          submitLabel="Publicar receta"
          submitting={submitting}
          embedded
        />
      </div>
    </section>
  )
}

export default AddRecipePage