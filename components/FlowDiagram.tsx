"use client";
import { useState } from "react";
import { modules, moduleOrder } from "@/data/modules";
import ModuleCard from "./ModuleCard";
import DetailModal from "./DetailModal";
import { ModuleData } from "@/types";
import Navbar from "./Navbar";

export default function FlowDiagram() {
  const [view, setView] = useState<string>("business");
  const [activeModule, setActiveModule] = useState<ModuleData | null>(null);

  const orderedModules = moduleOrder.map((id) => modules.find((m) => m.id === id)!).filter(Boolean);

  return (
    <div className="min-h-screen bg-[#0a1929]">
      <Navbar view={view} setView={setView} />

      {/* Page Header */}
      <div className="max-w-screen-2xl mx-auto px-6 pt-8 pb-4">
        <h1 className="text-2xl font-bold text-white">Database Flow</h1>
        <p className="text-slate-400 text-sm mt-1">
          End-to-end ERP production lifecycle — {orderedModules.length} modules, {orderedModules.reduce((a, m) => a + m.tables.length, 0)} tables
        </p>

        {/* Flow Step Indicator */}
        <div className="flex items-center flex-wrap gap-0 mt-4 p-3 bg-[#0d2535] rounded-xl border border-[#1F5C63]/30 overflow-x-auto">
          {orderedModules.map((mod, i) => (
            <div key={mod.id} className="flex items-center">
              <button
                onClick={() => setActiveModule(mod)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold text-white hover:bg-[#1F5C63]/40 transition-all whitespace-nowrap"
                style={{ color: mod.color }}
              >
                <span>{mod.icon}</span>
                <span className="text-white">{mod.title}</span>
              </button>
              {i < orderedModules.length - 1 && (
                <div className="flex items-center mx-1">
                  <div className="flex gap-0.5">
                    <div className="w-1 h-1 rounded-full bg-[#3ea8ba]/60 flow-arrow-animate" style={{ animationDelay: "0ms" }} />
                    <div className="w-1 h-1 rounded-full bg-[#3ea8ba]/60 flow-arrow-animate" style={{ animationDelay: "200ms" }} />
                    <div className="w-1 h-1 rounded-full bg-[#3ea8ba]/60 flow-arrow-animate" style={{ animationDelay: "400ms" }} />
                  </div>
                  <span className="text-[#3ea8ba] ml-0.5">›</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Module Cards Grid */}
      <div className="max-w-screen-2xl mx-auto px-6 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {orderedModules.map((mod, i) => (
            <div key={mod.id} className="flex flex-col gap-2">
              {/* Arrow connector (hidden for small screens, shown for xl) */}
              {i > 0 && i % 4 === 0 && (
                <div className="hidden xl:flex items-center justify-center col-span-4 my-2">
                  <div className="flex items-center gap-2 text-[#3ea8ba]">
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#3ea8ba] to-transparent" />
                    <span className="text-lg">↓</span>
                    <div className="h-px w-32 bg-gradient-to-r from-transparent via-[#3ea8ba] to-transparent" />
                  </div>
                </div>
              )}
              <ModuleCard
                module={mod}
                index={i}
                view={view}
                isActive={activeModule?.id === mod.id}
                onClick={() => setActiveModule(activeModule?.id === mod.id ? null : mod)}
              />
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-8 p-4 bg-[#0d2535] rounded-xl border border-[#1F5C63]/30">
          <h3 className="text-[#6ec5d3] text-xs font-bold uppercase tracking-wider mb-3">Legend</h3>
          <div className="flex flex-wrap gap-4 text-xs">
            <span className="flex items-center gap-1.5"><span>🔑</span><span className="text-yellow-300">Primary Key (PK)</span></span>
            <span className="flex items-center gap-1.5"><span>🔗</span><span className="text-sky-300">Foreign Key (FK)</span></span>
            <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold">INSERT</span></span>
            <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded bg-amber-600 text-white font-bold">UPDATE</span></span>
            <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded bg-red-600 text-white font-bold">DELETE</span></span>
            <span className="flex items-center gap-1.5"><span className="px-1.5 py-0.5 rounded bg-violet-600 text-white font-bold">INS+UPD</span></span>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal module={activeModule} onClose={() => setActiveModule(null)} />
    </div>
  );
}
