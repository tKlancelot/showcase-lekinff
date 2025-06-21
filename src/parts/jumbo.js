export default function Jumbo() {
  const base = import.meta.env.BASE_URL;
  return `
    <div class="section jumbo u-w-100 flaps">
       <div class="u-p-6 flap flap-40 u-a-j-center u-bg-gradient">
           <div class="lt-frame u-gap-8">
               <h1 id="page-title" class="lt-page-title">Maison LeKinff</h1>
               <h2>L’Adresse Créative à Privatiser, Paris 14ème</h2>
               <div class="lt-frame u-lh-2 u-max-w-480">
                  <p id="jumbo-caption"></p>
                  <p id="jumbo-description">about content</p>
                  <p id="jumbo-description-2">about content</p>
               </div>
               <div class="lt-stack u-gap-4">
                  <button class="btn btn-gradient btn-size-lg u-min-w-120">
                      <span>Réserver sur native Spaces</span>
                      <i class="icon lt-icon-send icon-size-lg"></i>
                  </button>
                  <button class="btn btn-size-lg btn-outline u-min-w-120" id="btn-textured" data-modal-ref="modal-test">
                      <span>Contact us</span>
                      <i class="icon lt-icon-organisms icon-size-lg"></i>
                  </button>
               </div>
          </div>
       </div>
      <div class="flap flap-60">
          <div class="splide u-w-100" aria-label="Splide Basic HTML Example">
              <div class="splide__track u-h-100">
                  <ul class="splide__list">
                      <li class="splide__slide">
                          <img width="100%" height="100%" src="${base}assets/pictures/lekinff-living.jpg" alt="">
                      </li>
                      <li class="splide__slide">
                          <img width="100%" height="100%" src="./assets/pictures/lekinff-stairs.jpg" alt="">
                      </li>
                      <li class="splide__slide">
                          <img width="100%" height="100%" src="${base}assets/pictures/lekinff-outside.jpg" alt="">
                      </li>
                  </ul>
              </div>
          </div>
      </div>
    </div>
  `;
}
