import './App.css'
import Pokedle from "./Pokedle.tsx";
import Header from "./Header.tsx";
import HintBox from "./HintBox.tsx";

function App() {

  return (
    <>
        <div className="app-container">
            <Header></Header>
            <HintBox></HintBox>
            <Pokedle></Pokedle>
        </div>

    </>
  )
}

export default App
