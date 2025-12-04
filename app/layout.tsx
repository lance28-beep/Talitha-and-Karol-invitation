import type React from "react"
import type { Metadata } from "next"
import { Great_Vibes, Inter, Tangerine } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-serif" })
const tangerine = Tangerine({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-tangerine" })

export const metadata: Metadata = {
  title: "Karol & Talitha - Wedding Invitation",
  description:
    "You're invited to the wedding of Karol & Talitha! Join us on February 14, 2026 in Tarlac, Tarlac. RSVP, read our love story, view our gallery, and leave a message for the couple.",
  keywords:
    "Talitha Karol wedding, Filipino wedding, RSVP, wedding gallery, wedding message wall, wedding invitation, 2026 weddings, love story, guestbook, wedding registry, wedding details, wedding venues Tarlac, #MayTALInasiKAROL",
  authors: [
    { name: "Talitha" },
    { name: "Karol" },
  ],
  creator: "Karol & Talitha",
  publisher: "Karol & Talitha",
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  metadataBase: new URL("https://Talitha-and-Karol-invitation.vercel.app/"),
  alternates: {
    canonical: "https://Talitha-and-Karol-invitation.vercel.app/",
  },
  icons: {
    icon: [
      { url: "/favicon_io/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon_io/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/favicon_io/favicon.ico",
    apple: "/favicon_io/apple-touch-icon.png",
    other: [
      {
        rel: "android-chrome-192x192",
        url: "/favicon_io/android-chrome-192x192.png",
      },
      {
        rel: "android-chrome-512x512",
        url: "/favicon_io/android-chrome-512x512.png",
      },
    ],
  },
  manifest: "/favicon_io/site.webmanifest",
  openGraph: {
    title: "Karol & Talitha Wedding | February 14, 2026",
    description:
      "Celebrate the union of Karol & Talitha on February 14, 2026 in Tarlac, Tarlac. Discover our love story, RSVP, view the gallery, and leave your wishes!",
    url: "https://Talitha-and-Karol-invitation.vercel.app/",
    siteName: "Karol & Talitha Wedding ",
    locale: "en_PH",
    type: "website",
    images: [
      {
        url: "https://Talitha-and-Karol-invitation.vercel.app/desktop-background/NLK_3656-min.jpg",
        width: 1200,
        height: 630,
        alt: "Karol & Talitha Wedding Invitation - February 14, 2026",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Karol & Talitha Wedding Invitation",
    description:
      "You're invited to the wedding of Karol & Talitha! February 14, 2026. RSVP, view our gallery, and leave a message! #MayTALInasiKAROL",
    images: ["https://Talitha-and-Karol-invitation.vercel.app/desktop-background/NLK_3656-min.jpg"],
    creator: "@talithakarol",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-site-verification",
  },
  other: {
    "application/ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Karol & Talitha Wedding",
      startDate: "2026-02-14T14:00:00+08:00",
      endDate: "2026-02-14T22:00:00+08:00",
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
      location: [
        {
          "@type": "Place",
          name: "Tarlac Recreational Park",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tarlac, Tarlac",
            addressCountry: "PH",
          },
        },
      ],
      image: ["https://Talitha-and-Karol-invitation.vercel.app/desktop-background/NLK_3656-min.jpg"],
      description:
        "You're invited to the wedding of Karol & Talitha! Join us on February 14, 2026 in Tarlac, Tarlac. RSVP, read our love story, view our gallery, and leave a message for the couple.",
      organizer: {
        "@type": "Person",
        name: "Karol & Talitha",
      },
      offers: {
        "@type": "Offer",
        url: "https://Talitha-and-Karol-invitation.vercel.app/",
        availability: "https://schema.org/InStock",
        price: "0",
        priceCurrency: "PHP",
      },
      eventHashtag: "#MayTALInasiKAROL",
    }),
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#525E2C" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/mobile-background/DSCF2614-min.jpg" media="(max-width: 767px)" />
        <link rel="preload" as="image" href="/desktop-background/DSCF2444-min.jpg" media="(min-width: 768px)" />
      </head>
      <body className={`${inter.variable} ${greatVibes.variable} ${tangerine.variable} font-inter antialiased text-foreground`}>
        <Navbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
