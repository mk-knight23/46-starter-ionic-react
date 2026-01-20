import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Tablet, Monitor, Cpu, Zap, Layers, Globe, ArrowRight, Download, ChevronRight, Play, Check, Star, Code2, Box, Workflow } from 'lucide-react';

const FEATURES = [
    { id: 1, icon: <Smartphone />, title: "Native Performance", desc: "Compile to native iOS and Android binaries with zero performance loss." },
    { id: 2, icon: <Layers />, title: "Component Library", desc: "Access 100+ pre-built UI components for rapid prototyping and production." },
    { id: 3, icon: <Workflow />, title: "Unified Codebase", desc: "Single TypeScript codebase targets mobile, desktop, and web platforms." },
    { id: 4, icon: <Zap />, title: "Hot Reload", desc: "Instant feedback with sub-second hot module replacement during development." },
];

const PLATFORMS = [
    { icon: <Smartphone className="w-8 h-8" />, name: "iOS", status: "Stable" },
    { icon: <Smartphone className="w-8 h-8" />, name: "Android", status: "Stable" },
    { icon: <Monitor className="w-8 h-8" />, name: "Web PWA", status: "Stable" },
    { icon: <Tablet className="w-8 h-8" />, name: "Desktop", status: "Beta" },
];

function App() {
    const [activeTab, setActiveTab] = useState('overview');

    return (
        <div className="min-h-screen bg-slate-950 text-white overflow-x-hidden">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 h-20 bg-slate-950/80 backdrop-blur-2xl border-b border-white/5 z-50 px-6">
                <div className="max-w-7xl mx-auto h-full flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-cyan-400 rounded-xl flex items-center justify-center text-white rotate-6 group-hover:rotate-0 transition-transform shadow-lg shadow-indigo-500/20">
                            <Cpu className="w-5 h-5" />
                        </div>
                        <div>
                            <h1 className="text-lg font-black tracking-tight uppercase leading-none">HYBRID_<span className="text-indigo-400">OS</span></h1>
                            <p className="text-[8px] font-bold text-slate-500 uppercase tracking-[0.2em]">Cross-Platform Runtime</p>
                        </div>
                    </div>

                    <div className="hidden md:flex items-center gap-10">
                        {['Docs', 'Playground', 'Ecosystem', 'Pricing'].map(l => (
                            <a key={l} href="#" className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-white transition-colors">{l}</a>
                        ))}
                    </div>

                    <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-black rounded-xl transition-all text-xs uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                        <Download className="w-4 h-4" /> Get SDK
                    </button>
                </div>
            </nav>

            <main className="pt-32 pb-20">
                {/* Hero Section */}
                <section className="max-w-7xl mx-auto px-6 mb-40">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                    >
                        <span className="inline-flex items-center gap-2 px-5 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-10">
                            <Star className="w-3 h-3 fill-current" /> v4.0 Now Available
                        </span>

                        <h1 className="text-6xl md:text-[7rem] font-black leading-[0.85] tracking-tighter uppercase mb-10">
                            BUILD <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic">ONCE.</span> <br /> DEPLOY <span className="text-slate-700 italic">EVERYWHERE.</span>
                        </h1>

                        <p className="text-xl text-slate-400 font-medium max-w-2xl mx-auto mb-16 leading-relaxed">
                            The next-generation hybrid framework for building high-performance native applications from a single React codebase.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button className="px-12 py-5 bg-white text-slate-900 font-black rounded-2xl hover:bg-indigo-500 hover:text-white transition-all text-xs uppercase tracking-widest shadow-2xl flex items-center justify-center gap-3 group">
                                Launch Playground <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                            </button>
                            <button className="px-12 py-5 border-2 border-slate-800 hover:border-indigo-500 text-white font-black rounded-2xl transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-3">
                                <Play className="w-4 h-4" /> Overview Video
                            </button>
                        </div>
                    </motion.div>

                    {/* Platform Icons */}
                    <div className="flex justify-center gap-4 mt-20">
                        {PLATFORMS.map((p, i) => (
                            <motion.div
                                key={p.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: 0.5 + i * 0.1 }}
                                className="hybrid-card p-6 text-center group hover:border-indigo-500/50 transition-all cursor-pointer"
                            >
                                <div className="text-indigo-400 mb-3 group-hover:scale-110 transition-transform">{p.icon}</div>
                                <span className="text-xs font-black uppercase tracking-widest block">{p.name}</span>
                                <span className={`text-[8px] font-bold uppercase tracking-widest ${p.status === 'Stable' ? 'text-emerald-400' : 'text-amber-400'}`}>{p.status}</span>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Features Grid */}
                <section className="max-w-7xl mx-auto px-6 mb-40">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">CORE <span className="text-slate-700 italic">CAPABILITIES</span></h2>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-[0.3em]">Everything you need for cross-platform excellence</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {FEATURES.map((f, idx) => (
                            <motion.div
                                key={f.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="hybrid-card p-10 group hover:border-indigo-500/50 transition-all"
                            >
                                <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-8 group-hover:bg-indigo-500 group-hover:text-white transition-all">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-black uppercase tracking-tight mb-4">{f.title}</h3>
                                <p className="text-slate-400 font-medium leading-relaxed">{f.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Code Preview Section */}
                <section className="py-32 bg-gradient-to-b from-slate-900 to-slate-950 border-y border-white/5">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div>
                            <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-none mb-10">
                                FAMILIAR <span className="text-indigo-400 italic">REACT</span> <br /> NATIVE <span className="text-slate-700">POWER</span>
                            </h2>
                            <p className="text-lg text-slate-400 font-medium mb-10 leading-relaxed">
                                Write standard React components. HybridOS compiles them to optimized native code for each target platform. No abstraction layer, no performance penalty.
                            </p>

                            <ul className="space-y-6">
                                {['TypeScript-first architecture', 'Native module bridging', 'Zero-config bundling'].map(item => (
                                    <li key={item} className="flex items-center gap-4 text-sm font-bold uppercase tracking-widest">
                                        <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 rounded-lg flex items-center justify-center text-emerald-400">
                                            <Check className="w-4 h-4" />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="hybrid-card overflow-hidden">
                            <div className="p-4 border-b border-white/5 flex items-center gap-3">
                                <div className="flex gap-2">
                                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                                    <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                    <div className="w-3 h-3 bg-green-500 rounded-full" />
                                </div>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">App.tsx</span>
                            </div>
                            <pre className="p-8 text-sm text-slate-300 overflow-x-auto font-mono">
                                <code>{`import { HybridView, Text, Button } from '@hybridos/core';

export function App() {
  return (
    <HybridView style={styles.container}>
      <Text style={styles.heading}>
        Hello, Hybrid World!
      </Text>
      <Button 
        title="Get Started" 
        onPress={() => navigate('/dashboard')}
      />
    </HybridView>
  );
}`}</code>
                            </pre>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-32 text-center">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-10 leading-none">
                            READY TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic">UNIFY</span>?
                        </h2>
                        <p className="text-lg text-slate-400 font-medium mb-16">
                            Join thousands of developers shipping cross-platform apps faster than ever.
                        </p>
                        <button className="px-16 py-6 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-black rounded-2xl hover:scale-105 transition-transform text-sm uppercase tracking-widest shadow-2xl shadow-indigo-500/30">
                            Start Building Free
                        </button>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="border-t border-white/5 py-16 px-6">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-2">
                        <Cpu className="w-5 h-5 text-indigo-400" />
                        <span className="font-black uppercase tracking-tight">HYBRID_<span className="text-indigo-400">OS</span></span>
                    </div>
                    <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">© 2024 MK_HYBRID_PLATFORM • 20/30 DISPATCHED</p>
                </div>
            </footer>
        </div>
    );
}

export default App;
