import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "./components/AppLayout";
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
        <Routes>
          <Route path="/inbox" element={<InboxPage />} />
          <Route
            path="*"
            element={
              <AppLayout>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/contacts" element={<ContactsPage />} />
                  <Route path="/media" element={<MediaPage />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </AppLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
