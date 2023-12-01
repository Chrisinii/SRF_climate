import { key } from './key.js'

let klimaArtikelAll = []; // Globale Variable

// TODO: Ladeanimation machen, weil Abfrage lang geht / Oder hinschreiben, wenn es nicht funktioniert.

document.addEventListener('DOMContentLoaded', async () => {

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

            await fetchAllMonth(token);

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

// TODO: Immernoch zu wenig Anfragen, deswegen insgesamt 24 Anfragen machen
//this function gets the data from one specific quarter
const fetchMonthData = async(accessToken,month) => {
    let url= ""
    if(month==1){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-01-01T00%3A00%3A00Z&publishedDateTo=2023-01-31T00%3A00%3A00Z"
    }else if(month==2){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-02-01T00%3A00%3A00Z&publishedDateTo=2023-02-28T00%3A00%3A00Z"
    }else if(month==3){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-03-01T00%3A00%3A00Z&publishedDateTo=2023-03-31T00%3A00%3A00Z"
    }else if(month==4){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-04-01T00%3A00%3A00Z&publishedDateTo=2023-04-30T00%3A00%3A00Z"
    }else if(month==5){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-05-01T00%3A00%3A00Z&publishedDateTo=2023-05-31T00%3A00%3A00Z"
    }else if(month==6){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-06-01T00%3A00%3A00Z&publishedDateTo=2023-06-30T00%3A00%3A00Z"
    }else if(month==7){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-07-01T00%3A00%3A00Z&publishedDateTo=2023-07-31T00%3A00%3A00Z"
    }else if(month==8){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-08-01T00%3A00%3A00Z&publishedDateTo=2023-08-31T00%3A00%3A00Z"
    }else if(month==9){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-09-01T00%3A00%3A00Z&publishedDateTo=2023-09-30T00%3A00%3A00Z"
    }else if(month==10){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-10-01T00%3A00%3A00Z&publishedDateTo=2023-10-31T00%3A00%3A00Z"
    }else if(month==11){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-11-01T00%3A00%3A00Z&publishedDateTo=2023-11-30T00%3A00%3A00Z"
    }else if(month==12){
        url="https://api.srgssr.ch/srgssr-contents/v1/articles?items=500&bu=SRF&genre=News&sort=releasedAt&order=ASC&publishedDateFrom=2023-12-01T00%3A00%3A00Z&publishedDateTo=2023-12-31T00%3A00%3A00Z"
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
async function fetchAllMonth(token) {
    try {
        document.getElementById('loading').style.display = 'flex';

        // Hier rufen wir alle vier Quartale gleichzeitig auf
        const allMonth = await Promise.all([
            fetchMonthData(token, 1),
            fetchMonthData(token, 2),
            fetchMonthData(token, 3),
            fetchMonthData(token, 4),
            fetchMonthData(token, 5),
            fetchMonthData(token, 6),
            fetchMonthData(token, 7),
            fetchMonthData(token, 8),
            fetchMonthData(token, 9),
            fetchMonthData(token, 10),
            fetchMonthData(token, 11),
            fetchMonthData(token, 12)
        ]);

        const allKlimaArticles = allMonth.map((MonthData) => {
            return MonthData.data.articles.edges.filter(article => {
                const keywords = ["Klimaschutz", "Klimawandel", "Klimaerwärmung", "Klimakrise", "Klimakatastrophe"];
                const articleString = JSON.stringify(article);
                return keywords.some(keyword => articleString.includes(keyword));
            });
        });


        // Jetzt verarbeiten wir die Ergebnisse
        // const allKlimaArticles = allMonth.map((MonthData) => {
        //     return MonthData.data.articles.edges.filter(article => {
        //         return JSON.stringify(article).includes("Klimaschutz");
        //     });
        // });

        // Verkettung aller Klima-Artikel
        klimaArtikelAll = [].concat(...allKlimaArticles);
        console.log(":::::::::::::::::::::::Alle hohlen von Artikeln: ", klimaArtikelAll);

        document.getElementById('loading').style.display = 'none'
        return klimaArtikelAll;

    } catch (error) {
        document.getElementById('loading').style.display = 'none';
        console.error('Error in fetching quarter data:', error);
        return { error };
    }
}

await fetchAllMonth(token);


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

    // Datum
    const isoDate = article.releasedAt;
    const date = new Date(isoDate);

    function formatDate(date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('de-CH', options);
    }

    const formattedDate = formatDate(date);

    const releasedAt = document.createElement('p');
    releasedAt.textContent = `Veröffentlicht am ${formattedDate}`;

    // Weiterlesen Button
    const buttonElement = document.createElement('button');
    buttonElement.textContent = 'Weiterlesen';
    buttonElement.addEventListener('click', () => {
        // Weiterleitung zur angegebenen URL in einem neuen Tab
        window.open(article.url.url, '_blank'); // article.url.url enthält die URL
    });

    // Favoriten Button
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
    ContainerElement.appendChild(releasedAt);

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