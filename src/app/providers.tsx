"use client";

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
type Props = {
  children: React.ReactNode;
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error, query) => {
      alert(`Error Occurred in ${query.queryKey}: ${error.message}`);
    },
  }),
});

export default function Providers({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      {children}
    </QueryClientProvider>
  );
}
