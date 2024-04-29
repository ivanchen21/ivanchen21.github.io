// https://impact.ese.ic.ac.uk/ImpactEarth/cgi-bin/crater.cgi
// https://impact.ese.ic.ac.uk/ImpactEarth/ImpactEffects/effects.pdf
// https://www.purdue.edu/impactearth/
// https://neal.fun/asteroid-launcher/

/* --------- Densities (kg/m^3) ---------  */
// ice = 1000
// porous = 1500
// dense = 3000
// iron = 8000
// gold = 20000

// water = 1000
// sedimentary = 2500
// crystalline = 2750


/* --------- Transient Crater Formula ---------  */
// D_tc = 1.161 * (rho_i/rho_t)^(1/3) * L^0.78 * v_i^0.44 * g_E^-0.22 * (sin(theta))^(1/3)

// D_tc = diameter of the transient crater (m)
// 1.161 = constant (0.8 ~ 1.5), 1.365 for water
// rho_i = density of impactor (kg/m^3)
// rho_t = density of target (kg/m^3)
// L = impactor diameter after atmospheric entry (m)
// v_i = impact velocity at the surface (m/s) [we use relative velocity]
// g_E = Earth's surface gravity (m/s^2)
// theta = angle of impact (measured to the horizontal)


/* --------- Final Crater Formula ---------  */
/* --------- Simple Crater (for transient craters < 2.56 km) ---------  */
// D_fr = 1.25 D_tc

// D_fr = final rim-to-rim diameter
// D_tc = transient crater


/* --------- Final Crater Formula ---------  */
/* --------- Complex Crater (for transient craters > 2.56 km) ---------  */
// D_fr = 1.17 (D_tc^1.13) / (D_c^0.13)

// D_fr = final rim-to-rim diameter (km)
// D_tc = transient crater (km)
// D_c = diameter at which the transition from simple to complex crater occurs (taken to be 3.2 km on Earth)





function calculateCrater(data) {
    var final_diameter;
    //console.log(data);

    const gravity = 9.81;
    const constant_factor = 1.161;
    const constant_factor_water = 1.365;

    var D_tc;
    var rho_i = parseFloat(data.impactor_density);
    var rho_t = parseFloat(data.target_density);
    var L = parseFloat(data.impactor_diameter);
    var v_i = parseFloat(data.impact_velocity) * 1000; // km/s -> m/s
    var theta = parseInt(data.angle);

    var cf;
    if(data.target_density == 1000){
        cf = constant_factor_water;
    }
    else{
        cf = constant_factor;
    }

    let radians = theta * Math.PI / 180;

    let a = cf * Math.pow((rho_i / rho_t), (1/3) );

    let b = Math.pow(L, 0.78) * Math.pow(v_i, 0.44);

    let c = Math.pow(gravity, -0.22) * Math.pow(Math.sin(radians), (1/3) );

    D_tc = a * b * c;
    //console.log(D_tc);

    var D_fr;
    if(D_tc < 2560) { // simple
        D_fr = 1.25 * D_tc;
    }
    else { // complex
        D_fr = 1.17 * (Math.pow(D_tc, 1.13) / Math.pow(3200, 0.13) );
    }

    final_diameter = D_fr;

    // console.log(final_diameter);
    return final_diameter;
}

function getMeteorInputs(){
    const crater_form = document.getElementById("crater-form");
    const inputs = Array.from(crater_form).filter(element => element.tagName == "INPUT");
    const result = {};

    for(let i = 0; i < inputs.length; i++) {

        // densitites - impactor and target
        if(inputs[i].type == "radio") {
            if(inputs[i].checked){
                if(inputs[i].name == "impactor-density"){
                    result.impactor_density = parseInt(inputs[i].value);
                }
                if(inputs[i].name == "target-density"){
                    result.target_density = parseInt(inputs[i].value);
                }
            }
        }

        // meteor: diameter and velocity
        if(inputs[i].type == "number") {
            if(inputs[i].name == "meteor-diameter"){
                result.impactor_diameter = parseFloat(inputs[i].value);
            }
            if(inputs[i].name == "meteor-velocity"){
                result.impact_velocity = parseFloat(inputs[i].value);
            }
        }
        // angle of impact
        if(inputs[i].type == "range" && inputs[i].name == "angle"){
            result.angle = parseInt(inputs[i].value);
        }
    }
    //console.log(result);
    return result;
}


function getCraterDiameter() {
    var data;
    var final_diameter;

    const crater_form = document.getElementById("crater-form");
    const inputs = Array.from(crater_form).filter(element => element.tagName == "INPUT");
    

    if(inputs[8].value != "" && inputs[9].value != ""){
        data = getMeteorInputs();
        final_diameter = calculateCrater(data);
    }
    else{
        return window.alert("Missing Diameter or Velocity Input!");
    }

    return final_diameter;
}

export { getCraterDiameter };