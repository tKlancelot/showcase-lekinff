import router from './router.js';
import { ModalService } from './serviceModals.js';
import { handleRole, initPageSettings } from './js/uiUtils.js';
import { ModalDialog } from './webcomponents/modalDialog.js';
import { CustomSelect } from './webcomponents/customSelect.js';
import { CustomTabs } from './webcomponents/customTabs.js';
import { logout } from './js/userUtils.js';

const app = document.getElementById('app');

async function globalController() {
  
  const modalService = new ModalService();
  modalService.initModals();
  handleRole();
  logout();
  initPageSettings();
  console.log("✅ GlobalController loaded");
  
}

async function handleRoute() {
  try {
    const { content, controller } = await router.resolve({ pathname: location.pathname });
    app.innerHTML = content;

    if (controller) {
      await controller();
    }

    await globalController();

  } catch (err) {
    console.warn("Route non trouvée, fallback vers Home");
    const homeModule = await import('./views/home.js');
    app.innerHTML = homeModule.default();
    
    if (homeModule.HomeController) {
      await homeModule.HomeController();
    }

    await globalController();  // <-- On l'appelle aussi dans le fallback
    history.replaceState(null, '', '/');
  }
}

window.addEventListener('popstate', handleRoute);

document.addEventListener('click', e => {
  if (e.target.matches('a[data-link]')) {
    e.preventDefault();
    history.pushState(null, '', e.target.href);
    handleRoute();
  }
});

handleRoute();
