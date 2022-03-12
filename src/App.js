import { BrowserRouter } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBounday";
import Pages from "./pages";
import { StateProvider, store } from "./store";
import { createTheme, ThemeProvider } from "@mui/material";

const THEME = createTheme({
  typography: {
    "fontFamily": `"Nunito", "Roboto", "Helvetica", "Arial", sans-serif`,
    "fontWeightLight": 500
  }
});

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL} >
      <ErrorBoundary>
        <ThemeProvider theme={THEME} >
          <StateProvider store={store} >
            <Pages />
          </StateProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
