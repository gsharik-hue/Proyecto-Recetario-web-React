const Hero = ({
  title = 'Tu recetario casero en un solo lugar',
  subtitle = 'Explora preparaciones recientes, filtra por categoría o publica tu propia receta.',
}) => {
  return (
    <section className="bg-gradient-to-r from-amber-700 via-amber-600 to-orange-600 text-white py-14 px-4 shadow-xs">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-amber-50/95 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

export default Hero