const galleryItems = [
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original: 'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
]

const refs = {
  ul: document.querySelector('.js-gallery'),
  galleryImg: document.querySelector('.gallery__img'),
  modalImg: document.querySelector('.lightbox__image'),
  closeModalBtn: document.querySelector('[data-action="close-lightbox"]'),
  modal: document.querySelector('.lightbox'),
}

const listImg = refs.ul
const modalImg = refs.modalImg
const modal = refs.modal
const closeModalBtn = refs.closeModalBtn

const galleryMarkup = createImgGalleryMarkup(galleryItems)
listImg.insertAdjacentHTML('beforeend', galleryMarkup)

listImg.addEventListener('click', openModalByClick)

function createImgGalleryMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>`
    })
    .join('')
}

function openModalByClick(e) {
  modal.addEventListener('click', closeModalByClick)
  window.addEventListener('keydown', closeModalByKey)
  window.addEventListener('keydown', sliderImgByKey)

  e.preventDefault()

  if (e.target.nodeName === 'IMG') {
    toggleModal(modal)

    insertImgInModal(e)
  }
}

function toggleModal(elem) {
  elem.classList.toggle('is-open')
}

function insertImgInModal(e) {
  modalImg.src = e.target.dataset.source
  modalImg.alt = e.target.alt
}

function closeModalByKey(e) {
  if (e.code === 'Escape') {
    closeModal()

    window.removeEventListener('keydown', closeModalByKey)
  }
}

function closeModalByClick(e) {
  if (e.target.classList.contains('lightbox__button') || e.target.classList.contains('lightbox__overlay')) {
    closeModal()

    modal.removeEventListener('click', closeModalByClick)
  }
}

function closeModal() {
  modalImg.src = ''
  modalImg.alt = ''

  toggleModal(modal)
}

function sliderImgByKey(e) {
  if (e.code === 'ArrowLeft') {
    const index = galleryItems.findIndex(item => item.original === modalImg.src)
    for (let i = index - 1; i > -1; i -= 1) {
      const nextImgSrc = galleryItems[index - 1].original
      modalImg.src = nextImgSrc
    }
  }

  if (e.code === 'ArrowRight') {
    const index = galleryItems.findIndex(item => item.original === modalImg.src)
    for (let i = index + 1; i < galleryItems.length; i += 1) {
      const nextImgSrc = galleryItems[index + 1].original
      modalImg.src = nextImgSrc
    }
  }
}
