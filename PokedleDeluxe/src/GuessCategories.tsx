export default function GuessCategories() {
    return (
        <div className="guess-categories">
            <div className="guess-category-box">
                Pokemon
            </div>
            <div className="guess-category-box">
                <div className="tooltip">Type 1
                    <span className="tooltiptext">The primary elemental attribute of the Pokemon.</span>
                </div>
            </div>
            <div className="guess-category-box">
                <div className="tooltip">Type 2
                    <span className="tooltiptext">The secondary elemental attribute of the Pokemon.</span>
                </div>
            </div>
            <div className="guess-category-box">
                <div className="tooltip">Habitat
                    <span className="tooltiptext">The environment where the Pokemon is most likely to be found in the wild.</span>
                </div>
            </div>
            <div className="guess-category-box">
                <div className="tooltip">Color
                    <span className="tooltiptext">The dominant color of the Pokemon.</span>
                </div>
            </div>
            <div className="guess-category-box">
                <div className="tooltip">Evolution
                    <span className="tooltiptext">The evolution stage of the Pokemon.</span>
                </div>
            </div>
            <div className="guess-category-box">
                <div className="tooltip">Generation
                    <span className="tooltiptext">The generation the Pokemon was first introduced.</span>
                </div>
            </div>
            <div className="guess-category-box">
                <div className="tooltip">Height
                    <span className="tooltiptext">The height of the Pokemon.</span>
                </div>
            </div>
            <div className="guess-category-box">
                <div className="tooltip">Weight
                    <span className="tooltiptext">The weight of the Pokemon.</span>
                </div>
            </div>
        </div>
    )
}
