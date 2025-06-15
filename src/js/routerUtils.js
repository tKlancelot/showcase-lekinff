export const loadPage = async (pageName,pageScript) => {
  try {
    const response = await fetch(`/src/pages/${pageName}.html`);
    const html = await response.text();
    document.getElementById('app').innerHTML = html;

    console.log(`✅ ${pageName} chargé`);

  } catch (error) {
    console.error(`❌ Erreur lors du chargement de ${pageName}:`, error);
    if (pageName !== '404') loadPage('404');
  }

  try {
    const response = await fetch(`/src/js/${pageScript}`);
    const script = await response.text();
    eval(script);
    console.log(`✅ ${pageScript} chargé`);
  } catch (error) {
    console.error(`❌ Erreur lors du chargement de ${pageScript}:`, error);
  }
};


export function getPageName(url) {
  const parts = url.split('/');
  return parts[parts.length - 1].split('.')[0];
}