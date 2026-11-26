import { useState } from 'react'
import { FaPlus, FaTrash } from 'react-icons/fa'

const CATEGORIES = ['Desayuno', 'Almuerzo', 'Cena', 'Postre', 'Bebida']
const DIFFICULTIES = ['Fácil', 'Media', 'Difícil']

const INITIAL_VALUES = {
  title: '',
  category: 'Desayuno',
  difficulty: 'Fácil',
  prepTime: 20,
  servings: 4,
  description: '',
  ingredients: [{ name: '', quantity: '' }],
  steps: [''],
  author: {
    name: '',
    bio: '',
    email: '',
  },
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function buildInitialState(initialRecipe) {
  if (!initialRecipe) {
    return {
      ...INITIAL_VALUES,
      ingredients: [{ name: '', quantity: '' }],
      steps: [''],
      author: { name: '', bio: '', email: '' },
    }
  }

  return {
    title: initialRecipe.title || '',
    category: initialRecipe.category || 'Desayuno',
    difficulty: initialRecipe.difficulty || 'Fácil',
    prepTime: initialRecipe.prepTime ?? 20,
    servings: initialRecipe.servings ?? 4,
    description: initialRecipe.description || '',
    ingredients:
      Array.isArray(initialRecipe.ingredients) && initialRecipe.ingredients.length > 0
        ? initialRecipe.ingredients.map((item) => ({
            name: item.name || '',
            quantity: item.quantity || '',
          }))
        : [{ name: '', quantity: '' }],
    steps:
      Array.isArray(initialRecipe.steps) && initialRecipe.steps.length > 0
        ? [...initialRecipe.steps]
        : [''],
    author: {
      name: initialRecipe.author?.name || '',
      bio: initialRecipe.author?.bio || '',
      email: initialRecipe.author?.email || '',
    },
  }
}

const RecipeForm = ({
  initialRecipe = null,
  onSubmitRecipe,
  submitLabel = 'Guardar receta',
  submitting = false,
}) => {
  const [formData, setFormData] = useState(() => buildInitialState(initialRecipe))
  const [errors, setErrors] = useState({})

  const handleFieldChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAuthorChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      author: {
        ...prev.author,
        [name]: value,
      },
    }))
  }

  const handleIngredientChange = (index, field, value) => {
    setFormData((prev) => ({
      ...prev,
      ingredients: prev.ingredients.map((item, idx) =>
        idx === index ? { ...item, [field]: value } : item
      ),
    }))
  }

  const addIngredientRow = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', quantity: '' }],
    }))
  }

  const removeIngredientRow = (index) => {
    setFormData((prev) => {
      if (prev.ingredients.length === 1) return prev
      return {
        ...prev,
        ingredients: prev.ingredients.filter((_, idx) => idx !== index),
      }
    })
  }

  const handleStepChange = (index, value) => {
    setFormData((prev) => ({
      ...prev,
      steps: prev.steps.map((step, idx) => (idx === index ? value : step)),
    }))
  }

  const addStepRow = () => {
    setFormData((prev) => ({
      ...prev,
      steps: [...prev.steps, ''],
    }))
  }

  const removeStepRow = (index) => {
    setFormData((prev) => {
      if (prev.steps.length === 1) return prev
      return {
        ...prev,
        steps: prev.steps.filter((_, idx) => idx !== index),
      }
    })
  }

  const validate = () => {
    const nextErrors = {}
    const prepTimeNum = Number(formData.prepTime)
    const servingsNum = Number(formData.servings)

    if (!formData.title.trim()) {
      nextErrors.title = 'El título de la receta es obligatorio.'
    }

    if (!CATEGORIES.includes(formData.category)) {
      nextErrors.category = 'Selecciona una categoría válida.'
    }

    if (!DIFFICULTIES.includes(formData.difficulty)) {
      nextErrors.difficulty = 'Selecciona una dificultad válida.'
    }

    if (!Number.isInteger(prepTimeNum) || prepTimeNum <= 0) {
      nextErrors.prepTime = 'El tiempo debe ser un número entero mayor a 0.'
    }

    if (!Number.isInteger(servingsNum) || servingsNum < 1 || servingsNum > 20) {
      nextErrors.servings = 'Las porciones deben ser un número entero entre 1 y 20.'
    }

    if (!formData.description.trim()) {
      nextErrors.description = 'Escribe una breve descripción de la receta.'
    }

    const cleanedIngredients = formData.ingredients
      .map((item) => ({
        name: item.name.trim(),
        quantity: item.quantity.trim(),
      }))
      .filter((item) => item.name !== '' || item.quantity !== '')

    const hasIncompleteIngredient = cleanedIngredients.some(
      (item) => !item.name || !item.quantity
    )

    if (cleanedIngredients.length === 0) {
      nextErrors.ingredients = 'Agrega al menos un ingrediente con nombre y cantidad.'
    } else if (hasIncompleteIngredient) {
      nextErrors.ingredients = 'Cada ingrediente debe tener nombre y cantidad.'
    }

    const cleanedSteps = formData.steps
      .map((step) => step.trim())
      .filter((step) => step !== '')

    if (cleanedSteps.length === 0) {
      nextErrors.steps = 'Agrega al menos un paso de preparación.'
    }

    if (!formData.author.name.trim()) {
      nextErrors.authorName = 'El nombre del autor es obligatorio.'
    }

    if (!formData.author.email.trim() || !EMAIL_REGEX.test(formData.author.email.trim())) {
      nextErrors.authorEmail = 'Ingresa un correo electrónico válido.'
    }

    return {
      nextErrors,
      payload: {
        title: formData.title.trim(),
        category: formData.category,
        difficulty: formData.difficulty,
        prepTime: prepTimeNum,
        servings: servingsNum,
        description: formData.description.trim(),
        ingredients: cleanedIngredients,
        steps: cleanedSteps,
        author: {
          name: formData.author.name.trim(),
          bio: formData.author.bio.trim(),
          email: formData.author.email.trim(),
        },
      },
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const { nextErrors, payload } = validate()
    setErrors(nextErrors)

    if (Object.keys(nextErrors).length > 0) {
      return
    }

    await onSubmitRecipe(payload)
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8 space-y-6"
    >
      <div>
        <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-1.5">
          Título de la receta *
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={formData.title}
          onChange={handleFieldChange}
          placeholder="Ej. Empanadas de pipián"
          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        {errors.title && <p className="text-xs text-red-600 mt-1">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <label htmlFor="category" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Categoría *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleFieldChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-xs text-red-600 mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="difficulty" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Dificultad *
          </label>
          <select
            id="difficulty"
            name="difficulty"
            value={formData.difficulty}
            onChange={handleFieldChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            {DIFFICULTIES.map((diff) => (
              <option key={diff} value={diff}>
                {diff}
              </option>
            ))}
          </select>
          {errors.difficulty && <p className="text-xs text-red-600 mt-1">{errors.difficulty}</p>}
        </div>

        <div>
          <label htmlFor="prepTime" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Tiempo (min) *
          </label>
          <input
            id="prepTime"
            name="prepTime"
            type="number"
            min="1"
            value={formData.prepTime}
            onChange={handleFieldChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {errors.prepTime && <p className="text-xs text-red-600 mt-1">{errors.prepTime}</p>}
        </div>

        <div>
          <label htmlFor="servings" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Porciones (1-20) *
          </label>
          <input
            id="servings"
            name="servings"
            type="number"
            min="1"
            max="20"
            value={formData.servings}
            onChange={handleFieldChange}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          {errors.servings && <p className="text-xs text-red-600 mt-1">{errors.servings}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-semibold text-gray-800 mb-1.5">
          Descripción *
        </label>
        <textarea
          id="description"
          name="description"
          rows="3"
          value={formData.description}
          onChange={handleFieldChange}
          placeholder="Describe brevemente el plato y su sabor..."
          className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
        />
        {errors.description && <p className="text-xs text-red-600 mt-1">{errors.description}</p>}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">Ingredientes *</span>
          <button
            type="button"
            onClick={addIngredientRow}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg border border-rose-200 transition cursor-pointer"
          >
            <FaPlus />
            <span>Agregar ingrediente</span>
          </button>
        </div>

        {formData.ingredients.map((ing, index) => (
          <div key={index} className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
            <div className="sm:col-span-6">
              <label htmlFor={`ingredient-name-${index}`} className="sr-only">
                Ingrediente {index + 1}
              </label>
              <input
                id={`ingredient-name-${index}`}
                type="text"
                value={ing.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                placeholder="Nombre del ingrediente"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor={`ingredient-qty-${index}`} className="sr-only">
                Cantidad {index + 1}
              </label>
              <input
                id={`ingredient-qty-${index}`}
                type="text"
                value={ing.quantity}
                onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                placeholder="Cantidad (ej. 2 tazas)"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            <div className="sm:col-span-2 flex justify-end">
              <button
                type="button"
                onClick={() => removeIngredientRow(index)}
                disabled={formData.ingredients.length === 1}
                aria-label={`Eliminar ingrediente ${index + 1}`}
                className="text-red-600 hover:bg-red-50 disabled:opacity-30 p-2 rounded-lg transition cursor-pointer"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
        {errors.ingredients && <p className="text-xs text-red-600">{errors.ingredients}</p>}
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-bold text-gray-900">Pasos de preparación *</span>
          <button
            type="button"
            onClick={addStepRow}
            className="inline-flex items-center gap-1.5 text-xs font-semibold bg-rose-50 hover:bg-rose-100 text-rose-700 px-3 py-1.5 rounded-lg border border-rose-200 transition cursor-pointer"
          >
            <FaPlus />
            <span>Agregar paso</span>
          </button>
        </div>

        {formData.steps.map((step, index) => (
          <div key={index} className="flex items-start gap-2">
            <span className="w-7 h-7 rounded-full bg-gray-100 text-gray-700 text-xs font-bold flex items-center justify-center mt-1.5 flex-shrink-0">
              {index + 1}
            </span>
            <label htmlFor={`step-${index}`} className="sr-only">
              Paso {index + 1}
            </label>
            <input
              id={`step-${index}`}
              type="text"
              value={step}
              onChange={(e) => handleStepChange(index, e.target.value)}
              placeholder={`Describe el paso ${index + 1}...`}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            <button
              type="button"
              onClick={() => removeStepRow(index)}
              disabled={formData.steps.length === 1}
              aria-label={`Eliminar paso ${index + 1}`}
              className="text-red-600 hover:bg-red-50 disabled:opacity-30 p-2 rounded-lg transition cursor-pointer"
            >
              <FaTrash />
            </button>
          </div>
        ))}
        {errors.steps && <p className="text-xs text-red-600">{errors.steps}</p>}
      </div>

      <div className="pt-4 border-t border-gray-100 space-y-4">
        <h2 className="text-base font-bold text-gray-900">Datos del autor</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="authorName" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Nombre del autor *
            </label>
            <input
              id="authorName"
              name="name"
              type="text"
              value={formData.author.name}
              onChange={handleAuthorChange}
              placeholder="Ej. Laura Gómez"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            {errors.authorName && <p className="text-xs text-red-600 mt-1">{errors.authorName}</p>}
          </div>

          <div>
            <label htmlFor="authorEmail" className="block text-sm font-semibold text-gray-800 mb-1.5">
              Correo electrónico *
            </label>
            <input
              id="authorEmail"
              name="email"
              type="email"
              value={formData.author.email}
              onChange={handleAuthorChange}
              placeholder="laura@example.com"
              className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
            {errors.authorEmail && (
              <p className="text-xs text-red-600 mt-1">{errors.authorEmail}</p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="authorBio" className="block text-sm font-semibold text-gray-800 mb-1.5">
            Biografía corta (opcional)
          </label>
          <input
            id="authorBio"
            name="bio"
            type="text"
            value={formData.author.bio}
            onChange={handleAuthorChange}
            placeholder="Ej. Cocinera casera amante de los sabores locales"
            className="w-full border border-gray-300 rounded-lg px-3.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>
      </div>

      <div className="pt-2 flex justify-end">
        <button
          type="submit"
          disabled={submitting}
          className="bg-rose-600 hover:bg-rose-700 disabled:opacity-60 text-white font-semibold px-6 py-2.5 rounded-xl transition cursor-pointer"
        >
          {submitting ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  )
}

export default RecipeForm