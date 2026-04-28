import type { Metadata } from "next";
import { Geist, Geist_Mono, Josefin_Sans, Lora, Montserrat } from "next/font/google";
import { SessionProviderWrapper } from "@/components/layout/SessionProviderWrapper";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const josefinSans = Josefin_Sans({
  variable: "--josefin-font",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--lora-font",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--montserrat-font",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Today's Outfit",
  description: "Plan and track your daily outfits",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${josefinSans.variable} ${lora.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
