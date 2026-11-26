import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from '../components/Navbar'

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-stone-100 text-stone-900 font-sans">
      <Navbar />

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-stone-200 py-5 text-xs sm:text-sm text-stone-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span className="font-semibold text-stone-800">CookBook</span>
          <span>Recetario comunitario · React 19 + Tailwind CSS v4</span>
        </div>
      </footer>

      <ToastContainer position="top-right" autoClose={2500} />
    </div>
  )
}

export default MainLayout