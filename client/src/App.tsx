import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import IntegratedHome from "./pages/IntegratedHome";
import RexOperations from "./pages/RexOperations";


function Router() {
  return (
    <Switch>
      <Route path={"/"} component={IntegratedHome} />
      <Route path={"/rex"} component={RexOperations} />
      <Route component={IntegratedHome} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <Router />
    </ErrorBoundary>
  );
}

export default App;
