const API_URL = '/api/recipes'

export async function getAllRecipes() {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('No se pudieron cargar las recetas')
  }
  const data = await response.json()
  return Array.isArray(data) ? data : data.data || []
}

export const getRecipes = getAllRecipes

export async function getLatestRecipes(limit = 3) {
  const recipes = await getAllRecipes()
  return [...recipes]
    .sort((a, b) => {
      const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
      const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
      return dateB - dateA
    })
    .slice(0, limit)
}

export async function getRecipeById(id) {
  const response = await fetch(`${API_URL}/${id}`)
  if (response.status === 404) {
    throw new Response('Receta no encontrada', { status: 404 })
  }
  if (!response.ok) {
    throw new Error('No se pudo cargar el detalle de la receta')
  }
  return response.json()
}

export async function createRecipe(newRecipe) {
  const payload = {
    ...newRecipe,
    favorite: false,
    createdAt: new Date().toISOString(),
  }
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!response.ok) {
    throw new Error('No se pudo crear la receta')
  }
  return response.json()
}

export async function updateRecipe(id, updatedRecipe) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedRecipe),
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

export const toggleFavoriteRecipe = (id, favorite) =>
  patchRecipe(id, { favorite })

export async function deleteRecipe(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('No se pudo eliminar la receta')
  }
  return true
}