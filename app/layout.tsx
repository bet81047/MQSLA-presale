import type { Metadata } from 'next'
import { Providers } from "./providers"
import './globals.css'
import { Inter } from "next/font/google"
import { Toaster } from "react-hot-toast"

const inter = Inter({ subsets: ["latin"] })
export const metadata: Metadata = {
  title: 'ICO | mQsala',
  description: 'mqSala is a cutting-edge ICO launching on the BSC Smart Chain',
  generator: 'mQsala Team',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
