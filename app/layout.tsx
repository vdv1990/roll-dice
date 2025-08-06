import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import Link from 'next/link'; // Import the Link component
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Roll Dice Game",
  description: "A fun dice game built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <Analytics />
        <SpeedInsights />
        <nav className="bg-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <div className="flex space-x-8">
                {/* Replace <a> with <Link> */}
                <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Home
                </Link>
                {/* Replace <a> with <Link> */}
                <Link href="/games" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">
                  Games
                </Link>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}