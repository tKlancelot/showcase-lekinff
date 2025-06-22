import Footer from '../parts/footer.js';
import jumbo from '../parts/jumbo.js';
import Navbar from '../parts/navbar.js';
import { apiUrl } from '../js/config.js';
import { toggleLoader } from '../js/utils/uiUtils.js';

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

  const splideElement = document.querySelector('.splide');

  if (splideElement) {
    // Crée une instance Splide avec la bonne classe, puis monte-la
    const splideInstance = new window.Splide(splideElement, {
      type: 'fade',
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
    });
    splideInstance.mount();
  }

  let loginForm = document.getElementById('login-form');

  loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      toggleLoader(true);

      const formData = new FormData(loginForm);
      const username = formData.get('username');
      const password = formData.get('password');

      formData.append('username', username);
      formData.append('password', password);

      try {
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
          } else {
              alert('Échec de la connexion');
          }
      } catch (error) {
          alert('Erreur réseau ou serveur');
          console.error(error);
      } finally {
          toggleLoader(false);
      }
  });
  // CREATE MESSAGE
  let createMessageForm = document.getElementById('send-message-form');

  createMessageForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const formData = new FormData(createMessageForm);
      const name = formData.get('name');
      const email = formData.get('email');
      const message = formData.get('message');

      if (!name || !email || !message) {
          alert("Merci de remplir tous les champs !");
          return;
      }

      try {
          const response = await fetch(`${apiUrl}/api/contact`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({ name, email, message })
          });

          const data = await response.json();

          if (response.ok) {
              alert(data.message); // "Votre message a été envoyé avec succès."
              createMessageForm.reset();
          } else {
              alert(data.message || "Erreur lors de l'envoi du message.");
          }

      } catch (err) {
          console.error("Erreur réseau :", err);
          alert("Erreur lors de l'envoi. Veuillez réessayer plus tard.");
      }
  });

}