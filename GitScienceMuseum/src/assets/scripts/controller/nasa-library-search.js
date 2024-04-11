import { fetchRecent } from "../api/nasa-library-api.js";

// Simplify and get recent news
// Get the title, image/video, photographer, nasa_id, media_type, keywords
// Group news with the same title
async function getRecent() {
    const result = await fetchRecent();
    let data = {};

    // Number of items
    var n = result.collection.items.length;

    data.titles = [];
    data.items = [];

    var title_id = -1;

    for (let i = 0; i < n; i++) {
        let temp = {};
        temp.group = -1;


        // Ensure key exists before assigning
        if(result.collection.items[i].data[0].title)
            temp.title = result.collection.items[i].data[0].title;

        // Group similar news using title_id
        var checker = false;
        for(let i = 0; i < data.titles.length; i++){
            if(temp.title == data.titles[i].title){
                temp.group = i;
                data.titles[i].quantity++;
                checker = true;
                break;
            }
        }
        // If no title matches, store new title
        if(!checker){
            data.titles[++title_id] = {
                title: temp.title,      // unique title
                quantity: 1             // number of items that share that title
            };
            temp.group = title_id;
        }


        if(result.collection.items[i].links[0].href)
            temp.image = result.collection.items[i].links[0].href;

        if(result.collection.items[i].data[0].photographer)
            temp.photographer = result.collection.items[i].data[0].photographer;

        if(result.collection.items[i].data[0].nasa_id)
            temp.nasa_id = result.collection.items[i].data[0].nasa_id;

        if(result.collection.items[i].data[0].media_type)
            temp.media_type = result.collection.items[i].data[0].media_type;

        if(result.collection.items[i].data[0].keywords) {
            var m = result.collection.items[i].data[0].keywords.length;
            temp.keywords = [];
            for(let j = 0; j < m; j++){
                temp.keywords[j] = result.collection.items[i].data[0].keywords[j];
            }
        }
        data.items[i] = temp;
    }

    return data;
}

export { getRecent };