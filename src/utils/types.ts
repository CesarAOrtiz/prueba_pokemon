import { Type } from "../interfaces";

export const types: { [key: string]: Type } = {
  bug: { name: "bug", color: "bg-[#A6B91A]", icon: "icons/bug.svg" },
  dark: { name: "dark", color: "bg-[#705746]", icon: "icons/dark.svg" },
  dragon: { name: "dragon", color: "bg-[#6F35FC]", icon: "icons/dragon.svg" },
  electric: {
    name: "electric",
    color: "bg-[#F7D02C]",
    icon: "icons/electric.svg",
  },
  fairy: { name: "fairy", color: "bg-[#D685AD]", icon: "icons/fairy.svg" },
  fighting: {
    name: "fighting",
    color: "bg-[#C22E28]",
    icon: "icons/fighting.svg",
  },
  fire: { name: "fire", color: "bg-[#EE8130]", icon: "icons/fire.svg" },
  flying: { name: "flying", color: "bg-[#A98FF3]", icon: "icons/flying.svg" },
  ghost: { name: "ghost", color: "bg-[#735797]", icon: "icons/ghost.svg" },
  grass: { name: "grass", color: "bg-[#7AC74C]", icon: "icons/grass.svg" },
  ground: { name: "ground", color: "bg-[#E2BF65]", icon: "icons/ground.svg" },
  ice: { name: "ice", color: "bg-[#96D9D6]", icon: "icons/ice.svg" },
  normal: { name: "normal", color: "bg-[#A8A77A]", icon: "icons/normal.svg" },
  poison: { name: "poison", color: "bg-[#A33EA1]", icon: "icons/poison.svg" },
  psychic: {
    name: "psychic",
    color: "bg-[#F95587]",
    icon: "icons/psychic.svg",
  },
  rock: { name: "rock", color: "bg-[#B6A136]", icon: "icons/rock.svg" },
  steel: { name: "steel", color: "bg-[#B7B7CE]", icon: "icons/steel.svg" },
  water: { name: "water", color: "bg-[#6390F0]", icon: "icons/water.svg" },
};

export default types;
