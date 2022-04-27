const photographerFactory = data => {
    const { name, portrait } = data;

    const picture = `assets/photographersID/${portrait}`;

    const getUserCardDOM = () => {
        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        article.appendChild(img);
        article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
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