const main = document.getElementById("main");
const modal = document.getElementById("contact_modal");
const closeButton = document.querySelector(".modal__close");

//Foction qui gère l'affichage et l'accessibilité de la modale de contact
const displayModal = () => {
	modal.style.display = "block";
    main.setAttribute("aria-hidden", "true");
    modal.setAttribute("tabindex","1");
    main.setAttribute("tabindex", "-1");
    modal.style.display = "block";
    main.style.display = "none"; 
    footer.style.visibility = "hidden"; 
};

//Foction qui gère la fermeture et son accessibilité
const closeModal = () => {
    modal.style.display = "none";
    modal.style.display = "none";
    main.style.display = "block"; 
    main.setAttribute("aria-hidden", "false");
    footer.style.visibility = "visible"; 
};

// On keyup event, close contact modal
document.addEventListener("keyup", (event) => {
    event.preventDefault();
    if (event.code === "Escape") {
      closeModal();
    }
  });

closeButton.addEventListener("keyup", (e) => {
  if (e.code === "Enter") {
    closeModal();
  }
});