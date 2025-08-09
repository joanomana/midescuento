'use client';

import { useEffect, useMemo, useState } from 'react';

export default function Descuentos() {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);

    const [categoria, setCategoria] = useState('Todas');
    const [query, setQuery] = useState('');
    const [minDesc, setMinDesc] = useState(0);         // % mínimo
    const [orden, setOrden] = useState('recientes');   // 'recientes' | 'precioAsc' | 'precioDesc' | 'descuentoDesc'

    const [page, setPage] = useState(1);
    const pageSize = 72;

    useEffect(() => {
        const cargar = async () => {
        try {
            setLoading(true);
            const res = await fetch('/api/descuentos', { cache: 'no-store' });
            const data = await res.json();
            setProductos(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error('Error cargando descuentos:', e);
            setProductos([]);
        } finally {
            setLoading(false);
        }
        };
        cargar();
    }, []);

    const parsePrecio = (s) => {
        if (!s) return null;
        const n = Number(String(s).replace(/[^\d]/g, ''));
        return Number.isFinite(n) ? n : null; 
    };
    const parseDesc = (s) => {
        if (s == null) return 0;
        const n = Number(String(s).replace(/[^\d]/g, ''));
        return Number.isFinite(n) ? n : 0;
    };

    const categorias = useMemo(() => {
        const set = new Set(productos.map((p) => p.categoria).filter(Boolean));
        return ['Todas', ...Array.from(set).sort((a, b) => a.localeCompare(b))];
    }, [productos]);

    const filtradosOrdenados = useMemo(() => {
        const q = query.trim().toLowerCase();

        let list = productos.filter((p) => {
        const okCat = categoria === 'Todas' ? true : p.categoria === categoria;
        const okDesc = parseDesc(p.descuento) >= Number(minDesc || 0);
        const okQuery =
            q.length === 0
            ? true
            : [p.titulo, p.marca, p.categoria]
                .filter(Boolean)
                .some((v) => String(v).toLowerCase().includes(q));
        return okCat && okDesc && okQuery;
        });

        list = list.sort((a, b) => {
        if (orden === 'precioAsc') {
            return (parsePrecio(a.precioConDescuento) ?? Infinity) - (parsePrecio(b.precioConDescuento) ?? Infinity);
        }
        if (orden === 'precioDesc') {
            return (parsePrecio(b.precioConDescuento) ?? -1) - (parsePrecio(a.precioConDescuento) ?? -1);
        }
        if (orden === 'descuentoDesc') {
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
        <div className="space-y-4 px-3">

            <div className="flex flex-wrap gap-3 items-end">
                <div className="flex flex-col">
                    <label className="text-sm text-gray-600">Categoría</label>
                    <select
                        value={categoria}
                        onChange={(e) => setCategoria(e.target.value)}
                        className="border rounded px-2 py-1"
                    >
                        {categorias.map((c) => (
                        <option key={c} value={c}>
                            {c}
                        </option>
                        ))}
                    </select>
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600">Buscar</label>
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Nombre, marca..."
                        className="border rounded px-2 py-1"
                    />
                </div>

                <div className="flex flex-col">
                    <label className="text-sm text-gray-600">Descuento mínimo (%)</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={minDesc}
                        onChange={(e) => setMinDesc(e.target.value)}
                        className="border rounded px-2 py-1 w-24"
                    />
                </div>

                <div className="flex flex-col">
                <label className="text-sm text-gray-600">Ordenar por</label>
                <select
                    value={orden}
                    onChange={(e) => setOrden(e.target.value)}
                    className="border rounded px-2 py-1"
                >
                    <option value="recientes">Más recientes</option>
                    <option value="descuentoDesc">Mayor descuento</option>
                    <option value="precioAsc">Precio ↑</option>
                    <option value="precioDesc">Precio ↓</option>
                </select>
                </div>

                <div className="ml-auto text-sm text-gray-600">
                {loading ? 'Cargando…' : `${filtradosOrdenados.length} resultados`}
                </div>
            </div>


        <div className="flex flex-wrap gap-4">
            {pageItems.map((p, i) => {
            const key = p._id || p.enlace || `${i}-${p.titulo}`;
            return (
                <div key={key} className="bg-white p-4 shadow rounded w-72">
                <div className="text-xs text-gray-500 mb-1">{p.categoria}</div>
                <h3 className="font-bold text-lg line-clamp-2">{p.titulo}</h3>
                {p.marca && <div className="text-sm text-gray-600">{p.marca}</div>}
                <p className="mt-2">Descuento: {p.descuento}</p>
                {p.precioOriginal && <p className="text-sm text-gray-500"><s>{p.precioOriginal}</s></p>}
                <p className="text-green-600 font-semibold">{p.precioConDescuento}</p>
                {p.precioAliado && <p className="text-blue-500 text-sm">Aliado: {p.precioAliado}</p>}
                <a
                    href={p.enlace}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-blue-600 underline mt-2 inline-block"
                >
                    Ver producto
                </a>
                <div className="text-[11px] text-gray-400 mt-1">
                    Visto: {new Date(p.lastSeenAt || p.timestamp).toLocaleString()}
                </div>
                </div>
            );
            })}
        </div>

        {/* Paginación */}
        {pageCount > 1 && (
            <div className="flex items-center gap-2 justify-center">
            <button
                disabled={page === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ◀
            </button>
            <span className="text-sm">
                Página {page} / {pageCount}
            </span>
            <button
                disabled={page === pageCount}
                onClick={() => setPage((p) => Math.min(pageCount, p + 1))}
                className="px-3 py-1 border rounded disabled:opacity-50"
            >
                ▶
            </button>
            </div>
        )}
        </div>
    );
}
