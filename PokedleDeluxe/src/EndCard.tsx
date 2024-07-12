export default function EndCard(props) {
    const solution = props.solution;
    const tries = props.tries;
    return (
        <div className="end-card">
            <span>Well done!<br/></span>
            <span>You guessed:<br/></span>
            <div className="end-card-solution">
                <img src={solution.spriteURL} alt={solution.name} className="solution-img"/>
                <span>{solution.name.toUpperCase()}<br/></span>
                <span>Tries:{tries}</span>
            </div>
        </div>
    )
}
