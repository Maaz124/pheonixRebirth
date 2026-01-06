import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navigation } from "@/components/navigation";
import Home from "@/pages/home";
import Phase from "@/pages/phase";
import Resources from "@/pages/resources";
import Journal from "@/pages/journal";
import Pricing from "@/pages/pricing";
import Subscribe from "@/pages/subscribe";
import Landing from "@/pages/landing";
import Blog from "@/pages/blog";
import LeadMagnet from "@/pages/lead-magnet";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import { AuthProvider } from "@/hooks/use-auth";
import { ProtectedRoute } from "@/lib/protected-route";

function Router() {
  return (
    <div className="min-h-screen phoenix-bg-neutral">
      <Navigation />
      <Switch>
        <Route path="/" component={Landing} />
        <Route path="/auth" component={AuthPage} />

        <ProtectedRoute path="/dashboard" component={Home} />
        <ProtectedRoute path="/phase/:phaseId" component={Phase} />
        <ProtectedRoute path="/phases" component={Home} />
        <ProtectedRoute path="/resources" component={Resources} />
        <ProtectedRoute path="/journal" component={Journal} />
        <ProtectedRoute path="/subscribe" component={Subscribe} />

        <Route path="/pricing" component={Pricing} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:slug" component={Blog} />
        <Route path="/assessment" component={LeadMagnet} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
