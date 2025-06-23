import Home, { HomeController } from './views/home.js';
import About, { AboutController } from './views/about.js';
import Admin, { AdminController } from './views/admin.js';

const routes = [
  {
    path: '/',
    action: async () => ({
      content: await Home(), // 🔁 toutes les vues sont async
      controller: HomeController
    })
  },
  {
    path: '/about',
    action: async () => ({
      content: await About(),
      controller: AboutController
    })
  },
  {
    path: '/admin',
    action: async () => ({
      content: await Admin(),
      controller: AdminController
    })
  },
  {
    path: '(.*)',
    action: async () => {
      const fallbackContent = await Home();
      return {
        content: fallbackContent,
        controller: HomeController
      };
    }
  }
];

export default new UniversalRouter(routes);
