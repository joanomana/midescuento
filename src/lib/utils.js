export const parsePrecio = (s) => {
    if (!s) return null;
    const n = Number(String(s).replace(/[^\d]/g, ""));
    return Number.isFinite(n) ? n : null;
};

export const parseDesc = (s) => {
    if (s == null) return 0;
    const n = Number(String(s).replace(/[^\d]/g, ""));
    return Number.isFinite(n) ? n : 0;
};

export const formatCOP = (n) =>
    new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(n);
