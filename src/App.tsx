import { Routes } from "react-router-dom";

import PlatformTheme from "./theming/PlatformTheme";

function App() {
  return (
    <PlatformTheme>
      <Routes></Routes>
    </PlatformTheme>
  );
}

export default App;
