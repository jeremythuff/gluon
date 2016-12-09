import './polyfills.browser';

import { NgModuleRef } from '@angular/core'

import * as PlatformBrowserDynamics from '@angular/platform-browser-dynamic';
import { GluonEngineModule } from './app/gluon-engine.module';

export function main() {
  return PlatformBrowserDynamics.platformBrowserDynamic().bootstrapModule(GluonEngineModule)
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