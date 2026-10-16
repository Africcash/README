import { apiClient } from "@/lib/api/client"
import type { FileUploadResponse } from "@/lib/api/types"

export function uploadFile(file: File) {
  const formData = new FormData()
  formData.append("file", file)

  return apiClient
    .post<FileUploadResponse>("/upload/", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
    .then((res) => res.data)
}
