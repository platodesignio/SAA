import { philosophers, philosopherCategories, getPhilosophersByCategory } from "@/lib/philosopherFramework";
import { PhilosopherCard } from "@/components/PhilosopherCard";

const AUDIT_LAYERS = [
  { name: "Frege Layer", subtitle: "Proposition Before Isolated Words", description: "Words do not have stable audit value in isolation. A word must be examined inside the proposition in which it functions." },
  { name: "Russell Layer", subtitle: "Description and Hidden Existence Audit", description: "Descriptions may hide existence assumptions. Audit for hidden ontological commitments and self-referential classification loops." },
  { name: "Tarski Layer", subtitle: "Truth Condition Audit", description: "A claim must be audited by asking: Under what conditions would this sentence be true?" },
  { name: "Sellars Layer", subtitle: "Myth of the Given Audit", description: "Data, experience, logs, and scientific vocabulary are not automatically knowledge. They require an inferential bridge." },
  { name: "Quine Layer", subtitle: "Belief System Audit", description: "A claim belongs to a wider web of belief. Detect hidden assumptions and where the belief web could be adjusted." },
  { name: "Davidson Layer", subtitle: "Interpretation and Truth", description: "Meaning depends on truth conditions and interpretive context. Reconstruct the charitable version of the claim." },
  { name: "Putnam Layer", subtitle: "Meaning Externalism", description: "Meaning is not only in the head. Detect when technical terms move between expert context and public rhetoric." },
  { name: "Pascal Engel Layer", subtitle: "Truth Norm Audit", description: "Truth must not be reduced to usefulness, popularity, consensus, institutional convenience, or social approval." },
  { name: "Fricker Layer", subtitle: "Epistemic Injustice Audit", description: "A person may be wronged as a knower. Detect testimonial and hermeneutical injustice." },
  { name: "Lackey Layer", subtitle: "Testimony and Collective Knowledge Audit", description: "Knowledge often depends on testimony and collective epistemic structures. Detect responsibility diffusion." },
  { name: "Hacking Layer", subtitle: "Classification and Looping Effects Audit", description: "Classifications do not merely describe people. They can reshape people, institutions, and futures." },
  { name: "Anscombe Layer", subtitle: "Action Description Audit", description: "External behavior or logs are not identical with action meaning. Actions must be understood under descriptions and intentions." },
  { name: "Strawson Layer", subtitle: "Personhood and Responsibility Audit", description: "A human being must not be reduced to a risk object, data object, or processing object." },
  { name: "McDowell Layer", subtitle: "Formation and Second Nature Audit", description: "Human beings are not only past data. They are formed beings capable of learning, correction, and reason-responsiveness." },
  { name: "Bernard Williams Layer", subtitle: "Integrity and Moral Limit Audit", description: "Abstract morality, optimization, or institutional rationality must not destroy personal integrity." },
  { name: "Pettit Layer", subtitle: "Non-Domination Audit", description: "Freedom is not only non-interference. Freedom requires protection from arbitrary power." },
];

export default function FrameworkPage() {
  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-xl font-bold text-gray-900">Framework</h1>
        <p className="text-sm text-gray-500 mt-1">The philosophy behind Statement Audit.</p>
      </div>

      {/* Core Principle */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900">Core Principle</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          A proposition is not an isolated logical atom.
          It is a late-stage symbolic output generated through language, body, environment, institution, culture, technology, and division of labor.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Statement Audit therefore asks not only whether a claim is true or false, but also:
        </p>
        <ul className="text-sm text-gray-600 space-y-1 ml-1">
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>what generated it</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>which layer it belongs to</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>whether it overreaches across layers</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>what belief it produces</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>what institution it protects</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>who it classifies</li>
          <li className="flex gap-2"><span className="text-gray-300 shrink-0">—</span>whether it opens or closes future freedom</li>
        </ul>
      </section>

      {/* What is it */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900">What is Statement Audit?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Statement Audit is a philosophical audit tool for claims, propositions, arguments, SNS posts, headlines, AI outputs, and institutional language. It is not a debate tool, a fact-checking service, a moral scoring app, or a self-help tool. It audits the logical structure, layer composition, belief-generation risk, institutional effects, and dialectical direction of statements.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          It does not score persons. It does not determine who is morally superior. It does not generate rebuttals designed to win arguments. It clarifies what a claim is doing — structurally, institutionally, and dialectically.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-sm font-medium text-gray-900">Statement Audit is not a truth machine. It is a clarification and audit tool.</p>
        </div>
      </section>

      {/* What is DDAT */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900">What is DDAT?</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          DDAT stands for Dialectical Direction Audit Theory. DDAT does not score persons. DDAT audits the directional movement of claims, institutions, classifications, and belief systems — asking whether a claim moves toward positive clarification or negative closure.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Positive Directions</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Freedom-generating clarification</li>
              <li>• Responsibility-generating correction</li>
              <li>• Reality-contact improvement</li>
              <li>• Openness to external corrective signals</li>
              <li>• Return / re-entry capacity</li>
            </ul>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
            <h3 className="text-xs font-semibold text-gray-900 uppercase tracking-wider mb-2">Negative Closure Directions</h3>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Self-justifying closure</li>
              <li>• Epistemic injustice</li>
              <li>• Future closure</li>
              <li>• Classification fixation</li>
              <li>• Truth/consensus confusion</li>
              <li>• Responsibility diffusion</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why no scores */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900">No Person Rating. No Moral Score. No Debate Game.</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          An audit tool that scores persons would reproduce the very structure it is designed to examine: classification fixation, epistemic injustice, and future closure. A claim can be audited. A person cannot be reduced to a score. Heuristic scores in Statement Audit are applied to propositions — they are audit indicators, not judgments of human worth.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100 space-y-2">
          <p className="text-sm text-gray-700">Statement Audit never:</p>
          <ul className="text-xs text-gray-600 space-y-1 ml-2">
            <li>• Rates a person</li>
            <li>• Ranks a user</li>
            <li>• Assigns a moral score to a human being</li>
            <li>• Uses numeric correctness scores on persons</li>
            <li>• Encourages humiliation, dunking, or adversarial quote-tweet use</li>
            <li>• Converts disagreement into personal judgment</li>
          </ul>
        </div>
      </section>

      {/* Audit layers */}
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-gray-900">The Audit Layers</h2>
        <p className="text-sm text-gray-500">Each audit draws on one or more of these philosophical layers.</p>
        <div className="space-y-3">
          {AUDIT_LAYERS.map(layer => (
            <div key={layer.name} className="border border-gray-200 rounded-lg p-4 bg-white">
              <div className="flex items-baseline gap-2 mb-1">
                <h3 className="text-sm font-semibold text-gray-900">{layer.name}</h3>
                <span className="text-xs text-accent">{layer.subtitle}</span>
              </div>
              <p className="text-xs text-gray-600 leading-relaxed">{layer.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Philosopher map */}
      <section className="space-y-6">
        <h2 className="text-base font-semibold text-gray-900">Audit Philosophy Figure Map</h2>
        <p className="text-sm text-gray-500">
          {philosophers.length} figures organized by audit function. Names, countries, and concepts only — no portraits, no avatars.
        </p>
        {philosopherCategories.map(category => {
          const group = getPhilosophersByCategory(category);
          if (group.length === 0) return null;
          return (
            <div key={category} className="space-y-3">
              <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-100 pb-2">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {group.map(philosopher => (
                  <PhilosopherCard key={philosopher.id} philosopher={philosopher} />
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Privacy */}
      <section className="space-y-3">
        <h2 className="text-base font-semibold text-gray-900">Privacy</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Your audit history is stored locally on your device by default. No data is sent to a server in the default configuration. If a future version integrates an external AI API, you will be clearly informed and given the option to disable it.
        </p>
        <p className="text-sm text-gray-600">
          Do not paste private, confidential, medical, legal, or sensitive personal information unless you understand the risk.
        </p>
      </section>

      {/* Limitations */}
      <section className="space-y-3 border-t border-gray-100 pt-6">
        <h2 className="text-base font-semibold text-gray-900">Limitations</h2>
        <p className="text-sm text-gray-600 leading-relaxed">
          Statement Audit is a mock audit engine in this version. Its outputs are pattern-based, not LLM-powered. They are illustrative, not authoritative. The audit layers and philosopher framework represent genuine philosophical traditions, but the engine's detection is approximate. Use this tool to generate starting points for your own critical thinking, not as a final verdict.
        </p>
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-100">
          <p className="text-sm text-gray-700">Statement Audit is not a truth machine. It clarifies the conditions under which a claim could be evaluated.</p>
        </div>
      </section>
    </div>
  );
}
