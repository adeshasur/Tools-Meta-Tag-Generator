import React from 'react'
import MetaTagGenerator from './components/MetaTagGenerator'

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#f4f4f2] text-slate-950 selection:bg-[#d8d8d8] selection:text-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6%] top-12 h-72 w-72 rounded-full bg-white/70 blur-3xl" />
        <div className="absolute right-[-6%] top-[18rem] h-[24rem] w-[24rem] rounded-full bg-black/8 blur-3xl" />
        <div className="absolute left-[14%] top-[34rem] h-80 w-80 rounded-full bg-black/6 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)] bg-[size:18px_18px] opacity-60" />
      </div>

      <header className="relative z-20 px-4 pt-4 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-white/50 bg-white/62 px-4 py-3 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-2xl md:px-6">
          <a href="https://info-adheesha.vercel.app" className="font-display text-sm font-semibold tracking-[-0.03em] text-slate-900 md:text-base">
            Adheesha Sooriyaarachchi
          </a>
          <a
            href="https://info-adheesha.vercel.app/tools"
            className="inline-flex rounded-full bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-black/10"
          >
            Back to Portfolio
          </a>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col px-4 pb-10 pt-6 md:px-6 md:pb-14 md:pt-8">
        <section className="p-0">
          <MetaTagGenerator embedded />
        </section>
      </main>
    </div>
  )
}

export default App
