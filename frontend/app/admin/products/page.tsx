"use client";

import React from "react";
import Link from "next/link";
import { useQuery, useMutation } from "@apollo/client/react";
import { GET_ALL_PRODUCTS } from "@/lib/graphql/queries/products";
import { DELETE_PRODUCT } from "@/lib/graphql/mutations/products";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface Product {
    id: string;
    name: string;
    description: string;
    price: string;
    size: string;
    condition: string;
    image: string | null;
    category: {
        id: string;
        name: string;
    } | null;
}

interface GetAllProductsData {
    allProducts: Product[];
}

export default function AdminProductsPage() {
    const { loading, error, data, refetch } = useQuery<GetAllProductsData>(GET_ALL_PRODUCTS);
    const [deleteProduct] = useMutation(DELETE_PRODUCT, {
        onCompleted: () => refetch(),
    });

    if (loading) return <div className="flex justify-center p-12">Loading products...</div>;
    if (error) return <div className="p-12 text-red-500">Error: {error.message}</div>;

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            try {
                await deleteProduct({ variables: { id } });
            } catch (err) {
                console.error("Delete failed:", err);
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 font-serif">Inventory</h1>
                    <p className="text-gray-500 mt-2">Manage your thrift store products and listings.</p>
                </div>
                <Link
                    href="/admin/products/new"
                    className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:bg-gray-800 transition-all shadow-md active:scale-95"
                >
                    Add New Product
                </Link>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm shadow-black/5">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50/50 text-gray-500 uppercase text-[10px] tracking-widest font-bold border-b border-gray-100">
                            <th className="px-6 py-4">Product</th>
                            <th className="px-6 py-4">Category</th>
                            <th className="px-6 py-4">Price</th>
                            <th className="px-6 py-4">Condition</th>
                            <th className="px-6 py-4">Size</th>
                            <th className="px-6 py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                        {data?.allProducts.map((product) => (
                            <tr key={product.id} className="hover:bg-gray-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-12 h-12 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-200">
                                            {product.image ? (
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-gray-300">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-gray-900 group-hover:text-black">{product.name}</div>
                                            <div className="text-xs text-gray-400 line-clamp-1 max-w-[200px]">{product.description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 text-[11px] font-bold uppercase tracking-wider">
                                        {product.category?.name || "Uncategorized"}
                                    </span>
                                </td>
                                <td className="px-6 py-4 font-medium text-gray-900">{CURRENCY_SYMBOL}{product.price}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2 py-1 rounded-md text-[11px] font-bold uppercase tracking-wider ${product.condition === 'NEW' ? 'text-green-600 bg-green-50' :
                                        product.condition === 'EXCELLENT' ? 'text-blue-600 bg-blue-50' :
                                            'text-amber-600 bg-amber-50'
                                        }`}>
                                        {product.condition}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-gray-600 font-medium">{product.size}</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex justify-end space-x-2">
                                        <Link
                                            href={`/admin/products/${product.id}/edit`}
                                            className="p-2 text-gray-400 hover:text-black transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-5M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
                                            </svg>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(product.id)}
                                            className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {data?.allProducts.length === 0 && (
                    <div className="p-20 text-center">
                        <div className="text-gray-400 mb-4 flex justify-center">
                            <svg className="w-16 h-16 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900">No products yet</h3>
                        <p className="text-gray-500 mt-1">Start by adding your first thrift item.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
