import { getCraterDiameter } from "../controller/crater-calculations.js";

function displayCrater() {
    const crater_diameter = getCraterDiameter();

    const map_container = document.getElementById("map-container");

    map_container.innerHTML =`
        ${crater_diameter} m
    `
}

export { displayCrater };