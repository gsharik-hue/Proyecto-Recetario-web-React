import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './layouts/MainLayout'
import RouteErrorBoundary from './components/RouteErrorBoundary'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import RecipeDetailPage from './pages/RecipeDetailPage'
import AddRecipePage from './pages/AddRecipePage'
import EditRecipePage from './pages/EditRecipePage'
import NotFoundPage from './pages/NotFoundPage'
import { getRecipeById } from './services/recipesApi'

const recipeLoader = async ({ params }) => {
  try {
    return await getRecipeById(params.id)
  } catch {
    throw new Response(
      JSON.stringify({
        message: `No se encontró ninguna receta con el ID "${params.id}".`,
      }),
      {
        status: 404,
        statusText: 'Receta no encontrada',
      }
    )
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'recipes',
        element: <RecipesPage />,
      },
      {
        path: 'recipes/:id',
        element: <RecipeDetailPage />,
        loader: recipeLoader,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: 'add-recipe',
        element: <AddRecipePage />,
      },
      {
        path: 'edit-recipe/:id',
        element: <EditRecipePage />,
        loader: recipeLoader,
        errorElement: <RouteErrorBoundary />,
      },
      {
        path: '*',
        element: <NotFoundPage />,
      },
    ],
  },
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App