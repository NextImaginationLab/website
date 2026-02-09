import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Zap } from 'lucide-react';
import { useState } from 'react';
import { SceneConfigDemo, PlanStepDemo, StudioArchitecture as StudioArchitectureVisual, PromptFlowDemo } from './components/TechVisuals';
import previewImage from './assets/preview.png';

// --- Components ---

const Header = () => (
  <header className="fixed top-0 left-0 right-0 z-50 px-[var(--page-gutter)] py-6 transition-all duration-500">
    <nav className="flex items-center justify-between max-w-[1920px] mx-auto">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="flex flex-col">
          <span className="font-sans font-extrabold text-sm leading-none tracking-[0.2em] text-text-primary uppercase mb-1">Next Imagination Lab</span>
          <div className="h-px w-full bg-text-primary/10"></div>
        </div>
      </div>

      <div className="hidden md:flex items-center gap-10">
        <a href="#eidos" className="text-xs font-bold text-text-muted hover:text-text-primary transition-colors uppercase tracking-[0.2em]">Eidos</a>
        <a href="#access" className="text-xs font-bold text-text-primary hover:text-accent transition-colors uppercase tracking-[0.2em] border-b border-text-primary/20 pb-0.5">
          Join waitlist
        </a>
      </div>
    </nav >
  </header >
);

// --- Scrollytelling Sections ---

const SectionWrap = ({ children, className = "", id = "" }: { children: React.ReactNode, className?: string, id?: string }) => (
  <section id={id} className={`min-h-screen py-24 flex flex-col items-center justify-center px-[var(--page-gutter)] relative ${className}`}>
    {children}
  </section>
);

const ManifestoEntry = () => (
  <SectionWrap>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-4xl w-full flex flex-col items-center text-center space-y-8"
    >
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-sans font-extralight tracking-tight leading-[1.1] text-text-primary whitespace-nowrap">
        People Interact. System adapts.
      </h1>
      <p className="text-3xl md:text-4xl font-sans font-extralight text-text-muted">
        Together we create.
      </p>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="text-xl md:text-2xl font-light text-text-muted/80 max-w-2xl"
      >
        Intelligence that adapts. Interfaces that evolve.
      </motion.p>
    </motion.div>

    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: [0, 1, 0] }}
      transition={{ repeat: Infinity, duration: 3 }}
      className="absolute bottom-10 flex flex-col items-center gap-2"
    >
      <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-text-muted">Scroll to Eidos</span>
      <div className="w-px h-8 bg-gradient-to-b from-text-muted/40 to-transparent" />
    </motion.div>
  </SectionWrap>
);

const InfrastructureIntro = () => (
  <SectionWrap id="eidos" className="bg-surface-0 border-t border-border/20">
    <div className="max-w-6xl w-full space-y-12">
      <div className="text-center space-y-6">
        <h2 className="text-4xl md:text-6xl text-accent font-sans font-extralight tracking-tight leading-tight">
          Eidos: Agentic Image Editing
        </h2>
        <p className="text-2xl md:text-3xl text-text-muted font-light leading-relaxed max-w-4xl mx-auto">
          Eidos is an agentic image studio designed for precise control and creative experimentation.
          It reasons around your intent, deconstructing concepts into interactive components.
        </p>
      </div>

      {/* Preview Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative rounded-lg overflow-hidden border border-border shadow-2xl"
      >
        <img
          src={previewImage}
          alt="Eidos Desktop Application"
          className="w-full h-auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-0/60 via-transparent to-transparent pointer-events-none" />
      </motion.div>
    </div>
  </SectionWrap>
);

const WorkflowSynthesis = () => (
  <SectionWrap id="generation" className="bg-surface-2/20">
    <div className="max-w-[1500px] w-full space-y-16">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.3 }}
        className="text-center space-y-6"
      >
        <div className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-text-muted/60">Intelligent Generation</div>
        <h2 className="text-5xl font-sans font-extralight tracking-tight leading-tight text-text-primary">
          Prompt to Interface. <span className="italic opacity-60">Synthesis in real-time.</span>
        </h2>
        <p className="text-2xl text-text-muted font-light leading-relaxed max-w-3xl mx-auto">
          Eidos maps your generation intent to semantic slots. We eliminate "guessing" by surfacing
          dynamic controls that expose the underlying parameters of the model.
        </p>
      </motion.div>

      {/* Prompt Flow → Demo Components */}
      <div className="space-y-8">
        <PromptFlowDemo />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ delay: 0.2 }}
          >
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              Generation Controls
            </div>
            <SceneConfigDemo />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ amount: 0.2 }}
            transition={{ delay: 0.4 }}
          >
            <div className="text-xs font-bold text-text-muted uppercase tracking-wider mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-accent rounded-full" />
              Edit Plan Steps
            </div>
            <PlanStepDemo />
          </motion.div>
        </div>
      </div>
    </div>
  </SectionWrap>
);

const StudioArchitecture = () => (
  <section id="studio" className="py-24 px-[var(--page-gutter)] bg-surface-1 border-t border-border/20">
    <div className="max-w-6xl mx-auto space-y-12">
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-2 text-accent">
          <Terminal size={14} />
          <span className="font-mono text-xs font-bold uppercase tracking-widest">Reasoning Engine</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-sans font-extralight leading-tight text-text-primary">
          System Pipeline
        </h2>
        <p className="text-2xl text-text-muted font-light leading-relaxed max-w-3xl mx-auto">
          Eidos coordinates complex planning and execution through a structured workflow.
        </p>
      </div>

      <StudioArchitectureVisual />
    </div>
  </section>
);

const Access = () => {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as unknown as Record<string, string>).toString(),
      });

      if (response.ok) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="access" className="py-32 px-[var(--page-gutter)] bg-surface-0 border-t border-border/20">
      <div className="max-w-xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <Zap size={20} className="mx-auto text-text-primary opacity-20" />
          <h2 className="text-3xl font-sans font-extralight text-text-primary">Join waitlist</h2>
          <p className="text-text-muted text-sm font-light">Register interest for Eidos early access.</p>
        </div>

        {status === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6 py-16 text-center"
          >
            {/* Animated checkmark */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
              className="w-16 h-16 bg-accent/10 border-2 border-accent rounded-full flex items-center justify-center"
            >
              <motion.svg
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                className="w-8 h-8 text-accent"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={3}
              >
                <motion.path
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 0.3, duration: 0.4 }}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </motion.svg>
            </motion.div>

            <div className="space-y-2">
              <p className="text-xl font-medium text-text-primary">You're on the list!</p>
              <p className="text-text-muted text-sm">We'll notify you when Eidos is ready for early access.</p>
            </div>

            <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-accent/80 bg-accent/5 px-4 py-2 rounded-full">
              <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
              Waitlist confirmed
            </div>
          </motion.div>
        ) : status === 'error' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-6 py-12 text-center"
          >
            <div className="w-16 h-16 bg-red-500/10 border-2 border-red-500/50 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <div className="space-y-2">
              <p className="text-lg font-medium text-text-primary">Something went wrong</p>
              <p className="text-text-muted text-sm">Please try again or contact us directly.</p>
            </div>
            <button
              onClick={() => setStatus('idle')}
              className="text-sm text-accent hover:underline"
            >
              Try again
            </button>
          </motion.div>
        ) : (
          <form
            name="waitlist"
            method="POST"
            data-netlify="true"
            className="space-y-6"
            onSubmit={handleSubmit}
          >
            <input type="hidden" name="form-name" value="waitlist" />
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-[9px] font-bold uppercase tracking-widest text-text-muted/60">Name</label>
                <input
                  id="name"
                  name="name"
                  required
                  type="text"
                  placeholder="Your name"
                  className="w-full bg-surface-1 border border-border/60 py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors rounded-sm placeholder:text-text-muted/40"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-[9px] font-bold uppercase tracking-widest text-text-muted/60">Email</label>
                <input
                  id="email"
                  name="email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  className="w-full bg-surface-1 border border-border/60 py-3 px-4 text-text-primary text-sm focus:outline-none focus:border-accent transition-colors rounded-sm placeholder:text-text-muted/40"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-text-primary text-surface-0 py-4 rounded-sm text-[10px] font-bold uppercase tracking-[0.2em] hover:opacity-95 transition-opacity disabled:opacity-50 flex-center gap-3"
            >
              {status === 'loading' ? (
                <span className="w-3 h-3 border-2 border-surface-0/30 border-t-surface-0 rounded-full animate-spin" />
              ) : (
                <>Join Waitlist <ArrowRight size={14} /></>
              )}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-16 px-[var(--page-gutter)] border-t border-border/20 bg-surface-1">
    <div className="max-w-[1920px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
      <div className="space-y-2">
        <div className="font-sans font-extrabold text-[12px] text-text-primary uppercase tracking-[0.2em]">Next Imagination Lab</div>
      </div>
    </div>
  </footer>
);

function App() {
  return (
    <div className="bg-surface-0 min-h-screen text-text-primary selection:bg-accent selection:text-white">
      <Header />
      <ManifestoEntry />
      <InfrastructureIntro />
      <WorkflowSynthesis />
      <StudioArchitecture />
      <Access />
      <Footer />
    </div>
  );
}

export default App;
