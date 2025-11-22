import './globals.css'
import Link from 'next/link'

export const metadata = { title: 'TinyLink - URL Shortener', description: 'Create beautiful short links instantly' }


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="min-h-screen flex flex-col">

          {/* HEADER */}
          <header className="glass-card sticky top-4 mx-4 mt-4 mb-6 rounded-2xl z-50 animate-fade-in">
            <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">

              <div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg">
                  ✨ TinyLink
                </h1>
                <p className="text-sm text-white/90 drop-shadow">
                  Create and manage your short links
                </p>
              </div>

              {/* UPDATED NAV WITH SPACING */}
              <nav className="flex gap-6" style={{ display: 'flex', gap: '24px' }}>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-all hover:scale-105"
                >
                  Dashboard
                </Link>

                <Link
                  href="/healthz"
                  className="px-4 py-2 rounded-lg bg-white/20 hover:bg-white/30 text-white font-medium transition-all hover:scale-105"
                >
                  Health
                </Link>
              </nav>

            </div>
          </header>

          {/* MAIN */}
          <main className="flex-1 max-w-5xl w-full mx-auto px-6 pb-8">
            {children}
          </main>

          {/* FOOTER */}
          <footer className="glass-card mx-4 mb-4 rounded-2xl">
            <div className="max-w-5xl mx-auto px-6 py-4 text-center">
              <p className="text-sm text-white/80">Built with ❤️ for TinyLink</p>
            </div>
          </footer>

        </div>
      </body>
    </html>
  )
}
