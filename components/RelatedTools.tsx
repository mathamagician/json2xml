import Link from "next/link";
import { getRelatedTools } from "@/lib/tools";

export default function RelatedTools({ currentSlug }: { currentSlug: string }) {
  const related = getRelatedTools(currentSlug);
  if (related.length === 0) return null;

  return (
    <section className="border-t border-slate-800 bg-slate-900">
      <div className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-slate-200 text-lg font-semibold mb-4">Related Tools</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {related.map((tool) => (
            <Link
              key={tool.slug}
              href={tool.slug}
              className="block rounded-lg border border-slate-700 bg-slate-800/50 p-4 hover:border-brand-500/50 hover:bg-slate-800 transition-colors"
            >
              <h3 className="text-slate-200 font-medium text-sm mb-1">{tool.title}</h3>
              <p className="text-slate-500 text-xs leading-relaxed">{tool.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
