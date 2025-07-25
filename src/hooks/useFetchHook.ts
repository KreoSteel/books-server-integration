import { useQuery } from "@tanstack/react-query";

export function useFetchHook<T>(data: string, queryKey: string[], loading: boolean = false) {
  if (loading) {
    return { data: [], isLoading: true }
  }
  return useQuery<T>({
    queryKey,
    queryFn: () =>
      fetch(`http://localhost:3000/${data}`).then(res => res.json()),
  });
}