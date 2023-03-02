import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold">
            SoleCraft
          </Link>
          <p className="mt-4 text-gray-300">
            Design and customize your perfect shoes with SoleCraft.
          </p>
          <p className="mt-8 text-gray-400">
            © 2024 SoleCraft. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
} 