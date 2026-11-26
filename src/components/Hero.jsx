import { Link } from 'react-router'

const Hero = ({
  title = 'Descubre y comparte recetas caseras',
  subtitle = 'Explora preparaciones recientes, filtra por categoría o publica tu propia receta en segundos.',
}) => {
  return (
    <section className="max-w-6xl mx-auto px-4 pt-8 pb-4">
      <div className="bg-white rounded-2xl border-t-4 border-t-amber-600 border-x border-b border-stone-200/90 shadow-xs p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div className="max-w-2xl space-y-2">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
            Cocina casera · Catálogo culinario
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
            {title}
          </h1>
          <p className="text-sm sm:text-base text-stone-600">
            {subtitle}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link
            to="/recipes"
            className="bg-amber-600 hover:bg-amber-700 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition"
          >
            Explorar recetas
          </Link>
          <Link
            to="/add-recipe"
            className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-sm font-semibold px-4 py-2.5 rounded-xl transition"
          >
            Publicar receta
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero