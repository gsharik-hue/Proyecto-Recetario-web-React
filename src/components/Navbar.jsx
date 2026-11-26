import { NavLink } from 'react-router'
import { FaUtensils } from 'react-icons/fa'

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-rose-700 text-white px-3 py-2 rounded-lg text-sm font-semibold transition'
      : 'text-rose-100 hover:bg-rose-500 hover:text-white px-3 py-2 rounded-lg text-sm font-medium transition'

  return (
    <header className="bg-rose-600 border-b border-rose-500 sticky top-0 z-40">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2 text-white font-bold text-xl">
          <FaUtensils className="text-amber-300" />
          <span>CookBook</span>
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/recipes" className={linkClass}>
            Recetas
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Favoritas
          </NavLink>
          <NavLink to="/add-recipe" className={linkClass}>
            Nueva Receta
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar