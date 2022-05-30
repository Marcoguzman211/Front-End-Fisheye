    const getPhotographers = async () => {
        return fetch("./data/photographers.json") // Get .json
            .then(response => response.json()) // Make JS object
            .then (data => {
                return data;
            });
    };

    const displayData = (photographers) => {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    const init = async () => {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };

    init();