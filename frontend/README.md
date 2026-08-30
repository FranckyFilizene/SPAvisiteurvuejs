# SPA Visiteur — Frontend (Vue 3 + Vite)

Single Page Application de gestion de visiteurs (connexion, inscription,
mot de passe oublié, tableau de bord) construite avec :

- **Vue 3** (composants Options API)
- **Vue Router 4** (routes protégées + page 404)
- **Tailwind CSS 4 + DaisyUI 5**
- **Axios** (instance centralisée `src/util/api.js`)
- **Chart.js** (graphique du tableau de bord)
- **oh-vue-icons** (icônes FontAwesome)

## Démarrer

```bash
cd frontend
npm install
npm run dev
```

Puis ouvrir http://localhost:5173

## Pages

| Route                  | Page                                              |
| ---------------------- | ------------------------------------------------- |
| `/`                    | Connexion                                         |
| `/inscription`         | Inscription                                       |
| `/mot-de-passe-oublie` | Mot de passe oublié                               |
| `/dashboard`           | Tableau de bord (protégé, stats + visiteurs)      |
| `/*`                   | Page 404                                          |

## Authentification

- Le token est stocké dans `localStorage` (« Se souvenir de moi » coché)
  ou `sessionStorage` (sinon), clé `user_token`.
- Les gardes du routeur (`src/util/router.js`) protègent `/dashboard`
  et redirigent vers le tableau de bord si l'utilisateur est déjà connecté.

## Mode démo (sans backend)

Par défaut, l'application appelle l'API définie dans `.env`
(`VITE_API_URL=http://localhost/Delegg-Hub/SPAvisiteurVuejs/Backend`).

Si le backend est **absent ou injoignable** (erreur réseau ou 404 du serveur
statique), l'application bascule automatiquement en **mode démo** :
les données sont conservées dans le `localStorage` du navigateur.

- Compte de démonstration : **admin@visiteur.com** / **admin123**
- Les comptes créés via la page d'inscription fonctionnent aussi en mode démo.
- Pour désactiver le mode démo, il suffit de mettre en place le backend
  avec les points d'entrée suivants :

| Méthode | Endpoint            | Description                      |
| ------- | ------------------- | -------------------------------- |
| POST    | `/login`            | Connexion                        |
| POST    | `/register`         | Inscription                      |
| POST    | `/forgot-password`  | Lien de réinitialisation         |
| GET     | `/visiteurs`        | Liste des visiteurs              |
| POST    | `/visiteurs`        | Créer un visiteur                |
| DELETE  | `/visiteurs/{id}`   | Supprimer un visiteur            |
| POST    | `/logout`           | Déconnexion                      |

## Structure

```
frontend/src/
├── forms/            # Pages d'authentification
│   ├── Login.vue
│   ├── Inscription.vue
│   └── forgot.vue
├── views/            # Pages applicatives
│   ├── Dashboard.vue
│   └── NotFound.vue
├── util/             # Outils partagés
│   ├── api.js        # Instance Axios (baseURL + token)
│   ├── auth.js       # Session + mode démo (localStorage)
│   ├── router.js     # Routes + gardes de navigation
│   └── icon.js       # Configuration des icônes
├── App.vue
├── main.js
└── style.css
```

