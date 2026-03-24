import { modules } from "@/data/modules";
import { notFound } from "next/navigation";
import TableView from "@/components/TableView";
import Link from "next/link";

export function generateStaticParams() {
  return modules.map((m) => ({ module: m.id }));
}

export default function ModulePage({ params }: { params: { module: string } }) {
  const mod = modules.find((m) => m.id === params.module);
  if (!mod) notFound();

  return (
    <div className="min-h-screen bg-[#0a1929] p-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/database-flow" className="text-[#3ea8ba] text-sm hover:underline mb-4 inline-block">
          ← Back to Flow
        </Link>
        <div className="flex items-center gap-4 mb-6">
          <span className="text-5xl">{mod.icon}</span>
          <div>
            <h1 className="text-3xl font-bold text-white">{mod.title}</h1>
            <p className="text-slate-400 mt-1">{mod.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <h2 className="text-[#6ec5d3] font-bold text-sm uppercase tracking-wider mb-3">Business Flow</h2>
            <div className="space-y-2">
              {mod.businessFlow.map((step, i) => (
                <div key={i} className="flex gap-2 text-sm text-slate-300 bg-[#0d2535] rounded-lg px-3 py-2 border border-white/5">
                  <span className="text-[#3ea8ba] font-mono font-bold shrink-0">{i + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-4">
              <h2 className="text-[#6ec5d3] font-bold text-sm uppercase tracking-wider mb-2">Sample Data</h2>
              <pre className="bg-[#0d2535] border border-white/10 rounded-lg p-3 text-xs text-emerald-300 overflow-x-auto">
                {JSON.stringify(mod.sampleData, null, 2)}
              </pre>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h2 className="text-[#6ec5d3] font-bold text-sm uppercase tracking-wider mb-3">
              Database Tables ({mod.tables.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mod.tables.map((t) => (
                <TableView key={t.name} table={t} headerColor={mod.color} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
