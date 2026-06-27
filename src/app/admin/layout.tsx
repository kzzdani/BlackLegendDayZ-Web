import type { Metadata } from "next";
import { Saira_Condensed, Chakra_Petch } from "next/font/google";
import "../globals.css";

const saira = Saira_Condensed({
  variable: "--font-saira",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const chakra = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Panel · Black Legend DayZ",
  robots: { index: false, follow: false },
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${saira.variable} ${chakra.variable} antialiased`}>
      <body className="min-h-screen bg-void text-bone">{children}</body>
    </html>
  );
}
