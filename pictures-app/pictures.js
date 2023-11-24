const count = 30;
const apiKey = 'pX2HFyng78GXvKJZLXi46bYagDz9YXUB5IJL9bCZ03I';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
const imageContainer = document.getElementById('imageDiv');
const loader = document.getElementById('loading');

let isDownLoaded = false;
let imagesLoaded = 0;
let totalImages = 0;
let imagesArray = [];

getImages();

async function getImages() {
  try {
    const response = await fetch(apiUrl);
    imagesArray = await response.json();
    displayImages();
  } catch (error) {}
}

function displayImages() {

    imagesLoaded = 0;
    totalImages = imagesArray.length;
  imagesArray.forEach(imageData => {
    const item = document.createElement('a');
    setAttributes(item, {href: imageData.urls.regular});
    const img = document.createElement('img');
    setAttributes(img, {
      src: imageData.urls.regular,
      alt: imageData.alt_description,
    });

    img.addEventListener('load', imageLoaded);

    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

function imageLoaded() {
    imagesLoaded++;
    if(imagesLoaded === totalImages)
    {
        isDownLoaded = true;
        loader.hidden = true;
    }
};

function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

window.addEventListener('scroll', () => {

  if (
    window.innerHeight + window.scrollY >= 
    document.body.offsetHeight - 1000 && isDownLoaded
    ) {
        getImages();
  }
});