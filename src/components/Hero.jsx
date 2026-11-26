const Hero = ({
  title = 'Descubre y comparte recetas caseras',
  subtitle = 'Explora platos para cada momento del día o publica tus propias creaciones culinarias.',
}) => {
  return (
    <section className="bg-rose-600 text-white py-16 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          {title}
        </h1>
        <p className="text-base sm:text-lg text-rose-100 max-w-2xl mx-auto">
          {subtitle}
        </p>
      </div>
    </section>
  )
}

export default Hero