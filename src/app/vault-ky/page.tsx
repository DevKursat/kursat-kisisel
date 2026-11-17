import type { Metadata } from "next";
import VaultDashboardClient from "@/components/VaultDashboardClient";

export const metadata: Metadata = {
  title: "Vault // Kürşat Yılmaz",
  description: "Private operations vault.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function VaultKyPage() {
  return <VaultDashboardClient />;
}
