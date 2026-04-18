import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Auth from "./pages/Auth";
import Feed from "./pages/Feed";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import BottomNav from "./components/BottomNav";

function Router() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-cyan-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-300 border-t-pink-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600 font-semibold">Carregando Luko Social...</p>
        </div>
      </div>
    );
  }

  if (!currentUser) {
    return <Auth />;
  }

  return (
    <>
      <Switch>
        <Route path="/" component={Feed} />
        <Route path="/chat" component={Chat} />
        <Route path="/profile" component={Profile} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
      <BottomNav />
    </>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
