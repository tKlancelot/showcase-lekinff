export async function loadHtml(path) {
  const base = import.meta.env.BASE_URL || '/';
  try {
    const res = await fetch(`${base}${path}`);
    if (!res.ok) throw new Error(`Erreur de chargement : ${path}`);
    return await res.text();
  } catch (err) {
    console.error(err);
    return '<div>Erreur de chargement</div>';
  }
}