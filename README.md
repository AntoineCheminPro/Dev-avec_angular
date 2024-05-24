# OlympicGamesStarter

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.6.

Don't forget to install your `node_modules` before starting (`npm install`).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Where to start

As you can see, an architecture has already been defined for the project. It is just a suggestion, you can choose to use your own. The predefined architecture includes (in addition to the default Angular architecture) the following:

- `components` folder: contains every reusable component
- `pages` folder: contains components used for routing
- `core` folder: contains the business logic (`services` and `models` folders)

I suggest you start by understanding this starter code. Pay extra attention to the `app-routing.module.ts` and the `olympic.service.ts`.

Once mastered, you should continue by creating the TypeScript interfaces inside the `models` folder. As you can see, I have already created two files corresponding to the data included inside the `olympic.json`. With your interfaces, improve the code by replacing every `any` with the corresponding interface.

## Improvements

### Home Component

The `HomeComponent` displays a chart of global statistics using the `ngx-charts` library. It aggregates data from all countries and presents it in a pie chart format.

**Example URL:** `http://localhost:4200/`

### Detail Component

The `DetailComponent` manages the display of statistics by country. It shows a line chart of the number of medals won by a specific country over the years.

**Example URL:** `http://localhost:4200/detail/:id` (replace `:id` with the actual country ID)

### Error Page

An error page has been added to handle incorrect URLs. It displays a user-friendly message indicating that the page was not found.

**Example URL:** `http://localhost:4200/error`


Good luck!

## VERSION française

OlympicGamesStarter
Ce projet a été généré avec Angular CLI version 17.3.6.

N'oubliez pas d'installer vos node_modules avant de commencer (npm install).

Serveur de développement
Exécutez ng serve pour démarrer un serveur de développement. Naviguez à l'adresse http://localhost:4200/. L'application se rechargera automatiquement si vous modifiez l'un des fichiers source.

### Construction
Exécutez ng build pour construire le projet. Les artefacts de construction seront stockés dans le répertoire dist/.

### Par où commencer
Comme vous pouvez le voir, une architecture a déjà été définie pour le projet. Ce n'est qu'une suggestion, vous pouvez choisir d'utiliser la vôtre. L'architecture prédéfinie inclut (en plus de l'architecture Angular par défaut) les éléments suivants :

* Dossier components : contient tous les composants réutilisables
* Dossier pages : contient les composants utilisés pour le routage
* Dossier core : contient la logique métier (dossiers services et models)

Je vous suggère de commencer par comprendre ce code de départ. Portez une attention particulière au app-routing.module.ts et au olympic.service.ts.

Une fois maîtrisé, vous devriez continuer en créant les interfaces TypeScript à l'intérieur du dossier models. Comme vous pouvez le voir, j'ai déjà créé deux fichiers correspondant aux données incluses dans le olympic.json. Avec vos interfaces, améliorez le code en remplaçant chaque any par l'interface correspondante.

### Améliorations
* Composant Home
Le HomeComponent affiche un graphique de statistiques globales en utilisant la bibliothèque ngx-charts. Il agrège les données de tous les pays et les présente sous forme de graphique en secteurs.

URL Exemple : http://localhost:4200/

* Composant Detail
Le DetailComponent gère l'affichage des statistiques par pays. Il affiche un graphique en ligne du nombre de médailles remportées par un pays spécifique au fil des années.

URL Exemple : http://localhost:4200/detail/:id (remplacez :id par l'identifiant réel du pays)

* Page d'erreur
Une page d'erreur a été ajoutée pour gérer les URLs incorrectes. Elle affiche un message convivial indiquant que la page n'a pas été trouvée.

URL Exemple : http://localhost:4200/error


Bonne chance !