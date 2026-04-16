import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import PlatformTheme from "./theming/PlatformTheme";

function App() {
  return (
    <PlatformTheme>
      <Routes>
        <Route path="/" element={<Navigate to="/theme1-app" replace />} />
        <Route path="/theme1-app" element={<Main />} />
        <Route path="/theme2-app" element={<Main />} />
      </Routes>
    </PlatformTheme>
  );
}

export default App;
