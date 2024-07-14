import Pokedle from "./Pokedle.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";
import {useState} from "react";
import StartMenu from "./StartMenu.tsx";

function App() {
    const [hasStarted, setHasStarted] = useState(false);
    const [generations, setGenerations] = useState<string[]>([]);

  return (
    <>
        <div className="app-container">
            <Header></Header>
            {!hasStarted && <StartMenu setHasStarted={setHasStarted} setGenerations={setGenerations} generations={generations}></StartMenu>}
            {hasStarted && <Pokedle generations={generations}></Pokedle>}
            <Footer></Footer>
        </div>

    </>
  )
}

export default App
