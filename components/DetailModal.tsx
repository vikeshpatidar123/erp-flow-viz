"use client";
import { ModuleData } from "@/types";
import TableView from "./TableView";
import { useEffect } from "react";

interface Props {
  module: ModuleData | null;
  onClose: () => void;
}

export default function DetailModal({ module, onClose }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!module) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative bg-[#0d2535] border border-[#1F5C63]/60 rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#1F5C63]/40"
          style={{ background: `linear-gradient(135deg, ${module.color}33, transparent)` }}>
          <div className="flex items-center gap-3">
            <span className="text-3xl">{module.icon}</span>
            <div>
              <h2 className="text-white font-bold text-xl">{module.title}</h2>
              <p className="text-slate-400 text-sm mt-0.5">{module.description}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none transition-colors">×</button>
        </div>

        <div className="overflow-y-auto scrollbar-thin flex-1">
          <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Business Flow */}
            <div className="lg:col-span-1">
              <h3 className="text-[#6ec5d3] font-bold text-sm uppercase tracking-wider mb-3">📋 Business Flow</h3>
              <div className="space-y-2">
                {module.businessFlow.map((step, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-300 bg-[#0a1929]/50 rounded-lg px-3 py-2 border border-white/5">
                    <span className="text-[#3ea8ba] font-bold shrink-0 font-mono text-xs mt-0.5">{String(i + 1).padStart(2, "0")}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>

              {/* Data Flow Connections */}
              <div className="mt-4">
                <h3 className="text-[#6ec5d3] font-bold text-sm uppercase tracking-wider mb-2">🔄 Data Flow</h3>
                {module.receivesFrom.length > 0 && (
                  <div className="text-xs text-slate-400 mb-1">
                    ← Receives from: <span className="text-sky-400 font-semibold">{module.receivesFrom.join(", ")}</span>
                  </div>
                )}
                {module.sendsTo.length > 0 && (
                  <div className="text-xs text-slate-400">
                    → Sends to: <span className="text-emerald-400 font-semibold">{module.sendsTo.join(", ")}</span>
                  </div>
                )}
              </div>

              {/* Sample Data */}
              <div className="mt-4">
                <h3 className="text-[#6ec5d3] font-bold text-sm uppercase tracking-wider mb-2">🧪 Sample Data</h3>
                <pre className="bg-[#0a1929] border border-white/10 rounded-lg p-3 text-xs text-emerald-300 overflow-x-auto scrollbar-thin">
                  {JSON.stringify(module.sampleData, null, 2)}
                </pre>
              </div>
            </div>

            {/* Tables */}
            <div className="lg:col-span-2">
              <h3 className="text-[#6ec5d3] font-bold text-sm uppercase tracking-wider mb-3">🗄️ Database Tables ({module.tables.length})</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {module.tables.map((table) => (
                  <TableView key={table.name} table={table} headerColor={module.color} />
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
