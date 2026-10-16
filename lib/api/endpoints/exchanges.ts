import { apiClient } from "@/lib/api/client"
import type {
  Exchange,
  ExchangeCreateRequest,
  ExchangeListParams,
  CancelExchangeRequest,
  ConfirmCashRequest,
  DisputeExchangeRequest,
  NotifyFundedRequest,
  NotifyReleasedRequest,
  ReviewCreateRequest,
  AgentReview,
} from "@/lib/api/types"

export function listExchanges(params?: ExchangeListParams) {
  return apiClient
    .get<Exchange[]>("/exchanges/", { params })
    .then((res) => res.data)
}

export function createExchange(data: ExchangeCreateRequest) {
  return apiClient
    .post<Exchange>("/exchanges/", data)
    .then((res) => res.data)
}

export function getExchange(id: number) {
  return apiClient.get<Exchange>(`/exchanges/${id}/`).then((res) => res.data)
}

export function cancelExchange(id: number, data?: CancelExchangeRequest) {
  return apiClient
    .post<Exchange>(`/exchanges/${id}/cancel/`, data)
    .then((res) => res.data)
}

export function confirmCash(id: number, data?: ConfirmCashRequest) {
  return apiClient
    .post<Exchange>(`/exchanges/${id}/confirm-cash/`, data)
    .then((res) => res.data)
}

export function disputeExchange(id: number, data: DisputeExchangeRequest) {
  return apiClient
    .post<Exchange>(`/exchanges/${id}/dispute/`, data)
    .then((res) => res.data)
}

export function notifyFunded(id: number, data: NotifyFundedRequest) {
  return apiClient
    .post<Exchange>(`/exchanges/${id}/notify-funded/`, data)
    .then((res) => res.data)
}

export function notifyReleased(id: number, data: NotifyReleasedRequest) {
  return apiClient
    .post<Exchange>(`/exchanges/${id}/notify-released/`, data)
    .then((res) => res.data)
}

export function reviewExchange(id: number, data: ReviewCreateRequest) {
  return apiClient
    .post<AgentReview>(`/exchanges/${id}/review/`, data)
    .then((res) => res.data)
}
