import Navbar from '../parts/navbar.js';

export default function About() {
  return `
    ${Navbar()}
    <main class="lt-page">
      <div class="lt-frame">
        <h1 class="lt-page-title">About</h1>
        <p id="key-test">This is the About page.</p>
        <p id="new-key">This is the About page.</p>
        <p id="new-new">This is the About page.</p>
      </div>
    </main>
  `;
}

export async function AboutController() {
  console.log("AboutController: Page logic for About");
  // Ajoute ici ton code spécifique à About
}