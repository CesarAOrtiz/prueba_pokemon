import { PokemonsProvider } from "./contexts/PokemonsContext";
import List from "./components/List";

function App() {
  return (
    <PokemonsProvider>
      <List />
    </PokemonsProvider>
  );
}

export default App;
