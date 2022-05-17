import { usePokemons } from "../../contexts/PokemonsContext";
import Card from "../Card";

export const List = (props: any) => {
  const {
    results,
    loading,
    error,
    fetchNextPokemons,
    fetchPreviousPokemons,
    fetchPokemonsByPage,
    pages,
    currentPage,
    haveNext,
    havePrevious,
  } = usePokemons();

  return (
    <div className="flex flex-col items-center sm:p-8 p-2">
      <nav className="py-4 mb-4 flex overflow-auto max-w-[260px]">
        <button
          onClick={fetchPreviousPokemons}
          className="h-10 w-10 px-2 mr-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer
          hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-inherit"
          disabled={!havePrevious}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <ul className="flex overflow-auto max-w-[300px] bg-gray-200 rounded-full">
          {[...Array(pages)].map((_, index) => (
            <li
              key={index}
              onClick={() => fetchPokemonsByPage(index + 1)}
              className={`h-10 w-12 px-4 py-2 rounded-full cursor-pointer mr-1
              hover:bg-gray-600 hover:text-white ${
                currentPage === index + 1 ? "bg-gray-600 text-white" : ""
              }`}
            >
              {index + 1}
            </li>
          ))}
        </ul>

        <button
          onClick={fetchNextPokemons}
          className="h-10 w-10 px-2 py-2 ml-1 flex justify-center items-center rounded-full bg-gray-200 cursor-pointer
          hover:bg-gray-600 hover:text-white disabled:opacity-50 disabled:hover:bg-gray-200 disabled:hover:text-inherit"
          disabled={!haveNext}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </nav>

      {loading && <div>Loading...</div>}

      {error && <div>Error: {error}</div>}

      {results && (
        <div className="max-w-screen-xl w-full">
          <div className="card-grid-container w-full">
            {results.map((pokemon: any) => (
              <Card key={pokemon.name} pokemon={pokemon} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default List;
