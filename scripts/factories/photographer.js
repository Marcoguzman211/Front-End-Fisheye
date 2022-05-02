const photographerFactory = data => {
    const { name, id, portrait, city, country, tagline, price } = data; 
      const picture = `assets/photographersID/${portrait}`; // Get .jpg 
    
      function getUserCardDOM() { // Build DOM 
        const article = document.createElement('article');
        const a = document.createElement('a');
        a.setAttribute('href', `./photographer.html?id=${id}`); //Envoie vers la page de chaque photographe
        article.setAttribute('id', id);
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `${name} photographer portrait`);
        const h2 = document.createElement('h2');
        h2.textContent = name;
        const h4 = document.createElement('h4');
        h4.textContent = `${city}, ${country}`;
        const h5 = document.createElement('h5');
        h5.textContent = tagline;
        const h6 = document.createElement('h6');
        h6.textContent = `${price}€/jour`;
    
        article.appendChild(a);
        a.appendChild(img);
        a.appendChild(h2);
        a.appendChild(h4);
        a.appendChild(h5);
        a.appendChild(h6);
    
        return (article);
      }
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
}

const mediasFactory = (data) => {
    const { date, id, image, video, likes, photographerId,  price, title } = data

    const getMediaCardDOM = () => {
        if (data.hasOwnProperty('image')) {
            return createImageDOM(data);
        } else {
            return createVideoDOM(data);
        }

       /*  data.hasOwnProperty('image') ? createImageDOM(data) : createVideoDOM(data)  ?? pk ça ne marche pas ?*/ 
    }
    return { date, id, image, video, likes, photographerId,  price, title, getMediaCardDOM } 
}

const createImageDOM = (data) => {
    const { image, likes, photographerId, title } = data
    const figure = document.createElement("figure")
    figure.classList.add("card")
    const content = `<img src="./assets/photographersMedias/${photographerId}/${image}" alt="${title}"></img>
    <div>
        <h2 tabindex="5">${title}</h2>
        <div>
            <h2 tabindex="5" class="likes">${likes}</h2>
            <div tabindex="5" aria-label="likes" class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>
        </div>
    </div>`;
    figure.innerHTML =(content);
    return figure
}

const createVideoDOM = (data) => {
    const { video, likes, photographerId, title } = data
    const figure = document.createElement("figure")
    figure.classList.add("card")
    const content = `<video class="video" src="./assets/photographersMedias/${photographerId}/${video}" alt="${title}" controls></video>
    <div>
        <h2 tabindex="5">${title}</h2>
        <div>
            <h2 tabindex="5" class="likes">${likes}</h2>
            <div tabindex="5" class="heart filter_icons"><i class="fa fa-heart fa-lg" title="heart icon"></i></div>
        </div>
    </div>`;
    figure.innerHTML =(content);
    return figure
    
}