import { createStyles } from "../design-system/utils";

export default createStyles({
  THEME1: (theme) => ({
    app: {
      textAlign: "center",
      backgroundColor: theme.palette.background.default,
    },
    appHeader: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "white",
      ...theme.typography.h1,
    },
    appLink: {
      color: theme.palette.primary.main,
    },
  }),
  THEME2: (theme) => ({
    app: {
      textAlign: "center",
      backgroundColor: "green",
    },
    logo: {
      height: "40vmin",
      pointerEvents: "none",
      paddingTop: "1000px",
    },
    appHeader: {
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      color: "black",
      ...theme.typography.h1,
    },
    appLink: {
      color: "yellow",
    },
  }),
});
