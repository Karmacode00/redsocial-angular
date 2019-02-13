// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  firebase: {
    apiKey: 'AIzaSyCVN29mBYeEUXvjkpsB0T7R6EsbcTT4i-s',
    authDomain: 'redsocial-angular.firebaseapp.com',
    databaseURL: 'https://redsocial-angular.firebaseio.com',
    projectId: 'redsocial-angular',
    storageBucket: 'redsocial-angular.appspot.com',
    messagingSenderId: '226624692868'
  }
};

/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
