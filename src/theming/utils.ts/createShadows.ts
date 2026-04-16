import type { Shadows } from "@mui/material";

function createShadows(shadows: string[]): Shadows {
  return [...shadows] as Shadows;
}

export default createShadows;
