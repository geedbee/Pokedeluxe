import {useState} from "react";

export default function HintBox(props) {
    const solution = props.solution;
    const ability = props.solution.ability;
    const egggroup = props.solution.egggroup;
    const description = props.solution.flavortext;

    const [showAbility, setShowAbility] = useState(false);
    const [showEggGroup, setShowEggGroup] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    function abilityButtonHandler(){
        setShowAbility(!showAbility);
        setShowEggGroup(false);
        setShowDescription(false);
    }
    function egggroupButtonHandler(){
        setShowEggGroup(!showEggGroup);
        setShowAbility(false);
        setShowDescription(false);
    }
    function descriptionButtonHandler() {
        setShowDescription(!showDescription);
        setShowEggGroup(false);
        setShowAbility(false);
    }

    return (
        <>
            <div className="hint-box-hints">
                <div className="hint-box" onClick={abilityButtonHandler}>
                    <button className="hint-button">
                        <img src="../public/_fight.png" alt="ability" className="hint-icon"/>
                    </button>
                    <span>Ability</span>
                </div>
                <div className="hint-box">
                    <button className="hint-button" onClick={egggroupButtonHandler}>
                        <img src="../public/_Egg.png" alt="ability" className="hint-icon"/>
                    </button>
                    <span>Egg Group</span>
                </div>
                <div className="hint-box">
                    <button className="hint-button" onClick={descriptionButtonHandler}>
                        <img src="../public/_Mobile%20Phone.png" alt="description" className="hint-icon"/>
                    </button>
                    <span>Entry</span>
                </div>
            </div>
            <div className="hint-container">
                {showDescription && description}
                {showEggGroup && egggroup}
                {showAbility && ability}
            </div>
        </>
    )
}
