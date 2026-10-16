"use client"

import { useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { AvatarComp } from "@/components/layouts/app/avatar-comp"
import { ErrorBanner } from "@/components/layouts/app/error-banner"
import { LoadingState } from "@/components/layouts/app/loading-state"
import { MobilePageHeader } from "@/components/layouts/app/mobile-page-header"
import { QueryErrorState } from "@/components/layouts/app/query-error-state"
import { Appimages } from "@/components/reuseables/app_images"
import { Button } from "@/components/ui/button"
import { Text } from "@/components/ui/text"
import { getErrorMessage } from "@/lib/api/error"
import { useAuthMe, useUpdateMe } from "@/lib/api/hooks/use-auth"
import { useUploadFile } from "@/lib/api/hooks/use-upload"

export default function EditProfilePage() {
  const router = useRouter()
  const me = useAuthMe()
  const updateMe = useUpdateMe()
  const uploadFile = useUploadFile()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [prevMe, setPrevMe] = useState(me.data)
  const [displayName, setDisplayName] = useState(me.data?.display_name ?? "")
  const [avatarUrl, setAvatarUrl] = useState(me.data?.avatar_url ?? "")

  if (me.data !== prevMe) {
    setPrevMe(me.data)
    setDisplayName(me.data?.display_name ?? "")
    setAvatarUrl(me.data?.avatar_url ?? "")
  }

  if (me.isLoading) {
    return <LoadingState label="Loading profile..." />
  }

  if (me.isError || !me.data) {
    return <QueryErrorState error={me.error} onRetry={() => me.refetch()} title="Couldn't load your profile" />
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    uploadFile.mutate(file, {
      onSuccess: (res) => setAvatarUrl(res.url),
    })
  }

  function handleSave() {
    updateMe.mutate(
      { display_name: displayName, avatar_url: avatarUrl },
      { onSuccess: () => router.push("/app/profile") }
    )
  }

  const saveButtonLabel = updateMe.isPending ? "Saving..." : "Save Changes"

  return (
    <div>
      <MobilePageHeader title="Edit Profile" />

      <Text size="sm" muted className="hidden md:block">
        Home / Profile / <span className="text-foreground">Edit Profile</span>
      </Text>

      <div className="mx-auto mt-8 flex max-w-md flex-col gap-6 pb-24 md:pb-0">
        <div className="flex flex-col items-center gap-3">
          <AvatarComp src={avatarUrl || Appimages.agentAvatarPlaceholder} alt={displayName || "You"} size="large" />
          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          <Button
            variant="outline"
            size="sm"
            className="rounded-full"
            disabled={uploadFile.isPending}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadFile.isPending ? "Uploading..." : "Change Photo"}
          </Button>
          {uploadFile.isError && <ErrorBanner title="Upload failed" text={getErrorMessage(uploadFile.error)} />}
        </div>

        <div className="flex flex-col gap-1.5">
          <Text size="sm" weight="medium">
            Display Name
          </Text>
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-xl border border-border p-3 text-sm outline-none"
          />
        </div>

        {updateMe.isError && <ErrorBanner title="Couldn't save profile" text={getErrorMessage(updateMe.error)} />}

        <Button size="lg" className="hidden w-full rounded-full md:flex" disabled={updateMe.isPending} onClick={handleSave}>
          {saveButtonLabel}
        </Button>
      </div>

      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-white p-4 md:hidden">
        <Button size="lg" className="w-full rounded-full" disabled={updateMe.isPending} onClick={handleSave}>
          {saveButtonLabel}
        </Button>
      </div>
    </div>
  )
}
