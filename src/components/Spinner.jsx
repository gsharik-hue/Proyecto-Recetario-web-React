import { ClipLoader } from 'react-spinners'

const Spinner = ({ loading = true }) => {
  if (!loading) return null

  return (
    <div className="flex justify-center items-center py-12" role="status" aria-label="Cargando">
      <ClipLoader color="#e11d48" size={48} />
    </div>
  )
}

export default Spinner