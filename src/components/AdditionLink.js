import {
    AppBar,
    Container,
    Toolbar,
  } from "@material-ui/core";
  import {
    createTheme,
    ThemeProvider,
  } from "@material-ui/core/styles";
  
  import ExchangeSidebar from "./ExchangeSidebar"
  
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });
  
  function AdditionLink() {
    // const classes = useStyles();

    return (
      <ThemeProvider theme={darkTheme}>
        <AppBar color="transparent" position="static">
          <Container style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center"
          }}>
            <Toolbar>
              <ExchangeSidebar />
            </Toolbar>
          </Container>
        </AppBar>
      </ThemeProvider>
    );
  }
  
  export default AdditionLink;
  