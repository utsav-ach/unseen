import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import CustomScrollbar from "@/components/CustomScrollbar";

const inter = Inter({
    subsets: ["latin"],
    variable: '--font-inter',
});

const playfair = Playfair_Display({
    weight: ['400', '700'],
    subsets: ["latin"],
    variable: '--font-playfair',
});

export const metadata: Metadata = {
    title: "Unseen Nepal - Discover Hidden Treasures of Nepal",
    description: "Discover hidden gems and untold stories of Nepal. Share your travel experiences, find trekking guides, and explore destinations off the beaten path.",
    keywords: "Nepal travel, hidden destinations, trekking guides, travel stories, Nepal tourism, adventure travel, Himalayas, Everest, Annapurna",
    authors: [{ name: "Unseen Nepal" }],
    openGraph: {
        title: "Unseen Nepal - Discover Hidden Treasures",
        description: "Share and discover amazing travel stories from Nepal's hidden destinations",
        type: "website",
        url: "https://unseennepal.com",
        siteName: "Unseen Nepal",
        images: [
            {
                url: "https://unseennepal.com/assets/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Unseen Nepal",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Unseen Nepal - Discover Hidden Treasures",
        description: "Share and discover amazing travel stories from Nepal's hidden destinations",
        images: ["https://unseennepal.com/assets/twitter-card.jpg"],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.variable} ${playfair.variable} font-body antialiased`}>
                <CustomScrollbar />
                {children}
            </body>
        </html>
    );
}
