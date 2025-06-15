import UniversalRouter from 'universal-router';
import Home, { HomeController } from './views/home.js';
import About, { AboutController } from './views/about.js';
import Admin, { AdminController } from './views/admin.js';

const routes = [
  {
    path: '/',
    action: async () => ({
      content: Home(),
      controller: HomeController
    })
  },
  {
    path: '/about',
    action: async () => ({
      content: About(),
      controller: AboutController
    })
  },
  {
    path: '/admin',
    action: async () => ({
      content: Admin(),
      controller: AdminController
    })
  },
  {
    path: '(.*)',
    action: async ({ pathname }) => {
        history.replaceState(null, '', '/');  // change l’URL sans reload
        return {
        content: Home(),
        controller: HomeController
        };
    }
  }
];

const router = new UniversalRouter(routes);

export default router;