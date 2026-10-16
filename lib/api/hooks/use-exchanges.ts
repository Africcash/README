"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  cancelExchange,
  confirmCash,
  createExchange,
  disputeExchange,
  getExchange,
  listExchanges,
  notifyFunded,
  notifyReleased,
  reviewExchange,
} from "@/lib/api/endpoints/exchanges"
import { queryKeys } from "@/lib/api/query-keys"
import type {
  CancelExchangeRequest,
  ConfirmCashRequest,
  DisputeExchangeRequest,
  ExchangeCreateRequest,
  ExchangeListParams,
  NotifyFundedRequest,
  NotifyReleasedRequest,
  ReviewCreateRequest,
} from "@/lib/api/types"

export function useExchanges(params?: ExchangeListParams) {
  return useQuery({
    queryKey: queryKeys.exchanges.list(params),
    queryFn: () => listExchanges(params),
  })
}

export function useExchange(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.exchanges.detail(id),
    queryFn: () => getExchange(id),
    enabled,
    refetchInterval: ({ state }) =>
      state.data && ["RELEASED", "CANCELLED", "REFUNDED", "DISPUTED"].includes(state.data.status)
        ? false
        : 3000,
  })
}

export function useCreateExchange() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ExchangeCreateRequest) => createExchange(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exchanges"] })
    },
  })
}

function invalidateExchange(id: number) {
  return (queryClient: ReturnType<typeof useQueryClient>) =>
    queryClient.invalidateQueries({ queryKey: queryKeys.exchanges.detail(id) })
}

export function useCancelExchange(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data?: CancelExchangeRequest) => cancelExchange(id, data),
    onSuccess: () => invalidateExchange(id)(queryClient),
  })
}

export function useConfirmCash(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data?: ConfirmCashRequest) => confirmCash(id, data),
    onSuccess: () => invalidateExchange(id)(queryClient),
  })
}

export function useDisputeExchange(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: DisputeExchangeRequest) => disputeExchange(id, data),
    onSuccess: () => invalidateExchange(id)(queryClient),
  })
}

export function useNotifyFunded(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: NotifyFundedRequest) => notifyFunded(id, data),
    onSuccess: () => invalidateExchange(id)(queryClient),
  })
}

export function useNotifyReleased(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: NotifyReleasedRequest) => notifyReleased(id, data),
    onSuccess: () => invalidateExchange(id)(queryClient),
  })
}

export function useReviewExchange(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: ReviewCreateRequest) => reviewExchange(id, data),
    onSuccess: () => invalidateExchange(id)(queryClient),
  })
}
