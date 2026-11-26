const API_URL = '/api/recipes'

export async function getAllRecipes() {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('No se pudieron cargar las recetas')
  }
  return response.json()
}

export async function getLatestRecipes(limit = 3) {
  const response = await fetch(`${API_URL}?_sort=-createdAt&_limit=${limit}`)
  if (!response.ok) {
    throw new Error('No se pudieron cargar las recetas recientes')
  }
  const data = await response.json()
  const list = Array.isArray(data) ? data : data.data || []
  return [...list]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit)
}

export async function getRecipeById(id) {
  const response = await fetch(`${API_URL}/${id}`)
  if (!response.ok) {
    throw new Error('Receta no encontrada')
  }
  return response.json()
}

export async function createRecipe(recipeData) {
  const newRecipe = {
    ...recipeData,
    favorite: false,
    createdAt: new Date().toISOString(),
  }
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newRecipe),
  })
  if (!response.ok) {
    throw new Error('No se pudo crear la receta')
  }
  return response.json()
}

export async function updateRecipe(id, recipeData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(recipeData),
  })
  if (!response.ok) {
    throw new Error('No se pudo actualizar la receta')
  }
  return response.json()
}

export async function patchRecipe(id, partialData) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(partialData),
  })
  if (!response.ok) {
    throw new Error('No se pudo actualizar el estado de la receta')
  }
  return response.json()
}

export async function deleteRecipe(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('No se pudo eliminar la receta')
  }
  return true
}