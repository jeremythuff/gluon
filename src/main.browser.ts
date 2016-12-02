import './polyfills.browser';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GluonEngine } from './app/gluon-engine';

export const platformRef = platformBrowserDynamic();

export function main() {
  return platformRef.bootstrapModule(GluonEngine)
    .catch(err => console.error(err));
}

// support async tag or hmr
switch (document.readyState) {
  case 'interactive':
  case 'complete':
    main();
    break;
  case 'loading':
  default:
    document.addEventListener('DOMContentLoaded', () => main());
}
