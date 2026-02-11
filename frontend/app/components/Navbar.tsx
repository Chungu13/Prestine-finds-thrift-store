"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full">
      <nav className="max-w-6xl mx-auto flex justify-between items-center py-8">
        <div className="flex items-center gap-4">
          <img
            src="/Logo.jpeg"
            alt="Prestine Finds"
            className="h-20 w-auto rounded-sm object-cover"
          />
        </div>

        <ul className="flex items-center space-x-8">
          <li>
            <Link
              href="/"
              className="text-lg font-semibold text-gray-800 hover:text-pink-500"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/about"
              className="text-lg font-semibold text-gray-800 hover:text-pink-500"
            >
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* subtle pink divider to separate navbar from content */}
      <div className="w-full">
        <div className="max-w-6xl mx-auto">
          <div className="h-px bg-pink-100 mt-6" />
        </div>
      </div>
    </header>
  );
}
