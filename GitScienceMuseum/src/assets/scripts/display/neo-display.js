import { getNEO } from "../controller/neo-controller.js";


// Update form inputs with an asteroids data
function setCraterForm(event){
    const crater_form = document.getElementById("crater-form");
    const inputs = Array.from(crater_form).filter(element => element.tagName == "INPUT");

    // Get data from dataset
    const meteor = event.target;
    const diameter = parseInt(meteor.dataset.diameter);
    const velocity = parseInt(meteor.dataset.velocity);
    const impactor_density_index = parseInt(meteor.dataset.impactor_density);
    const target_density_index = parseInt(meteor.dataset.target_density);
    const angle = parseInt(meteor.dataset.angle);

    const impactor_diameter = document.getElementById("impactor-diameter");
    const impactor_velocity = document.getElementById("impactor-velocity");
    impactor_diameter.value = diameter;
    impactor_velocity.value = velocity;

    // Density and angle is random since it's missing from neo-api
    for(let i = 0; i < inputs.length; i++){
        if(impactor_density_index == i){
            inputs[i].checked = true;
        }
        if(target_density_index == i){
            inputs[i].checked = true;
        }
    }

    const angle_output = document.getElementById("angle-output");
    inputs[10].value = angle;
    angle_output.value = angle;


}

async function displayNEO() {
    // Display APOD image and text on homepage
    const result = await getNEO();
    // console.log(result);

    const neo_examples = document.getElementById("neo-examples");
    const element_count = document.getElementById("element-count");
    const meteors = document.getElementById("meteors");

    element_count.innerHTML += result.number_of_asteroids;

    // Use dataset for accessing specific meteor's values (must start w/ data- and no uppercase)
    for(let i = 0; i < result.number_of_asteroids; i++) {
        let diameter = parseFloat(result.asteroids[i].diameter).toFixed(3);
        let velocity = parseFloat(result.asteroids[i].velocity).toFixed(3);

        // Pick random data for missing inputs (densities and angle is not given from neo-api)
        let random_impactor_density = Math.floor(Math.random() * 5); // 0 - 4   index for impactor input
        let random_target_density = Math.floor(Math.random() * 3) + 5;   // 5 - 7   indext for target input
        let random_angle = Math.floor(Math.random() * 90) + 1; // 1 - 90 angle in degrees

        meteors.innerHTML += `
            <div class="meteor-example">
                <h6>${result.asteroids[i].name}</h6><hr>
                <p>
                    Diameter: ${diameter} m
                    <br>
                    Velocity: ${velocity} km/s
                </p>
                <center>
                    <button id="${result.asteroids[i].id}"
                        data-diameter="${diameter}"
                        data-velocity="${velocity}"
                        data-impactor_density="${random_impactor_density}"
                        data-target_density="${random_target_density}"
                        data-angle="${random_angle}"
                    >
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