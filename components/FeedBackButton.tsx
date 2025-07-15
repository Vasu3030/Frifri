"use client"

import { useEffect, useRef, useState } from "react"
import * as Sentry from "@sentry/nextjs"
import { Button } from "@/components/ui/button"
import { Bug } from "lucide-react"


type Props = {
  keepSheetOpen?: () => void
}

export function FeedbackButton({ keepSheetOpen }: Props) {
  const [feedback, setFeedback] = useState<ReturnType<typeof Sentry.getFeedback> | null>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setFeedback(Sentry.getFeedback())
  }, [])

  useEffect(() => {
    if (feedback && buttonRef.current) {
      const unsubscribe = feedback.attachTo(buttonRef.current)
      return unsubscribe
    }
  }, [feedback])

  return (
    <Button
      ref={buttonRef}
      className="cursor-pointer hover:ring-1 ring-white"
      onClick={(e) => {
        e.stopPropagation()
        keepSheetOpen?.()
      }}
    >
      <Bug className=" text-white" />
    </Button>
  )
}