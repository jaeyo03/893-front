import { addScrap, removeScrap } from "@/lib/api/auction";
import { useMutation } from "@tanstack/react-query";

export function useAddScrap() {
  return useMutation({
    mutationFn: (auctionId: number) => {
      return addScrap(auctionId);
    },
  })
}

export function useDeleteScrap() {
  return useMutation({
    mutationFn: (auctionId: number) => {
      return removeScrap(auctionId);
    },
  })
}