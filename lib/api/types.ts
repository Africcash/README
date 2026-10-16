// Types generated from https://api.africcash.com/api/schema/ (OpenAPI 3.0.3)

export type StatusEnum =
  | "INITIATED"
  | "FUNDED"
  | "CASH_PENDING"
  | "CASH_CONFIRMED"
  | "RELEASED"
  | "CANCELLED"
  | "REFUNDED"
  | "DISPUTED"

export interface AgentProfile {
  id: number
  stellar_address: string
  name: string
  avatar_url?: string
  phone?: string
  email?: string
  address_text: string
  city: string
  country: string
  latitude?: string | null
  longitude?: string | null
  supported_currencies?: unknown
  exchange_rates?: unknown
  available_services?: unknown
  handover_methods?: unknown
  operating_hours?: string
  fee_percentage?: string
  is_available?: boolean
  is_verified?: boolean
  reputation_score: string
  completed_trades: number
  review_count: number
  min_usdc_amount?: string
  max_usdc_amount?: string
  created_at: string
  updated_at: string
}

export interface AgentProfileRequest {
  stellar_address: string
  name: string
  avatar_url?: string
  phone?: string
  email?: string
  address_text: string
  city: string
  country: string
  latitude?: string | null
  longitude?: string | null
  supported_currencies?: unknown
  exchange_rates?: unknown
  available_services?: unknown
  handover_methods?: unknown
  operating_hours?: string
  fee_percentage?: string
  is_available?: boolean
  is_verified?: boolean
  min_usdc_amount?: string
  max_usdc_amount?: string
}

export type PatchedAgentProfileRequest = Partial<AgentProfileRequest>

export interface AgentReview {
  id: number
  agent_id: number
  user_address: string
  rating: number
  comment?: string
  created_at: string
}

export interface ReviewCreateRequest {
  rating: number
  comment?: string
}

export interface CancelExchangeRequest {
  tx_hash?: string
  reason?: string
}

export interface Config {
  network_passphrase: string
  rpc_url: string
  horizon_url: string
  usdc_contract_id: string
  escrow_contract_id: string
}

export interface ConfirmCashRequest {
  secret?: string
}

export interface DisputeExchangeRequest {
  reason: string
}

export interface Exchange {
  id: number
  exchange_id: number
  user_address: string
  user_display_name: string
  user_avatar_url: string
  agent_id: number
  agent_name: string
  agent_address: string
  agent_avatar_url: string
  agent_phone: string
  agent_location: string
  usdc_amount: string
  fiat_currency: string
  exchange_rate: string
  fiat_amount: string
  secret: string
  secret_hash: string
  status: StatusEnum
  escrow_contract_id: string
  token_address: string
  lock_tx_hash: string | null
  release_tx_hash: string | null
  refund_tx_hash: string | null
  timeout_timestamp: number
  cancellation_reason: string
  notes: string
  review: AgentReview
  created_at: string
  updated_at: string
}

export interface ExchangeCreateRequest {
  agent_id: number
  usdc_amount: string
  fiat_currency: string
  notes?: string
}

export interface FileUploadRequestRequest {
  file: File
}

export interface FileUploadResponse {
  url: string
  object_key: string
  content_type: string
  size: number
}

export interface NotifyFundedRequest {
  tx_hash: string
  contract_id?: string
}

export interface NotifyReleasedRequest {
  tx_hash: string
}

export interface PatchedWalletMeUpdateRequest {
  display_name?: string
  avatar_url?: string
}

export interface WalletChallengeRequestRequest {
  stellar_address: string
}

export interface WalletChallengeResponse {
  stellar_address: string
  nonce: string
  timestamp: number
  message: string
  expires_in: number
}

export interface WalletMeResponse {
  stellar_address: string
  display_name?: string
  avatar_url?: string
  is_agent: boolean
  agent_id: number | null
}

export interface WalletVerifyRequestRequest {
  stellar_address: string
  nonce: string
  signature: string
}

export interface WalletVerifyResponse {
  token: string
  stellar_address: string
  display_name?: string
  avatar_url?: string
  is_agent: boolean
}

export interface AgentListParams {
  available?: boolean
  city?: string
  currency?: string
  ordering?: string
  search?: string
  verified?: boolean
}

export interface AgentReviewListParams {
  ordering?: string
  search?: string
}

export interface ExchangeListParams {
  ordering?: string
  search?: string
}
