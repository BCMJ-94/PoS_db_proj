import { useEffect, useState } from "react";
import NavBar from "../../routes/NavBar";
import { getProducts, deleteProduct } from "../../api/getProducts";

export default function Products() {
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        getProducts()
            .then(data => setProducts(data))
            .catch(err => setError(err.message));
    }, []);

    const handleDelete = async (productID, _name) => {
        try {
            await deleteProduct(productID, _name);
            setProducts(prev => prev.filter(p => p.productID !== productID));
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <>
            <NavBar />
            <div className="flex flex-col items-center py-10 bg-[rgb(206,226,240)] min-h-screen">
                <div className="bg-[rgb(248,247,246)] rounded-2xl px-10 py-8 shadow w-full max-w-4xl">
                    <h1 className="font-bold text-4xl text-[#5eb5f3a6] mb-6">Products</h1>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="border-b border-gray-300">
                                <th className="py-2 px-4">ID</th>
                                <th className="py-2 px-4">Name</th>
                                <th className="py-2 px-4">Price</th>
                                <th className="py-2 px-4">Menu Type</th>
                                <th className="py-2 px-4">Available</th>
                                <th className="py-2 px-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => (
                                <tr key={product.productID} className="border-b border-gray-200">
                                    <td className="py-2 px-4">{product.productID}</td>
                                    <td className="py-2 px-4">{product._name}</td>
                                    <td className="py-2 px-4">${product.price}</td>
                                    <td className="py-2 px-4">{product.menuType}</td>
                                    <td className="py-2 px-4">{product.isAvailable ? "Yes" : "No"}</td>
                                    <td className="py-2 px-4">
                                        <button
                                            onClick={() => handleDelete(product.productID, product._name)}
                                            className="bg-red-400 text-white font-bold px-3 py-1 rounded-md"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    {products.length === 0 && !error && (
                        <p className="text-center text-gray-400 mt-4">No products found.</p>
                    )}
                </div>
            </div>
        </>
    );
}