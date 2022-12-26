# Server-side rendering App with React Router, Express.js and lambda implementation

*Published February 22, 2019*

This App implements the server-side rendering App using React Router, express and the lamba for AWS. Thanks [Zac Fukuda](https://www.mokuji.me/article/universal-app-react-router) for the inputs! :)

## Features
1. **Centralized Routes**

	With the support of [React Router Config](https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config), all routes are managed in `src/routes.js`, and the rendering code was optimized. This also enables us to render data components on the server.

2. **Server-side Rendering with Fetch Data**

	Rather than the data are pre-defined as a variable inside Javascript file, the app fetches data which is saved as in JSON file and renders data component on both front and server side.

## Pages
The application has the following pages.
- Home [/]
- LPs [/lps]
	- List of LPs [/lps]
	- LP Detail [/lps/:slug]
- EPs (Redirect to LPs) [/eps]
- 404 [/foo]

## Scripts
This project was initialized with [create-react-app](https://github.com/facebookincubator/create-react-app). However, some modifications have been done in order to make it universal.

- **start**: Start the app as a single-page client-side app.

- **start-babel**: Start the app as a single-page client-side app, with babel-node.

- **build**: Build the production files based on the client-side app. In addition to the default `react-scripts` task, this generates an `index.ejs` based on the `index.html`.

- **test**: Launches the test runner in the interactive watch mode.

- **eject**: This command will remove the single build dependency from your project.

- **pack**: This command will call the webpack with the configuration written into webpack.config.js.

- **babel**: This command will call babel for all the sources into ./src and will output to ./views.

- **clean**: This command will remove all the contents and directories in ./build and ./views.

- **reset**: This command will do a clean plus will remove all the node modules.

- **watch**: Build non-hashed Javascript and CSS files, watching the file changes.

- **server**: Run the production app.

- **server-dev**: Run the development app, serving the `index.ejs` from `view` directory. Non-hashed files must be built with `watch` before the initial run.

- **server-dev:watch**: Run the development app with generating non-hashed files as watching file changes. Usually this script is to be used instead of `watch` and `server-dev` when you develop the server-side application.

## Use
Clone the repo and change the working directory:
```bash
$ git clone https://github.com/fabrizioromanelli/ssr-lambda
$ cd ssr-lambda
```
Install the packages:
```bash
$ yarn
// Or if you use npm (but you actually [don't want](https://hackernoon.com/im-harvesting-credit-card-numbers-and-passwords-from-your-site-here-s-how-9a8cb347c5b5) to use it):
$ npm install
```

### Client-side Single Page App
To develop as a client-side single-page app:
```bash
$ yarn start
```
The command will open the browser navigating to [localhost:3000](http://localhost:3000) and the browser will be refreshed  every time you modify the files under `src` directory.

### Server-side and client-side App
To develop as a server-side & client-side rendered page, just build & run the app:
```bash
$ yarn build
$ yarn server
```

Visit [localhost:3000](http://localhost:3000) and the source of the home page. You’ll see the all contents are rendered on the server.

### Server-side Development
Build & watch file changes:
```bash
$ yarn watch
```

Run the app in the development mode:
```bash
$ yarn server-dev
```

Run the two command above in parallel:
```bash
$ yarn server-dev:watch
```

## TODOs
1. **Rendering twice**

	The App is made to use the same code for both client and server side. However this can cause strange behaviors like the following: the app renders the component on the server-side, and after the HTML delivered to the client, the app will re-render the components that have been already rendered. This also means that the app will fetch the data twice, one on the server and another on the browser. This has to be fixed.

2. **Fetching the same data multiple times**

	Every time the user navigates from a page where some data is fetched, and then back to that page again, the app will try to fetch the data again and again. This also has to be fixed.
