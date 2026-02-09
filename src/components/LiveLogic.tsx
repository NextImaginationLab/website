import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Search, Brain, Sliders, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

const STEPS = [
    {
        id: 'analyze',
        icon: Search,
        title: 'Image Analysis',
        description: 'Deconstructing scene semantics and identifying key entities.',
        workflow: 'EDIT'
    },
    {
        id: 'plan',
        icon: Brain,
        title: 'Adaptive Planning',
        description: 'Reasoning through multi-step execution strategies.',
        workflow: 'BOTH'
    },
    {
        id: 'refine',
        icon: Sliders,
        title: 'Semantic Refinement',
        description: 'Surfacing granular controls for human-in-the-loop agency.',
        workflow: 'GENERATION'
    },
    {
        id: 'execute',
        icon: Zap,
        title: 'Intelligent Execution',
        description: 'Materializing the scene via high-fidelity provider adapters.',
        workflow: 'BOTH'
    }
];

export const LiveLogic = () => {
    const [activeStep, setActiveStep] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % STEPS.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="py-32 px-[var(--page-gutter)] border-y border-border/40 bg-surface-1/10 overflow-hidden relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-20 bg-gradient-to-b from-accent to-transparent opacity-40" />

            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                <div className="flex-1 space-y-8">
                    <div className="space-y-4">
                        <h2 className="text-4xl md:text-5xl uppercase font-black tracking-tight leading-none">
                            The <span className="text-accent underline decoration-accent/20 underline-offset-8">Live Logic</span> <br />
                            Environment.
                        </h2>
                        <p className="text-text-muted text-lg font-medium leading-relaxed">
                            Eidos doesn't just generate—it reasons. Experience a transparent workflow that surfaces
                            the agent's internal thought process, giving you the power to intervene at every critical junction.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {STEPS.map((step, index) => {
                            const Icon = step.icon;
                            const isActive = activeStep === index;
                            return (
                                <div
                                    key={step.id}
                                    className={`flex items-start gap-4 p-4 rounded-lg border transition-all duration-500 cursor-pointer ${isActive ? 'bg-accent/10 border-accent/40 shadow-lg' : 'bg-transparent border-transparent opacity-40 grayscale'
                                        }`}
                                    onClick={() => setActiveStep(index)}
                                >
                                    <div className={`w-10 h-10 rounded-sm flex-center shrink-0 ${isActive ? 'bg-accent text-accent-foreground' : 'bg-surface-2 text-text-muted'}`}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-2">
                                            {step.title}
                                            {isActive && <motion.div layoutId="arrow"><ChevronRight size={14} className="text-accent" /></motion.div>}
                                        </h4>
                                        <p className="text-xs text-text-muted leading-relaxed">{step.description}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 w-full max-w-2xl aspect-square rounded-2xl glass border border-white/5 relative flex-center overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeStep}
                            initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                            exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="w-full h-full flex-center p-8 text-center"
                        >
                            <div className="space-y-8 relative">
                                <div className="w-24 h-24 mx-auto rounded-full bg-accent/20 flex-center text-accent animate-pulse">
                                    {(() => {
                                        const Icon = STEPS[activeStep].icon;
                                        return <Icon size={48} />;
                                    })()}
                                </div>

                                <div className="space-y-4">
                                    <div className="inline-block px-3 py-1 rounded-sm bg-accent/5 border border-accent/20 text-[10px] font-mono text-accent uppercase tracking-widest">
                                        Status: {STEPS[activeStep].id === 'execute' ? 'Finalizing' : 'Processing'} Active Nodes
                                    </div>
                                    <div className="space-y-2 font-mono text-[11px] text-text-muted/60">
                                        <p>{`> AGENT_LOG: initializing ${STEPS[activeStep].id} module...`}</p>
                                        <p>{`> ENHANCING_CONTEXT: mapping ${STEPS[activeStep].workflow} dependencies`}</p>
                                        <p className="text-accent/80 font-bold">{`> ${STEPS[activeStep].id.toUpperCase()}_STAGE_ACTIVE: Success.`}</p>
                                    </div>
                                </div>

                                {activeStep === 3 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="absolute -bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2 text-green-400 font-bold uppercase text-[10px] tracking-widest whitespace-nowrap"
                                    >
                                        <CheckCircle2 size={14} /> Workflow Synchronized
                                    </motion.div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Decorative Grid Lines */}
                    <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-[0.03] pointer-events-none">
                        {[...Array(36)].map((_, i) => (
                            <div key={i} className="border border-white" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
