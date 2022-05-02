    const getPhotographers = async () => {
        return fetch('./data/photographers.json') // Get .json
            .then(response => response.json()) // Make JS object
            .then (data => {
                return data;
            });
    }


    function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);

            /* //Événement click pour envoyer vers photographer.html
            userCardDOM.addEventListener('click', () => {
                window.location.href = `photographer.html?id=${photographer.id}`;
            }); */
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    init()