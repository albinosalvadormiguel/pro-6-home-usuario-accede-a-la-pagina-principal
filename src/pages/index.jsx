import React from 'react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <section className="px-6 py-16 md:py-24 max-w-6xl mx-auto">
        <p className="text-sm uppercase tracking-widest text-slate-500">Irydium</p>
        <h1 className="mt-3 text-3xl md:text-5xl font-extrabold">Agentes que trabajan. Nosotros firmamos resultados.</h1>
        <p className="mt-4 text-lg md:text-xl text-slate-700 max-w-3xl">Olvida pilotos infinitos: redesplegamos soluciones con métricas claras y garantías operativas para tu organización.</p>
        <ul className="mt-6 grid gap-2 text-slate-700 list-disc list-inside">
          <li>KPI claros desde el inicio: reducción de tiempos, errores y costes.</li>
          <li>Implementación segura para entornos regulados.</li>
          <li>Formación + transferencia para tu equipo.</li>
        </ul>
        <div className="mt-8 flex gap-3">
          <a href="#contacto" className="inline-flex items-center rounded-md bg-indigo-600 px-5 py-3 text-white font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" aria-label="Pide garantía de resultados">Pide garantía de resultados</a>
          <a href="#consulta" className="inline-flex items-center rounded-md border border-slate-300 px-5 py-3 text-slate-900 font-semibold hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-slate-300" aria-label="Consulta técnica gratuita">Consulta técnica gratuita</a>
        </div>
      </section>

      <section className="px-6 py-12 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold">Cómo funciona</h2>
          <div className="grid md:grid-cols-3 gap-6 mt-6">
            <div className="p-5 rounded-lg border"><h3 className="font-semibold">1. Descubrimiento</h3><p className="mt-1 text-slate-700">Mapeo de procesos y definición de KPIs ([–30%] tiempo, [–40%] errores).</p></div>
            <div className="p-5 rounded-lg border"><h3 className="font-semibold">2. Despliegue controlado</h3><p className="mt-1 text-slate-700">Agentes auditables en entorno seguro ([X semanas]).</p></div>
            <div className="p-5 rounded-lg border"><h3 className="font-semibold">3. Operación garantizada</h3><p className="mt-1 text-slate-700">Soporte, métricas y mejora continua.</p></div>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold">Servicios</h2>
          <ul className="mt-4 grid md:grid-cols-2 gap-4 text-slate-700">
            <li>Agentes de atención y tramitación</li>
            <li>Orquestación de procesos multi-sistema</li>
            <li>Bots para backoffice y calidad de datos</li>
            <li>Integración con ERPs/CRMs y SSO</li>
            <li>Auditoría y cumplimiento (logs, trazabilidad)</li>
          </ul>
        </div>
      </section>

      <section className="px-6 py-12 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold">Casos de éxito</h2>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <article className="p-5 rounded-lg border">
              <h3 className="font-semibold">Ayuntamiento de [Ciudad]</h3>
              <p className="mt-1 text-slate-700">Agente de registro y cita previa. KPIs: tiempo medio [–35%], incidencias [–45%].</p>
            </article>
            <article className="p-5 rounded-lg border">
              <h3 className="font-semibold">Pyme logística</h3>
              <p className="mt-1 text-slate-700">Agente de trazabilidad y albaranes. KPIs: errores [–40%], SLA entregas [+12%].</p>
            </article>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 border-t">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold">Confían en Irydium</h2>
          <blockquote className="mt-3 text-slate-700 italic">“Pasan de PowerPoints a producción: el cambio en [X semanas] fue real.” — Dir. Operaciones, [Sector]</blockquote>
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1,2,3,4].map(n => (<div key={n} className="h-12 bg-slate-100 rounded" aria-label={`logo placeholder ${n}`} />))}
          </div>
        </div>
      </section>

      <section className="px-6 py-12 border-t" id="contacto">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold">Contacto</h2>
          <form className="mt-4 grid gap-3" aria-label="Formulario de contacto">
            <label className="block">
              <span className="text-sm">Email corporativo</span>
              <input type="email" required placeholder="tu@email"
                className="mt-1 w-full rounded border px-3 py-2 focus:ring-2 focus:ring-indigo-500" aria-required="true" />
            </label>
            <label className="block">
              <span className="text-sm">Descripción</span>
              <textarea required placeholder="Cuenta tu caso de uso" className="mt-1 w-full rounded border px-3 py-2 focus:ring-2 focus:ring-indigo-500" />
            </label>
            <p className="text-xs text-slate-500">Cumplimos GDPR. Usaremos tus datos solo para responder.</p>
            <div className="flex gap-3">
              <button type="submit" className="rounded bg-indigo-600 text-white px-5 py-2 font-semibold">Pide garantía de resultados</button>
              <a href="#consulta" className="rounded border px-5 py-2 font-semibold">Consulta técnica gratuita</a>
            </div>
          </form>
        </div>
      </section>

      <section className="px-6 py-12 border-t" id="consulta">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold">Calculadora de impacto</h2>
          <p className="mt-2 text-slate-700">Introduce tiempos actuales, volumen y coste para estimar impacto ([placeholders]).</p>
          <div className="mt-3 grid md:grid-cols-3 gap-3">
            <input className="rounded border px-3 py-2" placeholder="Tareas/mes" aria-label="Tareas por mes" />
            <input className="rounded border px-3 py-2" placeholder="Minutos/tarea" aria-label="Minutos por tarea" />
            <input className="rounded border px-3 py-2" placeholder="Coste/hora" aria-label="Coste por hora" />
          </div>
        </div>
      </section>
    </main>
  );
}
