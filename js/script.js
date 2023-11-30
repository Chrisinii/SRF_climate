import { key } from './key.js'

let klimaArtikelAll = []; // Globale Variable
let klimaArtikelOne = []; // Globale Variable
let klimaArtikelTwo = []; // Globale Variable
let klimaArtikelThree = []; // Globale Variable
let klimaArtikelFour = []; // Globale Variable

document.addEventListener('DOMContentLoaded', () => {

    const toggleFavoritesBtn = document.getElementById('toggleFavorites');
    let showOnlyFavorites = false;
    console.log("Document loaded")

    toggleFavoritesBtn.addEventListener('click', () => {
        console.log("Favoriten filtern")
        showOnlyFavorites = !showOnlyFavorites;
        toggleFavoritesBtn.textContent = showOnlyFavorites ? "Alle Artikel anzeigen" : "Nur Favoriten anzeigen";
        updateArticlesDisplay(showOnlyFavorites);
    });



            const datenAnzeigeElement = document.getElementById('datenAnzeige');

            klimaArtikelAll.forEach(article => {
                const ContainerElement = document.createElement('div');
                ContainerElement.classList.add('article-container');

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

                datenAnzeigeElement.appendChild(ContainerElement);
            });
    

    console.log("Klimaartikel = ", klimaArtikelAll);

    function updateArticlesDisplay(showFavorites) {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        klimaArtikelAll.forEach((article, index) => {
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

////////////////////Hohlen vom Token/////////////////////////
let token;
token=await fetchAccessToken();
console.log("Token: ", token);

//this function gets the data from one specific quarter
const fetchQuarterData = async(accessToken,quarter) => {//quarter=1 or 2 or 3 or 4
    let url= ""
    if(quarter==1){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=DESC&publishedDateFrom=2023-01-01T00%3A00%3A00Z&publishedDateTo=2023-03-31T00%3A00%3A00Z"
    }else if(quarter==2){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=DESC&publishedDateFrom=2023-04-01T00%3A00%3A00Z&publishedDateTo=2023-06-30T00%3A00%3A00Z"
    }else if(quarter==3){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=DESC&publishedDateFrom=2023-07-01T00%3A00%3A00Z&publishedDateTo=2023-09-30T00%3A00%3A00Z"
    }else if(quarter==4){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=DESC&publishedDateFrom=2023-10-01T00%3A00%3A00Z&publishedDateTo=2023-12-31T00%3A00%3A00Z"
    }
    try {
        const NewsRequest = await fetch(url, {
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
async function fetchAllQuarters(token) {
    try {
        // Hier rufen wir alle vier Quartale gleichzeitig auf
        const allQuarters = await Promise.all([
            fetchQuarterData(token, 1),
            fetchQuarterData(token, 2),
            fetchQuarterData(token, 3),
            fetchQuarterData(token, 4)
        ]);

        // Jetzt verarbeiten wir die Ergebnisse
        const allKlimaArticles = allQuarters.map((quarterData, index) => {
            return quarterData.data.articles.edges.filter(article => {
                return JSON.stringify(article).includes("Klima");
            });
        });

        // Verkettung aller Klima-Artikel
        klimaArtikelAll = [].concat(...allKlimaArticles);
        console.log(":::::::::::::::::::::::Alle hohlen von Artikeln: ", klimaArtikelAll);

        return klimaArtikelAll;

    } catch (error) {
        console.error('Error in fetching quarter data:', error);
        return { error };
    }
}

await fetchAllQuarters(token);


const datenAnzeigeElement = document.getElementById('datenAnzeige');

klimaArtikelAll.forEach(article => {

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
    favoriteButton.classList.add('SecondButton');

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


// Favoriten anzeigen

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