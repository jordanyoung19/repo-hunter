"use client"; // This directive makes the component a client component

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = new QueryClient(); // Create the QueryClient instance here

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

export default QueryProvider; 