import { apiClient } from "@/lib/api/client"
import type {
  WalletChallengeRequestRequest,
  WalletChallengeResponse,
  WalletVerifyRequestRequest,
  WalletVerifyResponse,
  WalletMeResponse,
  PatchedWalletMeUpdateRequest,
} from "@/lib/api/types"

export function requestChallenge(data: WalletChallengeRequestRequest) {
  return apiClient
    .post<WalletChallengeResponse>("/auth/challenge/", data)
    .then((res) => res.data)
}

export function verifyChallenge(data: WalletVerifyRequestRequest) {
  return apiClient
    .post<WalletVerifyResponse>("/auth/verify/", data)
    .then((res) => res.data)
}

export function getMe() {
  return apiClient.get<WalletMeResponse>("/auth/me/").then((res) => res.data)
}

export function updateMe(data: PatchedWalletMeUpdateRequest) {
  return apiClient
    .patch<WalletMeResponse>("/auth/me/", data)
    .then((res) => res.data)
}
