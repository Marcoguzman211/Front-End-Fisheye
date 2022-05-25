const photographerFactory = data => {
    const { name, id, portrait, city, country, tagline, price } = data; 
      const picture = `assets/photographersID/${portrait}`; // Get .jpg 
    
      const getUserCardDOM = () => { // Build DOM 
        const article = document.createElement("article");
        const a = document.createElement("a");
        a.setAttribute("href", `./photographer.html?id=${id}`); //Envoie vers la page de chaque photographe
        article.setAttribute("id", id);
        const img = document.createElement("img");
        img.setAttribute("src", picture);
        img.setAttribute("alt", `${name} photographer portrait`);
        const h2 = document.createElement("h2");
        h2.textContent = name;
        const h4 = document.createElement("h4");
        h4.textContent = `${city}, ${country}`;
        const h5 = document.createElement("h5");
        h5.textContent = tagline;
        const h6 = document.createElement("h6");
        h6.textContent = `${price}€/jour`;
    
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(h4);
        a.appendChild(h5);
        a.appendChild(h6);
    
        return (article);
      };
      return { // an object keys/values
        name,
        id,
        portrait,
        city,
        country,
        tagline,
        price,
        getUserCardDOM,
      };
};

//Affichage carte avec bouton modale
const getHeaderCardDOM = (data) => {
    const {city, country, name, portrait, tagline} = data;
    const picture = `assets/photographersID/${portrait}`; 

    document.querySelector("#photographerNameContact").textContent = name;


    const article = document.createElement("article");
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.setAttribute("tabindex", "4");
    img.setAttribute("src", picture);
    img.setAttribute("alt", `${name}`);
    const h1 = document.createElement("h1");
    h1.textContent = name;
    h1.setAttribute("tabindex", "4");
    const h2 = document.createElement("h2");
    h2.textContent = `${city}, ${country}`;
    h2.setAttribute("tabindex", "4");
    const h3 = document.createElement("h3");
    h3.textContent = tagline;
    h3.setAttribute("tabindex", "4");
    const span = document.createElement("span");
    span.innerHTML = `<button tabindex="4" class="contact-button" role="button" onclick="displayModal()">Contactez-moi</button>`;
    article.appendChild(div);
    div.appendChild(h1);
    div.appendChild(h2);
    div.appendChild(h3);
    article.appendChild(span);
    article.appendChild(img);
    return article;
};


//Affichage gallery medias
const mediasFactory = (data) => {
    const { date, id, image, video, likes, photographerId,  price, title } = data;

    const getMediaCardDOM = () => {
        if (data.hasOwnProperty("image")) {
            return createImageDOM(data);
        } else {
            return createVideoDOM(data);
        }

       /*  data.hasOwnProperty('image') ? createImageDOM(data) : createVideoDOM(data)  ?? pk ça ne marche pas ?*/ 
    };
    return { date, id, image, video, likes, photographerId,  price, title, getMediaCardDOM }; 
};

//Fonction reutilisable qui sert à générer les cartes dans le grid de la page photographer.html
const createImageDOM = (data) => {
    const { image, likes, photographerId, title } = data;
    const figure = document.createElement("figure");
    figure.classList.add("card");
    const content = `<img src="./assets/photographersMedias/${photographerId}/${image}" alt="${title}"></img>
    <div>
        <h2 tabindex="5">${title}</h2>
        <div>
            <h2 tabindex="5" class="likes">${likes}</h2>
            <div tabindex="5" aria-label="likes" class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>
        </div>
    </div>`;
    figure.innerHTML =(content);
    return figure;
};

const createVideoDOM = (data) => {
    const { video, likes, photographerId, title } = data;
    const figure = document.createElement("figure");
    figure.classList.add("card");
    const content = `<video class="video" src="./assets/photographersMedias/${photographerId}/${video}" alt="${title}"></video>
    <div>
        <h2 tabindex="5">${title}</h2>
        <div>
            <h2 tabindex="5" class="likes">${likes}</h2>
            <div tabindex="5" class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>
        </div>
    </div>`;
    figure.innerHTML =(content);
    return figure;
    
};

//Functions pour faire le tri
const functionByLikes = (a, b) => {
    if (a.likes > b.likes) {
      return -1;
    }
    if (a.likes < b.likes) {
      return 1;
    }
    return 0;
  };

const functionByTitle = (a, b) => {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  };


//Function qui sert à vider le grid des cards
const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
};

//LIKES
const addLike = (figure) => {
    figure.getElementsByTagName("h2")[1].textContent = Math.floor(figure.getElementsByTagName("h2")[1].textContent) + 1;
    mediasLikesTotal++;
    removeTotalLikes();
    updateTotalLikes();
  };
  const substractLike = (figure) => {
    figure.getElementsByTagName("h2")[1].textContent = Math.floor(figure.getElementsByTagName("h2")[1].textContent) - 1;
    mediasLikesTotal--;
    removeTotalLikes();
    updateTotalLikes();
  };

 // Display total likes
 const displayTotalLikes = () => {
    const divLikes = document.createElement("div");
    divLikes.classList.add("total_likes");
    const mediasLikesTotalCardDOM = `<h2 tabindex="4" id="likes">${mediasLikesTotal}</h2>
                                      <div class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>`;
    divLikes.innerHTML = mediasLikesTotalCardDOM;
    footer.prepend(divLikes);
    };

  // Update total likes
  const removeTotalLikes = () => {
    document.getElementById("likes").textContent = "";
  };
  const updateTotalLikes = () => {
    document.getElementById("likes").textContent = mediasLikesTotal;
  };

   // FOOTER
 const displayPrice = (price, footer) => {
    const divPrice = document.createElement("div");
    divPrice.classList.add("price");
    const priceCardDOM = `<h2 tabindex="4">${price}€ / jour</h2>`;
    divPrice.innerHTML = priceCardDOM;
    footer.append(divPrice);
  };