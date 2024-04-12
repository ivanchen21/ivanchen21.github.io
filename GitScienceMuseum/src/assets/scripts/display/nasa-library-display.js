import { getRecent } from "../controller/nasa-library-search.js";

async function displayRecent() {
    const result = await getRecent();
    const content = document.getElementById("media");
    console.log(result);

    var news_id = 0;
    var item_id = 0;

    content.innerHTML = '';

    // Display Media with shared titles first
    for(let i = 0; i < result.titles.length; i++) {
        content.innerHTML +=`
            <div id="news-${news_id++}" class="news-group">
                <h3>${result.titles[i].title}</h3>
                <div class="grid">

                </div>
            </div>
        `

        for(let j = 0; j < result.groups[i].length; j++){
            var news_container_id = `news-${news_id - 1}`;
            var news_container = document.getElementById(news_container_id);
            var grid_container = news_container.querySelector(".grid");

            grid_container.innerHTML +=`
                <div class="item-${item_id++} group-item-content">
                    <img src="${result.groups[i][j].image}" alt="image for ${result.groups[i][j].title}">
                    <div>
                        <div>description info</div>
                        <div>${result.groups[i][j].photographer}</div>
                    </div>
                </div>
            `
        }
    }

    // Display extra media separated
    if(result.extras.length){
        content.innerHTML +=`
            <div id="extras-container">
                <div class="grid">

                </div>
            </div>
        `
    }
    for(let i = 0; i < result.extras.length; i++){
        var extras_container = document.getElementById("extras-container");
        var grid_container = extras_container.querySelector(".grid");
        grid_container.innerHTML +=`
            <img src="${result.extras[i].image}" alt="image for ${result.extras[i].title}">
        `
    }
}

export { displayRecent };
