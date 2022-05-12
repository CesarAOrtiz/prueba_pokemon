export const types = [
  {
    name: "normal",
    color: "#A8A77A",
    icon: "icons/normal.svg",
  },
  {
    name: "fighting",
    color: "#C22E28",
    icon: "icons/fighting.svg",
  },
  {
    name: "flying",
    color: "#A98FF3",
    icon: "icons/flying.svg",
  },
  {
    name: "poison",
    color: "#A33EA1",
    icon: "icons/poison.svg",
  },
  {
    name: "ground",
    color: "#E2BF65",
    icon: "icons/ground.svg",
  },
  {
    name: "rock",
    color: "#B6A136",
    icon: "icons/rock.svg",
  },
  {
    name: "bug",
    color: "#A6B91A",
    icon: "icons/bug.svg",
  },
  {
    name: "ghost",
    color: "#735797",
    icon: "icons/ghost.svg",
  },
  {
    name: "steel",
    color: "#B7B7CE",
    icon: "icons/steel.svg",
  },
  {
    name: "fire",
    color: "#EE8130",
    icon: "icons/fire.svg",
  },
  {
    name: "water",
    color: "#6390F0",
    icon: "icons/water.svg",
  },
  {
    name: "grass",
    color: "#7AC74C",
    icon: "icons/grass.svg",
  },
  {
    name: "electric",
    color: "#F7D02C",
    icon: "icons/electric.svg",
  },
  {
    name: "psychic",
    color: "#F95587",
    icon: "icons/psychic.svg",
  },
  {
    name: "ice",
    color: "#96D9D6",
    icon: "icons/ice.svg",
  },
  {
    name: "dragon",
    color: "#6F35FC",
    icon: "icons/dragon.svg",
  },
  {
    name: "dark",
    color: "#705746",
    icon: "icons/dark.svg",
  },
  {
    name: "fairy",
    color: "#D685AD",
    icon: "icons/fairy.svg",
  },
];

const typesDict = types.reduce<{
  [key: string]: {
    name: string;
    color: string;
    icon: string;
  };
}>((acc, type) => {
  return { ...acc, [type.name]: type };
}, {});

export default types;
