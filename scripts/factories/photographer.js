const photographerFactory = data => {
    const { name, id, portrait, city, country, tagline, price } = data; 
      const picture = `assets/photographersID/${portrait}`; // Get .jpg 
    
      function getUserCardDOM() { // Build DOM 
        const article = document.createElement('article');
        const a = document.createElement('a');
        a.setAttribute('href', `./photographer.html?id=${id}`);
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
    const { date, id, image, likes, photographerId,  price, title } = data

    const picture = `assets/photographersMedias/${photographerId}/${image}`;

    const getMediaCardDOM = () => {
        const div = document.createElement("div");
          const img = document.createElement("img");

          img.src = picture
          div.append(img)
        return (div);
    }
    return { date, id, image, likes, photographerId,  price, title, getMediaCardDOM } 
}