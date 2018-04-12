// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCdPZQTm5MZuKLRhg7b7hkssHdrkbU93IE',
    authDomain: 'mtg-stats.firebaseapp.com',
    databaseURL: 'https://mtg-stats.firebaseio.com',
    projectId: 'mtg-stats',
    storageBucket: '',
    messagingSenderId: '67448617703'
  }
};
