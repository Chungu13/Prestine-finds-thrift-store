"use client";
import Navbar from "../components/Navbar";

export default function AboutPage() {
    return (
        <main className="min-h-screen p-8 bg-white text-gray-900">
            <Navbar />
            <div className="max-w-4xl mx-auto mt-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-gray-900 mb-4">
                        About Pristine Finds
                    </h1>
                    <p className="text-xl text-gray-600 italic">
                        Where pre-loved treasures find new homes
                    </p>
                </div>

                {/* Story Section */}
                <div className="space-y-8 mb-16">
                    <div className="bg-gradient-to-br from-pink-50 to-white p-8 rounded-2xl border border-pink-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Story</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Pristine Finds started in 2021 as a sister-owned side hustle. While I
                            was waiting to start university and my sister was finishing up her degree,
                            we launched what was then called Thrift_Addicts_ZM. What began as a way to
                            make some extra money quickly turned into something we're truly passionate about.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            Today, we specialize in quality pre-loved women's clothing that doesn't
                            break the bank. Every piece is carefully selected to ensure our customers
                            get great value, no matter their budget.
                        </p>
                    </div>

                    {/* Mission Section */}
                    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-100">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">
                            Our mission is simple: to sell great quality, affordable women's clothes
                            that everyone can access. Whether you're a student on a tight budget,
                            someone looking for a deal, or just love finding unique pieces at reasonable
                            prices, we've got you covered.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            We believe fashion shouldn't be out of reach. That's why we keep our prices
                            low and our selection diverse, so anyone, students, working professionals,
                            or anyone in between can shop with confidence.
                        </p>
                    </div>
                </div>

                {/* Values Section */}
                <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                        What We Stand For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-pink-200 transition-colors">
                            <div className="text-4xl mb-4"> </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Affordability</h3>
                            <p className="text-gray-600 text-sm">
                                Quality fashion at prices everyone can afford, from students to
                                professionals, our doors are open to all budgets.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-pink-200 transition-colors">
                            <div className="text-4xl mb-4"> </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
                            <p className="text-gray-600 text-sm">
                                Every item is carefully inspected and selected. We only sell pieces
                                we'd be happy to wear ourselves.
                            </p>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-gray-100 hover:border-pink-200 transition-colors">
                            <div className="text-4xl mb-4"> </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Variety</h3>
                            <p className="text-gray-600 text-sm">
                                A wide range of women's clothing styles and sizes, ensuring there's
                                something for everyone who walks through our (digital) doors.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="bg-gradient-to-br from-pink-50 to-white border-0 border-pink-300 p-10 rounded-2xl text-center">                   <h2 className="text-3xl font-bold mb-4">Ready to Find Your Next Favorite Outfit?</h2>
                    <p className="text-lg mb-6 opacity-90">
                        Browse our collection of affordable, quality women's clothing.
                        New pieces added regularly!
                    </p>

                    <a
                        href="/"
                        className="inline-block bg-white border-2 border-pink-600 text-pink-600 font-bold px-10 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                    >
                        Start Shopping
                    </a>

                </div>
            </div>
        </main >
    );
}