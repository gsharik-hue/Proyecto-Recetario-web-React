const Card = ({ children, bg = 'bg-white' }) => {
  return (
    <div className={`${bg} p-6 rounded-xl shadow-md border border-gray-100`}>
      {children}
    </div>
  )
}

export default Card