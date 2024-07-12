import {useEffect, useState} from "react";

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
    }

    //----------------FETCHING DATA--------------------
    const [allPokemon, setAllPokemon] = useState<Pokemon[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const fetchData = async() => {
            try{
                setTimeout(async () =>{
                    //get all names
                    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=4");
                    const result = await response.json();
                    setLoading(false);
                    console.log(result);
                    //for all names, create Pokemon objects
                    result.results.map(async (p: any) => {
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
                            };
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
                            };
                            setAllPokemon((a) => [...a, newPokemon]);
                        }
                    });
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
    const [guesses, setGuesses] = useState<Pokemon[]>([]);


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
                setGuesses(() => [...guesses, x]);
            }
        });
        setNewGuess("");
    }

    //console.log(guesses);
    return (
        <div>
            <input
                type="text"
                placeholder="Type pokemon name..."
                value={newGuess}
                onChange={handleGuessChange}
                onKeyDown={handleKeyDown}
            />
            <div>

            </div>

        </div>
    )
}
