import { ShoppingBag } from "lucide-react";

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/75 bg-white/90 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2 font-semibold text-slate-900">
          <span className="size-8 grid place-content-center rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-sm">
            <ShoppingBag className="size-5" />
          </span>
          <span>Mi Descuento</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-600">
          <a href="/" className="hover:text-slate-900">Home</a>
          <a href="/about" className="hover:text-slate-900">About</a>
          <a href="/contact" className="hover:text-slate-900">Contact</a>
        </nav>

        <a
          href="#ofertas"
          className="inline-flex rounded-xl bg-blue-600 px-4 py-2 text-white text-sm font-medium shadow-sm hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
        >
          Ver ofertas
        </a>
      </div>
    </header>
  );
}
