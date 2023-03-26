import Link from 'next/link';

const adminNav = [
  { name: 'Dashboard', href: '/admin' },
  { name: 'Products', href: '/admin/products' },
  { name: 'Orders', href: '/admin/orders' },
  { name: 'Discounts', href: '/admin/discounts' },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col p-6">
        <div className="mb-8">
          <Link href="/admin" className="text-2xl font-bold text-blue-700">SoleCraft Admin</Link>
        </div>
        <nav className="flex-1 space-y-2">
          {adminNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`block px-4 py-2 rounded-md font-medium transition-colors`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-auto pt-8">
          <Link href="/" className="text-sm text-gray-400 hover:text-blue-600">Back to site</Link>
        </div>
      </aside>
      {/* Main content */}
      <main className="flex-1 p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
} 