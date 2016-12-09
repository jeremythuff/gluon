import './polyfills.browser';
import { NgModuleRef } from '@angular/core';
import { GluonEngineModule } from './app/gluon-engine.module';
export declare function main(): Promise<void | NgModuleRef<GluonEngineModule>>;
export { NgModule as GluonGame } from "@angular/core";
export * from "./app/gluon-engine.module";
