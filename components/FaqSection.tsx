import { type ReactNode } from "react";

export type FaqItem = {
  question: string;
  answer: ReactNode;
};

export default function FaqSection({ items }: { items: FaqItem[] }) {
  return (
    <div>
      <h2 className="text-slate-200 text-lg font-semibold mb-3">
        Frequently Asked Questions
      </h2>
      <dl className="space-y-5">
        {items.map((item) => (
          <div key={item.question}>
            <dt className="text-slate-300 font-medium mb-1">{item.question}</dt>
            <dd>{item.answer}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
