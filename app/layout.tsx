import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "@/components/Menu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Let Me Cook",
  description: "Application de recommandation de recette de cuisine",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full overflow-auto`}
      >
        <div className="flex flex-col h-full">
          <header className="p-4">
            <Menu />
          </header>
          
          <main className="flex-grow">{children}</main>

          <footer className="text-center text-xs text-gray-500 border-t p-10">
            © Let Me Cook by Vassou Aroun - 2025
          </footer>
        </div>
      </body>
    </html>
  );
}
