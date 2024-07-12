export default function Guess(props) {
    const myGuess = props.guess;
    const pokemon = props.guess.pokemon;
    let pokemonType2 = pokemon.type2;

    if (!pokemonType2){
        pokemonType2 = "None";
    }

    const RED = "#f36445"
    const GREEN ="#008000";

    var sType1Color = RED;
    if (myGuess.type1){
        sType1Color = GREEN;
    }
    var sType2Color = RED;
    if (myGuess.type2){
        sType2Color = GREEN;
    }
    var sColorColor = RED;
    if (myGuess.color){
        sColorColor = GREEN;
    }
    var sHabitatColor = RED;
    if (myGuess.habitat){
        sHabitatColor = GREEN;
    }
    var sGenerationColor = RED;
    if (myGuess.generation){
        sGenerationColor = GREEN;
    }
    var sHeightColor = RED;
    if (myGuess.height){
        sHeightColor = GREEN;
    }
    var sWeightColor = RED;
    if (myGuess.weight){
        sWeightColor = GREEN;
    }
    var heightArrow = "^";
    if (myGuess.isTaller){
        heightArrow = "v";
    }
    else if (sHeightColor == GREEN){
        heightArrow = "";
    }
    var weightArrow = "^";
    if (myGuess.isHeavier){
        weightArrow = "v";
    }
    else if (sWeightColor == GREEN){
        weightArrow = "";
    }

    return (
        <div className="guess-bar">
            <div className="pokemon-img guess-box">
                <div className="guess-text-box">
                    <img src={pokemon.spriteURL} alt={pokemon.name}/>
                </div>
            </div>
            <div className="guess-box" id="type-1" style={{backgroundColor: sType1Color}}>
                <div className="guess-text-box">
                    {pokemon.type1}

                </div>
            </div>
            <div className="guess-box" id="type-2" style={{backgroundColor: sType2Color}}>
                <div className="guess-text-box">
                    {pokemonType2}
                </div>
            </div>
            <div className="guess-box" id="habitat" style={{backgroundColor: sHabitatColor}}>
                <div className="guess-text-box">
                    {pokemon.habitat}
                </div>
            </div>
            <div className="guess-box" id="color" style={{backgroundColor: sColorColor}}>
                <div className="guess-text-box">
                    {pokemon.color}
                </div>
            </div>
            <div className="guess-box" id="evolution-stage">

            </div>
            <div className="guess-box" id="generation" style={{backgroundColor: sGenerationColor}}>
                <div className="guess-text-box">
                    {pokemon.generation.slice(-1)}
                </div>
            </div>
            <div className="guess-box" id="height" style={{backgroundColor: sHeightColor}}>
                <div className="guess-text-box">
                    {pokemon.height}
                    {heightArrow}
                </div>
            </div>
            <div className="guess-box" id="height" style={{backgroundColor: sWeightColor}}>
                <div className="guess-text-box">
                    {pokemon.weight}
                    {weightArrow}
                </div>
            </div>
        </div>

    )
}
