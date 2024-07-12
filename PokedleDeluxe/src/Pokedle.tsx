import {useEffect, useState} from "react";
import Guess from "./Guess.tsx";
import GuessCategories from "./GuessCategories.tsx";
import HintBox from "./HintBox.tsx";
import EndCard from "./EndCard.tsx";

export default function Pokedle() {
    interface Pokemon {
        name: string;
        type1: string;
        type2?: string;
        color: string;
        habitat: string;
        generation: string;
        evolutionURL: any;
        ability: string;
        spriteURL: string;
        height: string;
        weight:string;
    }

    //----------------FETCHING DATA--------------------
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [solution, setSolution] = useState<Pokemon>();
    const maxNum = 4;
    let r = Math.floor(Math.random() * maxNum);

    useEffect(() => {
        const fetchData = async() => {
            try{
                setTimeout(async () =>{
                    //get all names
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxNum}`);
                    const result = await response.json();
                    console.log(result);
                    //for all names, create Pokemon objects
                    result.results.map(async (p: any, i: number) => {
                        //console.log(p.name);
                        const response2 = await fetch(`https://pokeapi.co/api/v2/pokemon/${p.name}`);
                        const result2 = await response2.json();
                        //console.log(result2);
                        const response3 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${p.name}`);
                        const result3 = await response3.json();
                        //console.log(result3);
                        if (result2.types[1]){
                            let newPokemon : Pokemon = {
                                name: p.name,
                                type1: result2.types[0].type.name,
                                type2: result2.types[1].type.name,
                                color: result3.color.name,
                                habitat: result3.habitat.name,
                                generation: result3.generation.name,
                                evolutionURL: result3.evolution_chain.url,
                                ability: result2.abilities[0].ability.name,
                                spriteURL: result2.sprites.front_default,
                                height:result2.height,
                                weight:result2.weight,
                            };
                            if (i == r){
                                setSolution(newPokemon);
                            }
                            setAllPokemon((a) => [...a, newPokemon]);
                        }
                        else{
                            let newPokemon : Pokemon = {
                                name: p.name,
                                type1: result2.types[0].type.name,
                                color: result3.color.name,
                                habitat: result3.habitat.name,
                                generation: result3.generation.name,
                                evolutionURL: result3.evolution_chain.url,
                                ability: result2.abilities[0].ability.name,
                                spriteURL: result2.sprites.front_default,
                                height:result2.height,
                                weight:result2.weight,
                            };
                            if (i == r){
                                setSolution(newPokemon);
                            }
                            setAllPokemon((a) => [...a, newPokemon]);
                        }
                    });
                    setLoading(false);
                }, 5000);
            }
            catch(error){
                console.log(error);
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    //----------------GAME FUNCTIONALITY--------------------
    const [newGuess, setNewGuess] = useState("");
    const [guesses, setGuesses] = useState<Guess[]>([]);
    const [tries, setTries] = useState(0);
    const [winState, setWinState] = useState(false);

    interface Guess {
        pokemon: Pokemon,
        spriteURL: string,
        type1: boolean,
        type2: boolean,
        habitat: boolean,
        color: boolean,
        evolution: boolean,
        generation: boolean,
        height:boolean,
        weight:boolean,
    }

    function handleGuessChange(e : any){
        setNewGuess(e.target.value);
    }
    function handleKeyDown(e : any){
        //console.log(e.key);
        if (e.key === "Enter"){
            makeNewGuess();
        }
        else{
            //console.log("not enter key");
        }
    }
    function makeNewGuess() {
        allPokemon.map((x) => {
            if (newGuess.toLowerCase() == x.name) {
                setTries((t) => t+1);
                if (solution && x.name == solution.name){
                    endGame();
                }
                createGuessObject(x);
            }
        });
        setNewGuess("");
    }
    function createGuessObject(pokemon: Pokemon){
        let myGuess : Guess = {
            pokemon: pokemon,
            spriteURL: pokemon.spriteURL,
            type1: false,
            type2: false,
            habitat: false,
            color: false,
            evolution: false,
            generation: false,
            height:false,
            weight:false,
        }
        if (solution){
            if (solution.type1 == pokemon.type1){
                myGuess.type1 = true;
            }
            if (solution.type2 == pokemon.type2){
                myGuess.type2 = true;
            }
            if (solution.habitat == pokemon.habitat){
                myGuess.habitat = true;
            }
            if (solution.color == pokemon.color){
                myGuess.color = true;
            }
            if (solution.generation == pokemon.generation){
                myGuess.generation = true;
            }
            if (solution.height == pokemon.height){
                myGuess.height = true;
            }
            if (solution.weight == pokemon.weight){
                myGuess.weight = true;
            }
            setGuesses(() => [...guesses, myGuess]);
        }
        else {
            console.log("error: no solution");
        }
    }
    function endGame(){
        console.log("WIN");
        setWinState(true);
    }
    function resetGame(){
        //new solution
        r = Math.floor(Math.random() * maxNum);
        setSolution(allPokemon[r]);
        //clear guesses
        setGuesses([]);
        setNewGuess("");
        //clear tries
        setTries(0);
        //set winState
        setWinState(false);
    }


    return (
        <>
            <HintBox></HintBox>
            <div className="guess-container">
                {!loading && !winState && <input
                    type="text"
                    placeholder="Type pokemon name..."
                    value={newGuess}
                    onChange={handleGuessChange}
                    onKeyDown={handleKeyDown}
                />}
                <GuessCategories/>
                <div className="guesses">
                    {guesses.map((x, i) => (
                        <Guess key={i} guess={x}></Guess>
                    ))}
                </div>
            </div>
            {winState && <EndCard solution={solution} tries={tries}></EndCard>}
            {winState && <button onClick={resetGame}>Reset Game</button>}
        </>
    )
}
