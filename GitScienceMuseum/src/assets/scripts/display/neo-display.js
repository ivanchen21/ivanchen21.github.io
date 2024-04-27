import { getNEO } from "../controller/neo-controller.js";


function setCraterForm(event){
    const meteor = event.target;
    const diameter = parseInt(meteor.dataset.diameter);
    const velocity = parseInt(meteor.dataset.velocity);

    const impactor_diameter = document.getElementById("impactor-diameter");
    const impactor_velocity = document.getElementById("impactor-velocity");

    impactor_diameter.value = diameter;
    impactor_velocity.value = velocity;

}

async function displayNEO() {
    // Display APOD image and text on homepage
    const result = await getNEO();
    console.log(result);

    const neo_examples = document.getElementById("neo-examples");
    const element_count = document.getElementById("element-count");
    const meteors = document.getElementById("meteors");

    element_count.innerHTML += result.number_of_asteroids;

    // Use dataset for accessing specific meteor's values
    for(let i = 0; i < result.number_of_asteroids; i++) {
        let diameter = parseFloat(result.asteroids[i].diameter).toFixed(3);
        let velocity = parseFloat(result.asteroids[i].velocity).toFixed(3);
        meteors.innerHTML += `
            <div class="meteor-example">
                <h6>${result.asteroids[i].name}</h6><hr>
                <p>
                    Diameter: ${diameter} m
                    <br>
                    Velocity: ${velocity} km/s
                </p>
                <center>
                    <button id="${result.asteroids[i].id}" data-diameter="${diameter}" data-velocity="${velocity}">
                        Try Me!
                    </button>
                </center>
            </div>
        `
    }

    // Separated loop for event listeners to apply correctly
    for(let i = 0; i < result.number_of_asteroids; i++){
        let meteor = document.getElementById(result.asteroids[i].id);
        meteor.addEventListener("click", setCraterForm);
    }


}

export { displayNEO };