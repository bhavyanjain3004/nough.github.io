'use client'
import React, { useEffect, useRef } from 'react'
import * as LR from '@uploadcare/blocks'
import { useRouter } from 'next/navigation'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';


type Props = {
  onUpload: (e: string) => any
}

// Register blocks globally
if (typeof window !== 'undefined') {
  LR.registerBlocks(LR)
}

const UploadCareButton = ({ onUpload }: Props) => {
  const router = useRouter()
  const ctxProviderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleUpload = async (e: any) => {
      const file = await onUpload(e.detail.cdnUrl)
      if (file) {
        router.refresh()
      }
    }

    if (ctxProviderRef.current) {
      ctxProviderRef.current.addEventListener('file-upload-success', handleUpload)
    }

    return () => {
      ctxProviderRef.current?.removeEventListener('file-upload-success', handleUpload)
    }
  }, [onUpload, router])

  return (
    <div>
      <FileUploaderRegular
         sourceList="local, camera, facebook, gdrive"
         cameraModes="photo, video"
         classNameUploader="uc-light"
         pubkey="4e478727e80a6b436651"
      />
    </div>
  );
}

export default UploadCareButton