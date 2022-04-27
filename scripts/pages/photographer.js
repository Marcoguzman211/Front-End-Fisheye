//Mettre le code JavaScript lié à la page photographer.html

const loadPhotographerPage = () => {
    fetch('./data/photographers.json') 
        .then((response) => response.json()) 
        .then((data) => {
            const searchParams = new URLSearchParams(window.location.search); // Empty URLSearchParams object pour cibler l'url
            const photographerId = searchParams.get('id'); // Récupération de l'id dans l'URL
            const photographerToDisplay = data.photographers.find( // = infos à propos du photographe séléctionné dans index.html
                (element) => element.id == photographerId
            );
           const mediasToDisplay = data.media.filter( // Les objects média qui contiennent l'id du photographe
                (element) => element.photographerId == photographerId
            );
            console.log(photographerToDisplay)
            console.log(mediasToDisplay)
        });
};
loadPhotographerPage(); // Launch init