import axios from "axios"

/** Extracts a safe, user-facing message from an API error without leaking internals. */
export function getErrorMessage(error: unknown, fallback = "Something went wrong. Please try again."): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data as { detail?: string; message?: string } | undefined
    if (typeof data?.detail === "string") return data.detail
    if (typeof data?.message === "string") return data.message

    if (error.response?.status === 401) return "Your session has expired. Please reconnect your wallet."
    if (error.response?.status === 403) return "You don't have permission to do that."
    if (error.response?.status === 404) return "We couldn't find what you were looking for."
    if (!error.response) return "Network error. Check your connection and try again."
  }

  // Wallet SDK errors and plain Error instances both surface a "message" string.
  if (error instanceof Error && error.message) return error.message
  if (error && typeof error === "object" && "message" in error && typeof error.message === "string") {
    return error.message
  }

  return fallback
}
