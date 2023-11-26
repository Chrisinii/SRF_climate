import { key } from './key.js'

let klimaArtikel = []; // Globale Variable

// Todo: Alle gewünschten Daten aus API rausholen lassen. Diese dann mit Flexbox anzeigen lassen.

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

// API Request 20230101 - 20230430
fetchAccessToken().then(token => {
    fetchAPI(token).then(response => {
        // console.log(response.data.articles.edges);

        klimaArtikel = response.data.articles.edges.filter(article => {
            return JSON.stringify(article).includes("Klima");
        })

        console.log(klimaArtikel);

        const datenAnzeigeElement = document.getElementById('datenAnzeige');
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

        klimaArtikel.forEach(article => {

            const ContainerElement = document.createElement('div'); 
            ContainerElement.classList.add('article-container'); // CSS-Klasse 
        
            const titelElement = document.createElement('h2'); 
            titelElement.textContent = article.title[0].content;
            titelElement.classList.add('titel'); // CSS-Klasse 
            
            const leadElement = document.createElement('p'); 
            leadElement.textContent = article.lead[0].content;
            leadElement.classList.add('lead'); // CSS-Klasse 
            
            // Elemente aus article.content.text Array zusammenfügen
            const contentArray = article.content.text;
            const contentText = contentArray.join(' '); // Alle Elemente zusammenführen
            
            // Inhalt auf 800 Zeichen kürzen
            const maxLength = 800;
            const truncatedContent = contentText.length > maxLength ? contentText.slice(0, maxLength) + '...' : contentText;
            
            const contentElement = document.createElement('p');
            contentElement.textContent = truncatedContent;

            // Erstelle den Button
            const buttonElement = document.createElement('button');
            buttonElement.textContent = 'Weiterlesen';
            buttonElement.addEventListener('click', () => {
                // Weiterleitung zur angegebenen URL in einem neuen Tab
                window.open(article.url.url, '_blank'); // article.url.url enthält die URL
            });

           // Erstelle den Favoriten-Button
            const favoriteButton = document.createElement('button');
            favoriteButton.textContent = 'Als Favorit markieren';

            if (isFavorite(article.id)) {
                favoriteButton.textContent = 'Favorit';
                favoriteButton.classList.add('favorite');
                article.isFavorite = true;
            } else {
                favoriteButton.textContent = 'Als Favorit markieren';
            }
    
            favoriteButton.addEventListener('click', () => {
                if (article.isFavorite) {
                    delete article.isFavorite;
                    favoriteButton.classList.remove('favorite');
                    removeFavorite(article.id);
                    favoriteButton.textContent = 'Als Favorit markieren';
                } else {
                    article.isFavorite = true;
                    favoriteButton.classList.add('favorite');
                    saveFavorite(article.id);
                    favoriteButton.textContent = 'Favorit';
                }
            });


            ContainerElement.appendChild(titelElement);
            ContainerElement.appendChild(leadElement);
            ContainerElement.appendChild(contentElement);
            ContainerElement.appendChild(buttonElement);
            ContainerElement.appendChild(favoriteButton);
        
            datenAnzeigeElement.appendChild(ContainerElement);

        });

    }).catch(error => {
        console.error('API Fetch Error:', error);
    });
});



export const fetchAPI = async(accessToken) => {
    try {
        const NewsRequestOne = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News%2C%20Schweiz%2C%20General&sort=releasedAt&order=DESC&publishedDateFrom=2023-01-01T00%3A00%3A00Z&publishedDateTo=2023-04-30T00%3A00%3A00Z", {
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

// API Request 20230501 - 20230830
fetchAccessToken().then(token => {
    fetchAPITwo(token).then(response => {
        // console.log(response.data.articles.edges);

        klimaArtikel = response.data.articles.edges.filter(article => {
            return JSON.stringify(article).includes("Klima");
        })

        console.log(klimaArtikel);
    }).catch(error => {
        console.error('API Fetch Error:', error);
    });
});

export const fetchAPITwo = async(accessToken) => {
    try {
        const NewsRequestTwo = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News%2C%20Schweiz%2C%20General&sort=releasedAt&order=DESC&publishedDateFrom=2023-05-01T00%3A00%3A00Z&publishedDateTo=2023-08-31T00%3A00%3A00Z", {
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

// API Request 20230901 - 20231231
fetchAccessToken().then(token => {
    fetchAPIThree(token).then(response => {
        // console.log(response.data.articles.edges);

        klimaArtikel = response.data.articles.edges.filter(article => {
            return JSON.stringify(article).includes("Klima");
        })

        console.log(klimaArtikel);
    }).catch(error => {
        console.error('API Fetch Error:', error);
    });
});

export const fetchAPIThree = async(accessToken) => {
    try {
        const NewsRequestThree = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News%2C%20Schweiz%2C%20General&sort=releasedAt&order=DESC&publishedDateFrom=2023-09-01T00%3A00%3A00Z&publishedDateTo=2023-12-31T00%3A00%3A00Z", {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${accessToken}`,
            }), 
        }).catch(error => {
            console.error('Fetch Error:', error);
            return {error};
        });

        if(NewsRequestThree.error) {
            return NewsRequestThree;
        }

        console.log(NewsRequestThree)
        return await NewsRequestThree.json();
    } catch(error) {
        console.error('Error:', error);  // Log the error to the console
        return { error: { message: 'Error Fetching Data'}};
    }

}

// Favoriten anzeigen

function updateFavoriteArticlesView() {
    const alleArtikel = document.querySelectorAll('.article-container');
    alleArtikel.forEach(container => {
        if (container.querySelector('.favorite')) {
            container.style.display = 'block'; // Zeige Favoriten
        } else {
            container.style.display = 'none'; // Verstecke Nicht-Favoriten
        }
    });
}


document.addEventListener('DOMContentLoaded', () => {
    const toggleFavoritesBtn = document.getElementById('toggleFavorites');
    let showOnlyFavorites = false;

    toggleFavoritesBtn.addEventListener('click', () => {
        showOnlyFavorites = !showOnlyFavorites;
        toggleFavoritesBtn.textContent = showOnlyFavorites ? "Alle Artikel anzeigen" : "Nur Favoriten anzeigen";
        updateArticlesDisplay(showOnlyFavorites);
    });

    // Initialisiere die Anzeige der Artikel mit Berücksichtigung der gespeicherten Favoriten
    fetchAccessToken().then(token => {
        fetchAPI(token).then(response => {
            klimaArtikel = response.data.articles.edges.filter(article => {
                return JSON.stringify(article).includes("Klima");
            });

            const datenAnzeigeElement = document.getElementById('datenAnzeige');
            const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];

            klimaArtikel.forEach(article => {
                const ContainerElement = document.createElement('div');
                ContainerElement.classList.add('article-container');

                // ... (Erstellen von titelElement, leadElement, contentElement)

                const favoriteButton = document.createElement('button');
                    favoriteButton.textContent = 'Als Favorit markieren';

                // Prüfen, ob der Artikel im Local Storage als Favorit gespeichert ist
                if (isFavorite(article.id)) {
                    article.isFavorite = true;
                    favoriteButton.classList.add('favorite');
                }

                favoriteButton.addEventListener('click', () => {
                    if (article.isFavorite) {
                        delete article.isFavorite;
                        favoriteButton.classList.remove('favorite');
                        removeFavorite(article.id);
                    } else {
                        article.isFavorite = true;
                        favoriteButton.classList.add('favorite');
                        saveFavorite(article.id);
                    }
                });

                ContainerElement.appendChild(titelElement);
                ContainerElement.appendChild(leadElement);
                ContainerElement.appendChild(contentElement);
                ContainerElement.appendChild(buttonElement);
                ContainerElement.appendChild(favoriteButton);

                datenAnzeigeElement.appendChild(ContainerElement);
            });
        });
    });

    function updateArticlesDisplay(showFavorites) {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        klimaArtikel.forEach((article, index) => {
            const container = document.querySelectorAll('.article-container')[index];
            if (showFavorites) {
                if (savedFavorites.includes(article.id)) {
                    container.style.display = 'block';
                } else {
                    container.style.display = 'none';
                }
            } else {
                container.style.display = 'block';
            }
        });
    }
    
    
});

function isFavorite(articleId) {
    console.log("Prüfe Favorit: ", articleId);
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    return favorites.includes(articleId);
}

function saveFavorite(articleId) {
    console.log("Speichere Favorit: ", articleId);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    if (!favorites.includes(articleId)) {
        favorites.push(articleId);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

function removeFavorite(articleId) {
    console.log("Entferne Favorit: ", articleId);
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites = favorites.filter(id => id !== articleId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
