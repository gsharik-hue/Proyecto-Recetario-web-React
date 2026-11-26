import { NavLink, Link } from 'react-router'
import { FaUtensils, FaPlus } from 'react-icons/fa'

const Navbar = () => {
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-amber-800 bg-amber-100 px-3.5 py-2 rounded-lg text-sm font-semibold transition'
      : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100 px-3.5 py-2 rounded-lg text-sm font-medium transition'

  return (
    <header className="bg-white border-b border-stone-200/90 sticky top-0 z-40 shadow-2xs">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <NavLink to="/" className="flex items-center gap-2.5 text-stone-900 font-extrabold text-xl tracking-tight">
          <span className="w-8 h-8 rounded-lg bg-amber-600 text-white flex items-center justify-center">
            <FaUtensils className="text-sm" />
          </span>
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
          <Link
            to="/add-recipe"
            className="ml-1 inline-flex items-center gap-1.5 bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-3.5 py-2 rounded-lg transition shadow-2xs"
          >
            <FaPlus className="text-xs" />
            <span>Nueva receta</span>
          </Link>
        </div>
      </nav>
    </header>
  )
}

export default Navbar