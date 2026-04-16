import makeStyles from "./Main.styles";

const useStyles = makeStyles({ name: { Main } });

function Main() {
  const { classes } = useStyles();
  return (
    <div className={classes.app}>
      <header className={classes.appHeader}>
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={classes.appLink}
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>Welcome to the Main page!</p>
      </header>
    </div>
  );
}

export default Main;
