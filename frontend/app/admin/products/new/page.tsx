"use client";

import React from "react";
import { useMutation } from "@apollo/client/react";
import { useRouter } from "next/navigation";
import { CREATE_PRODUCT } from "@/lib/graphql/mutations/products";
import ProductForm from "../ProductForm";

export default function NewProductPage() {
    const router = useRouter();
    const [createProduct, { loading }] = useMutation(CREATE_PRODUCT);

    const handleSubmit = async (formData: any) => {
        try {
            await createProduct({
                variables: {
                    ...formData,
                    price: parseFloat(formData.price),
                },
            });
            router.push("/admin/products");
        } catch (err) {
            console.error("Create failed:", err);
            alert("Failed to create product. Check console for details.");
        }
    };

    return (
        <div className="py-6">
            <ProductForm
                title="Curate New Item"
                onSubmit={handleSubmit}
                loading={loading}
            />
        </div>
    );
}
