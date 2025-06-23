import Navbar from '../parts/navbar.js';
import { loadHtml } from '../js/utils/loadHtml.js';

export default async function About() {
  const html = await loadHtml('parts/about.html');
  return `${Navbar()}${html}`;
}

export async function AboutController() {
    console.log("✅ AboutController loaded");
}