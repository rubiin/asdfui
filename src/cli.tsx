#!/usr/bin/env node
import React from "react";
import { render } from "ink";
import App from "./App.js";
import { clearConsole } from "@utils/helpers.js";

clearConsole();
render(<App />);
