import React from "react";
import {unstable_createRoot as createRoot} from 'react-dom'

import App from "./App";

const root = document.getElementById("root") as HTMLElement;
createRoot(root).render(<App />);