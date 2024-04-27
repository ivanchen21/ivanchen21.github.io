import { fetchNEO } from "../api/neo-api.js";


// Get element_count, id, name, diameter, velocity
async function getNEO() {
    const result = await fetchNEO();
    const data = {
        number_of_asteroids: result.element_count,
        asteroids: []
    };
    const today = new Date().toISOString().slice(0, 10);

    for(let i = 0; i < data.number_of_asteroids; i++){
        let id = result.near_earth_objects[today][i].id;
        let name = result.near_earth_objects[today][i].name;
        let diameter = result.near_earth_objects[today][i].estimated_diameter.meters.estimated_diameter_max;
        let velocity = result.near_earth_objects[today][i].close_approach_data[0].relative_velocity.kilometers_per_second;

        data.asteroids.push({ 
            id: id,
            name: name,
            diameter: diameter,
            velocity: velocity
        });
    }

    return data;
}

export { getNEO };