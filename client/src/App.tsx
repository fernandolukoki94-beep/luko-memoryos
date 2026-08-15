import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import GamePage from "@/pages/GamePage";
import { Route, Router as WouterRouter, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { MemoriesProvider } from "./contexts/MemoriesContext";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";
import RexLanding from "./pages/RexLanding";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import ProfileTimeline from "./pages/ProfileTimeline";
import Feed from "./pages/Feed";
import Vault from "./pages/Vault";
import Chat from "./pages/Chat";
import RexOperations from "./pages/RexOperations";


function Router() {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <WouterRouter base={basePath}>
      <Switch>
      <Route path={"/"} component={RexLanding} />
      <Route path={"/memoryos"} component={LandingPage} />
      <Route path={"/home"} component={Home} />
      <Route path={"/game"} component={GamePage} />
      <Route path={"/auth"} component={Auth} />
      <Route path={"/profile/:id"} component={Profile} />
      <Route path={"/timeline/:id"} component={ProfileTimeline} />
      <Route path={"/feed"} component={Feed} />
      <Route path={"/vault"} component={Vault} />
      <Route path={"/chat"} component={Chat} />
      <Route path={"/rex"} component={RexOperations} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
        <Route component={NotFound} />
      </Switch>
    </WouterRouter>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <MemoriesProvider>
          <ThemeProvider
            defaultTheme="light"
            // switchable
          >
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </ThemeProvider>
        </MemoriesProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
