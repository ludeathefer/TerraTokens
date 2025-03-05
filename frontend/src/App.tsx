import { RouterProvider } from "react-router-dom";
import { router } from "./Router";
import { ThemeProvider } from "./components/theme-provider";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useStore } from "./hooks/use-store";

const httpLink = createHttpLink({
  uri: "http://localhost:8080/query",
});

const authLink = setContext((_, { headers }) => {
  const token = useStore.getState().jwt;
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
      <Toaster />
    </ApolloProvider>
  );
}

export default App;
