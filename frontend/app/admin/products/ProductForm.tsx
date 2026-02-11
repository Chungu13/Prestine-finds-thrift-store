"use client";

import React, { useState } from "react";
import { useQuery } from "@apollo/client/react";
import { GET_ALL_CATEGORIES } from "@/lib/graphql/queries/categories";
import Link from "next/link";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface ProductFormProps {
    initialData?: any;
    onSubmit: (data: any) => Promise<void>;
    loading: boolean;
    title: string;
}

const CONDITION_CHOICES = [
    { value: "NEW", label: "Brand New" },
    { value: "EXCELLENT", label: "Like New" },
    { value: "GOOD", label: "Gently Used" },
    { value: "FAIR", label: "Worn but functional" },
];

const SIZE_CHOICES = [
    { value: "S", label: "Small" },
    { value: "M", label: "Medium" },
    { value: "L", label: "Large" },
    { value: "XL", label: "Extra Large" },
];

interface Category {
    id: string;
    name: string;
    slug: string;
}

interface GetAllCategoriesData {
    allCategories: Category[];
}

export default function ProductForm({
    initialData,
    onSubmit,
    loading,
    title,
}: ProductFormProps) {
    const { data: categoryData } = useQuery<GetAllCategoriesData>(GET_ALL_CATEGORIES);
    const [formData, setFormData] = useState({
        name: initialData?.name || "",
        description: initialData?.description || "",
        price: initialData?.price || "",
        categoryId: initialData?.category?.id || "",
        size: initialData?.size || "M",
        condition: initialData?.condition || "GOOD",
        image: initialData?.image || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-8">
                <Link href="/admin/products" className="text-gray-400 hover:text-black transition-colors flex items-center mb-4 text-sm font-medium">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Listings
                </Link>
                <h1 className="text-3xl font-bold text-gray-900 font-serif">{title}</h1>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-6 md:col-span-2">
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Product Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-300"
                                    placeholder="e.g. Vintage 90s Denim Jacket"
                                />
                            </div>
                            <div>
                                <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-300 resize-none"
                                    placeholder="Describe the item's features, history, or quirks..."
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Price ({CURRENCY_SYMBOL})</label>
                            <input
                                type="number"
                                name="price"
                                step="0.01"
                                value={formData.price}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all"
                                placeholder="0.00"
                            />
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Category</label>
                            <select
                                name="categoryId"
                                value={formData.categoryId}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all appearance-none"
                            >
                                <option value="">Select a Category</option>
                                {categoryData?.allCategories.map((cat: any) => (
                                    <option key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Condition</label>
                            <select
                                name="condition"
                                value={formData.condition}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all appearance-none"
                            >
                                {CONDITION_CHOICES.map((c) => (
                                    <option key={c.value} value={c.value}>
                                        {c.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Size</label>
                            <select
                                name="size"
                                value={formData.size}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all appearance-none"
                            >
                                {SIZE_CHOICES.map((s) => (
                                    <option key={s.value} value={s.value}>
                                        {s.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-black/5 outline-none transition-all placeholder:text-gray-300"
                                placeholder="https://images.unsplash.com/..."
                            />
                            <p className="text-[10px] text-gray-400 mt-2 font-medium">FOR NOW, PLEASE PROVIDE A DIRECT IMAGE URL. WE WILL ADD FILE UPLOAD LATER.</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <Link
                        href="/admin/products"
                        className="px-8 py-4 rounded-xl font-bold text-[13px] uppercase tracking-widest text-gray-400 hover:text-black transition-all"
                    >
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-10 py-4 rounded-xl bg-black text-white font-bold text-[13px] uppercase tracking-widest hover:bg-gray-800 transition-all shadow-xl shadow-black/10 active:scale-95 disabled:opacity-50"
                    >
                        {loading ? "Processing..." : initialData ? "Update Product" : "Create Product"}
                    </button>
                </div>
            </form>
        </div>
    );
}
