import React from 'react';

export default function Hero({ title, subtitle, bullets = [], primaryCta, secondaryCta }) {
  return (
    <section className="px-6 py-16 md:py-24 bg-white text-slate-900">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold">{title}</h1>
        {subtitle && <p className="mt-4 text-lg md:text-xl text-slate-700 max-w-3xl">{subtitle}</p>}
        {bullets?.length > 0 && (
          <ul className="mt-6 grid gap-2 text-slate-700 list-disc list-inside">
            {bullets.map((b, i) => <li key={i}>{b}</li>)}
          </ul>
        )}
        <div className="mt-8 flex gap-3">
          {primaryCta && <a href={primaryCta.href} className="inline-flex items-center rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700" aria-label={primaryCta.label}>{primaryCta.label}</a>}
          {secondaryCta && <a href={secondaryCta.href} className="inline-flex items-center rounded-md border border-slate-300 px-5 py-3 font-semibold hover:bg-slate-50" aria-label={secondaryCta.label}>{secondaryCta.label}</a>}
        </div>
      </div>
    </section>
  );
}
