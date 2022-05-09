// LIGHTBOX MODAL 

// On diplay or close
const header = document.getElementById('header')
const lightbox = document.getElementById('lightbox');
const lightboxContainer = document.querySelector('.lightbox__container');
function displayLightbox() {
  lightbox.style.display = 'block';
  /* lightbox.setAttribute('aria-hidden', 'false')
  lightbox.setAttribute('tabindex', '1')  
  lightboxContainer.setAttribute('tabindex', '1')
  footer.setAttribute('aria-hidden', 'true')
  footer.removeAttribute('tabindex')
  footer.setAttribute('tabindex', '-1')
  footer.style.visibility = 'hidden'; 
  main.style.display = 'none'; 
  main.style.visibility = 'hidden'; 
  main.setAttribute('aria-hidden', 'true') 
  main.setAttribute('tabindex', '-1') 
  header.setAttribute('tabindex', '-1')
  header.setAttribute('aria-hidden', 'true') 
  header.style.visibility = 'hidden';  */
}
function closeLightbox() {
  lightbox.style.display = 'none';
  lightbox.setAttribute('aria-hidden', 'true')
  lightboxContainer.innerHTML = '';
  main.style.display = 'block'; 
  main.style.visibility = 'visible'; 
  main.setAttribute('aria-hidden', 'false')
  footer.removeAttribute('tabindex')
  footer.setAttribute('tabindex', '4')
  footer.style.visibility = 'visible'; 
  header.style.visibility = 'visible'; 
}