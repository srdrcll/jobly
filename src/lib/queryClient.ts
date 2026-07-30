import { QueryClient } from '@tanstack/react-query';
import { handleDatabaseError } from './errors';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes stale time
      gcTime: 1000 * 60 * 15, // 15 minutes cache time
      refetchOnWindowFocus: false,
      retry: (failureCount, error) => {
        const appErr = handleDatabaseError(error);
        // Do not retry on permission errors or 404s
        if (appErr.isPermissionError || appErr.code === 'PGRST116') {
          return false;
        }
        return failureCount < 2;
      },
    },
    mutations: {
      retry: false,
    },
  },
});
