"use client"

import axios from "axios"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { setAuthToken } from "@/lib/api/client"
import { getConfig } from "@/lib/api/endpoints/config"
import { getMe, requestChallenge, updateMe, verifyChallenge } from "@/lib/api/endpoints/auth"
import { queryKeys } from "@/lib/api/query-keys"
import type { PatchedWalletMeUpdateRequest, WalletVerifyResponse } from "@/lib/api/types"
import { connectWallet, disconnectWallet, signWalletMessage } from "@/lib/wallet/kit"

export function useAuthMe(enabled = true) {
  return useQuery({
    queryKey: queryKeys.auth.me,
    queryFn: getMe,
    enabled,
    retry: (failureCount, error) => {
      if (
        axios.isAxiosError(error) &&
        (error.response?.status === 401 || error.response?.status === 403)
      ) {
        return false
      }
      return failureCount < 2
    },
  })
}

export function useRequestChallenge() {
  return useMutation({
    mutationFn: requestChallenge,
  })
}

export function useVerifyChallenge() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: verifyChallenge,
    onSuccess: (data: WalletVerifyResponse) => {
      setAuthToken(data.token)
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
    },
  })
}

/** Connects a Stellar wallet via Stellar Wallets Kit, then runs the challenge/verify handshake. */
export function useWalletSignIn() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (walletId: string) => {
      const [address, config] = await Promise.all([connectWallet(walletId), getConfig()])
      const challenge = await requestChallenge({ stellar_address: address })
      const signature = await signWalletMessage(challenge.message, {
        address,
        networkPassphrase: config.network_passphrase,
      })
      return verifyChallenge({
        stellar_address: address,
        nonce: challenge.nonce,
        signature,
      })
    },
    onSuccess: (data: WalletVerifyResponse) => {
      setAuthToken(data.token)
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
    },
  })
}

export function useUpdateMe() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: PatchedWalletMeUpdateRequest) => updateMe(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
    },
  })
}

export function useLogout() {
  const queryClient = useQueryClient()

  return () => {
    setAuthToken(null)
    void disconnectWallet()
    queryClient.invalidateQueries({ queryKey: queryKeys.auth.me })
  }
}
