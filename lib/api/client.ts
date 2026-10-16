import axios from "axios"
const TOKEN_STORAGE_KEY = "africash_token"
const authListeners = new Set<() => void>()

export function subscribeAuthToken(callback: () => void): () => void {
  authListeners.add(callback)
  return () => {
    authListeners.delete(callback)
  }
}

if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (e.key === TOKEN_STORAGE_KEY) {
      authListeners.forEach((l) => l())
    }
  })
}

export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(TOKEN_STORAGE_KEY)
}

export function setAuthToken(token: string | null): void {
  if (typeof window === "undefined") return
  if (token) {
    window.localStorage.setItem(TOKEN_STORAGE_KEY, token)
  } else {
    window.localStorage.removeItem(TOKEN_STORAGE_KEY)
  }
  authListeners.forEach((l) => l())
}

export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api",
})

apiClient.interceptors.request.use((config) => {
  const token = getAuthToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      axios.isAxiosError(error) &&
      (error.response?.status === 401 || (error.response?.status === 403 && Boolean(getAuthToken())))
    ) {
      setAuthToken(null)
    }
    return Promise.reject(error)
  }
)
