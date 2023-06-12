import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import Example from "./Example";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
}
