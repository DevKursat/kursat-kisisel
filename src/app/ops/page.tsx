import type { Metadata } from "next";
import OpsDashboardClient from "@/components/OpsDashboardClient";

export const metadata: Metadata = {
  title: "Mission Control // Kürşat Yılmaz",
  description: "Private operations and social engagement telemetry.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function OpsPage() {
  return <OpsDashboardClient />;
}
