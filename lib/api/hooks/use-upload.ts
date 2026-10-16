"use client"

import { useMutation } from "@tanstack/react-query"
import { uploadFile } from "@/lib/api/endpoints/upload"

export function useUploadFile() {
  return useMutation({
    mutationFn: (file: File) => uploadFile(file),
  })
}
