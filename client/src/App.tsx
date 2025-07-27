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
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <div className="min-h-screen phoenix-bg-neutral">
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/phase/:phaseId" component={Phase} />
        <Route path="/phases" component={Home} />
        <Route path="/resources" component={Resources} />
        <Route path="/journal" component={Journal} />
        <Route path="/pricing" component={Pricing} />
        <Route path="/subscribe" component={Subscribe} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
