# Showcase LeKinff

Ce projet est un **SPA (Single Page Application)** construit avec **Vite.js**, utilisant **Universal Router**, du **Vanilla JS**, des **Web Components**, et des contrôleurs JS personnalisés.  
Il communique avec une API Node.js/Express et une base de données.  

---

## 🌱 Environnement de développement

- **Frontend** :  
  - Vite.js  
  - Universal Router  
  - Vanilla JS + Web Components  
  - Fichiers `controllers/`, `services/`, `views/`
  
- **API locale** :  
  - Node.js  
  - Express  
  - Sequelize  
  - MySQL (avec PhpMyAdmin comme SGBD)

- **Base de données locale** :  
  - MySQL  

---

## ⚡ Préproduction

- **Frontend** :  
  - Hébergé sur **Vercel**  
  - `vercel.json` pour le routing SPA  
  - Build généré par Vercel au déploiement (pas de dossier `dist` dans le repo)

- **API** :  
  - Hébergée sur **Render**  
  - URL : [https://render-showcase-express.onrender.com/](https://render-showcase-express.onrender.com/)  
  - Variables d'environnement configurées via Render

- **Base de données** :  
  - PostgreSQL sur **Neon** (SGBD en ligne)

---

## 🚀 Production (prévue)

- **Frontend** :  
  - Build Vite.js livré sur l’hébergement choisi par le client

- **API** :  
  - API Render (production Ready)

- **Base de données** :  
  - Base PostgreSQL Neon  

---

## 🛠️ Déploiement

### Développement local
```bash
npm install
npm run dev
```

### Liens utiles

https://dashboard.render.com/dashboard
https://github.com/tKlancelot/showcase-lekinff
https://showcase-lekinff.vercel.app/
https://console.neon.tech/app/projects/sparkling-shape-89363079?database=neondb