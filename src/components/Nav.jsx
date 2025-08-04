export default function Nav() {
    return (
        <div className="flex justify-between items-center p-4 bg-blue-500 text-white h-20">
            <div className="flex items-center space-x-2">
                <p>Logo</p>
                <h1 className="text-lg font-bold">Mi Descuento</h1>
            </div>
            <div className="flex items-center gap-5">
                <a href="/" className="hover:underline">Home</a>
                <a href="/about" className="hover:underline">About</a>
            </div>
            <div className="flex items-center space-x-4">
                <a href="/contact" className="hover:underline">Contact</a>
            </div>
        </div>
    );
}