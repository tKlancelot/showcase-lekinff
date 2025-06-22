// utils/uiUtils.js
// import tippy from 'tippy.js';
// import 'tippy.js/dist/tippy.css';
// import { getRole, getToken } from "./userUtils";
import { apiUrl } from './config.js';
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
  const cachedSettings = localStorage.getItem('pageSettings');
  if (cachedSettings) {
    applySettings(JSON.parse(cachedSettings));
    console.log('✅ Settings chargés depuis le cache');
  }

  try {
    const response = await fetch(`${apiUrl}/api/pagesettings`);
    if (!response.ok) throw new Error('Failed to fetch');
    const settings = await response.json();

    console.log(settings);

    localStorage.setItem('pageSettings', JSON.stringify(settings));
    applySettings(settings);
    console.log('✅ Settings chargés et appliqués');
  } catch (error) {
    console.error('❌ Erreur dans initPageSettings:', error);
  }
};

function applySettings(settings) {
  const mapping = {
    'page_background': 'jumbo-home',
    'page_title': 'page-title',
    'page_subtitle': 'page-subtitle',
    'page_logotype': 'page-logotype',
    'jumbo_description': 'jumbo-description',
    'jumbo_description_2': 'jumbo-description-2',
    'jumbo_caption': 'jumbo-caption',
    'section_about_para': 'section-about-para',
    'section_about_picture': 'section-about-picture',
    'carousel_one': 'carousel-one',
    'carousel_two': 'carousel-two',
    'carousel_three': 'carousel-three',
    'key_test': 'key-test',
    'key_test_2': 'key-test-2',
    'footer_copyright': 'footer-copyright',
  };

  settings.forEach(setting => {
    const elementId = mapping[setting.key];
    if (!elementId) return;
    const element = document.getElementById(elementId);
    if (!element) return;

    if (setting.image) {
      if (element.tagName === 'IMG') {
        element.src = `${apiUrl}/uploads/${setting.image}`;
        element.alt = setting.key;
      } else {
        element.style.backgroundImage = `url(${apiUrl}/uploads/${setting.image})`;
      }
    } else {
      element.textContent = setting.value;
    }
  });
}


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
            console.log(linkName);
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
    loader.classList.add('show');
  } else {
    loader.classList.remove('show');
  }
}


