"use client";

import { useQuery } from "@apollo/client/react";
import { GET_ALL_PRODUCTS } from "@/lib/graphql/queries/products";
import { CURRENCY_SYMBOL } from "@/lib/constants";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string | null;
  size: string;
  condition: string;
  available: boolean;
}

interface GetAllProductsData {
  allProducts: Product[];
}

interface ProductListProps {
  search: string;
  category: string;
  condition?: string;
  sortBy?: string;
  available?: boolean;
}

export default function ProductList({
  search,
  category,
  condition,
  sortBy,
  available,
}: ProductListProps) {
  const { loading, error, data } = useQuery<GetAllProductsData>(
    GET_ALL_PRODUCTS,
    {
      variables: { search, category, condition, sortBy, available },
    },
  );

  if (loading) return <p className="p-10 text-center">Loading...</p>;
  if (error)
    return (
      <p className="p-10 text-center text-red-500">Error: {error.message}</p>
    );
  if (!data) return null;

  return (
    /* 1. THE GRID CONTAINER */
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-6">
      {data?.allProducts.map((product: Product) => (
        /* 2. THE CARD (Refactored for Thrift Aesthetic) */
        <div
          key={product.id}
          className="group bg-[#FDFDFD] border border-gray-100 overflow-hidden transition-all duration-300 hover:border-gray-300"
        >
          {/* 3. PRODUCT IMAGE */}
          <div className="aspect-[3/4] w-full bg-[#F5F5F5] relative overflow-hidden">
            {product.image ? (
              <img
                src={`http://localhost:8000${product.image}`}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs tracking-widest uppercase">
                No Image
              </div>
            )}

            {/* Elegant Badges */}
            <div className="absolute bottom-3 left-3 flex gap-2">
              <span className="bg-white/90 backdrop-blur-sm text-[10px] uppercase tracking-tighter px-2 py-0.5 border border-gray-200 text-gray-600 font-semibold">
                {product.size}
              </span>
              <span
                className={`text-[10px] uppercase tracking-tighter px-2 py-0.5 border font-semibold ${product.available
                  ? "bg-green-100 border-green-300 text-green-700"
                  : "bg-red-100 border-red-300 text-red-700"
                  }`}
              >
                {product.available ? "Available" : "Sold"}
              </span>
            </div>
          </div>

          {/* 4. DETAILS SECTION */}
          <div className="p-4 bg-white">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-sm font-medium text-gray-900 tracking-tight">
                {product.name}
              </h3>
              <span className="text-sm font-semibold text-gray-900">
                {CURRENCY_SYMBOL}{product.price}
              </span>
            </div>

            {/* Subtle Condition Text */}
            <p className="text-[12px] text-gray-500 italic mb-4">
              {product.condition} condition
            </p>

            {/* Minimalist Action */}
            <button className="w-full py-2 text-[12px] uppercase tracking-widest border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors duration-300">
              Add to Bag
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
