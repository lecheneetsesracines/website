# Le Chêne et ses racines

Un site vitrine performant construit avec Next.js pour présenter l'association **Le Chêne et ses racines**, ses actions et ses contacts officiels.

## Fonctionnalités clés
- **Accueil éditorialisé.** La page d'accueil combine un résumé de la mission de l'association, un carrousel de photos optimisées avec `next/image`, un bloc de contact rapide et la liste des financeurs, tout en mettant en avant les différentes sections éditoriales du site.
- **Sections thématiques structurées.** Chaque service ou valeur de l'association possède sa propre page dans `src/app/sections`, avec des métadonnées consommées pour générer automatiquement l'index et les cartes d'aperçu sur la page d'accueil.
- **Page équipe.** Un gabarit dédié présente les membres de l'équipe avec des visuels distants optimisés et un layout responsive pour les écrans haute densité.
- **Contact détaillé.** Un formulaire côté client prépare un e-mail pré-rempli, affiche une carte Google Maps embarquée, précise les horaires d'ouverture et les informations d'accès depuis la gare.
- **Méta-données globales.** Le layout racine configure les métadonnées du site et applique les styles Tailwind globaux, garantissant une base solide pour le SEO et les partages sociaux.

## Pile technique
- [Next.js 16](https://nextjs.org/) et [React 19](https://react.dev/) pour le rendu hybride et les performances web modernes.
- [TypeScript 6](https://www.typescriptlang.org/) pour la robustesse du typage sur l'ensemble du projet.
- [Tailwind CSS 4](https://tailwindcss.com/) et [Tailwind Typography](https://tailwindcss.com/docs/typography-plugin) pour le design responsive.
- [next-themes](https://github.com/pacocoursey/next-themes) pour la gestion du thème et la synchronisation avec les préférences système.

## Prise en main
1. Installez les dépendances :
   ```bash
   npm install
   ```
2. Lancez le serveur de développement :
   ```bash
   npm run dev
   ```
3. Ouvrez [http://localhost:3000](http://localhost:3000) pour consulter le site.

> ℹ️ Le projet compile et s'exécute avec Next.js 16 sur Node.js 24 (`engines.node` vaut `24.x` dans `package.json`).

## Scripts disponibles
- `npm run dev` : lance le serveur de développement Next.js.
- `npm run build` : génère la version optimisée pour la production.
- `npm run start` : démarre le serveur en mode production après un build.
- `npm run lint` : exécute `eslint .` avec la configuration ESLint « flat » de `eslint.config.mjs`, construite sur les règles `core-web-vitals` de `eslint-config-next`.
- `npm run typecheck` : génère les types de Next.js (`next typegen`, qui écrit `next-env.d.ts`, ignoré par git) puis vérifie les types avec `tsc --noEmit`. Sur un clone neuf, un `tsc` lancé seul échoue sur chaque import d'image.
- `npm run test:unit` : lance les tests unitaires avec le lanceur intégré de Node (`node --test`).
- `npm run test:e2e` : construit le site sur le contenu figé `e2e/fixtures/content`, puis compare chaque page aux captures de référence de `e2e/__screenshots__/` (Playwright, Chromium, macOS). Le build laisse le contenu figé dans `.next` : relancez `npm run build` avant `npm run start` sur le vrai contenu.
- `npm run test:e2e:update` : régénère les captures de référence. À réserver à un changement visuel voulu et validé.

## Organisation du code
- `src/app` contient les routes Next.js, dont la page d'accueil (`page.tsx`), l'index des sections et les sous-pages dédiées à chaque service.
- `src/components` regroupe les composants partagés (layout, cartes, typographie, icônes).
- `src/lib` rassemble les utilitaires côté serveur, notamment l'agrégation des contenus de sections.
- `src/images` stocke les visuels locaux utilisés par la page d'accueil.

## Déploiement
Le projet est prêt pour une mise en production sur [Vercel](https://vercel.com/) ou tout environnement supportant Next.js 16 sur Node.js 24. Utilisez `npm run build` suivi de `npm run start` pour vérifier l'artefact avant déploiement.
