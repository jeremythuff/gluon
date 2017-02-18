#!/usr/bin/env node

"use strict";

import * as shelljs from "shelljs";
import * as path from 'path';

const nodecli = require("shelljs-nodecli");

const execustionPath = path.resolve("node_modules", "gluon-engine", "dist", "util", "Launcher.js");
const mainJsPath = path.resolve(process.cwd(), process.argv[2]);
const mainHtmlPath = `${__dirname}/../main.html`;

shelljs.sed("-i", "{MAIN_JS}", mainJsPath, mainHtmlPath);

nodecli.exec("electron", execustionPath + " " + mainHtmlPath);