async function fetchAPI(url) {
    const options = {
        method: 'GET',
    };
    const response = await fetch(url, options);
    const result = await response.text();
    const data = JSON.parse(result);
    return data;
}

export { fetchAPI };