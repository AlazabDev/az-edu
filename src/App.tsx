import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/hooks/useAuth";
import ProtectedRoute from "@/components/ProtectedRoute";
import AppLayout from "./components/AppLayout";
import AuthPage from "./pages/AuthPage";
import Dashboard from "./pages/Dashboard";
import InboxPage from "./pages/InboxPage";
import ContactsPage from "./pages/ContactsPage";
import MediaPage from "./pages/MediaPage";
import ConversationsPage from "./pages/ConversationsPage";
import TemplatesPage from "./pages/TemplatesPage";
import FlowsPage from "./pages/FlowsPage";
import PhonesPage from "./pages/PhonesPage";
import WebhooksPage from "./pages/WebhooksPage";
import ApiKeysPage from "./pages/ApiKeysPage";
import MessagesPage from "./pages/MessagesPage";
import AddNumberPage from "./pages/AddNumberPage";
import DocsPage from "./pages/DocsPage";
import HelpPage from "./pages/HelpPage";
import TeamInboxPage from "./pages/TeamInboxPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route
              path="*"
              element={
                <ProtectedRoute>
                  <AppLayout>
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/inbox" element={<InboxPage />} />
                      <Route path="/contacts" element={<ContactsPage />} />
                      <Route path="/media" element={<MediaPage />} />
                      <Route path="/conversations" element={<ConversationsPage />} />
                      <Route path="/templates" element={<TemplatesPage />} />
                      <Route path="/flows" element={<FlowsPage />} />
                      <Route path="/phones" element={<PhonesPage />} />
                      <Route path="/webhooks" element={<WebhooksPage />} />
                      <Route path="/api-keys" element={<ApiKeysPage />} />
                      <Route path="/messages" element={<MessagesPage />} />
                      <Route path="/add-number" element={<AddNumberPage />} />
                      <Route path="/docs" element={<DocsPage />} />
                      <Route path="/help" element={<HelpPage />} />
                      <Route path="/team-inbox" element={<TeamInboxPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </AppLayout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
