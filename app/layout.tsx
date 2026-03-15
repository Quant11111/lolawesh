import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "~*~ Le SkYbLoG de LoLa ~*~ xXx",
  description: "Bienvenue sur mon skyblog trop stylé, lâche des coms !!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
