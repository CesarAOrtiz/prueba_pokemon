import { usePokemons } from "../../contexts/PokemonsContext";
import Card from "../Card";

export const List = (props: any) => {
  const {
    pokemons,
    loading,
    error,
    fetchNextPokemons,
    fetchPreviousPokemons,
    fetchPokemonsByPage,
    total,
    pageSize,
    pages,
  } = usePokemons();
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <div className="flex flex-col items-center p-8">
      <div className="mt-4 mb-8 flex overflow-auto max-w-[300px]">
        <div
          onClick={fetchPreviousPokemons}
          className="px-4 py-2 bg-blue-500 shadow shadow-blue-700 hover:shadow  text-white font-bold text-lg mx-4 rounded-full cursor-pointer"
        >
          {"<"}
        </div>

        {/* {[...Array(pages)].map((_, index) => (
          <div
            key={index}
            onClick={() => fetchPokemonsByPage(index + 1)}
            className="px-4 py-2 bg-blue-500 shadow shadow-blue-700 hover:shadow  text-white font-bold text-lg mx-4 rounded-full cursor-pointer"
          >
            {index + 1}
          </div>
        ))} */}

        <div
          onClick={fetchNextPokemons}
          className="px-4 py-2 bg-blue-500 shadow shadow-blue-700 hover:shadow text-white font-bold text-lg mx-4 rounded-full cursor-pointer"
        >
          {">"}
        </div>
      </div>

      <div className="card-grid-container">
        {pokemons.map((pokemon: any) => (
          <Card key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
};

export default List;
