import { Route, Routes } from "react-router-dom";

import DemoPage from "./pages/DemoPage";
import PlatformTheme from "./theming/PlatformTheme";

function App() {
  return (
    <PlatformTheme>
      <Routes>
        <Route path="/:appSlug/*" element={<DemoPage />} />
        <Route path="/" element={<DemoPage />} />
      </Routes>
    </PlatformTheme>
  );
}

export default App;
