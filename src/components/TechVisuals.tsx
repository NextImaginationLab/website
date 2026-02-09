import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo, useEffect } from 'react';

/**
 * Interpolate semantic label from value labels (Eidos pattern)
 */
function interpolateLabel(value: number, labels: Record<number, string>): string {
    const keys = Object.keys(labels).map(Number).sort((a, b) => a - b);
    if (keys.length === 0) return value.toFixed(0);

    let bestKey = keys[0];
    let bestDist = Infinity;

    for (const k of keys) {
        const dist = Math.abs(k - value);
        if (dist < bestDist) {
            bestDist = dist;
            bestKey = k;
        }
    }

    return labels[bestKey] ?? value.toFixed(0);
}

// ============================================================================
// SceneConfigDemo - Miniature replica of Eidos GenerationControlCard
// ============================================================================

interface SceneConfigDemoProps {
    onPromptChange?: (prompt: string) => void;
}

export const SceneConfigDemo = ({ onPromptChange }: SceneConfigDemoProps) => {
    // State for slider and dropdown
    const [lightingValue, setLightingValue] = useState(75);
    const [lensOpen, setLensOpen] = useState(false);
    const [selectedLens, setSelectedLens] = useState('85mm');
    const [expandedSection, setExpandedSection] = useState<string | null>('lighting');

    // Eidos-style value labels for semantic slider display
    const lightingLabels: Record<number, string> = {
        0: 'cool shade',
        25: 'soft fill',
        50: 'neutral',
        75: 'cinematic lighting',
        100: 'golden hour'
    };

    // Lenses with descriptions
    const lenses = [
        { value: '24mm', label: '24mm Wide', description: 'Environmental context' },
        { value: '50mm', label: '50mm Standard', description: 'Natural perspective' },
        { value: '85mm', label: '85mm Portrait', description: 'Compression, shallow DOF' }
    ];

    // Computed semantic label
    const lightingLabel = useMemo(() =>
        interpolateLabel(lightingValue, lightingLabels),
        [lightingValue]
    );

    // Computed lens description
    const currentLensData = useMemo(() =>
        lenses.find(l => l.value === selectedLens),
        [selectedLens]
    );

    // Build prompt and notify parent
    const prompt = useMemo(() =>
        `"A girl in neon rain, ${lightingLabel}, ${selectedLens}"`,
        [lightingLabel, selectedLens]
    );

    useEffect(() => {
        onPromptChange?.(prompt);
    }, [prompt, onPromptChange]);

    // Gradient percentage for filled track
    const percentage = ((lightingValue) / 100) * 100;

    // Tick entries for slider
    const tickEntries = Object.entries(lightingLabels)
        .map(([k, v]) => ({ pos: Number(k), label: v }))
        .sort((a, b) => a.pos - b.pos);

    return (
        <div className="bg-surface-1 border border-border rounded-md overflow-hidden shadow-lg">
            {/* Header */}
            <div className="p-4 border-b border-border bg-surface-2/30">
                <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest flex items-center gap-2">
                    <span className="w-1 h-4 bg-accent rounded-sm" />
                    Scene Configuration
                </h3>
                <p className="text-xs text-text-muted mt-1">
                    Refine entity semantics and spatial parameters
                </p>
            </div>

            {/* Target Prompt Preview */}
            <div className="p-4 border-b border-border bg-surface-2/20">
                <p className="text-xs font-bold text-text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span className="text-accent">◈</span> Target Prompt
                </p>
                <motion.p
                    key={prompt}
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-text-primary font-mono leading-relaxed italic"
                >
                    {prompt}
                </motion.p>
            </div>

            {/* Lighting Section */}
            <div className="border-b border-border">
                <button
                    onClick={() => setExpandedSection(expandedSection === 'lighting' ? null : 'lighting')}
                    className="w-full px-4 py-3 flex justify-between items-center bg-surface-2/20 hover:bg-surface-2/40 transition-colors"
                >
                    <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        Lighting & Mood
                    </span>
                    <motion.div
                        animate={{ rotate: expandedSection === 'lighting' ? 180 : 0 }}
                        className="text-text-muted"
                    >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </button>

                <AnimatePresence>
                    {expandedSection === 'lighting' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 space-y-3">
                                {/* Slider Control - Eidos style */}
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Lighting Temperature
                                    </label>
                                    <span className="text-sm font-mono text-accent font-bold">
                                        {lightingLabel}
                                    </span>
                                </div>

                                {/* Slider with gradient spectrum */}
                                <div className="relative pt-1">
                                    {/* Gradient background */}
                                    <div
                                        className="absolute top-[6px] left-0 right-0 h-1.5 rounded-full pointer-events-none opacity-40"
                                        style={{
                                            background: 'linear-gradient(to right, hsl(220, 60%, 55%), hsl(50, 60%, 55%), hsl(30, 70%, 55%))',
                                        }}
                                    />
                                    {/* Filled track */}
                                    <div
                                        className="absolute top-[6px] left-0 h-1.5 bg-accent/70 rounded-full pointer-events-none transition-all duration-100"
                                        style={{ width: `${percentage}%` }}
                                    />
                                    <input
                                        type="range"
                                        min={0}
                                        max={100}
                                        value={lightingValue}
                                        onChange={(e) => setLightingValue(Number(e.target.value))}
                                        className="w-full h-1.5 bg-transparent rounded-full appearance-none cursor-pointer relative z-10
                                                   [&::-webkit-slider-thumb]:appearance-none
                                                   [&::-webkit-slider-thumb]:w-4
                                                   [&::-webkit-slider-thumb]:h-4
                                                   [&::-webkit-slider-thumb]:bg-accent
                                                   [&::-webkit-slider-thumb]:rounded-full
                                                   [&::-webkit-slider-thumb]:shadow-lg
                                                   [&::-webkit-slider-thumb]:border-2
                                                   [&::-webkit-slider-thumb]:border-white/30
                                                   [&::-webkit-slider-thumb]:cursor-grab
                                                   [&::-webkit-slider-thumb]:active:cursor-grabbing
                                                   [&::-webkit-slider-thumb]:hover:scale-110
                                                   [&::-webkit-slider-thumb]:transition-transform
                                                   [&::-moz-range-thumb]:w-4
                                                   [&::-moz-range-thumb]:h-4
                                                   [&::-moz-range-thumb]:bg-accent
                                                   [&::-moz-range-thumb]:rounded-full
                                                   [&::-moz-range-thumb]:border-0"
                                    />
                                </div>

                                {/* Tick labels */}
                                <div className="flex justify-between text-[10px] text-text-muted/60 px-0.5">
                                    {[tickEntries[0], tickEntries[tickEntries.length - 1]].map((tick, i) => (
                                        <span key={tick?.pos ?? i} className={i === 1 ? 'text-right' : ''}>
                                            {tick?.label}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Camera Section */}
            <div className="border-b border-border">
                <button
                    onClick={() => setExpandedSection(expandedSection === 'camera' ? null : 'camera')}
                    className="w-full px-4 py-3 flex justify-between items-center bg-surface-2/20 hover:bg-surface-2/40 transition-colors"
                >
                    <span className="text-xs font-bold uppercase tracking-wider text-text-primary">
                        Camera & Lens
                    </span>
                    <motion.div
                        animate={{ rotate: expandedSection === 'camera' ? 180 : 0 }}
                        className="text-text-muted"
                    >
                        <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                            <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </button>

                <AnimatePresence>
                    {expandedSection === 'camera' && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="p-4 space-y-3">
                                {/* Dropdown Control - Eidos style */}
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-bold text-text-muted uppercase tracking-wider">
                                        Lens Focal Length
                                    </label>
                                </div>

                                {/* Dropdown button */}
                                <div className="relative">
                                    <button
                                        onClick={() => setLensOpen(!lensOpen)}
                                        className={`w-full px-3 py-2.5 flex items-center justify-between bg-surface-2 border rounded-sm
                                                    hover:bg-surface-3 transition-all text-left
                                                    ${lensOpen ? 'border-accent ring-1 ring-accent/20' : 'border-border/50'}`}
                                    >
                                        <span className="text-sm font-medium text-text-primary flex items-center gap-2">
                                            <span
                                                className="w-2 h-2 rounded-full"
                                                style={{ backgroundColor: `hsl(${selectedLens === '24mm' ? 200 : selectedLens === '50mm' ? 40 : 10}, 60%, 50%)` }}
                                            />
                                            {currentLensData?.label}
                                        </span>
                                        <div className="flex items-center gap-1.5">
                                            <span className="text-[9px] font-mono text-text-muted/50">{lenses.length}</span>
                                            <motion.svg
                                                animate={{ rotate: lensOpen ? 180 : 0 }}
                                                className="w-3 h-3 text-text-muted"
                                                fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </motion.svg>
                                        </div>
                                    </button>

                                    {/* Dropdown menu */}
                                    <AnimatePresence>
                                        {lensOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -5 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -5 }}
                                                className="absolute top-full left-0 right-0 z-50 mt-1 bg-surface-3 border border-border rounded-sm shadow-xl overflow-hidden"
                                            >
                                                {lenses.map((lens) => (
                                                    <button
                                                        key={lens.value}
                                                        onClick={() => {
                                                            setSelectedLens(lens.value);
                                                            setLensOpen(false);
                                                        }}
                                                        className={`w-full px-3 py-2.5 text-sm text-left transition-colors flex items-center gap-2
                                                                    ${lens.value === selectedLens
                                                                ? 'bg-accent text-accent-foreground font-bold'
                                                                : 'text-text-primary hover:bg-surface-2'}`}
                                                    >
                                                        <span
                                                            className="w-2 h-2 rounded-full shrink-0"
                                                            style={{ backgroundColor: `hsl(${lens.value === '24mm' ? 200 : lens.value === '50mm' ? 40 : 10}, 60%, 50%)` }}
                                                        />
                                                        {lens.label}
                                                    </button>
                                                ))}
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Lens description */}
                                <p className="text-xs text-accent/80 italic">
                                    {currentLensData?.description}
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Action buttons */}
            <div className="p-4 flex gap-2 bg-surface-2/10">
                <button className="flex-[0.4] px-3 py-2 bg-surface-2 text-text-primary rounded-sm text-xs font-bold uppercase tracking-widest hover:bg-surface-3 border border-border transition-all">
                    Reset
                </button>
                <button className="flex-1 px-4 py-2 bg-accent text-accent-foreground rounded-sm text-xs font-extrabold uppercase tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-md">
                    Materialize Scene
                </button>
            </div>
        </div>
    );
};

// ============================================================================
// PlanStepDemo - Miniature replica of Eidos PlanStepCard
// ============================================================================

interface PlanStep {
    step: number;
    toolSignature: string;
    reasoning: string;
    payload: Record<string, string | number>;
}

export const PlanStepDemo = () => {
    const [activeStep, setActiveStep] = useState(0);

    const steps: PlanStep[] = [
        {
            step: 1,
            toolSignature: 'color.curves.v1',
            reasoning: 'Adjusting exposure to emphasize neon highlights and create dramatic contrast in shadow regions.',
            payload: {
                shadows: -0.15,
                midtones: 0.08,
                highlights: 0.22
            }
        },
        {
            step: 2,
            toolSignature: 'color.grading.v1',
            reasoning: 'Applying cinematic color grade with teal shadows and warm highlights for cyberpunk aesthetic.',
            payload: {
                temperature: 0.12,
                tint: -0.05,
                saturation: 1.15
            }
        },
        {
            step: 3,
            toolSignature: 'effects.glow.v1',
            reasoning: 'Adding subtle bloom effect to enhance neon light reflections on wet surfaces.',
            payload: {
                intensity: 0.35,
                threshold: 0.7,
                radius: 8
            }
        }
    ];

    return (
        <div className="space-y-3">
            {steps.map((step, index) => {
                const isActive = index === activeStep;
                return (
                    <motion.div
                        key={step.step}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`border rounded-sm p-4 transition-all duration-300 cursor-pointer
                            ${isActive
                                ? 'bg-surface-2 border-accent shadow-sm'
                                : 'bg-surface-1 border-border/40 opacity-70 hover:opacity-90'}`}
                        onClick={() => setActiveStep(index)}
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between gap-2 mb-3">
                            <div className="flex items-center gap-3">
                                <div className={`w-6 h-6 flex items-center justify-center text-xs font-mono font-bold border
                                    ${isActive ? 'border-accent bg-accent text-accent-foreground' : 'border-border/60 text-text-muted'}`}>
                                    {step.step}
                                </div>
                                <span className="font-bold uppercase tracking-wider text-text-primary text-sm">
                                    {step.toolSignature.split('.').slice(0, 2).join(' ')}
                                </span>
                            </div>
                            {isActive && (
                                <div className="flex items-center gap-1.5">
                                    <button className="p-1.5 bg-accent/20 hover:bg-accent text-accent hover:text-accent-foreground border border-accent/20 transition-all rounded-sm">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 6L5 9L10 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                    <button className="p-1.5 bg-red-500/10 hover:bg-red-500 text-red-400 hover:text-white border border-red-500/20 transition-all rounded-sm">
                                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                            <path d="M2 2L10 10M2 10L10 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Reasoning */}
                        <p className="text-xs text-text-muted leading-relaxed italic border-l-2 border-border/40 pl-3 mb-3">
                            {step.reasoning}
                        </p>

                        {/* Parameters */}
                        <div className="space-y-1 font-mono text-xs">
                            {Object.entries(step.payload).map(([key, val]) => (
                                <div key={key} className="flex gap-2 items-baseline">
                                    <span className="text-text-muted font-bold uppercase tracking-tighter w-20 shrink-0">{key}:</span>
                                    <span className="text-text-primary">{typeof val === 'number' ? val.toFixed(2) : val}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            })}
        </div>
    );
};

// ============================================================================
// Legacy exports for backwards compatibility (keep GenerationSVG as alias)
// ============================================================================

interface GenerationSVGProps {
    onLightingChange?: (label: string) => void;
    onLensChange?: (lens: string) => void;
}

export const GenerationSVG = ({ onLightingChange, onLensChange }: GenerationSVGProps) => {
    return (
        <SceneConfigDemo
            onPromptChange={(prompt) => {
                // Extract lighting and lens from prompt for backwards compat
                const match = prompt.match(/".*?, (.*?), (\d+mm)"/);
                if (match) {
                    onLightingChange?.(match[1]);
                    onLensChange?.(match[2]);
                }
            }}
        />
    );
};

// ============================================================================
// PromptFlowDemo - Shows prompt → enhanced prompt flow
// ============================================================================

export const PromptFlowDemo = () => {
    const rawPrompt = "girl, neon rain, city";
    const enhancedPrompt = "A stylish young woman standing in neon-lit rain, cinematic lighting, 85mm portrait lens, cyberpunk aesthetic";

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-surface-1 border border-border rounded-md overflow-hidden"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-stretch">
                {/* Raw Prompt */}
                <div className="p-6 border-b md:border-b-0 md:border-r border-border">
                    <div className="text-[10px] font-bold text-text-muted uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-text-muted/30 rounded-full" />
                        User Prompt
                    </div>
                    <p className="text-lg font-mono text-text-primary/80">
                        {rawPrompt}
                    </p>
                </div>

                {/* Arrow */}
                <div className="hidden md:flex items-center justify-center px-6 bg-surface-2/30">
                    <motion.div
                        initial={{ x: -5, opacity: 0.5 }}
                        animate={{ x: 5, opacity: 1 }}
                        transition={{ repeat: Infinity, repeatType: "reverse", duration: 1 }}
                        className="text-accent"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>

                {/* Enhanced Prompt */}
                <div className="p-6 bg-accent/5">
                    <div className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 bg-accent rounded-full" />
                        Enhanced Prompt
                    </div>
                    <p className="text-lg font-mono text-text-primary italic leading-relaxed">
                        {enhancedPrompt}
                    </p>
                </div>
            </div>

            {/* Semantic extraction indicator */}
            <div className="px-6 py-3 bg-surface-2/30 border-t border-border flex items-center gap-4 text-xs text-text-muted">
                <span className="font-bold uppercase tracking-wider">Extracted:</span>
                <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-sm font-mono">lighting</span>
                <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-sm font-mono">lens</span>
                <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-sm font-mono">style</span>
                <span className="px-2 py-0.5 bg-accent/20 text-accent rounded-sm font-mono">subject</span>
            </div>
        </motion.div>
    );
};

// ============================================================================
// StudioArchitecture - 5-step pipeline: Instruct → Reason → Adapt → Review → Execute
// ============================================================================

export const StudioArchitecture = () => {
    const [activeStep, setActiveStep] = useState<number>(1);

    const steps = [
        {
            id: 1,
            label: 'Instruct',
            title: 'User Instructs',
            description: 'You describe your creative intent in natural language. The system receives your prompt and begins processing.'
        },
        {
            id: 2,
            label: 'Reason',
            title: 'System Reasons',
            description: 'The agent cluster analyzes your intent, decomposes it into semantic components, and plans a sequence of operations.'
        },
        {
            id: 3,
            label: 'Adapt',
            title: 'System Adapts',
            description: 'Dynamic controls are synthesized based on semantic extraction. The interface evolves to expose relevant parameters.'
        },
        {
            id: 4,
            label: 'Review',
            title: 'User Reviews',
            description: 'You review the proposed plan and adjust parameters as needed. Every change is visible before execution.'
        },
        {
            id: 5,
            label: 'Execute',
            title: 'System Executes',
            description: 'The finalized plan is executed as reversible tool calls. Each step is atomic and can be individually adjusted.'
        }
    ];

    const activeStepData = steps.find(s => s.id === activeStep);

    return (
        <div className="bg-surface-1 border border-border rounded-md overflow-hidden">
            {/* Step selector - horizontal timeline */}
            <div className="flex border-b border-border relative">
                {/* Connection line */}
                <div className="absolute top-1/2 left-0 right-0 h-px bg-border -translate-y-1/2 z-0" />

                {steps.map((step, index) => (
                    <button
                        key={step.id}
                        onClick={() => setActiveStep(step.id)}
                        className={`flex-1 py-4 px-2 flex flex-col items-center gap-2 transition-all relative z-10
                            ${activeStep === step.id
                                ? 'bg-accent text-accent-foreground'
                                : 'bg-surface-2/30 text-text-muted hover:text-text-primary hover:bg-surface-2/50'}`}
                    >
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-bold font-mono
                            ${activeStep === step.id ? 'bg-accent-foreground/20' : 'bg-surface-3'}`}>
                            {step.id}
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-wider hidden sm:block">
                            {step.label}
                        </span>
                        {index < steps.length - 1 && (
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 text-border hidden md:block">
                                →
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {/* Step content */}
            <div className="p-8">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-center space-y-4"
                    >
                        <div className="text-sm font-mono font-bold text-accent mb-2">STEP {activeStepData?.id}</div>
                        <h4 className="text-2xl font-bold text-text-primary">
                            {activeStepData?.title}
                        </h4>
                        <p className="text-lg text-text-muted leading-relaxed max-w-2xl mx-auto">
                            {activeStepData?.description}
                        </p>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Progress indicator */}
            <div className="px-8 pb-6">
                <div className="h-1 bg-surface-2 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-accent"
                        initial={{ width: 0 }}
                        animate={{ width: `${(activeStep / steps.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
        </div>
    );
};

