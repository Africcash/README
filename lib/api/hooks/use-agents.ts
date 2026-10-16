"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import {
  createAgent,
  deleteAgent,
  getAgent,
  getAgentStats,
  getMyAgentProfile,
  listAgentReviews,
  listAgents,
  patchAgent,
  patchMyAgentProfile,
  updateAgent,
  updateMyAgentProfile,
} from "@/lib/api/endpoints/agents"
import { queryKeys } from "@/lib/api/query-keys"
import type {
  AgentListParams,
  AgentProfileRequest,
  AgentReviewListParams,
  PatchedAgentProfileRequest,
} from "@/lib/api/types"

export function useAgents(params?: AgentListParams) {
  return useQuery({
    queryKey: queryKeys.agents.list(params),
    queryFn: () => listAgents(params),
  })
}

export function useAgent(id: number, enabled = true) {
  return useQuery({
    queryKey: queryKeys.agents.detail(id),
    queryFn: () => getAgent(id),
    enabled,
  })
}

export function useAgentReviews(id: number, params?: AgentReviewListParams) {
  return useQuery({
    queryKey: queryKeys.agents.reviews(id, params),
    queryFn: () => listAgentReviews(id, params),
  })
}

export function useMyAgentProfile(enabled = true) {
  return useQuery({
    queryKey: queryKeys.agents.me,
    queryFn: getMyAgentProfile,
    enabled,
  })
}

export function useAgentStats(enabled = true) {
  return useQuery({
    queryKey: queryKeys.agents.stats,
    queryFn: getAgentStats,
    enabled,
  })
}

export function useCreateAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgentProfileRequest) => createAgent(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] })
    },
  })
}

export function useUpdateAgent(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgentProfileRequest) => updateAgent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agents.detail(id) })
    },
  })
}

export function usePatchAgent(id: number) {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PatchedAgentProfileRequest) => patchAgent(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agents.detail(id) })
    },
  })
}

export function useDeleteAgent() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => deleteAgent(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["agents"] })
    },
  })
}

export function useUpdateMyAgentProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: AgentProfileRequest) => updateMyAgentProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agents.me })
    },
  })
}

export function usePatchMyAgentProfile() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PatchedAgentProfileRequest) => patchMyAgentProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.agents.me })
    },
  })
}
