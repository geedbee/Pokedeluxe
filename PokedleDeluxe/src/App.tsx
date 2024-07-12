import Pokedle from "./Pokedle.tsx";
import Header from "./Header.tsx";
import Footer from "./Footer.tsx";

function App() {

  return (
    <>
        <div className="app-container">
            <Header></Header>
            <Pokedle></Pokedle>
            <Footer></Footer>
        </div>

    </>
  )
}

export default App
