"use client";

import React from "react";
import { useQuery, useMutation } from "@apollo/client/react";
import { useRouter, useParams } from "next/navigation";
import { GET_PRODUCT_BY_ID } from "@/lib/graphql/queries/products";
import { UPDATE_PRODUCT } from "@/lib/graphql/mutations/products";
import ProductForm from "../../ProductForm";

interface ProductData {
    product: {
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
    };
}

export default function EditProductPage() {
    const router = useRouter();
    const { id } = useParams();

    const { data, loading: queryLoading, error } = useQuery<ProductData>(GET_PRODUCT_BY_ID, {
        variables: { id },
    });

    const [updateProduct, { loading: mutationLoading }] = useMutation(UPDATE_PRODUCT);

    const handleSubmit = async (formData: any) => {
        try {
            await updateProduct({
                variables: {
                    id,
                    ...formData,
                    price: parseFloat(formData.price),
                },
            });
            router.push("/admin/products");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Failed to update product. Check console for details.");
        }
    };

    if (queryLoading) return <div className="flex justify-center p-12">Loading details...</div>;
    if (error) return <div className="p-12 text-red-500">Error: {error.message}</div>;
    if (!data?.product) return <div className="p-12 text-gray-500">Product not found.</div>;

    return (
        <div className="py-6">
            <ProductForm
                title="Refine Item Details"
                initialData={data.product}
                onSubmit={handleSubmit}
                loading={mutationLoading}
            />
        </div>
    );
}
