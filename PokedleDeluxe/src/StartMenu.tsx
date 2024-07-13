export default function StartMenu(props) {
    //FROM https://react.dev/reference/react-dom/components/select
    function handleSubmit(e: any){
        // Prevent the browser from reloading the page
        e.preventDefault();
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        const generation = formJson.generation;
        props.setGeneration(generation);
        props.setHasStarted(true);
    }

    return (
        <div>
            <span>Welcome to Pokedle-Deluxe, aka Pokedeluxe!</span>
            <br/>
            <span>Select your generation here: </span>
            <form method="post" onSubmit={handleSubmit}>
                <label>
                    <select name="generation" id="generation">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>
                </label>
                <button type="submit">Submit</button>
            </form>


        </div>
    )
}
