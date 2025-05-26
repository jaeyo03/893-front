import { addScrap, removeScrap } from "@/lib/api/auction";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddScrap() {
  const queryClient = useQueryClient;
  return useMutation({
    mutationFn: (auctionId: number) => {
      return addScrap(auctionId);
    },
  })
}

export function useDeleteScrap() {
  const queryClient = useQueryClient;
  return useMutation({
    mutationFn: (auctionId: number) => {
      return removeScrap(auctionId);
    },
  })
}