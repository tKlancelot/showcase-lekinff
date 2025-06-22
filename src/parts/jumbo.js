export default async function Jumbo() {
  const base = import.meta.env.BASE_URL || '/';
  try {
    const response = await fetch(`${base}/public/parts/jumbo.html`);
    if (!response.ok) {
      console.error('Erreur de chargement de jumbo.html');
      return '<div>Erreur lors du chargement du composant Jumbo.</div>';
    }
    return await response.text();
  } catch (err) {
    console.error('Erreur réseau pour jumbo.html :', err);
    return '<div>Erreur réseau</div>';
  }
}