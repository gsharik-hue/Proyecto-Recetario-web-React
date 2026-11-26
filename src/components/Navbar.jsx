import { NavLink } from 'react-router'
import { FaUtensils } from 'react-icons/fa'

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'bg-amber-950/75 text-white px-3.5 py-2 rounded-lg text-sm font-semibold transition'
      : 'text-amber-50 hover:bg-amber-700/60 hover:text-white px-3.5 py-2 rounded-lg text-sm font-medium transition'

  return (
    <header className="bg-amber-600 border-b border-amber-700 sticky top-0 z-40 shadow-sm">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-center gap-2.5 text-white font-bold text-xl">
          <FaUtensils className="text-white text-lg" />
          <span>CookBook</span>
        </NavLink>

        <div className="flex items-center gap-1 sm:gap-2">
          <NavLink to="/" className={linkClass}>
            Inicio
          </NavLink>
          <NavLink to="/recipes" className={linkClass}>
            Recetas
          </NavLink>
          <NavLink to="/add-recipe" className={linkClass}>
            Nueva receta
          </NavLink>
          <NavLink to="/favorites" className={linkClass}>
            Favoritas
          </NavLink>
        </div>
      </nav>
    </header>
  )
}

export default Navbar