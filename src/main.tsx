import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AdaptivityProvider, ConfigProvider } from "@vkontakte/vkui";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <ConfigProvider>
      <AdaptivityProvider>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </AdaptivityProvider>
    </ConfigProvider>
  </QueryClientProvider>
);
