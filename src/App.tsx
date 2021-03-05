import React from "react";
import { RecoilRoot } from "recoil";

import Home from "views/Home";

function App() {
  return (
    <RecoilRoot>
      <Home />
    </RecoilRoot>
  );
}

export default App;
