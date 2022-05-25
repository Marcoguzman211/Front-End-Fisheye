//Mettre le code JavaScript lié à la page photographer.html
const imgRegex = /^.*\.(jpg)$/;
const videoRegex = /^.*\.(mp4)$/;
const footer = document.querySelector(".footer");
let mediasLikesTotal = 0;


const getPhotographersData = async () => {
  return fetch("./data/photographers.json") // Get .json
    .then((response) => response.json()) // Make JS object
    .then((data) => {
      return data;
    });
};

const displayData = (data) => {
    const searchParams = new URLSearchParams(window.location.search); // Empty URLSearchParams object pour cibler l'url
    const mediaCardsContainer = document.querySelector(".photographers-media-cards");
    const photographHeader = document.querySelector(".photograph-header");
      const photographerId = searchParams.get("id"); // Récupération de l'id dans l'URL
      const photographerToDisplay = data.photographers.find( // = infos à propos du photographe séléctionné dans index.html
        (element) => element.id == photographerId
      );
      document.title = `Fisheye | ${photographerToDisplay.name}`;
      photographHeader.append(getHeaderCardDOM(photographerToDisplay));
      const mediasToDisplay = data.media.filter(
        // Les objects média qui contiennent l'id du photographe
        (element) => element.photographerId == photographerId
      );

      //Trie le médias par popularité, par défaut avant de les afficher.
      mediasToDisplay.sort(functionByLikes);
      mediasToDisplay.forEach(media => {
        const mediaModel = mediasFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaCardsContainer.appendChild(mediaCardDOM);
        mediasLikesTotal += media.likes;  //Ajoute les likes de chaque media au nombre total
      });
      displayPrice(photographerToDisplay.price, footer);
      displayTotalLikes();
      mediasDOM(mediasToDisplay);

      document.querySelector("form").addEventListener("submit", (e) => {
        e.preventDefault();
        const inputs = document.querySelectorAll("input");
        inputs.forEach(input => console.log(input.value));
        console.log(document.querySelector("textarea").value);
      });

      
      // Sort by title  
    const sortByTitle = () => {
    const mediasCards = document.querySelector(".photographers-media-cards");
    document.querySelector(".dropbtn-text").textContent = "Titre";
    document.querySelector(".option1").setAttribute("data-sort", "title");
    document.querySelector(".option1").setAttribute("value", "title");
    document.querySelector(".listbox-option-text1").textContent = "Titre";
    document.querySelector(".option2").setAttribute("data-sort", "popularity");
    document.querySelector(".option2").setAttribute("value", "popularity");
    document.querySelector(".listbox-option-text2").textContent = "Popularité";
    mediasToDisplay.sort(functionByTitle);
    removeAllChildNodes(mediasCards);
    mediasLikesTotal = 0;
    mediasToDisplay.forEach(media => {
      const mediaModel = mediasFactory(media);
      const mediaCardDOM = mediaModel.getMediaCardDOM();
      mediaCardsContainer.appendChild(mediaCardDOM);
      mediasLikesTotal += media.likes;  //Ajoute les likes de chaque media au nombre total
    });
    document.querySelector(".total_likes").remove();
    document.querySelector(".price").remove();
    displayPrice(photographerToDisplay.price, footer);
    displayTotalLikes();
    mediasDOM(mediasToDisplay);
  };

    // Sort by popularity  
    const sortByPopularity = () => {
      const mediasCards = document.querySelector(".photographers-media-cards");
      document.querySelector(".dropbtn-text").textContent = "Popularité";
      document.querySelector(".option1").setAttribute("data-sort", "popularity");
      document.querySelector(".option1").setAttribute("value", "popularity");
      document.querySelector(".listbox-option-text1").textContent = "Popularité";
      document.querySelector(".option2").setAttribute("data-sort", "title");
      document.querySelector(".option2").setAttribute("value", "title");
      document.querySelector(".listbox-option-text2").textContent = "Titre";
      mediasToDisplay.sort(functionByLikes);
      removeAllChildNodes(mediasCards);
      mediasLikesTotal = 0;
      mediasToDisplay.forEach(media => {
        const mediaModel = mediasFactory(media);
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaCardsContainer.appendChild(mediaCardDOM);
        mediasLikesTotal += media.likes;  //Ajoute les likes de chaque media au nombre total
      });
      document.querySelector(".total_likes").remove();
      document.querySelector(".price").remove();
      displayPrice(photographerToDisplay.price, footer);
      displayTotalLikes();
      mediasDOM(mediasToDisplay);
    };

      // Click event, dropdown, sort by popularity or title
      dropdownContainer.addEventListener("click", (e) => {
        if (e.target.textContent == "Titre") {
          sortByTitle(); 
        } else if (e.target.textContent == "Popularité") {
          sortByPopularity(); 
        }
      });

      dropdownContainer.addEventListener("keyup", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
        const typeOfSorting = e.target.textContent.trim();
        if (e.code === "Enter") {
          if (typeOfSorting === "Titre") {
            sortByTitle(); 
          } else if (typeOfSorting === "Popularité") {
            sortByPopularity(); 
          }
        }
      });
};

//Appel de la function au début pour afficher toute la page.
 const init = async () => {
  // Récupère les datas des photographes
  const data = await getPhotographersData();
  displayData(data);
};

init(); //Affichage des médias

const mediasDOM = (mediasToDisplay) => {
  const mediasCardsFigure = document.querySelectorAll(".photographers-media-cards > figure");
  mediasCardsFigure.forEach(figure => {
    // LIKES 
    // Event: click 
    figure.querySelector(".heart").addEventListener("click", () => {
      figure.classList.toggle("is_liked"); 
      if (figure.classList.contains("is_liked")) {
        addLike(figure);
      } else {
        substractLike(figure); 
      }
    });
     // LIKES 
     // Event: keyup 
     figure.querySelector(".heart").addEventListener("keyup", (event) => {
       event.preventDefault(); 
       event.stopPropagation();
       if (event.code === "Enter") {
        figure.classList.toggle("is_liked"); 
          if (figure.classList.contains("is_liked")) {
            addLike(figure);
          } else {
            substractLike(figure); 
          } 
       }
    });
    // LIGHTBOX
    // Get image or video media (used for click and keyboard)
    const sourceMediaClicked = figure.firstChild.src;
    const titleMediaClicked = figure.getElementsByTagName("h2")[0].textContent;
    const lightboxContainer = document.querySelector(".lightbox__container");
    // Add informations
    // Open on click
    figure.firstChild.addEventListener("click", () => {
      if (sourceMediaClicked.match(imgRegex)) { 
        mediaGetImage(sourceMediaClicked, lightboxContainer, titleMediaClicked); 
        displayLightbox();
      } else if (sourceMediaClicked.match(videoRegex)) { 
        mediaGetVideo(sourceMediaClicked, lightboxContainer, titleMediaClicked); 
        displayLightbox();
      }
    });
    // Open on keyup
    figure.addEventListener("keyup", (event) => {
      event.preventDefault();
      if (event.code === "Enter") {
        if (sourceMediaClicked.match(imgRegex)) { 
          mediaGetImage(sourceMediaClicked, lightboxContainer, titleMediaClicked);
          displayLightbox(); 
        } else if (sourceMediaClicked.match(videoRegex)) { 
          mediaGetVideo(sourceMediaClicked, lightboxContainer, titleMediaClicked); 
          displayLightbox();
        } 
      } 
    });
  });

  document.querySelector(".lightbox__prev").addEventListener("click", previousLightbox);
  document.querySelector(".lightbox__next").addEventListener("click", nextLightbox);
  document.addEventListener("keyup", (e) => {
    e.stopImmediatePropagation();
    let displayValue = document.getElementById("lightbox").style.display;
    if (displayValue === "block") {
      if (e.code === "ArrowLeft") {
        previousLightbox();
      } else if (e.code === "ArrowRight") {
        nextLightbox();
      } else if (e.code == "Escape") {
        closeLightbox();
      }
    }
  });
};

