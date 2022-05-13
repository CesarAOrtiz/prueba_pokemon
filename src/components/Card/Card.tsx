import { Data } from "../../interfaces";
import usePokemon from "../../hooks/usePokemon";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  pokemon: Data;
}

export const Card = ({ pokemon }: Props) => {
  const { pokemon: result, loading, error } = usePokemon(pokemon.url);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      className={`${result.background} text-white font-bold capitalize flex flex-col
      p-4 rounded-xl shadow-lg w-[260px] h-[170px] cursor-pointer`}
    >
      <div className="text-lg text-3d text-ellipsis break-words whitespace-nowrap">
        {result.name}
      </div>

      <div className="flex justify-around ">
        <div className="w-[100px] peer">
          {/* <span className="text-lg text-3d">#{result.id}</span> */}

          {result.types.map((type: any) => (
            <div
              key={type.type.name}
              className={`${type.color} flex rounded-3xl shadow-lg px-2 py-1 mt-2
            border-2 border-white border-solid`}
            >
              <img
                src={type.icon}
                alt={type.type.name}
                width={20}
                height={20}
              />
              <span className="ml-2 text-sm">{type.type.name}</span>
            </div>
          ))}
        </div>
        <img
          src={result.sprites.other["official-artwork"].front_default}
          alt={result.name}
          className="drop-shadow-[0_2px_5px_rgba(0,0,0,0.5)] max-w-[120px] max-h-[120px] w-full h-full
        hover:scale-x-125 hover:scale-y-125 peer-hover:scale-x-125 peer-hover:scale-y-125 transition-transform duration-300"
        />
      </div>
    </div>
  );
};

export default Card;
