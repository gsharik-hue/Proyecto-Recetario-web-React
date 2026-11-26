import { useState } from 'react'
import { useLoaderData, useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import RecipeForm from '../components/RecipeForm'
import { updateRecipe } from '../services/recipesApi'

const EditRecipePage = () => {
  const recipe = useLoaderData()
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)

  const handleUpdate = async (payload) => {
    try {
      setSubmitting(true)
      const updatedPayload = {
        ...payload,
        id: recipe.id,
        favorite: Boolean(recipe.favorite),
        createdAt: recipe.createdAt || new Date().toISOString(),
      }
      await updateRecipe(recipe.id, updatedPayload)
      toast.success('Receta actualizada correctamente')
      navigate(`/recipes/${recipe.id}`)
    } catch (error) {
      toast.error(error.message || 'No se pudo actualizar la receta')
      setSubmitting(false)
    }
  }

  return (
    <section className="max-w-3xl mx-auto px-4 py-10">
      <title>Editar: {recipe.title} | CookBook</title>
      <meta name="description" content={`Edita la receta ${recipe.title}`} />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Editar receta</h1>
      <p className="text-sm text-gray-600 mb-6">
        Modifica la información de &ldquo;{recipe.title}&rdquo; y guarda los cambios.
      </p>

      <RecipeForm
        initialRecipe={recipe}
        onSubmitRecipe={handleUpdate}
        submitLabel="Guardar cambios"
        submitting={submitting}
      />
    </section>
  )
}

export default EditRecipePage