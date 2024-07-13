import {useEffect, useState} from "react";
import Guess from "./Guess.tsx";
import GuessCategories from "./GuessCategories.tsx";
import HintBox from "./HintBox.tsx";
import EndCard from "./EndCard.tsx";

export default function Pokedle(props) {
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
        flavortext:string;
        egggroup:string;
        gifURL:string;
    }

    //----------------FETCHING DATA--------------------
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    const [solution, setSolution] = useState<Pokemon>();

    let minNum = 0;
    let maxNum = 0;

    if (props.generation == 1){
        minNum = 0;
        maxNum = 151;
    }
    else if (props.generation == 2){
        minNum = 151;
        maxNum = 251-minNum;
    }
    else if (props.generation == 3){
        minNum=251;
        maxNum=386-minNum;
    }
    else if (props.generation == 4){
        minNum=386;
        maxNum=493-minNum;
    }

    let r = Math.floor(Math.random() * maxNum);

    useEffect(() => {
        const fetchData = async() => {
            try{
                setTimeout(async () =>{
                    //get all names
                    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${maxNum}&offset=${minNum}`);
                    const result = await response.json();
                    console.log(result.results);
                    //console.log(result);
                    //for all names, create Pokemon objects
                    result.results.map(async (p: any, i: number) => {
                        //console.log(p.name);
                        const response2 = await fetch(`${p.url}`);
                        console.log(response2);
                        const result2 = await response2.json();
                        const splitUrl : string[] = p.url.split("/");
                        //console.log(splitUrl);
                        const id = splitUrl[6];
                        //console.log(result2);
                        const response3 = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
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
                                flavortext:result3.flavor_text_entries[0]["flavor_text"],
                                egggroup:result3.egg_groups[0].name,
                                gifURL: result2.sprites.versions["generation-v"]["black-white"].animated.front_default,
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
                                flavortext:result3.flavor_text_entries[0]["flavor_text"],
                                egggroup:result3.egg_groups[0].name,
                                gifURL: result2.sprites.versions["generation-v"]["black-white"].animated.front_default,
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
        isTaller:boolean,
        isHeavier:boolean,
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
            isTaller:false,
            isHeavier:false,
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
            else if (solution.height < pokemon.height){
                myGuess.isTaller = true;
            }
            if (solution.weight == pokemon.weight){
                myGuess.weight = true;
            }
            else if (solution.weight < pokemon.weight){
                myGuess.isHeavier = true;
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
            <div className="hint-box-container">
                <p>Generation {props.generation}</p>
                <p>Guess today's Pokemon!</p>
                {!winState && solution && <HintBox solution={solution}></HintBox>}
                {winState && <button onClick={resetGame}>Reset Game</button>}
            </div>
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
        </>
    )
}
