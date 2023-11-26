// API Request 20230501 - 20230830
fetchAccessToken().then(token => {
    fetchAPITwo(token).then(response => {
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