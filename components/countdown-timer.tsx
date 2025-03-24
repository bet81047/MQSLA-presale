"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, Calendar } from "lucide-react"

interface CountdownTimerProps {
  startDate: string
  endDate: string
}

export function CountdownTimer({ startDate, endDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })
  const [status, setStatus] = useState<"Not Started" | "Active" | "Ended">("Not Started")

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const start = new Date(startDate).getTime()
      const end = new Date(endDate).getTime()

      let difference: number
      if (now < start) {
        difference = start - now
        setStatus("Not Started")
      } else if (now < end) {
        difference = end - now
        setStatus("Active")
      } else {
        difference = 0
        setStatus("Ended")
      }

      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      }
    }

    // Initial calculation
    setTimeLeft(calculateTimeLeft())

    // Update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    // Clear interval on component unmount
    return () => clearInterval(timer)
  }, [startDate, endDate])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })
  }

  const getStatusColor = () => {
    switch (status) {
      case "Not Started":
        return "bg-yellow-500/20 text-yellow-500"
      case "Active":
        return "bg-green-500/20 text-green-500"
      case "Ended":
        return "bg-red-500/20 text-red-500"
    }
  }

  return (
    <div className="mb-8">
        <div className="flex items-center gap-2 mb-2 text-cyan-100">
        <Clock className="w-4 h-4" />
        <span className="text-sm">Presale {status === "Active" ? "Ends" : status} In</span>
        <Badge variant="outline" className={getStatusColor()}>
            {status}
        </Badge>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
        {[
            { label: "Days", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
        ].map((item, index) => (
            <div key={index} className="bg-blue-600/40 rounded-lg p-3 border border-cyan-400/30 glow-border">
            <div className="text-2xl font-bold text-white glow-text">{item.value}</div>
            <div className="text-xs text-cyan-100">{item.label}</div>
            </div>
        ))}
        </div>
    </div>
  )
}

