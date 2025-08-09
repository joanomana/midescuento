import { Percent } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white">
      {/* decoración suave */}
      <div className="absolute -top-24 -left-24 size-72 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute -bottom-28 -right-16 size-[28rem] rounded-full bg-white/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-4 py-14 relative">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm">
              <Percent className="size-4" />
              <span>Ofertas actualizadas en tiempo real</span>
            </div>
            <h1 className="mt-4 text-3xl md:text-5xl font-bold leading-tight">
              ¡Aprovecha los mejores <span className="text-yellow-300">descuentos</span> hoy!
            </h1>
            <p className="mt-3 text-white/90 md:text-lg">
              Filtra por categoría, ordena por precio o porcentaje y descubre las oportunidades más recientes.
            </p>
          </div>

          <dl className="grid grid-cols-3 gap-4 md:ml-auto text-center">
            <Stat label="Ofertas activas" value="+1000" />
            <Stat label="Máx. descuento" value="99%" />
            <Stat label="Tiendas" value="+20" />
          </dl>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }) {
  return (
    <div className="rounded-2xl bg-white/10 px-5 py-4 backdrop-blur border border-white/20">
      <dt className="text-xs text-white/80">{label}</dt>
      <dd className="text-2xl font-semibold">{value}</dd>
    </div>
  );
}
