import { NeynarContextProvider, Theme } from "@neynar/react";
import "@neynar/react/dist/style.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
<NeynarContextProvider
  settings={{
    clientId: import.meta.env.VITE_NEYNAR_CLIENT_ID,
    defaultTheme: Theme.Light,
    eventsCallbacks: {
      onAuthSuccess: ({ user }) => {
        console.log("Auth success", user);
      },
      onSignout: (user) => {
        console.log("Signed out", user);
      },
    },
  }}
>

      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </NeynarContextProvider>
  </StrictMode>
);
