import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ERP Production Data Flow",
  description: "Visual ERP database flow — Enquiry to Dispatch",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a1929]">{children}</body>
    </html>
  );
}
