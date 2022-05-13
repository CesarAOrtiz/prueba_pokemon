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
  fetchPokemonsByPage: (page: number) => void;
  loading: boolean;
  error: string;
  total: number;
  pageSize: number;
  pages: number;
  currentPage: number;
  haveNext: boolean;
  havePrevious: boolean;
};

const defaultPokemonsContext: TPokemonsContext = {
  pokemons: [],
  fetchNextPokemons: () => {},
  fetchPreviousPokemons: () => {},
  fetchPokemonsByPage: () => {},
  loading: false,
  error: "",
  total: 0,
  pageSize: 20,
  pages: 0,
  currentPage: 1,
  haveNext: false,
  havePrevious: false,
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
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPokemons = useCallback(async (url: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(url);
      const data = await response.json();
      setLoading(false);
      setPokemons(data);
    } catch (error: any) {
      setLoading(false);
      setError(error.message);
    }
  }, []);

  const fetchNextPokemons = useCallback(async () => {
    if (pokemons.next) {
      fetchPokemons(pokemons.next);
      setCurrentPage((prev) => prev + 1);
    }
  }, [pokemons, fetchPokemons]);

  const fetchPreviousPokemons = useCallback(async () => {
    if (pokemons.previous) {
      fetchPokemons(pokemons.previous);
      setCurrentPage((prev) => prev - 1);
    }
  }, [pokemons, fetchPokemons]);

  const fetchPokemonsByPage = useCallback(
    (page: number) => {
      const url = `https://pokeapi.co/api/v2/pokemon?offset=${
        page * 20 - 20
      }&limit=${20}`;
      fetchPokemons(url);
      setCurrentPage(page);
    },
    [fetchPokemons]
  );

  useEffect(() => {
    fetchPokemons("https://pokeapi.co/api/v2/pokemon");
  }, [fetchPokemons]);

  return (
    <PokemonsContext.Provider
      value={{
        pokemons: pokemons.results,
        fetchNextPokemons,
        fetchPreviousPokemons,
        fetchPokemonsByPage,
        loading,
        error,
        total: pokemons.count,
        pageSize: 20,
        pages: Math.ceil(pokemons.count / 20),
        currentPage,
        haveNext: !!pokemons.next,
        havePrevious: !!pokemons.previous,
      }}
    >
      {children}
    </PokemonsContext.Provider>
  );
};
