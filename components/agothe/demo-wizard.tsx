'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ArrowRight, ArrowLeft, Loader2 } from 'lucide-react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface DemoFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  phone: string;
  challenges: string[];
  companySize: string;
  currentTools: string;
  timeline: string;
  budgetRange: string;
  preferredDate: string;
  preferredTime: string;
  meetingType: string;
  additionalNotes: string;
}

const STEPS = [
  { id: 1, title: 'Contact Info', description: 'Tell us about yourself' },
  { id: 2, title: 'Your Needs', description: 'What challenges do you face?' },
  { id: 3, title: 'Scale & Budget', description: 'Help us tailor the solution' },
  { id: 4, title: 'Schedule', description: 'Pick your preferred time' },
];

const CHALLENGES = [
  { value: 'crisis-detection', label: 'Crisis detection and early warning', icon: '🚨' },
  { value: 'market-intelligence', label: 'Market intelligence and competitive analysis', icon: '📊' },
  { value: 'risk-assessment', label: 'Risk assessment and prediction', icon: '⚠️' },
  { value: 'pattern-recognition', label: 'Pattern recognition in complex data', icon: '🔍' },
  { value: 'custom-research', label: 'Custom research needs', icon: '🎯' },
];

const COMPANY_SIZES = [
  '1-10 employees',
  '11-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees',
];

const TIMELINES = [
  'Immediate (within 1 month)',
  'Short-term (1-3 months)',
  'Medium-term (3-6 months)',
  'Long-term (6+ months)',
  'Exploratory',
];

const BUDGET_RANGES = [
  'Under $10k/year',
  '$10k-$50k/year',
  '$50k-$100k/year',
  '$100k-$250k/year',
  '$250k+/year',
  'Prefer to discuss',
];

const MEETING_TYPES = [
  { value: 'demo', label: 'Product Demo', description: 'See CAPS Network in action' },
  { value: 'consultation', label: 'Strategic Consultation', description: 'Discuss your specific needs' },
  { value: 'technical', label: 'Technical Deep Dive', description: 'Architecture and integration' },
];

export function DemoWizard() {
  const reducedMotion = useReducedMotion();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [formData, setFormData] = useState<DemoFormData>({
    name: '',
    email: '',
    company: '',
    role: '',
    phone: '',
    challenges: [],
    companySize: '',
    currentTools: '',
    timeline: '',
    budgetRange: '',
    preferredDate: '',
    preferredTime: '',
    meetingType: 'demo',
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof DemoFormData, string>>>({});

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof DemoFormData, string>> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = 'Name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Invalid email address';
      }
      if (!formData.company.trim()) newErrors.company = 'Company is required';
      if (!formData.role.trim()) newErrors.role = 'Role is required';
    } else if (step === 2) {
      if (formData.challenges.length === 0) {
        newErrors.challenges = 'Please select at least one challenge';
      }
    } else if (step === 3) {
      if (!formData.companySize) newErrors.companySize = 'Please select company size';
      if (!formData.timeline) newErrors.timeline = 'Please select timeline';
      if (!formData.budgetRange) newErrors.budgetRange = 'Please select budget range';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    setErrors({});
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/schedule-demo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Submission failed');

      setSubmitSuccess(true);
    } catch (error) {
      setErrors({ email: 'Submission failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleChallenge = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      challenges: prev.challenges.includes(value)
        ? prev.challenges.filter((c) => c !== value)
        : [...prev.challenges, value],
    }));
    setErrors((prev) => ({ ...prev, challenges: undefined }));
  };

  if (submitSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mx-auto max-w-2xl rounded-lg border border-agothe-teal/20 bg-[rgba(0,240,255,0.02)] p-12 text-center"
      >
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-agothe-teal/10">
          <Check className="h-8 w-8 text-agothe-teal" />
        </div>
        <h2 className="font-heading text-3xl font-bold text-agothe-white">Request Submitted</h2>
        <p className="mt-4 text-lg text-agothe-muted">
          Thank you for your interest in Agothe. Our team will review your request and contact you
          within 24 hours to schedule your {formData.meetingType}.
        </p>
        <p className="mt-6 text-sm text-agothe-muted/60">
          Confirmation sent to <span className="text-agothe-teal">{formData.email}</span>
        </p>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between">
          {STEPS.map((step, idx) => (
            <div key={step.id} className="flex flex-1 items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-full border-2 font-mono text-sm font-bold transition-colors ${
                    currentStep >= step.id
                      ? 'border-agothe-teal bg-agothe-teal text-agothe-bg'
                      : 'border-[rgba(255,255,255,0.1)] text-agothe-muted'
                  }`}
                >
                  {currentStep > step.id ? <Check className="h-5 w-5" /> : step.id}
                </div>
                <div className="mt-2 text-center">
                  <p className="text-xs font-medium text-agothe-white">{step.title}</p>
                  <p className="text-[10px] text-agothe-muted/60">{step.description}</p>
                </div>
              </div>
              {idx < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-colors ${
                    currentStep > step.id ? 'bg-agothe-teal' : 'bg-[rgba(255,255,255,0.1)]'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Form Steps */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={reducedMotion ? {} : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={reducedMotion ? {} : { opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="rounded-lg border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] p-8 backdrop-blur-xl md:p-12">
            {currentStep === 1 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      setFormData({ ...formData, name: e.target.value });
                      setErrors({ ...errors, name: undefined });
                    }}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white placeholder-agothe-muted/40 transition-colors focus:border-agothe-teal focus:outline-none"
                    placeholder="Alex Gomez"
                  />
                  {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      setErrors({ ...errors, email: undefined });
                    }}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white placeholder-agothe-muted/40 transition-colors focus:border-agothe-teal focus:outline-none"
                    placeholder="alex@company.com"
                  />
                  {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Company *
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => {
                      setFormData({ ...formData, company: e.target.value });
                      setErrors({ ...errors, company: undefined });
                    }}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white placeholder-agothe-muted/40 transition-colors focus:border-agothe-teal focus:outline-none"
                    placeholder="Acme Corporation"
                  />
                  {errors.company && <p className="mt-1 text-xs text-red-400">{errors.company}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Role / Title *
                  </label>
                  <input
                    type="text"
                    value={formData.role}
                    onChange={(e) => {
                      setFormData({ ...formData, role: e.target.value });
                      setErrors({ ...errors, role: undefined });
                    }}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white placeholder-agothe-muted/40 transition-colors focus:border-agothe-teal focus:outline-none"
                    placeholder="Chief Strategy Officer"
                  />
                  {errors.role && <p className="mt-1 text-xs text-red-400">{errors.role}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Phone Number <span className="text-agothe-muted/60">(optional)</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white placeholder-agothe-muted/40 transition-colors focus:border-agothe-teal focus:outline-none"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-agothe-white">
                    What challenges are you facing? *
                  </h3>
                  <p className="mb-6 text-sm text-agothe-muted">Select all that apply</p>
                  <div className="space-y-3">
                    {CHALLENGES.map((challenge) => (
                      <button
                        key={challenge.value}
                        type="button"
                        onClick={() => toggleChallenge(challenge.value)}
                        className={`w-full rounded-lg border p-4 text-left transition-all ${
                          formData.challenges.includes(challenge.value)
                            ? 'border-agothe-teal bg-[rgba(0,240,255,0.05)]'
                            : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{challenge.icon}</span>
                          <span className="flex-1 text-sm text-agothe-white">
                            {challenge.label}
                          </span>
                          {formData.challenges.includes(challenge.value) && (
                            <Check className="h-5 w-5 text-agothe-teal" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                  {errors.challenges && (
                    <p className="mt-2 text-xs text-red-400">{errors.challenges}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Company Size *
                  </label>
                  <select
                    value={formData.companySize}
                    onChange={(e) => {
                      setFormData({ ...formData, companySize: e.target.value });
                      setErrors({ ...errors, companySize: undefined });
                    }}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white focus:border-agothe-teal focus:outline-none"
                  >
                    <option value="">Select company size</option>
                    {COMPANY_SIZES.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                  {errors.companySize && (
                    <p className="mt-1 text-xs text-red-400">{errors.companySize}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Current Tools Used <span className="text-agothe-muted/60">(optional)</span>
                  </label>
                  <textarea
                    value={formData.currentTools}
                    onChange={(e) => setFormData({ ...formData, currentTools: e.target.value })}
                    rows={3}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white placeholder-agothe-muted/40 transition-colors focus:border-agothe-teal focus:outline-none"
                    placeholder="e.g., Perplexity, OpenAI, internal tools..."
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Implementation Timeline *
                  </label>
                  <select
                    value={formData.timeline}
                    onChange={(e) => {
                      setFormData({ ...formData, timeline: e.target.value });
                      setErrors({ ...errors, timeline: undefined });
                    }}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white focus:border-agothe-teal focus:outline-none"
                  >
                    <option value="">Select timeline</option>
                    {TIMELINES.map((timeline) => (
                      <option key={timeline} value={timeline}>
                        {timeline}
                      </option>
                    ))}
                  </select>
                  {errors.timeline && <p className="mt-1 text-xs text-red-400">{errors.timeline}</p>}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Budget Range *
                  </label>
                  <select
                    value={formData.budgetRange}
                    onChange={(e) => {
                      setFormData({ ...formData, budgetRange: e.target.value });
                      setErrors({ ...errors, budgetRange: undefined });
                    }}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white focus:border-agothe-teal focus:outline-none"
                  >
                    <option value="">Select budget range</option>
                    {BUDGET_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  {errors.budgetRange && (
                    <p className="mt-1 text-xs text-red-400">{errors.budgetRange}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="mb-4 text-lg font-semibold text-agothe-white">
                    Meeting Type *
                  </h3>
                  <div className="space-y-3">
                    {MEETING_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, meetingType: type.value })}
                        className={`w-full rounded-lg border p-4 text-left transition-all ${
                          formData.meetingType === type.value
                            ? 'border-agothe-teal bg-[rgba(0,240,255,0.05)]'
                            : 'border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-agothe-white">{type.label}</p>
                            <p className="mt-1 text-sm text-agothe-muted">{type.description}</p>
                          </div>
                          {formData.meetingType === type.value && (
                            <Check className="h-5 w-5 text-agothe-teal" />
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-agothe-white">
                      Preferred Date <span className="text-agothe-muted/60">(optional)</span>
                    </label>
                    <input
                      type="date"
                      value={formData.preferredDate}
                      onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white focus:border-agothe-teal focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-medium text-agothe-white">
                      Preferred Time <span className="text-agothe-muted/60">(optional)</span>
                    </label>
                    <select
                      value={formData.preferredTime}
                      onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
                      className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white focus:border-agothe-teal focus:outline-none"
                    >
                      <option value="">Select time</option>
                      <option value="morning">Morning (9am-12pm)</option>
                      <option value="afternoon">Afternoon (12pm-3pm)</option>
                      <option value="evening">Evening (3pm-6pm)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-agothe-white">
                    Additional Notes <span className="text-agothe-muted/60">(optional)</span>
                  </label>
                  <textarea
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    rows={4}
                    className="w-full rounded-lg border border-[rgba(255,255,255,0.1)] bg-[rgba(0,0,0,0.3)] px-4 py-3 text-agothe-white placeholder-agothe-muted/40 transition-colors focus:border-agothe-teal focus:outline-none"
                    placeholder="Any specific topics you'd like to discuss?"
                  />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 px-6 py-3 text-sm font-medium text-agothe-muted transition-colors hover:text-agothe-white disabled:opacity-30 disabled:hover:text-agothe-muted"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>

              {currentStep < STEPS.length ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 rounded-full bg-agothe-teal px-8 py-3 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_20px_rgba(0,240,255,0.3)]"
                >
                  Continue
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="flex items-center gap-2 rounded-full bg-agothe-teal px-8 py-3 text-sm font-semibold text-agothe-bg transition-shadow hover:shadow-[0_0_20px_rgba(0,240,255,0.3)] disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      Submit Request
                      <Check className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Trust Signals */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-agothe-muted/60">
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-agothe-teal" />
          <span>No credit card required</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-agothe-teal" />
          <span>Response within 24 hours</span>
        </div>
        <div className="flex items-center gap-2">
          <Check className="h-4 w-4 text-agothe-teal" />
          <span>Custom tailored demo</span>
        </div>
      </div>
    </div>
  );
}
