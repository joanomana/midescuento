"use client";

import { useEffect, useMemo, useState } from "react";
import Filters from "./Filters";
import ProductCard from "./ProductCard";
import SkeletonCard from "./SkeletonCard";
import EmptyState from "./EmptyState";
import Pagination from "./Pagination";
import { parseDesc, parsePrecio } from "@/lib/utils";

export default function Descuentos() {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  const [categoria, setCategoria] = useState("Todas");
  const [query, setQuery] = useState("");
  const [minDesc, setMinDesc] = useState(0);            
  const [orden, setOrden] = useState("recientes");      
  const [page, setPage] = useState(1);
  const pageSize = 36;

  useEffect(() => {
    const cargar = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/descuentos", { cache: "no-store" });
        const data = await res.json();
        setProductos(Array.isArray(data) ? data : []);
      } catch (e) {
        console.error("Error cargando descuentos:", e);
        setProductos([]);
      } finally {
        setLoading(false);
      }
    };
    cargar();
  }, []);

  const categorias = useMemo(() => {
    const set = new Set(productos.map((p) => p.categoria).filter(Boolean));
    return ["Todas", ...Array.from(set).sort((a, b) => a.localeCompare(b))];
  }, [productos]);

  const filtradosOrdenados = useMemo(() => {
    const q = query.trim().toLowerCase();

    let list = productos.filter((p) => {
      const okCat = categoria === "Todas" ? true : p.categoria === categoria;
      const okDesc = parseDesc(p.descuento) >= Number(minDesc || 0);
      const okQuery =
        q.length === 0
          ? true
          : [p.titulo, p.marca, p.categoria].filter(Boolean).some((v) => String(v).toLowerCase().includes(q));
      return okCat && okDesc && okQuery;
    });

    list = list.sort((a, b) => {
      if (orden === "precioAsc") {
        return (parsePrecio(a.precioConDescuento) ?? Infinity) - (parsePrecio(b.precioConDescuento) ?? Infinity);
      }
      if (orden === "precioDesc") {
        return (parsePrecio(b.precioConDescuento) ?? -1) - (parsePrecio(a.precioConDescuento) ?? -1);
      }
      if (orden === "descuentoDesc") {
        return parseDesc(b.descuento) - parseDesc(a.descuento);
      }
      const ta = new Date(a.lastSeenAt || a.timestamp || 0).getTime();
      const tb = new Date(b.lastSeenAt || b.timestamp || 0).getTime();
      return tb - ta;
    });

    return list;
  }, [productos, categoria, query, minDesc, orden]);

  const pageCount = Math.max(1, Math.ceil(filtradosOrdenados.length / pageSize));
  const pageItems = useMemo(() => {
    const start = (page - 1) * pageSize;
    return filtradosOrdenados.slice(start, start + pageSize);
  }, [filtradosOrdenados, page]);

  useEffect(() => setPage(1), [categoria, query, minDesc, orden]);

  return (
    <section id="ofertas" className="space-y-6">
      <Filters
        categorias={categorias}
        categoria={categoria}
        setCategoria={setCategoria}
        query={query}
        setQuery={setQuery}
        minDesc={minDesc}
        setMinDesc={setMinDesc}
        orden={orden}
        setOrden={setOrden}
        loading={loading}
        total={filtradosOrdenados.length}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
        {loading
          ? Array.from({ length: 12 }).map((_, i) => <SkeletonCard key={i} />)
          : pageItems.length > 0
            ? pageItems.map((p, i) => (
                <ProductCard key={p._id || p.enlace || `${i}-${p.titulo}`} producto={p} />
              ))
            : <EmptyState onReset={() => { setCategoria("Todas"); setQuery(""); setMinDesc(0); setOrden("recientes"); }} />
        }
      </div>


      {pageCount > 1 && (
        <Pagination
          page={page}
          pageCount={pageCount}
          onPrev={() => setPage((p) => Math.max(1, p - 1))}
          onNext={() => setPage((p) => Math.min(pageCount, p + 1))}
        />
      )}
    </section>
  );
}
