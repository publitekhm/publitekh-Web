import type { Metadata } from "next";
import { AppShell } from "@/components/dashboard/app-shell";

export const metadata: Metadata = {
  title: "Dashboard Demo | Publitek",
  description: "Prototipo visual del dashboard comercial de Publitek.",
};

export default function DashboardDemoPage() {
  return <AppShell />;
}

