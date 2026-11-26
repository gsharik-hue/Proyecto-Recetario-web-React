import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-stone-200/80 py-6 text-center text-xs sm:text-sm text-stone-500">
        <div className="max-w-6xl mx-auto px-4">
          CookBook © 2026 — Recetario comunitario en React 19
        </div>
      </footer>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  )
}

export default MainLayout