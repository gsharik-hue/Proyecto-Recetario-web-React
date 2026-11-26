import { useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
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
    <section className="max-w-3xl mx-auto px-4 py-10">
      <title>Publicar receta | CookBook</title>
      <meta name="description" content="Publica una nueva receta en CookBook" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Publicar nueva receta</h1>
      <p className="text-sm text-gray-600 mb-6">
        Completa los datos de tu receta para compartirla con la comunidad.
      </p>

      <RecipeForm
        onSubmitRecipe={handleCreate}
        submitLabel="Publicar receta"
        submitting={submitting}
      />
    </section>
  )
}

export default AddRecipePage