# Le Chêne et ses racines

Un site vitrine performant construit avec Next.js pour présenter l'association **Le Chêne et ses racines**, ses actions et ses contacts officiels.

## Fonctionnalités clés
- **Accueil éditorialisé.** La page d'accueil combine un résumé de la mission de l'association, un carrousel de photos optimisées avec `next/image`, un bloc de contact rapide et la liste des financeurs, tout en mettant en avant les différentes sections éditoriales du site.
- **Sections thématiques structurées.** Chaque service ou valeur de l'association possède sa propre page dans `src/app/sections`, avec des métadonnées consommées pour générer automatiquement l'index et les cartes d'aperçu sur la page d'accueil.
- **Page équipe.** Un gabarit dédié présente les membres de l'équipe avec des visuels distants optimisés et un layout responsive pour les écrans haute densité.
- **Contact détaillé.** Un formulaire côté client prépare un e-mail pré-rempli, affiche une carte Google Maps embarquée, précise les horaires d'ouverture et les informations d'accès depuis la gare.
- **Méta-données globales.** Le layout racine configure les métadonnées du site, intègre le flux RSS et applique les styles Tailwind globaux, garantissant une base solide pour le SEO et les partages sociaux.

## Pile technique
- [Next.js 14](https://nextjs.org/) et [React 18](https://react.dev/) pour le rendu hybride et les performances web modernes.
- [TypeScript 5](https://www.typescriptlang.org/) pour la robustesse du typage sur l'ensemble du projet.
- [Tailwind CSS 4](https://tailwindcss.com/) et [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) pour le design responsive.
- [next-themes](https://github.com/pacocoursey/next-themes) pour la gestion du thème et la synchronisation avec les préférences système.

## Prise en main
1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Créez un fichier `.env.local` à la racine et définissez l'URL publique utilisée pour générer le flux RSS :
   ```env
   NEXT_PUBLIC_SITE_URL=https://example.com
   ```
3. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
4. Ouvrez [http://localhost:3000](http://localhost:3000) pour consulter le site.

> ℹ️ Next.js 14 requiert Node.js 18.17 ou supérieur pour compiler et exécuter le projet.

## Scripts disponibles
- `npm run dev` : lance le serveur de développement Next.js.
- `npm run build` : génère la version optimisée pour la production.
- `npm run start` : démarre le serveur en mode production après un build.
- `npm run lint` : exécute les règles ESLint configurées par Next.js.

## Organisation du code
- `src/app` contient les routes Next.js, dont la page d'accueil (`page.tsx`), l'index des sections et les sous-pages dédiées à chaque service.
- `src/components` regroupe les composants partagés (layout, cartes, typographie, icônes).
- `src/lib` rassemble les utilitaires côté serveur, notamment l'agrégation des contenus de sections.
- `src/images` stocke les visuels locaux utilisés par la page d'accueil.

## Déploiement
Le projet est prêt pour une mise en production sur [Vercel](https://vercel.com/) ou tout environnement supportant Next.js 14. Utilisez `npm run build` suivi de `npm run start` pour vérifier l'artefact avant déploiement. Pensez à renseigner `NEXT_PUBLIC_SITE_URL` dans les variables d'environnement de l'hébergeur afin de garantir un flux RSS valide.
