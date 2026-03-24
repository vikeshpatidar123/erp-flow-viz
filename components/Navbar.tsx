"use client";
import Link from "next/link";

export default function Navbar({ view, setView }: { view: string; setView: (v: string) => void }) {
  return (
    <nav className="sticky top-0 z-50 bg-[#0d3b42] border-b border-[#1F5C63]/50 shadow-lg">
      <div className="max-w-screen-2xl mx-auto px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#1F5C63] flex items-center justify-center text-lg">🏭</div>
          <div>
            <div className="text-white font-bold text-base leading-tight">ERP Production Flow</div>
            <div className="text-[#6ec5d3] text-xs">Database Flow Visualizer</div>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-[#0a1929]/60 rounded-xl p-1 border border-[#1F5C63]/30">
          <button
            onClick={() => setView("business")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              view === "business"
                ? "bg-[#1F5C63] text-white shadow"
                : "text-[#6ec5d3] hover:text-white hover:bg-[#1F5C63]/30"
            }`}
          >
            💼 Business View
          </button>
          <button
            onClick={() => setView("technical")}
            className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${
              view === "technical"
                ? "bg-[#1F5C63] text-white shadow"
                : "text-[#6ec5d3] hover:text-white hover:bg-[#1F5C63]/30"
            }`}
          >
            🛠 Technical View
          </button>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-[#1F5C63] hover:bg-[#236b73] text-white text-sm font-bold rounded-lg border border-[#3ea8ba]/40 transition-all"
        >
          ⬇ Export PDF
        </button>
      </div>
    </nav>
  );
}
