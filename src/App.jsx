import { createBrowserRouter, RouterProvider } from 'react-router'
import MainLayout from './Layouts/MainLayout'
import HomePage from './pages/HomePage'
import RecipesPage from './pages/RecipesPage'
import NotFoundPage from './pages/NotFoundPage'

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