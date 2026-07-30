export interface LoadingState {
  isLoading: boolean;
  isFetching: boolean;
  isMutating: boolean;
}

export function combineLoadingStates(...states: boolean[]): boolean {
  return states.some(Boolean);
}
