import React from "react";
import Link from "next/link";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
                <div className="p-6 border-b border-gray-100">
                    <Link href="/" className="text-2xl font-bold tracking-tighter text-black">
                        THRIFT<span className="text-gray-400">STORE</span>
                    </Link>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-widest font-semibold">
                        Admin Panel
                    </p>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    <Link
                        href="/admin/products"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl bg-black text-white transition-all shadow-lg shadow-black/5"
                    >
                        <span>Products</span>
                    </Link>
                    <Link
                        href="/admin/categories"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium"
                    >
                        <span>Categories</span>
                    </Link>
                    <Link
                        href="/admin/orders"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium"
                    >
                        <span>Orders</span>
                    </Link>
                </nav>
                <div className="p-4 border-t border-gray-100">
                    <Link
                        href="/"
                        className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-gray-100 transition-all font-medium"
                    >
                        <span>Back to Store</span>
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <header className="h-20 bg-white border-b border-gray-100 px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md bg-white/80">
                    <h2 className="text-xl font-semibold text-gray-800">Administrator</h2>
                    <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-gray-200 to-gray-50 border border-gray-100" />
                    </div>
                </header>
                <div className="p-8 max-w-7xl mx-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
