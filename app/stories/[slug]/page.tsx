import { notFound } from "next/navigation";
import { stories } from "@/data/stories";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Clock, User, Calendar, Tag, ArrowLeft } from "lucide-react";
import * as LucideIcons from "lucide-react";

export async function generateStaticParams() {
    return stories.map((story) => ({
        slug: story.slug,
    }));
}

export default function StoryPage({ params }: { params: { slug: string } }) {
    const story = stories.find(s => s.slug === params.slug);

    if (!story) {
        notFound();
    }

    const IconComponent = (LucideIcons as any)[story.iconName] || LucideIcons.BookOpen;

    // Get related stories (same category, excluding current)
    const relatedStories = stories
        .filter(s => s.category === story.category && s.id !== story.id)
        .slice(0, 3);

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="relative h-[60vh] overflow-hidden">
                    <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />

                    <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                        <div className="max-w-4xl">
                            {/* Back Button */}
                            <Link
                                href="/stories"
                                className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors"
                            >
                                <ArrowLeft className="w-4 h-4" />
                                <span className="text-sm">Back to Stories</span>
                            </Link>

                            {/* Category Badge */}
                            <div className="mb-4">
                                <span className="inline-block bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-900">
                                    {story.category}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 drop-shadow-2xl">
                                {story.title}
                            </h1>

                            {/* Meta Info */}
                            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90 text-sm">
                                <div className="flex items-center gap-2">
                                    <User className="w-4 h-4" />
                                    <span>{story.author}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{story.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{story.readTime}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 px-4">
                    <div className="max-w-4xl mx-auto">
                        {/* Author Card */}
                        <div className="flex items-center gap-4 mb-12 p-6 bg-gray-50 rounded-2xl">
                            <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                                <Image
                                    src={story.authorImage}
                                    alt={story.author}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900 text-lg">{story.author}</p>
                                <p className="text-gray-600">Travel Writer & Adventurer</p>
                            </div>
                        </div>

                        {/* Story Content */}
                        <div className="prose prose-lg max-w-none">
                            <p className="text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                                {story.excerpt}
                            </p>

                            <div className="text-gray-700 leading-relaxed space-y-6">
                                {story.content.split('\n\n').map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                            </div>
                        </div>

                        {/* Tags */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {story.tags.map((tag, index) => (
                                    <span
                                        key={index}
                                        className="inline-flex items-center gap-1 text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition-colors cursor-pointer"
                                    >
                                        <Tag className="w-3 h-3" />
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Share Section */}
                        <div className="mt-12 pt-8 border-t border-gray-200">
                            <h3 className="text-sm font-semibold text-gray-900 mb-4">Share this story</h3>
                            <div className="flex gap-3">
                                <button className="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-medium hover:bg-blue-700 transition-colors">
                                    Facebook
                                </button>
                                <button className="px-4 py-2 bg-blue-400 text-white rounded-full text-sm font-medium hover:bg-blue-500 transition-colors">
                                    Twitter
                                </button>
                                <button className="px-4 py-2 bg-gray-800 text-white rounded-full text-sm font-medium hover:bg-gray-900 transition-colors">
                                    Copy Link
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Related Stories */}
                {relatedStories.length > 0 && (
                    <section className="py-20 px-4 bg-gray-50">
                        <div className="max-w-7xl mx-auto">
                            <h2 className="text-4xl font-heading font-bold text-primary mb-12 text-center">
                                More {story.category} Stories
                            </h2>
                            <div className="grid md:grid-cols-3 gap-8">
                                {relatedStories.map((relatedStory) => {
                                    const RelatedIcon = (LucideIcons as any)[relatedStory.iconName] || LucideIcons.BookOpen;
                                    return (
                                        <Link
                                            key={relatedStory.id}
                                            href={`/stories/${relatedStory.slug}`}
                                            className="group"
                                        >
                                            <article className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
                                                <div className="relative h-48">
                                                    <Image
                                                        src={relatedStory.image}
                                                        alt={relatedStory.title}
                                                        fill
                                                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />
                                                    <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
                                                        <RelatedIcon className="w-6 h-6" style={{ color: relatedStory.color }} />
                                                    </div>
                                                </div>
                                                <div className="p-6">
                                                    <h3 className="text-xl font-heading font-bold text-gray-900 mb-2 group-hover:text-accent transition-colors">
                                                        {relatedStory.title}
                                                    </h3>
                                                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                                        {relatedStory.excerpt}
                                                    </p>
                                                    <div className="flex items-center gap-2 text-xs text-gray-500">
                                                        <Clock className="w-3 h-3" />
                                                        <span>{relatedStory.readTime}</span>
                                                    </div>
                                                </div>
                                            </article>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                )}
            </main>
            <Footer />
        </>
    );
}
