import { Result, Data } from "../interfaces";

export type TPokemonsState = {
  results: Data[];
  count: number;
  next: null | string;
  previous: null | string;

  haveNext: boolean;
  havePrevious: boolean;

  loading: boolean;
  error: string;
};

export type TPokemonsAction =
  | { type: "FETCH_POKEMONS_REQUEST" }
  | {
      type: "FETCH_POKEMONS_SUCCESS";
      payload: Result;
    }
  | {
      type: "FETCH_POKEMONS_FAILURE";
      payload: string;
    };

export const initialState: TPokemonsState = {
  results: [],
  count: 0,
  next: null,
  previous: null,
  haveNext: false,
  havePrevious: false,
  loading: false,
  error: "",
};

export const pokemonsReducer = (
  state: TPokemonsState,
  action: TPokemonsAction
): TPokemonsState => {
  switch (action.type) {
    case "FETCH_POKEMONS_REQUEST":
      return {
        ...state,
        loading: true,
        error: "",
      };
    case "FETCH_POKEMONS_SUCCESS":
      return {
        ...state,
        loading: false,
        error: "",
        haveNext: action.payload.next !== null,
        havePrevious: action.payload.previous !== null,
        ...action.payload,
      };
    case "FETCH_POKEMONS_FAILURE":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default pokemonsReducer;
