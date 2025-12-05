"use client"

import { useState, useEffect } from "react"
import { Loader2, Mail, Calendar, MessageSquare, Heart, Sparkles, Star, User } from "lucide-react"

interface Guest {
  Name: string
  Email: string
  RSVP: string
  Message: string
}

export function BookOfGuests() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [stats, setStats] = useState({
    total: 0,
    attending: 0,
    notAttending: 0,
    pending: 0,
  })

  const getInitials = (name: string) => {
    if (!name) return "?"
    const parts = name
      .trim()
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
    return parts.map((p) => p[0]?.toUpperCase()).join("") || "?"
  }

  const fetchGuests = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/guests", { cache: "no-store" })

      if (!response.ok) {
        throw new Error("Failed to fetch guest list")
      }

      const data: Guest[] = await response.json()

      const attending = data.filter((guest) => guest.RSVP === "Yes").length
      const notAttending = data.filter((guest) => guest.RSVP === "No").length
      const pending = data.filter(
        (guest) => !guest.RSVP || guest.RSVP.trim() === ""
      ).length

      setStats({
        total: data.length,
        attending,
        notAttending,
        pending,
      })
    } catch (error: any) {
      console.error("Failed to load guests:", error)
      setError(error?.message || "Failed to load guest list")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Initial fetch
    fetchGuests()

    // Set up event listener for RSVP updates
    const handleRsvpUpdate = () => {
      // Add a small delay to allow Google Sheets to update
      setTimeout(() => {
        fetchGuests()
      }, 2000)
    }

    window.addEventListener("rsvpUpdated", handleRsvpUpdate)

    return () => {
      window.removeEventListener("rsvpUpdated", handleRsvpUpdate)
    }
  }, [])

  return (
    <div 
      id="guests" 
      className="relative z-[55] isolate bg-gradient-to-b from-[#666956] via-[#8D8E7C] to-[#666956] py-20 md:py-32 overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Floating geometric shapes with palette */}
        <div className="hidden sm:block absolute top-10 left-10 w-24 h-24 bg-[#B08981]/12 rounded-full blur-2xl animate-pulse" />
        <div className="hidden sm:block absolute top-20 right-20 w-20 h-20 bg-[#EFBFBB]/18 rounded-full blur-xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="hidden sm:block absolute bottom-20 left-20 w-28 h-28 bg-[#B08981]/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="hidden sm:block absolute bottom-10 right-10 w-16 h-16 bg-[#EFBFBB]/16 rounded-full blur-lg animate-pulse" style={{ animationDelay: '0.5s' }} />
        {/* Mobile subtle shapes */}
        <div className="sm:hidden absolute top-8 left-8 w-12 h-12 bg-[#B08981]/10 rounded-full blur-lg animate-pulse" />
        <div className="sm:hidden absolute bottom-8 right-8 w-10 h-10 bg-[#EFBFBB]/12 rounded-full blur-md animate-pulse" />
        
        {/* Decorative lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#B08981]/30 to-transparent" />
        <div className="absolute bottom-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/25 to-transparent" />
        
        {/* Corner decorative elements */}
        <div className="absolute top-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-br from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-br-3xl" />
        <div className="absolute top-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-bl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-bl-3xl" />
        <div className="absolute bottom-0 left-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tr from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tr-3xl" />
        <div className="absolute bottom-0 right-0 w-16 sm:w-32 h-16 sm:h-32 bg-gradient-to-tl from-[#B08981]/15 via-[#EFBFBB]/10 to-transparent rounded-tl-3xl" />
        {/* Decorative corner images - all 4 corners */}
        {/* Top Right */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 right-0 w-56 sm:w-72 md:w-96 lg:w-[34rem] xl:w-[40rem] opacity-80 select-none"
        />
        {/* Top Left */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute top-0 left-0 w-56 sm:w-72 md:w-96 lg:w-[34rem] xl:w-[40rem] opacity-80 select-none transform scale-x-[-1]"
        />
        {/* Bottom Left */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-48 sm:w-64 md:w-80 lg:w-[30rem] xl:w-[36rem] opacity-70 rotate-180 select-none"
        />
        {/* Bottom Right */}
        <img
          src="/decoration/corner_right-top.png"
          alt=""
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-48 sm:w-64 md:w-80 lg:w-[30rem] xl:w-[36rem] opacity-70 rotate-180 select-none transform scale-x-[-1]"
        />
      </div>

      {/* Enhanced title section */}
      <div className="relative z-10 text-center mb-8 md:mb-20 px-4">
        {/* Decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mb-6">
          <div className="w-16 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/60 to-[#EFBFBB]/30" />
          <div className="flex gap-2">
            <div className="w-2 h-2 bg-[#EFBFBB] rounded-full" />
            <div className="w-1 h-1 bg-[#FFE5E4] rounded-full self-center" />
            <div className="w-2 h-2 bg-[#EFBFBB] rounded-full" />
          </div>
          <div className="w-16 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/60 to-[#EFBFBB]/30" />
        </div>

        <div className="inline-flex items-center gap-1 md:gap-3 mb-2 md:mb-4">
          <Sparkles className="text-[#FFE5E4]/80 h-3 w-3 md:h-6 md:w-6 animate-pulse" />
          <span className="text-[#FFE5E4]/80 font-lora text-xs md:text-sm uppercase tracking-wider">Guest Registry</span>
          <Sparkles className="text-[#FFE5E4]/80 h-3 w-3 md:h-6 md:w-6 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </div>
        
        <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-serif font-bold text-[#FFE5E4] mb-3 md:mb-6 text-balance drop-shadow-2xl relative">
          <span className="relative z-10 bg-clip-text text-transparent bg-gradient-to-br from-[#B08981] via-[#EFBFBB] to-[#FFE5E4]">Guest Attendance</span>
          <span className="absolute inset-0 text-[#EFBFBB]/25 blur-2xl -z-10">Guest Attendance</span>
        </h2>
        
        <p className="text-sm md:text-xl text-[#FFE5E4]/90 font-sans font-light max-w-2xl mx-auto px-4 leading-relaxed">
          Track how many loved ones have RSVP’d, who can’t make it, and who we’re still waiting to hear from.
        </p>

        {/* Bottom decorative ornaments */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
          <div className="w-1 h-1 bg-[#EFBFBB] rounded-full" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent via-[#EFBFBB]/40 to-[#FFE5E4]/20" />
        </div>
      </div>

      {/* Enhanced guests content */}
      <div className="relative z-10">
        {/* Premium stats card */}
        <div className="text-center mb-6 sm:mb-12 px-3 sm:px-4 md:px-6 lg:px-8">
          <div className="relative max-w-3xl mx-auto">
            {/* Main card */}
            <div className="relative bg-gradient-to-br from-[#FFE5E4] via-white to-[#FFE5E4] backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 border-2 border-[#B08981]/35 shadow-[0_8px_24px_rgba(102,105,86,0.22)]">
              {/* Decorative corner accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-bl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-tr from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-tl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              
              {/* Inner decorative border */}
              <div className="absolute inset-2 border border-[#B08981]/30 rounded-xl" />
              
              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-center gap-1 md:gap-3 mb-3 md:mb-4">
                  <div className="bg-gradient-to-r from-[#666956] to-[#8D8E7C] p-1 md:p-3 rounded-full shadow-lg">
                    <Heart className="text-[#FFE5E4] h-3 w-3 md:h-6 md:w-6" />
                  </div>
                  <h3 className="text-sm sm:text-2xl md:text-3xl font-playfair font-bold text-[#666956]">
                    RSVP Overview
                  </h3>
                </div>
                <p className="text-xs sm:text-sm md:text-base text-[#666956]/80 font-lora leading-relaxed mb-4">
                  These numbers update as guests send their RSVPs. Thank you for helping us prepare for the celebration.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  <div className="bg-white/80 rounded-xl border border-[#B08981]/25 p-3 sm:p-4 shadow-sm">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wide text-[#666956]/70 font-semibold mb-1">
                      Total Guests
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#666956]">
                      {stats.total}
                    </p>
                  </div>
                  <div className="bg-green-50 rounded-xl border border-green-200 p-3 sm:p-4 shadow-sm">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wide text-green-700/80 font-semibold mb-1">
                      Attending
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-green-700">
                      {stats.attending}
                    </p>
                  </div>
                  <div className="bg-red-50 rounded-xl border border-red-200 p-3 sm:p-4 shadow-sm">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wide text-red-700/80 font-semibold mb-1">
                      Not Attending
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-red-700">
                      {stats.notAttending}
                    </p>
                  </div>
                  <div className="bg-yellow-50 rounded-xl border border-yellow-200 p-3 sm:p-4 shadow-sm">
                    <p className="text-[10px] sm:text-xs uppercase tracking-wide text-yellow-700/80 font-semibold mb-1">
                      Pending
                    </p>
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-yellow-700">
                      {stats.pending}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {(isLoading || error || stats.total === 0) && (
          <div className="max-w-5xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
            <div className="relative bg-gradient-to-br from-[#FFE5E4] via-white to-[#FFE5E4] backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-2xl border-2 border-[#B08981]/35">
              {/* Decorative corner accents */}
              <div className="absolute -top-1 -left-1 w-4 h-4 bg-gradient-to-br from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-bl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-gradient-to-tr from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-tl from-[#D1AB6D] to-[#E0CFB5] rounded-full blur-sm opacity-70" />
              
              {/* Inner decorative border */}
              <div className="absolute inset-2 border border-[#B08981]/30 rounded-xl" />
              {isLoading ? (
                <div className="flex items-center justify-center h-24 sm:h-48">
                  <div className="flex flex-col items-center gap-2 md:gap-4">
                    <div className="relative">
                      <Loader2 className="h-6 w-6 md:h-10 md:w-10 animate-spin text-[#402921]" />
                      <div className="absolute inset-0 h-6 w-6 md:h-10 md:w-10 animate-ping rounded-full bg-[#BB8A3D]/25"></div>
                    </div>
                    <span className="text-[#402921] font-lora text-xs md:text-lg font-medium">Loading guests...</span>
                  </div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-24 sm:h-48 text-red-500">
                  <div className="flex flex-col items-center gap-2 md:gap-4">
                    <div className="bg-red-100 p-2 md:p-4 rounded-full">
                      <MessageSquare className="h-5 w-5 md:h-8 md:w-8 text-red-500" />
                    </div>
                    <span className="font-lora text-xs md:text-lg">{error}</span>
                  </div>
                </div>
              ) : stats.total === 0 ? (
                <div className="flex items-center justify-center py-10 sm:py-16">
                  <div className="relative text-center bg-gradient-to-br from-[#402921] to-[#583016] rounded-2xl px-6 sm:px-10 py-8 sm:py-12 shadow-2xl border border-white/20 max-w-xl w-full">
                    {/* Decorative glow */}
                    <div className="absolute -inset-1 rounded-2xl bg-white/10 blur-xl opacity-30 pointer-events-none" />
                    <div className="relative">
                      <div className="relative inline-flex items-center justify-center mb-4 sm:mb-6">
                        <div className="absolute inset-0 rounded-full bg-white/20 blur-xl opacity-60" />
                        <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white/25 flex items-center justify-center shadow-lg">
                          <Heart className="h-7 w-7 sm:h-8 sm:w-8 text-[#FFF6E7]" />
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-2xl font-playfair font-bold text-[#FFF6E7] mb-2 sm:mb-3">
                        No guests have RSVP'd yet
                      </h3>
                      <p className="text-xs sm:text-base text-[#FFF6E7]/90 font-lora max-w-md mx-auto leading-relaxed">
                        Be the first to RSVP and kick off the celebration!
                      </p>
                      <div className="mt-4 sm:mt-6 flex justify-center">
                        <div className="inline-flex items-center gap-2 bg-white text-[#402921] rounded-full px-3 sm:px-5 py-1.5 sm:py-2 shadow-md">
                          <Sparkles className="h-4 w-4" />
                          <span className="text-xs sm:text-sm font-lora">Search your name to RSVP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
