// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyArQi4dHbevB3YHZovzo2nYOM7kam0p7dA',
    authDomain: 'dhs-rotc-steak-sale-app.firebaseapp.com',
    databaseURL: 'https://dhs-rotc-steak-sale-app.firebaseio.com',
    projectId: 'dhs-rotc-steak-sale-app',
    storageBucket: 'dhs-rotc-steak-sale-app.appspot.com',
    messagingSenderId: '236784312343'
  }
};
