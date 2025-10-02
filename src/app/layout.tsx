import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { LanguageProvider } from "@/contexts/language-context";
import { ChatButton } from "@/components/chat/ChatButton";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Segoe UI is system font, no need to import

export const metadata: Metadata = {
  title: "Vision Marine - Treinamento Marítimo",
  description: "Plataforma de treinamento marítimo especializada em capacitação profissional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background font-sans antialiased`}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-20">{children}</main>

            {/* Chat de Suporte Flutuante */}
            <ChatButton />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
