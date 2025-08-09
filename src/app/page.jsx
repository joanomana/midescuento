import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Descuentos from "@/components/Descuentos";

export default function Home() {
  return (
    <div className="min-h-dvh bg-gradient-to-b from-slate-50 to-white text-slate-900">
      <Nav />
      <Hero />
      <main className="mx-auto max-w-7xl px-4 pb-16">
        <Descuentos />
      </main>
      <footer className="border-t">
        <div className="mx-auto max-w-7xl px-4 py-10 text-sm text-slate-500">
          © {new Date().getFullYear()} Mi Descuento — Hecho con ❤️
        </div>
      </footer>
    </div>
  );
}
