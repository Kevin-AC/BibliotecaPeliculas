import { useState, useEffect, useRef, useCallback } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'
import debounce from 'just-debounce-it'

function useSearch () {
  const [search, updateSearch] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  useEffect(() => {
    if (isFirstInput.current) {
      isFirstInput.current = search === ''
      // verifica si es la primera ves que se reenderiza el input
      return
    }
    if (search === '') {
      setError('No se puede buscar una pelicula con vacia')
      return
    }
    if (search.match(/^\d+$/)) {
      setError('No se puede buscar una pelicula con numero')
      return
    }
    if (search.length < 3) {
      setError('La busqueda debe tener al menos 3 caracteres')
      return
    }
    setError(null)
  }, [search])

  return { search, updateSearch, error }
}

function App () {
  const [sort, setSort] = useState(false)
  const { search, updateSearch, error } = useSearch()
  const { movies, loading, getMovies } = useMovies({ search, sort })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetMovies = useCallback(
    debounce(search => {
      getMovies({ search })
    }, 300)
    , [getMovies]
  )

  const hadleSubmit = (e) => {
    e.preventDefault()
    getMovies({ search })
  }
  const handleChange = (e) => {
    const newSearch = e.target.value
    updateSearch(e.target.value)
    debounceGetMovies(newSearch)
  }
  const handleSort = () => {
    setSort(!sort)
  }

  return (
   <div className="flex flex-col items-center gap-10 ">
   <header className='flex flex-col justify-center items-center mt-8'>
    <h1 className="text-3xl font-bold mb-4">Buscardor de Peliculas</h1>
        <form className="flex gap-2"
          action="" onSubmit={hadleSubmit}>
          <input onChange={handleChange} value={search} name='query' className={`h-10 p-2 rounded-lg ${error ? 'border-2   border-red-600' : ''}`} type="text" placeholder="Avenger, Star Wars" />
          <input type="checkbox" onChange={handleSort} checked={sort}/>
          <button className=" bg-slate-600 rounded-lg h-10 p-2"
          >Buscar</button>

        </form>
        {error && <p className='text-red-500'>{error}</p>}
   </header>
   <main className='px-10 sm:w-2/3'>
        {
          loading ? <p>Cargando...</p> : <Movies movies={movies} />
        }
   </main>
   </div>
  )
}

export default App
