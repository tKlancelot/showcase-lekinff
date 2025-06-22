// utils/uiUtils.js
import { apiUrl } from '../config.js';
import { getRole } from './userUtils.js';


export const handleRole = () => {
    if(getRole() === 'super_admin') {
        document.body.dataset.theme ='super-admin';
    }

    if(getRole() === 'admin') {
        document.body.dataset.theme = 'admin';
    }

}


export const initPageSettings = async () => {
  try {
    const response = await fetch(`${apiUrl}/api/pagesettings`);
    if (!response.ok) throw new Error('Failed to fetch');
    const settings = await response.json();

    settings.forEach(setting => {
      if (setting.key === 'meta_description') {
        const metaDescription = document.querySelector('meta[name="description"]');
        if (metaDescription) {
          metaDescription.setAttribute('content', setting.value);
        }
        return;
      }
      const elementId = setting.key.replace(/_/g, '-');
      const element = document.getElementById(elementId);
      if (!element) return;



      // Choix automatique entre .value ou .textContent
      if ('value' in element) {
        element.value = setting.value;
      } else {
        element.textContent = setting.value;
      }
    });

    console.log('✅ Settings chargés et appliqués dynamiquement');
  } catch (error) {
    console.error('❌ Erreur dans initPageSettings:', error);
  }
};


export const initializeBaseStructure = async () => {
    const navbar = fetch('/src/parts/navbar.html').then(res => res.text());
    if (navbar) {
        document.getElementById('navbar').innerHTML = await navbar;
        let loginLink = document.getElementById('login-link');
        loginLink.style.display = getToken() ? 'none' : 'block';
        let connectedAs = document.getElementById('connected-as');
        connectedAs.style.display = getToken() ? 'block' : 'none';
        if (getToken()) {
            let userId = localStorage.getItem('userId');
            let user = await fetch(`${apiUrl}/api/users/${userId}`, {
                headers: { 'Authorization': `Bearer ${getToken()}` }
            }).then(res => res.json());

            let avatar = connectedAs.querySelector('.avatar-img');
            let avatarUrl = user.mainPicture ? `${apiUrl}/uploads/${user.mainPicture}` : './assets/pictures/default-user-2.png';
            avatar.src = avatarUrl;
        }
    }

    const menuLink = document.querySelector('.navbar #menu');
    if (getToken()) {
        menuLink.style.display = 'block';
        handlePermissions();
    }
};

export const handlePermissions = () => {


    const logoutLink = document.getElementById('logout');
    const addSettingLink = document.getElementById('add-setting');
    const pageSettingsLink = document.getElementById('page-settings');
    const usersAdminLink = document.getElementById('users-admin');
    const addUserLink = document.getElementById('add-user');

    // HAS TOKEN PERMISSION
    logoutLink.style.display = getToken() ? 'block' : 'none';

    // ADMIN PERMISSIONS 
    addSettingLink.style.display = getToken() && (getRole() === 'admin' || getRole() === 'super_admin') ? 'block' : 'none';
    pageSettingsLink.style.display = getToken() && (getRole() === 'admin' || getRole() === 'super_admin') ? 'block' : 'none';

    // SUPER ADMIN PERMISSIONS
    usersAdminLink.style.display = getToken() && (getRole() === 'super_admin') ? 'block' : 'none';
    addUserLink.style.display = getToken() && (getRole() === 'super_admin') ? 'block' : 'none';

    logoutLink.addEventListener('click', () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        window.location.href = '/';
    });
};


export const handleNavLinks = async (templatePath) => {
    // handle active nav link 
    let navLinks = document.querySelectorAll('.navbar li');
    let currentPage = templatePath.split('/').pop().split('.')[0];
    navLinks.forEach(link => {
        link.classList.remove('active');
        let linkName = link.textContent.toLowerCase().split(' ').join('-');
        (linkName === 'home') && (linkName = '');
        if (linkName === currentPage) {
            link.classList.add('active');
        }
    });
};

export const initTooltips = async () => {
  const tooltipElements = document.querySelectorAll('[data-tooltip]');

  tooltipElements.forEach(el => {
    const content = el.getAttribute('data-tooltip');
    const placement = el.getAttribute('data-tooltip-placement') || 'top'; // optionnel

    tippy(el, {
      content,
      placement,
      theme: 'light', // ou 'dark', ou un thème custom si tu veux
      animation: 'shift-away',
      delay: [100, 50],
    });
  });
};


export function toggleLoader(show = true, selector = '#loader-overlay') {
  const loader = document.querySelector(selector);
  if (!loader) return;

  if (show) {
    console.log('showing loader');
    loader.classList.add('show');
  } else {
    console.log('hiding loader');
    loader.classList.remove('show');
  }
}


