import type React from "react"
import type { Metadata } from "next"
import { Open_Sans, Montserrat } from "next/font/google"
import { AuthProvider } from "@/auth/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const openSans = Open_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-open-sans",
})

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-montserrat",
  weight: ["400", "600", "700", "900"],
})

export const metadata: Metadata = {
  title: "HealthMaxxing - AI-Powered Fitness Revolution",
  description: "Transform your fitness journey with AI-powered routines, analytics, and personalized coaching",
  generator: "HealthMaxxing Platform",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <style>{`
html {
  font-family: ${openSans.style.fontFamily};
  --font-open-sans: ${openSans.variable};
  --font-montserrat: ${montserrat.variable};
}
        `}</style>
      </head>
      <body className={`${openSans.variable} ${montserrat.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange={false}>
          <LanguageProvider>
            <AuthProvider>
              {children}
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}