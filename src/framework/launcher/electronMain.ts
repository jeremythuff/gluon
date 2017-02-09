/// <reference path="./../../../typings/globals/github-electron/index.d.ts" />
/// <reference path="./../../../typings/globals/node/index.d.ts" />

import { app,BrowserWindow } from 'electron';
import ElectronLauncher from './electronLauncher';

ElectronLauncher.main(app,BrowserWindow);