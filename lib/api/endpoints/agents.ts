import { apiClient } from "@/lib/api/client"
import type {
  AgentProfile,
  AgentProfileRequest,
  PatchedAgentProfileRequest,
  AgentReview,
  AgentListParams,
  AgentReviewListParams,
} from "@/lib/api/types"

export function listAgents(params?: AgentListParams) {
  return apiClient
    .get<AgentProfile[]>("/agents/", { params })
    .then((res) => res.data)
}

export function createAgent(data: AgentProfileRequest) {
  return apiClient
    .post<AgentProfile>("/agents/", data)
    .then((res) => res.data)
}

export function getAgent(id: number) {
  return apiClient.get<AgentProfile>(`/agents/${id}/`).then((res) => res.data)
}

export function updateAgent(id: number, data: AgentProfileRequest) {
  return apiClient
    .put<AgentProfile>(`/agents/${id}/`, data)
    .then((res) => res.data)
}

export function patchAgent(id: number, data: PatchedAgentProfileRequest) {
  return apiClient
    .patch<AgentProfile>(`/agents/${id}/`, data)
    .then((res) => res.data)
}

export function deleteAgent(id: number) {
  return apiClient.delete<void>(`/agents/${id}/`).then((res) => res.data)
}

export function listAgentReviews(id: number, params?: AgentReviewListParams) {
  return apiClient
    .get<AgentReview[]>(`/agents/${id}/reviews/`, { params })
    .then((res) => res.data)
}

export function getMyAgentProfile() {
  return apiClient.get<AgentProfile>("/agents/me/").then((res) => res.data)
}

export function updateMyAgentProfile(data: AgentProfileRequest) {
  return apiClient
    .put<AgentProfile>("/agents/me/", data)
    .then((res) => res.data)
}

export function patchMyAgentProfile(data: PatchedAgentProfileRequest) {
  return apiClient
    .patch<AgentProfile>("/agents/me/", data)
    .then((res) => res.data)
}

export function getAgentStats() {
  return apiClient.get<AgentProfile>("/agents/stats/").then((res) => res.data)
}
