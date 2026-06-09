import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";
import { DemoAccess } from "@/components/layout/demo-access";
import { LeadModalProvider } from "@/components/ui/lead-modal";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Publitek | Marketing automation con IA",
  description:
    "Agentes de ventas y contenido automatizado para hacer crecer tu negocio.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${dmSans.variable} ${fraunces.variable}`}>
        <LeadModalProvider>
          {children}
          <DemoAccess />
        </LeadModalProvider>
      </body>
    </html>
  );
}
