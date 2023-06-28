/* eslint-disable react/prop-types */
function ListOfMovies ({ movies }) {
  return (
    <ul className="grid grid-cols-autoFit gap-9 w-full">
      {movies.map(movies => (
        <li className="grid gap-1 place-content-center text-center" key={movies.id}>
          <h1 >{movies.title}</h1>
          <p>{movies.year}</p>
          <img className="rounded-lg" src={movies.poster} alt={movies.title} />

        </li>
      ))}
    </ul>
  )
}

function NoResults () {
  return (
    <div className="w-full grid place-content-center">
      <p >No se encontraron peliculas para esta busqueda</p>
    </div>
  )
}

// eslint-disable-next-line react/prop-types
export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0
  return (
    hasMovies ? <ListOfMovies movies={movies} /> : <NoResults />
  )
}
