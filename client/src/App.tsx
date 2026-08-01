import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { SupabaseAuthProvider } from "./contexts/SupabaseAuthContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import CommunityPage from "./pages/CommunityPage";
import ArticlesPage from "./pages/ArticlesPage";
import NewsPage from "./pages/NewsPage";
import KnowledgeBasePage from "./pages/KnowledgeBasePage";
import SearchPage from "./pages/SearchPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AIChatPage from "./pages/AIChatPage";
import ReportsPage from "./pages/ReportsPage";
import WorldMapPage from "./pages/WorldMapPage";
import MessagesPage from "./pages/MessagesPage";
import NotificationsPage from "./pages/NotificationsPage";
import AdminPage from "./pages/AdminPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

function Router() {
  return (
    <Switch>
      {/* Auth Routes */}
      <Route path={"/login"} component={LoginPage} />
      <Route path={"/register"} component={RegisterPage} />
      <Route path={"/forgot-password"} component={ForgotPasswordPage} />
      <Route path={"/reset-password"} component={ResetPasswordPage} />

      {/* Public Routes */}
      <Route path={"/"} component={HomePage} />
      <Route path={"/community"} component={CommunityPage} />
      <Route path={"/articles"} component={ArticlesPage} />
      <Route path={"/news"} component={NewsPage} />
      <Route path={"/knowledge-base"} component={KnowledgeBasePage} />
      <Route path={"/search"} component={SearchPage} />

      {/* Protected Routes */}
      <Route path={"/profile"}>
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      </Route>
      <Route path={"/settings"}>
        <ProtectedRoute>
          <SettingsPage />
        </ProtectedRoute>
      </Route>
      <Route path={"/ai-chat"}>
        <ProtectedRoute>
          <AIChatPage />
        </ProtectedRoute>
      </Route>
      <Route path={"/messages"}>
        <ProtectedRoute>
          <MessagesPage />
        </ProtectedRoute>
      </Route>
      <Route path={"/notifications"}>
        <ProtectedRoute>
          <NotificationsPage />
        </ProtectedRoute>
      </Route>
      <Route path={"/reports"}>
        <ProtectedRoute>
          <ReportsPage />
        </ProtectedRoute>
      </Route>
      <Route path={"/world-map"}>
        <ProtectedRoute>
          <WorldMapPage />
        </ProtectedRoute>
      </Route>
      <Route path={"/admin"}>
        <ProtectedRoute requiredRole="admin">
          <AdminPage />
        </ProtectedRoute>
      </Route>

      <Route path={"/404"} component={NotFoundPage} />
      {/* Final fallback route */}
      <Route component={NotFoundPage} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <SupabaseAuthProvider>
        <ThemeProvider defaultTheme="dark">
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </ThemeProvider>
      </SupabaseAuthProvider>
    </ErrorBoundary>
  );
}

export default App;
