import { PokemonsProvider } from "./contexts/PokemonsContext";

function App() {
  return (
    <PokemonsProvider>
      <div>Hello World</div>
    </PokemonsProvider>
  );
}

export default App;
