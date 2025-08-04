'use client';

import { useEffect, useState } from "react";

export default function Descuentos() {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const cargar = async () => {
        const res = await fetch("/api/descuentos");
        const data = await res.json();
        setProductos(data);
        };
        cargar();
    }, []);

    return (
        <div className="flex flex-wrap gap-4">
        {productos.map((p, i) => (
            <div key={i} className="bg-white p-4 shadow rounded w-72">
            <h3 className="font-bold text-lg">{p.titulo}</h3>
            <p>Descuento: {p.descuento}</p>
            <p><s>{p.precioOriginal}</s></p>
            <p className="text-green-600">{p.precioConDescuento}</p>
            {p.precioAliado && (
                <p className="text-blue-500">Aliado: {p.precioAliado}</p>
            )}
            <a href={p.enlace} target="_blank" className="text-sm text-blue-600 underline">Ver producto</a>
            </div>
        ))}
        </div>
    );
}
