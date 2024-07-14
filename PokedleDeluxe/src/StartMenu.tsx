import {useState} from "react";

export default function StartMenu(props) {
    //FROM https://react.dev/reference/react-dom/components/select
    function handleSubmit(e: any){
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const entries = [...formData.entries()];
        let gens : string[] = [];
        entries.map((x) => {
            gens.push(x[1].toString());
            //props.setGenerations((p) => [...p, x[1].toString()]);
        })
        props.setGenerations([...gens]);
        props.setHasStarted(true);
    }

    return (
        <div className="start-menu-container">
            <span>Welcome to Pokedle-Deluxe, aka Pokedeluxe!</span>
            <br/>
            <span>Select your generation here: </span>
            <br/>
            <span>(CTRL+CLICK) for multiple</span>
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    <select name="generation" id="generation" multiple={true}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                    </select>
                </label>
                <button type="submit" className="button">Submit</button>
            </form>


        </div>
    )
}
