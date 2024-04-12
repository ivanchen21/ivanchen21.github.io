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
                title_id: title_id,
                title: temp.title,      // unique title
                quantity: 1             // number of items that share that title
            };
            temp.group = title_id;
        }


        if(result.collection.items[i].links[0].href){
            temp.image = result.collection.items[i].links[0].href;
        } else temp.image = "N/A";

        if(result.collection.items[i].data[0].photographer){
            temp.photographer = result.collection.items[i].data[0].photographer;
        } else temp.photographer = "N/A";

        if(result.collection.items[i].data[0].nasa_id){
            temp.nasa_id = result.collection.items[i].data[0].nasa_id;
        } else temp.nasa_id = "N/A";
            
        if(result.collection.items[i].data[0].media_type){
            temp.media_type = result.collection.items[i].data[0].media_type;
        } else temp.media_type = "N/A";

        if(result.collection.items[i].data[0].keywords) {
            var m = result.collection.items[i].data[0].keywords.length;
            temp.keywords = [];
            for(let j = 0; j < m; j++){
                temp.keywords[j] = result.collection.items[i].data[0].keywords[j];
            }
        } else temp.keywords = ["N/A"];

        data.items[i] = temp;
    }
    //console.log(data);


    // Restructure data to group unique titles vs shared titles

    var restructured_data = {};
    restructured_data.titles = [];
    restructured_data.groups = [];
    restructured_data.extras = [];

    // Remove elements from data.titles[] that do not share a title
    restructured_data.titles = data.titles.filter(title => title.quantity > 1);

    // Group items that share the same title
    for(let i = 0; i < restructured_data.titles.length; i++){
        let temp = data.items.filter(item => item.group == restructured_data.titles[i].title_id);
        restructured_data.groups[i] = temp;
    }

    // Group items that have a unique title
    var unique_titles_array = [];
    unique_titles_array = data.titles.filter(title => title.quantity == 1);

    for(let i = 0; i < data.items.length; i++){
        for(let j = 0; j < unique_titles_array.length; j++){
            if(data.items[i].group == unique_titles_array[j].title_id){
                restructured_data.extras.push(data.items[i]);
                break;
            }
        }
    }
    

    return restructured_data;
}


export { getRecent };