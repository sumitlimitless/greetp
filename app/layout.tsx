import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Greetp",
  description: "Greetp the social media app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </head>
        <body className={`${inter.className} min-h-screen flex flex-col`}>
          <Navbar user={undefined} />
          <div className="md:bg-gray-100 flex-1 w-full">
            <main className="max-w-6xl mx-auto">
              {children}
            </main>
            <Toaster position="top-right" />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}