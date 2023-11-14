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

fetchAccessToken().then(token => {
    fetchAPITwo(token).then(response => {
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
        const NewsRequestOne = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News%2C%20Schweiz%2C%20General&sort=releasedAt&order=DESC&publishedDateFrom=2023-01-01T00%3A00%3A00Z&publishedDateTo=2023-06-30T00%3A00%3A00Z", {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${accessToken}`,
            }), 
        }).catch(error => {
            console.error('Fetch Error:', error);
            return {error};
        });

        if(NewsRequestOne.error) {
            return NewsRequestOne;
        }

        console.log(NewsRequestOne)
        return await NewsRequestOne.json();
    } catch(error) {
        console.error('Error:', error);  // Log the error to the console
        return { error: { message: 'Error Fetching Data'}};
    }

}

export const fetchAPITwo = async(accessToken) => {
    try {
        const NewsRequestTwo = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News%2C%20Schweiz%2C%20General&sort=releasedAt&order=DESC&publishedDateFrom=2023-07-01T00%3A00%3A00Z&publishedDateTo=2023-12-31T00%3A00%3A00Z", {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${accessToken}`,
            }), 
        }).catch(error => {
            console.error('Fetch Error:', error);
            return {error};
        });

        if(NewsRequestTwo.error) {
            return NewsRequestTwo;
        }

        console.log(NewsRequestTwo)
        return await NewsRequestTwo.json();
    } catch(error) {
        console.error('Error:', error);  // Log the error to the console
        return { error: { message: 'Error Fetching Data'}};
    }

}


// export const fetchAPI = async(accessToken) => {
//     try {
//         const NewsRequest = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=DESC&publishedDateFrom=2023-01-01T00%3A00%3A00Z&publishedDateTo=2023-12-31T00%3A00%3A00Z", {
//             method: 'GET',
//             headers: new Headers({
//                 'Authorization': `Bearer ${accessToken}`,
//             }), 

            
//         }).catch(error => {
//             console.error('Fetch Error:', error);
//             return {error};
//         }); 
        

//         if(NewsRequest.error) {
//             return NewsRequest;
//         }

//         console.log(NewsRequest)
//         return await NewsRequest.json();
//     } catch(error) {
//         console.error('Error:', error);  // Log the error to the console
//         return { error: { message: 'Error Fetching Data'}};
//     }

    
// }



// export const fetchAPI = async(accessToken) => {
//     try {
//         const NewsRequestOne = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News%2C%20General%2C%20History%2C%20Events%2C%20Sport&sort=releasedAt&order=DESC&publishedDateFrom=2023-01-01T00%3A00%3A00Z&publishedDateTo=2023-06-30T00%3A00%3A00Z", {
//             method: 'GET',
//             headers: new Headers({
//                 'Authorization': `Bearer ${accessToken}`,
//             }), 
//         }).catch(error => {
//             console.error('Fetch Error:', error);
//             return {error};
//         });

//         if(NewsRequestOne.error) {
//             return NewsRequestOne;
//         }

//         console.log(NewsRequestOne)
//         return await NewsRequestOne.json();
//     } catch(error) {
//         console.error('Error:', error);  // Log the error to the console
//         return { error: { message: 'Error Fetching Data'}};
//     }


//     try {
//         const NewsRequestTwo = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News%2C%20General%2C%20History%2C%20Events%2C%20Sport&sort=releasedAt&order=DESC&publishedDateFrom=2023-07-01T00%3A00%3A00Z&publishedDateTo=2023-12-31T00%3A00%3A00Z", {
//             method: 'GET',
//             headers: new Headers({
//                 'Authorization': `Bearer ${accessToken}`,
//              }), 
            
//         }).catch(error => {
//             console.error('Fetch Error:', error);
//             return {error};
//         }); 
        

//         if(NewsRequestTwo.error) {
//             return NewsRequestTwo;
//         }

//         console.log(NewsRequestTwo)
//         return await NewsRequestTwo.json();
//     } catch(error) {
//         console.error('Error:', error);  // Log the error to the console
//         return { error: { message: 'Error Fetching Data'}};
//     }

    
// }