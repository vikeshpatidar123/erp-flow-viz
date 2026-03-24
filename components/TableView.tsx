import { DBTable } from "@/types";

const opColors: Record<string, string> = {
  INSERT: "bg-emerald-700/80 text-emerald-100",
  UPDATE: "bg-amber-700/80 text-amber-100",
  DELETE: "bg-red-700/80 text-red-100",
  "INS+UPD": "bg-violet-700/80 text-violet-100",
  READ: "bg-sky-700/80 text-sky-100",
};

export default function TableView({ table, headerColor }: { table: DBTable; headerColor: string }) {
  return (
    <div className="rounded-xl overflow-hidden border border-white/10 shadow-lg">
      <div className="flex items-center justify-between px-3 py-2" style={{ background: headerColor + "cc" }}>
        <span className="text-white font-bold text-sm">{table.name}</span>
        <span className={`text-xs font-bold px-2 py-0.5 rounded ${opColors[table.operation] ?? "bg-gray-600 text-white"}`}>
          {table.operation}
        </span>
      </div>
      <div className="bg-[#0a1929]/70 divide-y divide-white/5 max-h-64 overflow-y-auto scrollbar-thin">
        {table.columns.map((col) => (
          <div key={col.name} className="flex items-start gap-2 px-3 py-1.5 hover:bg-white/5 transition-colors">
            <span className="text-xs mt-0.5 shrink-0">
              {col.isPK ? "🔑" : col.isFK ? "🔗" : "•"}
            </span>
            <div className="flex-1 min-w-0">
              <span className={`text-xs font-mono font-semibold ${col.isPK ? "text-yellow-300" : col.isFK ? "text-sky-300" : "text-slate-200"}`}>
                {col.name}
              </span>
              <span className="text-xs text-slate-500 ml-2 font-mono">{col.type}</span>
              {col.fkRef && (
                <div className="text-xs text-sky-500/80 mt-0.5">→ {col.fkRef}</div>
              )}
              {col.description && (
                <div className="text-xs text-slate-500 italic mt-0.5">{col.description}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
