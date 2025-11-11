import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'We Love Sousse CMS',
  description: 'Content Management System',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
