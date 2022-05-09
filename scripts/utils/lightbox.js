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
    mediaGetImage(previousMedia.firstChild.src, lightboxContainer, previousMedia.querySelector('h2').textContent)
  } else if (previousMedia.firstChild.src.match(videoRegex)) { 
    mediaGetVideo(previousMedia.firstChild.src, lightboxContainer, previousMedia.querySelector('h2').textContent)
  } 
}


    // Get image or video and display
    const mediaGetImage = (source, container, titre) => {
      const title = document.createElement('h2');
      const img = document.createElement('img');
      img.src = source;
      container.appendChild(img);
      title.textContent = titre;
      title.setAttribute('tabindex', '1')
      title.setAttribute('role', 'Text') 
      title.setAttribute('aria-hidden', 'false') 
      title.setAttribute('aria-label', `${titre}`)  
      title.classList.add("lightbox-title")
      container.appendChild(title);
    }
    const mediaGetVideo = (source, container, titre) => {
      const title = document.createElement('h2');
      const video = document.createElement('video');
      video.src = source;
      video.controls = true;
      container.append(video);
      title.textContent = titre;
      title.setAttribute('tabindex', '1')
      title.setAttribute('role', 'Text') 
      title.setAttribute('aria-hidden', 'false') 
      title.setAttribute('aria-label', `${titre}`)  
      title.classList.add("lightbox-title")
      container.appendChild(title);
    }