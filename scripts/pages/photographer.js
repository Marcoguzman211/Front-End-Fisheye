//Mettre le code JavaScript lié à la page photographer.html
const imgRegex = /^.*\.(jpg)$/;
const videoRegex = /^.*\.(mp4)$/;
const footer = document.querySelector('.footer');
let currentLightboxIndex = 0;
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
    const photographHeader = document.querySelector(".photograph-header")
      const photographerId = searchParams.get("id"); // Récupération de l'id dans l'URL
      const photographerToDisplay = data.photographers.find( // = infos à propos du photographe séléctionné dans index.html
        (element) => element.id == photographerId
      );
      document.title = `Fisheye | ${photographerToDisplay.name}`
      photographHeader.append(getHeaderCardDOM(photographerToDisplay))
      const mediasToDisplay = data.media.filter(
        // Les objects média qui contiennent l'id du photographe
        (element) => element.photographerId == photographerId
      );
      mediasToDisplay.forEach(media => {
        const mediaModel = mediasFactory(media)
        const mediaCardDOM = mediaModel.getMediaCardDOM();
        mediaCardsContainer.appendChild(mediaCardDOM)
        mediasLikesTotal += media.likes   //Ajoute les likes de chaque media au nombre total
      });
      displayPrice(photographerToDisplay.price)
      displayTotalLikes()
      mediasDOM(mediasToDisplay);
}


 // FOOTER
 const displayPrice = (price) => {
  const divPrice = document.createElement('div');
  divPrice.classList.add('price');
  const priceCardDOM = `<h2 tabindex="4">${price}€ / jour</h2>`;
  divPrice.innerHTML = priceCardDOM;
  footer.append(divPrice);
};

 // Display total likes
 const displayTotalLikes = () => {
  const divLikes = document.createElement('div');
  divLikes.classList.add('total_likes');
  const mediasLikesTotalCardDOM = `<h2 tabindex="4" id="likes">${mediasLikesTotal}</h2>
                                    <div class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>`;
  divLikes.innerHTML = mediasLikesTotalCardDOM;
  footer.prepend(divLikes);
  };

  // Update total likes
  const removeTotalLikes = () => {
    document.getElementById('likes').textContent = '';
  };
  const updateTotalLikes = () => {
    document.getElementById('likes').textContent = mediasLikesTotal;
  };

 const init = async () => {
  // Récupère les datas des photographes
  const data = await getPhotographersData();
  displayData(data);
}

init();

const mediasDOM = (mediasToDisplay) => {
  const mediasCardsFigure = document.querySelectorAll('.photographers-media-cards > figure');
  for (const [index, figure] of mediasCardsFigure.entries()) { // [index(key), figure(value)]
    // LIKES 
    // Add or substract like to figure and total
    const addLike = () => {
      figure.getElementsByTagName('h2')[1].textContent = Math.floor(figure.getElementsByTagName('h2')[1].textContent) + 1;
      mediasLikesTotal++;
      removeTotalLikes();
      updateTotalLikes();
    }
    const substractLike = () => {
      figure.getElementsByTagName('h2')[1].textContent = Math.floor(figure.getElementsByTagName('h2')[1].textContent) - 1;
      mediasLikesTotal--;
      removeTotalLikes();
      updateTotalLikes();
    }
    // LIKES 
    // Event: click 
    figure.querySelector('.heart').addEventListener('click', () => {
      figure.classList.toggle('is_liked'); 
      if (figure.classList.contains('is_liked')) {
        addLike();
      } else {
        substractLike(); 
      }
    });
     // LIKES 
     // Event: keyup 
     figure.querySelector('.heart').addEventListener('keyup', (event) => {
       event.preventDefault(); 
       event.stopPropagation();
       if (event.code === 'Enter') {
        figure.classList.toggle('is_liked'); 
          if (figure.classList.contains('is_liked')) {
            addLike();
          } else {
            substractLike(); 
          } 
       }
    });
    // LIGHTBOX
    // Get image or video media (used for click and keyboard)
    const sourceMediaClicked = figure.firstChild.src;
    const titleMediaClicked = figure.getElementsByTagName('h2')[0].textContent;
    const lightboxContainer = document.querySelector(
      '.lightbox__container',
    );
    // Add informations
    // Open on click
    figure.firstChild.addEventListener('click', () => {
      if (sourceMediaClicked.match(imgRegex)) { 
        mediaGetImage(sourceMediaClicked, lightboxContainer, titleMediaClicked); 
        displayLightbox();
      } else if (sourceMediaClicked.match(videoRegex)) { 
        mediaGetVideo(sourceMediaClicked, lightboxContainer, titleMediaClicked); 
        displayLightbox();
      }
    });
    // Open on keyup
    figure.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.code === 'Enter') {
        if (sourceMediaClicked.match(imgRegex)) { 
          mediaGetImage(sourceMediaClicked, lightboxContainer, titleMediaClicked);
          displayLightbox(); 
        } else if (sourceMediaClicked.match(videoRegex)) { 
          mediaGetVideo(sourceMediaClicked, lightboxContainer, titleMediaClicked); 
          displayLightbox();
        } 
      }
    });

  }  

  document.querySelector('.lightbox__prev').addEventListener('click', previousLightbox)
  
}
