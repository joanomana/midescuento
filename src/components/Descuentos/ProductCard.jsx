import { ExternalLink } from "lucide-react";
import { formatCOP, parseDesc, parsePrecio } from "@/lib/utils";

export default function ProductCard({ producto }) {
  const {
    categoria, titulo, marca, descuento,
    precioOriginal, precioConDescuento, precioAliado,
    enlace, lastSeenAt, timestamp, imagen
  } = producto;

  const pDesc = parseDesc(descuento);
  const pFinal = parsePrecio(precioConDescuento);
  const pOrig = parsePrecio(precioOriginal);
  const seen = new Date(lastSeenAt || timestamp).toLocaleString();

  return (
    <article className="group relative rounded-2xl bg-white border shadow-sm hover:shadow-md transition-shadow flex flex-col">

      <div className="aspect-[4/3] overflow-hidden rounded-t-2xl bg-slate-100 grid place-content-center">
        {imagen ? (
          <img
            src={imagen}
            alt={titulo}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            loading="lazy"
          />
        ) : (
          <div className="text-slate-400 text-sm">Sin imagen</div>
        )}
      </div>


      <div className="p-4 flex flex-col flex-1">
        <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-1">{categoria}</div>


        <div className="flex-1 flex flex-col justify-start min-h-[5.5rem]">
          <h3 className="font-semibold text-slate-900 line-clamp-2">{titulo}</h3>
          {marca && <div className="text-sm text-slate-600 mt-0.5">{marca}</div>}
        </div>

        <div className="mt-3 space-y-0.5">
          {pOrig && (
            <div className="text-sm text-slate-400 flex items-center gap-2">
              <s>{formatCOP(pOrig)}</s>
              {pDesc > 0 && (
                <span className="rounded-full bg-red-500 text-white text-xs font-semibold px-2 py-0.5">
                  -{pDesc}%
                </span>
              )}
            </div>
          )}

          {pFinal != null && (
            <div className="text-emerald-700 font-semibold text-lg">
              {formatCOP(pFinal)}
            </div>
          )}

          {precioAliado && (
            <div className="text-blue-600 text-sm">Aliado: {precioAliado}</div>
          )}
        </div>
        <div className="mt-auto pt-4 flex flex-col items-center justify-between gap-5">
          <a
            href={enlace}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 rounded-xl border px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Ver producto <ExternalLink className="size-4" />
          </a>
          <span className="text-[11px] text-slate-400">Visto: {seen}</span>
        </div>
      </div>
    </article>
  );
}
