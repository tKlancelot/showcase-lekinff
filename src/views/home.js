import Footer from '../parts/footer.js';
import jumbo from '../parts/jumbo.js';
import Navbar from '../parts/navbar.js';
import { apiUrl } from '../js/config.js';

export default function Home() {
  return `
    ${Navbar()}
    <main class="u-w-100 u-overflow-y-auto lt-stack u-h-100">
      ${jumbo()}
    </main>
    ${Footer()}
  `;
}

export async function HomeController() {
  console.log("HomeController: Page logic for Home");
  // Ajoute ici ton code spécifique à Home

  let splide = document.querySelector('.splide');

  if (splide){
      new Splide( '.splide', {
        type   : 'fade',
        autoplay: true,
        wheel: true,
        speed: 1500,
        arrows: false,
        rewind: true,
        interval: 6000,
        perPage: 1,
        perMove: 1,
        breakpoints: {
          1024: {
            perPage: 1,
          },
          640: {
            perPage: 1,
          },
        }
      } );
      splide.mount();
  } 

  // let loginFrame = document.querySelector('#login');  
  let loginForm = document.getElementById('login-form');

  // gestion du formulaire de login 

  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const formData = new FormData(loginForm);
      const username = formData.get('username');
      const password = formData.get('password');

      // add username and password to formData
      formData.append('username', username);
      formData.append('password', password);


      const response = await fetch(`${apiUrl}/api/login`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(Object.fromEntries(formData))
      });
      const data = await response.json();
      if (data.token) {
          localStorage.setItem('token', data.token);
          localStorage.setItem('role', data.data.role);
          localStorage.setItem('username', data.data.username);
          localStorage.setItem('userId', data.data.id);
          window.location.href = '/admin';
      }
  });


}