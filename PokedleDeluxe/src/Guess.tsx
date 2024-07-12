export default function Guess(props) {
    const pokemon = props.pokemon;
    const solution = props.solution;
    const sType1 = solution.type1;
    const sType2 = solution.type2;
    const sColor = solution.color;
    const sHabitat = solution.habitat;
    const sGeneration = solution.generation;
    const sAbility = solution.ability;

    const RED = "#f36445"
    const GREEN ="#008000";

    var sType1Color = RED;
    if (sType1 == pokemon.type1){
        sType1Color = GREEN;
    }
    var sType2Color = RED;
    if (sType2 == pokemon.type2){
        sType2Color = GREEN;
    }
    var sColorColor = RED;
    if (sColor == pokemon.color){
        sColorColor = GREEN;
    }
    var sHabitatColor = RED;
    if (sHabitat == pokemon.habitat){
        sHabitatColor = GREEN;
    }
    var sGenerationColor = RED;
    if (sGeneration == pokemon.generation){
        sGenerationColor = GREEN;
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
                    {pokemon.generation}
                </div>
            </div>
        </div>

    )
}
