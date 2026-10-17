import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "本草与经络 · The Neijing Scholar — Bilingual Interactive TCM Explorer",
  description:
    "Explore Traditional Chinese Medicine (中医) through interactive Wu Xing cycles, Zang-Fu systems, 2D/3D Meridian & Acupoint maps, Tongue/Pulse diagnostics, and Classical Herbal Formulas.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
