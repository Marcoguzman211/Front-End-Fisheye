// LIGHTBOX MODAL 

// On diplay or close
const header = document.getElementById('header')
const lightbox = document.getElementById('lightbox');
const lightboxContainer = document.querySelector('.lightbox__container');
function displayLightbox() {
  lightbox.style.display = 'block';
}
function closeLightbox() {
  lightbox.style.display = 'none';
  lightboxContainer.innerHTML = '';
}

const previousLightbox = () => {
  const mediasCardsFigure = document.querySelectorAll('.photographers-media-cards > figure');
  const allMedias = Array.from(mediasCardsFigure)
  const found = allMedias.find(media => media.querySelector('h2').textContent === lightboxContainer.querySelector('h2').textContent)
  let previousMedia;
  if (allMedias.indexOf(found) === 0) {
    previousMedia = allMedias[allMedias.length - 1]
  } else {
    previousMedia = allMedias[allMedias.indexOf(found) - 1]
  }

  lightboxContainer.innerHTML = ""
  if (previousMedia.firstChild.src.match(imgRegex)) { 
      const img = document.createElement('img');
    img.src = previousMedia.firstChild.src;
    lightboxContainer.appendChild(img);
    const title = document.createElement('h2');
      title.textContent = previousMedia.querySelector('h2').textContent;
      title.setAttribute('tabindex', '1')
      title.setAttribute('role', 'Text') 
      title.setAttribute('aria-hidden', 'false') 
      title.setAttribute('aria-label', `${previousMedia.querySelector('h2').textContent}`)  
      title.classList.add("lightbox-title")
      lightboxContainer.appendChild(title);
  } else if (previousMedia.firstChild.src.match(videoRegex)) { 
    const video = document.createElement('video');
    video.src = previousMedia.firstChild.src;
    video.controls = true;
    lightboxContainer.append(video);
    const title = document.createElement('h2');
      title.textContent = previousMedia.querySelector('h2').textContent;
      title.setAttribute('tabindex', '1')
      title.setAttribute('role', 'Text') 
      title.setAttribute('aria-hidden', 'false') 
      title.setAttribute('aria-label', `${previousMedia.querySelector('h2').textContent}`)  
      title.classList.add("lightbox-title")
      lightboxContainer.appendChild(title);
  } 
}