import postcards from './postcards.json'
import './style.css'
import logoSvg from './media/betongromantik.svg'
import concreteromanticQr from './media/concreteromantic_qr.png'
import betongromantikQr from './media/betongromantik_qr.png'
import heroImg1x from './media/main/20201025-DSCF9644-1x.jpg'
import heroImg2x from './media/main/20201025-DSCF9644-2x.jpg'

interface PostcardImage {
  id: string
  description: string
}

interface PostcardSeries {
  id: string
  name: string
  release: string
  description: string
  images: PostcardImage[]
}

function lightboxId(series: PostcardSeries, image: PostcardImage): string {
  return `lb-${series.id}-${image.id}`
}

function createLightbox(series: PostcardSeries, image: PostcardImage): string {
  return `
    <div id="${lightboxId(series, image)}" class="lightbox">
      <a href="#" class="backdrop" aria-label="Stäng">
        <img src="/vykort/${series.id}/${image.id}-sm.jpg" alt="${image.description}" />
      </a>
      <a href="#" class="close" aria-label="Stäng">&times;</a>
      <p class="caption">${image.description}</p>
    </div>
  `
}

function createImageCard(series: PostcardSeries, image: PostcardImage): string {
  return `
    <a href="#${lightboxId(series, image)}" class="postcard">
      <figure>
        <img src="/vykort/${series.id}/${image.id}-sm.jpg"
             alt="${image.description}"
             loading="lazy" />
      </figure>
    </a>
  `
}

function createSeries(series: PostcardSeries): string {
  return `
    <section class="series">
      <div class="details">
        <h2>${series.name}</h2>
        <h3>${series.release}</h3>
        <p>${series.description}</p>
      </div>
      <div class="images">
        ${series.images.map((img) => createImageCard(series, img)).join("")}
      </div>
    </section>
  `
}

function pageHome(): string {
  console.log(heroImg1x)
  return `
    <main class="home">
      <div class="hero" style="background-image: image-set(url(${heroImg1x}) 1x, url(${heroImg2x}) 2x)"></div>
    </main>
  `
}

function pageVykort(): string {
  const sorted = (postcards as PostcardSeries[]).slice().reverse()
  const lightboxes = sorted
    .flatMap((series) => series.images.map((img) => createLightbox(series, img)))
    .join('')

  return `
    <main class="gallery">
      ${sorted.map((s) => createSeries(s)).join("")}
    </main>
    ${lightboxes}
  `
}

function pageInstagram(): string {
  return `
    <main class="instagram">
      <section>
        <a href="https://instagram.com/concreteromantic">
          <img src="${concreteromanticQr}" alt="@concreteromantic på Instagram" />
        </a>
        <p>Dagliga bilder</p>
      </section>
      <section>
        <a href="https://instagram.com/betongromantik">
          <img src="${betongromantikQr}" alt="@betongromantik på Instagram" />
        </a>
        <p>Bakom kulisserna</p>
      </section>
    </main>
  `
}

function render(): void {
  const path = location.pathname.replace(/\/$/, '') || '/'
  const root = document.getElementById('root')!

  let page: string
  switch (path) {
    case '/vykort':
      page = pageVykort()
      break
    case '/instagram':
      page = pageInstagram()
      break
    default:
      page = pageHome()
  }

  root.innerHTML = `
    <header>
      <a href="/"><img src="${logoSvg}" alt="Betongromantik" class="logo" /></a>
      <nav>
        <a href="/vykort">Vykort</a>
        <a href="/instagram">Instagram</a>
      </nav>
    </header>
    ${page}
    <footer>&copy; Theo Tolv 2016&ndash;${new Date().getUTCFullYear()}</footer>
  `
}

render()
