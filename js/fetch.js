import { key } from './key.js'

let klimaArtikel = []; // Globale Variable

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
        const savedReads = JSON.parse(localStorage.getItem('gelesen')) || [];

        klimaArtikel.forEach(article => {

            const ContainerElement = document.createElement('div'); 
            ContainerElement.classList.add('article-container'); // CSS-Klasse 
        
            const titelElement = document.createElement('h2'); 
            titelElement.textContent = article.title[0].content;
            titelElement.classList.add('titel'); // CSS-Klasse 
            
            const leadElement = document.createElement('p'); 
            leadElement.textContent = article.lead[0].content;
            leadElement.classList.add('lead'); // CSS-Klasse 
            
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

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = `checkbox-${article.id}`;
        
            // Schritt 2: Initialer Status der Checkbox
            checkbox.checked = isChecked(article.id);
        
            // Schritt 3: Event Listener für die Checkbox
            checkbox.addEventListener('change', () => {
                if (checkbox.checked) {
                    saveCheckedState(article.id);
                } else {
                    removeCheckedState(article.id);
                }
            });

           // Erstelle den Favoriten-Button
            const favoriteButton = document.createElement('button');
            favoriteButton.textContent = 'Als Favorit markieren';

            if (isFavorite(article.id)) {
                favoriteButton.textContent = 'Favorit';
                favoriteButton.classList.add('favorite'); // CSS-Klasse
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
            ContainerElement.appendChild(checkbox);
        
            datenAnzeigeElement.appendChild(ContainerElement);

        });

    }).catch(error => {
        console.error('API Fetch Error:', error);
    });
});



export const fetchAPI = async(accessToken) => {
    try {
        const NewsRequest = await fetch("https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=DESC&publishedDateFrom=2023-01-01T00%3A00%3A00Z&publishedDateTo=2023-04-30T00%3A00%3A00Z", {
            method: 'GET',
            headers: new Headers({
                'Authorization': `Bearer ${accessToken}`,
            }), 
            
        }).catch(error => {
            console.error('Fetch Error:', error);
            return {error};
        });

        if(NewsRequest.error) {
            return NewsRequest;
        }

        console.log(NewsRequest)
        return await NewsRequest.json();
        
    } catch(error) {
        console.error('Error:', error);  // Log the error to the console
        return { error: { message: 'Error Fetching Data'}};
    }
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
    // console.log("Prüfe Favorit: ", articleId);
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


function isChecked(articleId) {
    const checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
    return checkedItems.includes(articleId);
}

function saveCheckedState(articleId) {
    let checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
    if (!checkedItems.includes(articleId)) {
        checkedItems.push(articleId);
        localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
    }
}

function removeCheckedState(articleId) {
    let checkedItems = JSON.parse(localStorage.getItem('checkedItems')) || [];
    checkedItems = checkedItems.filter(id => id !== articleId);
    localStorage.setItem('checkedItems', JSON.stringify(checkedItems));
}
