import clientPromise from "@/lib/mongodb";

export async function GET() {
    try {
        const client = await clientPromise;
        const db = client.db("Descuentos");
        const collection = db.collection("productos");

        const productos = await collection.find({}).toArray();

        const productosSerializados = productos.map(({ _id, ...rest }) => ({
        ...rest,
        id: _id.toString(),
        }));

        return Response.json(productosSerializados);
    } catch (error) {
        console.error("Error en /api/descuentos:", error);
        return new Response(JSON.stringify({ error: "Error interno del servidor" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
        });
    }
}
