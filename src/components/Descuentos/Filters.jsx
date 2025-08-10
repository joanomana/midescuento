import { Search, SlidersHorizontal } from "lucide-react";

export default function Filters({
  categorias, categoria, setCategoria,
  query, setQuery,
  minDesc, setMinDesc,
  orden, setOrden,
  loading, total
}) {
  return (
    <div className="mt-10 z-30 bg-white/90 backdrop-blur border rounded-2xl shadow-sm p-3 md:p-4">
      <div className="flex items-center gap-3 text-slate-600 mb-2">
        <SlidersHorizontal className="size-4" />
        <span className="text-sm font-medium">Filtros</span>
        <span className="ml-auto text-sm">{loading ? "Cargando…" : `${total} resultados`}</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {/* Categoría */}
        <label className="text-xs text-slate-500 flex flex-col gap-1">
          Categoría
          <select
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {categorias.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        {/* Buscar */}
        <label className="text-xs text-slate-500 flex flex-col gap-1 col-span-1 md:col-span-2">
          Buscar
          <div className="relative">
            <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nombre, marca…"
              className="w-full border rounded-xl pl-9 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </label>

        <label className="text-xs text-slate-500 flex flex-col gap-1">
          Descuento mín. (%)
          <input
            type="number" min={0} max={100}
            value={minDesc}
            onChange={(e) => setMinDesc(e.target.value)}
            className="border rounded-xl px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>


        <label className="text-xs text-slate-500 flex flex-col gap-1">
          Ordenar por
          <select
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
            className="border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="recientes">Más recientes</option>
            <option value="descuentoDesc">Mayor descuento</option>
            <option value="precioAsc">Precio ↑</option>
            <option value="precioDesc">Precio ↓</option>
          </select>
        </label>
      </div>
    </div>
  );
}
