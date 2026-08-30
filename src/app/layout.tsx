import type { Metadata } from "next"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import "./globals.css"

export const metadata: Metadata = {
  title: { default: "Zuribeans — African coffee for trade", template: "%s | Zuribeans" },
  description: "Traceable African green coffee for professional buyers.",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <a href="#main" className="sr-only focus:not-sr-only">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
