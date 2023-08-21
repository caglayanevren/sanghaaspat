export const metadata = {
  title: 'Sangha Aspat Events Syncing....',
  description: 'Sangha Aspat Events Sync page',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
