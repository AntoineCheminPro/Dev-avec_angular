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

You are now ready to implement the requested features.

Good luck!