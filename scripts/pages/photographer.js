//Mettre le code JavaScript lié à la page photographer.html
const getPhotographersData = async () => {
  return fetch("./data/photographers.json") // Get .json
    .then((response) => response.json()) // Make JS object
    .then((data) => {
      return data;
    });
};

const displayData = (data) => {
    const searchParams = new URLSearchParams(window.location.search); // Empty URLSearchParams object pour cibler l'url
    const container = document.querySelector(".container");
      const photographerId = searchParams.get("id"); // Récupération de l'id dans l'URL
      const photographerToDisplay = data.photographers.find( // = infos à propos du photographe séléctionné dans index.html
        (element) => element.id == photographerId
      );
      const mediasToDisplay = data.media.filter(
        // Les objects média qui contiennent l'id du photographe
        (element) => element.photographerId == photographerId
      );

      console.log(mediasToDisplay);
      console.log(photographerToDisplay);

      mediasToDisplay.forEach(media => {
          const mediaModel = mediasFactory(media)
          const mediaCardDOM = mediaModel.getMediaCardDOM();
          container.appendChild(mediaCardDOM)
      })
}

 const init = async () => {
  // Récupère les datas des photographes
  const data = await getPhotographersData();
  displayData(data);
}

init();