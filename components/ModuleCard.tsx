"use client";
import { ModuleData } from "@/types";
import TableView from "./TableView";

interface Props {
  module: ModuleData;
  index: number;
  view: string;
  isActive: boolean;
  onClick: () => void;
}

const opBadgeColors: Record<string, string> = {
  INSERT: "bg-emerald-600",
  UPDATE: "bg-amber-600",
  DELETE: "bg-red-600",
  "INS+UPD": "bg-violet-600",
  READ: "bg-sky-600",
};

export default function ModuleCard({ module, index, view, isActive, onClick }: Props) {
  const totalCols = module.tables.reduce((a, t) => a + t.columns.length, 0);

  return (
    <div
      className={`group relative cursor-pointer rounded-2xl border transition-all duration-300 overflow-hidden ${
        isActive
          ? "border-[#3ea8ba] shadow-[0_0_24px_rgba(62,168,186,0.4)] scale-[1.01]"
          : "border-[#1F5C63]/40 hover:border-[#3ea8ba]/60 hover:shadow-[0_0_16px_rgba(62,168,186,0.2)]"
      }`}
      onClick={onClick}
    >
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${module.bgGradient} opacity-20`} />
      <div className="absolute inset-0 bg-[#0d2535]/80" />

      <div className="relative">
        {/* Card Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10"
          style={{ borderLeftColor: module.color, borderLeftWidth: 4 }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shadow-inner"
              style={{ background: module.color + "33", border: `1px solid ${module.color}66` }}>
              {module.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 font-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-white font-bold text-sm">{module.title}</h3>
              </div>
              <p className="text-slate-400 text-xs mt-0.5 leading-tight max-w-xs">{module.description}</p>
            </div>
          </div>
          <div className="text-right shrink-0">
            <div className="text-[#3ea8ba] font-bold text-lg">{module.tables.length}</div>
            <div className="text-slate-500 text-xs">tables</div>
            <div className="text-slate-600 text-xs">{totalCols} cols</div>
          </div>
        </div>

        {/* Business View */}
        {view === "business" && (
          <div className="px-5 py-3">
            <div className="space-y-1.5">
              {module.businessFlow.slice(0, 4).map((step, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                  <span className="text-[#3ea8ba] shrink-0 font-mono">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
              {module.businessFlow.length > 4 && (
                <div className="text-xs text-slate-500 italic">+{module.businessFlow.length - 4} more steps...</div>
              )}
            </div>

            {/* Table names chips */}
            <div className="flex flex-wrap gap-1.5 mt-3">
              {module.tables.map((t) => (
                <span key={t.name}
                  className={`text-xs px-2 py-0.5 rounded-full text-white font-semibold ${opBadgeColors[t.operation] ?? "bg-gray-600"}`}>
                  {t.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Technical View */}
        {view === "technical" && (
          <div className="px-4 py-3 space-y-3 max-h-96 overflow-y-auto scrollbar-thin">
            {module.tables.map((table) => (
              <TableView key={table.name} table={table} headerColor={module.color} />
            ))}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-2 bg-black/20 border-t border-white/5">
          <div className="flex gap-3 text-xs text-slate-500">
            {module.receivesFrom.length > 0 && (
              <span>← {module.receivesFrom.join(", ")}</span>
            )}
          </div>
          <span className="text-xs text-[#3ea8ba] font-semibold group-hover:underline">
            Click for details →
          </span>
          <div className="flex gap-3 text-xs text-slate-500">
            {module.sendsTo.length > 0 && (
              <span>{module.sendsTo.join(", ")} →</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
