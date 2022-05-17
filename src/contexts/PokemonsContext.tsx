import {
  useState,
  useEffect,
  useReducer,
  createContext,
  useContext,
  useCallback,
} from "react";
import { Data } from "../interfaces";
import pokemonsReducer, { initialState } from "./PokemonReducer";

export type TPokemonsContext = {
  results: Data[];
  fetchNextPokemons: () => void;
  haveNext: boolean;
  fetchPreviousPokemons: () => void;
  havePrevious: boolean;
  fetchPokemonsByPage: (page: number) => void;
  loading: boolean;
  error: string;
  pageSize: number;
  pages: number;
  currentPage: number;
};

const defaultPokemonsContext: TPokemonsContext = {
  results: [],
  fetchNextPokemons: () => {},
  haveNext: false,
  fetchPreviousPokemons: () => {},
  havePrevious: false,
  fetchPokemonsByPage: () => {},
  loading: false,
  error: "",
  pageSize: 20,
  pages: 0,
  currentPage: 1,
};

const PokemonsContext = createContext<TPokemonsContext>(defaultPokemonsContext);

export const usePokemons = () => useContext(PokemonsContext);

export const PokemonsProvider = (props: { children: React.ReactNode }) => {
  const [pokemonsState, dispatch] = useReducer(pokemonsReducer, initialState);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchPokemons = useCallback(async (url: string) => {
    dispatch({ type: "FETCH_POKEMONS_REQUEST" });
    try {
      const response = await fetch(url);
      const data = await response.json();
      dispatch({ type: "FETCH_POKEMONS_SUCCESS", payload: data });
    } catch (error: any) {
      dispatch({ type: "FETCH_POKEMONS_FAILURE", payload: error.message });
    }
  }, []);

  const fetchNextPokemons = useCallback(async () => {
    if (pokemonsState.next) {
      fetchPokemons(pokemonsState.next);
      setCurrentPage((prev) => prev + 1);
    }
  }, [pokemonsState, fetchPokemons]);

  const fetchPreviousPokemons = useCallback(async () => {
    if (pokemonsState.previous) {
      fetchPokemons(pokemonsState.previous);
      setCurrentPage((prev) => prev - 1);
    }
  }, [pokemonsState, fetchPokemons]);

  const fetchPokemonsByPage = useCallback(
    (page: number) => {
      const url = `https://pokeapi.co/api/v2/pokemon?`;
      const query = `offset=${page * 20 - 20}&limit=${20}`;
      fetchPokemons(url + query);
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
        ...pokemonsState,
        fetchNextPokemons,
        fetchPreviousPokemons,
        fetchPokemonsByPage,
        pageSize: 20,
        pages: Math.ceil(pokemonsState.count / 20),
        currentPage,
      }}
    >
      {props.children}
    </PokemonsContext.Provider>
  );
};
