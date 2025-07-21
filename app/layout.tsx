import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Menu from "@/components/Menu";
import { FeedbackButton } from "@/components/FeedBackButton";
import { getSupabaseUser } from "@/lib/supabase/getUser";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getSupabaseUser();

  return (
    <html lang="fr" className="h-full">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full max-w-full overflow-x-hidden`}
      >
        <div className="flex flex-col h-full">
          <header className="p-4">
            {user && (
              <Menu />
            )}
          </header>

          <main className="flex-grow">{children}</main>

          <footer className="text-center text-xs text-gray-500 border-t p-10">
            <div className="flex flex-row justify-evenly items-center">
              <div>© Let Me Cook by Vassou Aroun - 2025</div>
              <div className="flex">
                <FeedbackButton />
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
