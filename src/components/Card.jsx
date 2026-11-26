const Card = ({ children, bg = 'bg-white' }) => {
  return (
    <div
      className={`${bg} rounded-2xl border border-stone-200/90 shadow-xs p-6 transition hover:shadow-sm`}
    >
      {children}
    </div>
  )
}

export default Card