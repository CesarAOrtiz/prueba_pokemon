import {
  useState,
  useEffect,
  createContext,
  useContext,
  useCallback,
} from "react";
import { Result, Data } from "../interfaces";

export type TPokemonsContext = {
  pokemons: Data[];
  fetchNextPokemons: () => void;
  fetchPreviousPokemons: () => void;
  loading: boolean;
  error: string;
};

const defaultPokemonsContext: TPokemonsContext = {
  pokemons: [],
  fetchNextPokemons: () => {},
  fetchPreviousPokemons: () => {},
  loading: false,
  error: "",
};

const PokemonsContext = createContext<TPokemonsContext>(defaultPokemonsContext);

export const usePokemons = () => useContext(PokemonsContext);

export const PokemonsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [pokemons, setPokemons] = useState<Result>({
    count: 0,
    results: [],
    next: null,
    previous: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPokemons = useCallback(async (url: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(url);
      const data = await response.json();
      setPokemons(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message);
      setLoading(false);
    }
  }, []);

  const fetchNextPokemons = useCallback(async () => {
    if (pokemons.next) {
      fetchPokemons(pokemons.next);
    }
  }, [pokemons]);

  const fetchPreviousPokemons = useCallback(async () => {
    if (pokemons.previous) {
      fetchPokemons(pokemons.previous);
    }
  }, [pokemons]);

  useEffect(() => {
    fetchPokemons("https://pokeapi.co/api/v2/pokemon");
  }, []);

  useEffect(() => {
    console.log("pokemons", pokemons);
  }, [pokemons]);

  return (
    <PokemonsContext.Provider
      value={{
        pokemons: pokemons.results,
        fetchNextPokemons,
        fetchPreviousPokemons,
        loading,
        error,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};
