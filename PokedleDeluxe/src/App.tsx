import Pokedle from "./Pokedle.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {useState} from "react";
import StartMenu from "./StartMenu.tsx";

function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [generation, setGeneration] = useState(1);

  return (
    <>
        <div className="app-container">
            <Header></Header>
            {!hasStarted && <StartMenu setHasStarted={setHasStarted} setGeneration={setGeneration}></StartMenu>}
            {hasStarted && <Pokedle generation={generation}></Pokedle>}
            <Footer></Footer>
        </div>

    </>
  )
}

export default App
