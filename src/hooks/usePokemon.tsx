import { useState, useEffect } from "react";
import types from "../utils/types";

export const usePokemon = (url: string) => {
  const [pokemon, setPokemon] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url);
        const data = await response.json();
        setPokemon({
          ...data,
          background: types[data.types[0].type.name].color,
          types: data.types.map((type: any) => ({
            ...type,
            ...types[type.type.name],
          })),
        });
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { pokemon, loading, error };
};

export default usePokemon;
