import { Search } from "lucide-react";

export default function EmptyState({ onReset }) {
  return (
    <div className="col-span-full rounded-2xl border border-dashed bg-white p-10 text-center">
      <div className="mx-auto size-12 grid place-content-center rounded-full bg-slate-100 mb-3">
        <Search className="size-5 text-slate-500" />
      </div>
      <h3 className="font-semibold text-slate-900">No encontramos resultados</h3>
      <p className="text-sm text-slate-600 mt-1">
        Prueba ajustar los filtros o busca con otros términos.
      </p>
      <button
        onClick={onReset}
        className="mt-4 inline-flex rounded-xl bg-slate-900 px-4 py-2 text-white text-sm hover:bg-slate-800"
      >
        Limpiar filtros
      </button>
    </div>
  );
}
