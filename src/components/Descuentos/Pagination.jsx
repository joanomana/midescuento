import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Pagination({ page, pageCount, onPrev, onNext }) {
  return (
    <div className="flex items-center gap-3 justify-center pt-2">
      <button
        disabled={page === 1}
        onClick={onPrev}
        className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
      >
        <ChevronLeft className="size-4" /> Anterior
      </button>

      <span className="text-sm text-slate-700">
        Página <span className="font-medium">{page}</span> / {pageCount}
      </span>

      <button
        disabled={page === pageCount}
        onClick={onNext}
        className="inline-flex items-center gap-1 rounded-xl border px-3 py-2 text-sm disabled:opacity-50"
      >
        Siguiente <ChevronRight className="size-4" />
      </button>
    </div>
  );
}
