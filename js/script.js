import { key } from './key.js'


export const fetchAccessToken = async() => {
    try {
        const accessRequest = await fetch("https://api.srgssr.ch/oauth/v1/accesstoken?grant_type=client_credentials", {
            method: 'POST',
            body: JSON.stringify({
                expires_in: 3600,
            }),
            headers: new Headers({
                'Authorization': `Basic ${btoa(key)}`, 
            }), 
        });
        const accessResponse = await accessRequest.json();
        console.log(accessResponse)
        return accessResponse.access_token;
    } catch(error) {
        console.error('Access Token Error:', error);
        throw error;  // Re-throw the error to be handled by the caller
    }
}

fetchAccessToken().then(token => {
    fetchAPI(token).then(response => {
        console.log(response.data.articles.edges);

        const klimaArtikel = response.data.articles.edges.filter(article => {
            return JSON.stringify(article).includes("Klima");
        })

        console.log(klimaArtikel);
    }).catch(error => {
        console.error('API Fetch Error:', error);
    });
});

export const fetchAPI = async(accessToken) => {
    try {
        const weatherRequest = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=DESC&publishedDateFrom=2023-01-01T00%3A00%3A00Z&publishedDateTo=2023-12-31T00%3A00%3A00Z", {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${accessToken}`,
            }), 
        }).catch(error => {
            console.error('Fetch Error:', error);
            return {error};
        }); 
        

        if(weatherRequest.error) {
            return weatherRequest;
        }

        console.log(weatherRequest)
        return await weatherRequest.json();
    } catch(error) {
        console.error('Error:', error);  // Log the error to the console
        return { error: { message: 'Error Fetching Data'}};
    }

    
}

// console.log(responseJson);

