import './polyfills.browser';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { GluonRendererModule } from './app/renderer/gluon-renderer.module';

export const platformRef = platformBrowserDynamic();

export function main() {
  return platformRef.bootstrapModule(GluonRendererModule)
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

export { NgModule as GluonGame } from "@angular/core";
export * from "./app/gluon-engine.module"; 