export interface Philosopher {
  id: string;
  name: string;
  country: string;
  category: string;
  field: string[];
  auditFunction: string;
  keyConcepts: string[];
  appUse: string;
}

export const philosophers: Philosopher[] = [
  {
    id: "frege",
    name: "Gottlob Frege",
    country: "Germany",
    category: "Logic / Meaning / Truth",
    field: ["logic", "meaning", "truth"],
    auditFunction: "Sense/reference audit, proposition before isolated words",
    keyConcepts: ["sense", "reference", "context principle", "anti-psychologism"],
    appUse: "Detects when words are treated as having stable meaning outside a proposition. Identifies sense/reference confusion."
  },
  {
    id: "russell",
    name: "Bertrand Russell",
    country: "United Kingdom",
    category: "Logic / Meaning / Truth",
    field: ["logic", "meaning", "truth"],
    auditFunction: "Description and hidden existence assumption audit",
    keyConcepts: ["theory of descriptions", "logical analysis", "Russell's paradox", "type theory"],
    appUse: "Detects hidden ontological commitments and descriptions that assume objects or classes already exist."
  },
  {
    id: "moore",
    name: "G. E. Moore",
    country: "United Kingdom",
    category: "Logic / Meaning / Truth",
    field: ["ethics", "value"],
    auditFunction: "Value-reduction audit",
    keyConcepts: ["naturalistic fallacy", "common sense", "non-natural goodness"],
    appUse: "Detects when value claims are reduced to natural or empirical properties."
  },
  {
    id: "tarski",
    name: "Alfred Tarski",
    country: "Poland / United States",
    category: "Logic / Meaning / Truth",
    field: ["logic", "meaning", "truth"],
    auditFunction: "Truth-condition audit",
    keyConcepts: ["semantic conception of truth", "object language", "metalanguage"],
    appUse: "Asks: under what conditions would this sentence be true? Separates object-language claims from meta-language audit."
  },
  {
    id: "carnap",
    name: "Rudolf Carnap",
    country: "Germany / United States",
    category: "Logic / Meaning / Truth",
    field: ["logic", "science", "language"],
    auditFunction: "Logical syntax and scientific language audit",
    keyConcepts: ["logical syntax", "verification", "explication", "linguistic frameworks"],
    appUse: "Audits scientific language claims and detects pseudo-statements that lack verifiability conditions."
  },
  {
    id: "wittgenstein",
    name: "Ludwig Wittgenstein",
    country: "Austria / United Kingdom",
    category: "Language / Action / Institution",
    field: ["language", "use", "practice"],
    auditFunction: "Language-game and use-context audit",
    keyConcepts: ["language games", "forms of life", "meaning as use", "private language argument"],
    appUse: "Detects when terms jump language games without acknowledgment. Audits claims about meaning and private experience."
  },
  {
    id: "austin",
    name: "J. L. Austin",
    country: "United Kingdom",
    category: "Language / Action / Institution",
    field: ["language", "action", "institution"],
    auditFunction: "Speech-act audit",
    keyConcepts: ["performative utterance", "illocution", "ordinary language"],
    appUse: "Audits what a statement is doing as well as saying. Detects when institutional speech acts create facts."
  },
  {
    id: "searle",
    name: "John Searle",
    country: "United States",
    category: "Language / Action / Institution",
    field: ["language", "action", "institution"],
    auditFunction: "Institutional fact audit",
    keyConcepts: ["speech acts", "institutional facts", "collective intentionality", "status functions"],
    appUse: "Detects when institutional facts are treated as brute natural facts. Audits status functions and their justifications."
  },
  {
    id: "strawson",
    name: "P. F. Strawson",
    country: "United Kingdom",
    category: "Ethics / Personhood / Responsibility",
    field: ["personhood", "responsibility"],
    auditFunction: "Personhood and responsibility-subject audit",
    keyConcepts: ["reactive attitudes", "descriptive metaphysics", "persons", "responsibility"],
    appUse: "Detects when persons are reduced to objects of management. Checks for loss of reactive attitudes and appeal paths."
  },
  {
    id: "sellars",
    name: "Wilfrid Sellars",
    country: "United States",
    category: "Belief / Knowledge / Evidence",
    field: ["belief", "knowledge", "evidence"],
    auditFunction: "Myth of the Given and data-to-knowledge audit",
    keyConcepts: ["myth of the given", "space of reasons", "scientific image", "manifest image"],
    appUse: "Detects when data, observations, logs, or scientific results are treated as self-justifying knowledge without inferential bridges."
  },
  {
    id: "quine",
    name: "W. V. O. Quine",
    country: "United States",
    category: "Belief / Knowledge / Evidence",
    field: ["belief", "knowledge", "evidence"],
    auditFunction: "Belief-web audit",
    keyConcepts: ["web of belief", "indeterminacy of translation", "ontological commitment", "naturalized epistemology"],
    appUse: "Identifies background belief systems behind claims. Detects hidden assumptions and revision points in the belief web."
  },
  {
    id: "davidson",
    name: "Donald Davidson",
    country: "United States",
    category: "Belief / Knowledge / Evidence",
    field: ["meaning", "truth", "interpretation"],
    auditFunction: "Truth-condition and interpretation audit",
    keyConcepts: ["radical interpretation", "truth-conditional semantics", "triangulation", "action explanation"],
    appUse: "Reconstructs charitable interpretations and separates intended meaning from literal claim."
  },
  {
    id: "putnam",
    name: "Hilary Putnam",
    country: "United States",
    category: "Belief / Knowledge / Evidence",
    field: ["meaning", "externalism"],
    auditFunction: "Meaning externalism and context-shift audit",
    keyConcepts: ["semantic externalism", "twin earth", "internal realism", "fact/value entanglement"],
    appUse: "Detects meaning drift from expert context to public rhetoric. Audits when technical terms move across domains."
  },
  {
    id: "dummett",
    name: "Michael Dummett",
    country: "United Kingdom",
    category: "Logic / Meaning / Truth",
    field: ["meaning", "verification"],
    auditFunction: "Verification and meaning audit",
    keyConcepts: ["anti-realism", "meaning theory", "manifestation", "verification"],
    appUse: "Audits whether claims can be manifested in observable conditions. Checks meaning against verification requirements."
  },
  {
    id: "kripke",
    name: "Saul Kripke",
    country: "United States",
    category: "Logic / Meaning / Truth",
    field: ["meaning", "modality"],
    auditFunction: "Naming, necessity, and essentialization audit",
    keyConcepts: ["rigid designation", "necessity", "possible worlds", "rule-following"],
    appUse: "Detects when contingent properties are treated as necessary. Audits essentialization and rigid-designation errors."
  },
  {
    id: "lewis",
    name: "David Lewis",
    country: "United States",
    category: "Logic / Meaning / Truth",
    field: ["modality", "counterfactuals"],
    auditFunction: "Counterfactual and possible-world audit",
    keyConcepts: ["possible worlds", "counterfactuals", "convention", "causation"],
    appUse: "Audits counterfactual claims and causal assertions. Checks what would be true in alternative scenarios."
  },
  {
    id: "fine",
    name: "Kit Fine",
    country: "United Kingdom",
    category: "Logic / Meaning / Truth",
    field: ["metaphysics", "grounding"],
    auditFunction: "Essence and grounding audit",
    keyConcepts: ["essence", "grounding", "modality", "metaphysical dependence"],
    appUse: "Audits claims about essence, ground, and ontological dependence. Detects hidden assumptions about what explains what."
  },
  {
    id: "horwich",
    name: "Paul Horwich",
    country: "United Kingdom / United States",
    category: "Logic / Meaning / Truth",
    field: ["truth", "minimalism"],
    auditFunction: "Deflationary truth audit",
    keyConcepts: ["minimalism about truth", "meaning as use", "deflationism"],
    appUse: "Audits inflated claims about truth. Checks whether truth-talk exceeds what a minimal conception requires."
  },
  {
    id: "brandom",
    name: "Robert Brandom",
    country: "United States",
    category: "Belief / Knowledge / Evidence",
    field: ["normativity", "inferentialism"],
    auditFunction: "Inferential and normative-pragmatic audit",
    keyConcepts: ["inferentialism", "giving and asking for reasons", "normativity", "recognition"],
    appUse: "Checks what inferential commitments a claim entails. Audits whether reasons are given and whether they are accepted."
  },
  {
    id: "goldman",
    name: "Alvin Goldman",
    country: "United States",
    category: "Belief / Knowledge / Evidence",
    field: ["belief", "knowledge", "evidence"],
    auditFunction: "Reliability and social epistemology audit",
    keyConcepts: ["reliabilism", "social epistemology", "epistemic process"],
    appUse: "Audits whether knowledge claims rely on reliable processes. Checks the social epistemology behind claims."
  },
  {
    id: "gettier",
    name: "Edmund Gettier",
    country: "United States",
    category: "Belief / Knowledge / Evidence",
    field: ["knowledge", "justification"],
    auditFunction: "Knowledge-condition failure audit",
    keyConcepts: ["Gettier problem", "justified true belief", "epistemic luck"],
    appUse: "Detects when justified true belief claims fail due to epistemic luck or accidental correctness."
  },
  {
    id: "sosa",
    name: "Ernest Sosa",
    country: "Cuba / United States",
    category: "Belief / Knowledge / Evidence",
    field: ["virtue epistemology"],
    auditFunction: "Virtue epistemology and competence audit",
    keyConcepts: ["apt belief", "intellectual virtue", "competence", "performance"],
    appUse: "Audits whether a claim results from intellectual competence or luck. Applies virtue standards to knowledge claims."
  },
  {
    id: "williamson",
    name: "Timothy Williamson",
    country: "United Kingdom",
    category: "Belief / Knowledge / Evidence",
    field: ["knowledge", "evidence"],
    auditFunction: "Knowledge-first and evidence audit",
    keyConcepts: ["knowledge-first epistemology", "evidence", "vagueness", "modal knowledge"],
    appUse: "Audits evidence claims and vagueness. Checks whether knowledge or merely belief is being claimed."
  },
  {
    id: "lackey",
    name: "Jennifer Lackey",
    country: "United States",
    category: "Belief / Knowledge / Evidence",
    field: ["testimony", "collective knowledge"],
    auditFunction: "Testimony and collective knowledge responsibility audit",
    keyConcepts: ["testimony", "collective epistemology", "epistemic responsibility"],
    appUse: "Identifies whose testimony is used or ignored. Detects responsibility diffusion in collective or automated decisions."
  },
  {
    id: "haack",
    name: "Susan Haack",
    country: "United Kingdom / United States",
    category: "Belief / Knowledge / Evidence",
    field: ["evidence", "inquiry"],
    auditFunction: "Evidence-network audit",
    keyConcepts: ["foundherentism", "evidence", "inquiry", "science and law"],
    appUse: "Audits the network of evidence behind a claim. Checks how evidence strands interconnect and whether they are sufficient."
  },
  {
    id: "fricker",
    name: "Miranda Fricker",
    country: "United Kingdom",
    category: "Ethics / Personhood / Responsibility",
    field: ["epistemic injustice"],
    auditFunction: "Epistemic injustice audit",
    keyConcepts: ["testimonial injustice", "hermeneutical injustice", "credibility deficit"],
    appUse: "Detects when testimony is dismissed due to identity, status, or label. Audits suppressed voices and credibility deficits."
  },
  {
    id: "hacking",
    name: "Ian Hacking",
    country: "Canada",
    category: "Classification / Science / Models",
    field: ["classification", "science", "models"],
    auditFunction: "Classification and looping-effect audit",
    keyConcepts: ["looping effects", "human kinds", "historical ontology", "classification"],
    appUse: "Detects classifications that reshape people or close futures. Audits looping effects where labels become self-confirming."
  },
  {
    id: "longino",
    name: "Helen Longino",
    country: "United States",
    category: "Classification / Science / Models",
    field: ["social objectivity"],
    auditFunction: "Social objectivity audit",
    keyConcepts: ["critical interaction", "social objectivity", "feminist philosophy of science"],
    appUse: "Audits whether scientific claims emerge from genuine critical interaction or socially skewed consensus."
  },
  {
    id: "cartwright",
    name: "Nancy Cartwright",
    country: "United States / United Kingdom",
    category: "Classification / Science / Models",
    field: ["science", "models", "causality"],
    auditFunction: "Model-scope and causal-limit audit",
    keyConcepts: ["capacities", "model limits", "causal powers", "evidence for policy"],
    appUse: "Audits when model results are extrapolated beyond their scope. Checks whether causal claims are model-specific."
  },
  {
    id: "vanfraassen",
    name: "Bas van Fraassen",
    country: "Netherlands / Canada / United States",
    category: "Classification / Science / Models",
    field: ["science", "empiricism"],
    auditFunction: "Prediction-success versus reality audit",
    keyConcepts: ["constructive empiricism", "empirical adequacy", "scientific realism"],
    appUse: "Distinguishes empirical adequacy from truth. Audits when scientific success is converted into metaphysical claims."
  },
  {
    id: "popper",
    name: "Karl Popper",
    country: "Austria / United Kingdom",
    category: "Classification / Science / Models",
    field: ["science", "falsifiability"],
    auditFunction: "Falsifiability audit",
    keyConcepts: ["falsifiability", "critical rationalism", "open society"],
    appUse: "Checks whether claims can be falsified. Detects unfalsifiable assertions presented as scientific."
  },
  {
    id: "kuhn",
    name: "Thomas Kuhn",
    country: "United States",
    category: "Classification / Science / Models",
    field: ["science", "paradigms"],
    auditFunction: "Paradigm audit",
    keyConcepts: ["paradigm", "normal science", "scientific revolution", "incommensurability"],
    appUse: "Audits claims that treat current scientific paradigm as final. Detects incommensurability between frameworks."
  },
  {
    id: "lakatos",
    name: "Imre Lakatos",
    country: "Hungary / United Kingdom",
    category: "Classification / Science / Models",
    field: ["science", "research programs"],
    auditFunction: "Research-program audit",
    keyConcepts: ["progressive research program", "degenerating research program", "protective belt"],
    appUse: "Audits whether a scientific claim belongs to a progressive or degenerating research program."
  },
  {
    id: "feyerabend",
    name: "Paul Feyerabend",
    country: "Austria / United States",
    category: "Classification / Science / Models",
    field: ["science", "method pluralism"],
    auditFunction: "Method-pluralism audit",
    keyConcepts: ["methodological pluralism", "against method", "epistemic anarchism"],
    appUse: "Audits dogmatic appeals to a single method as the only valid approach to knowledge."
  },
  {
    id: "kitcher",
    name: "Philip Kitcher",
    country: "United Kingdom / United States",
    category: "Classification / Science / Models",
    field: ["science", "democracy"],
    auditFunction: "Social organization of knowledge audit",
    keyConcepts: ["well-ordered science", "scientific division of labor", "science and democracy"],
    appUse: "Audits whether scientific knowledge serves democratic ideals. Checks social organization behind knowledge claims."
  },
  {
    id: "anscombe",
    name: "Elizabeth Anscombe",
    country: "Ireland / United Kingdom",
    category: "Ethics / Personhood / Responsibility",
    field: ["action", "intention", "ethics"],
    auditFunction: "Intention and action-description audit",
    keyConcepts: ["intention", "action description", "practical reason", "modern moral philosophy critique"],
    appUse: "Detects log-to-action reduction. Audits when behavior is described without reference to reasons or intentions."
  },
  {
    id: "foot",
    name: "Philippa Foot",
    country: "United Kingdom",
    category: "Ethics / Personhood / Responsibility",
    field: ["ethics", "virtue"],
    auditFunction: "Natural goodness and virtue audit",
    keyConcepts: ["virtue ethics", "natural goodness", "practical rationality"],
    appUse: "Audits whether goodness claims are grounded in genuine human flourishing or in imposed standards."
  },
  {
    id: "williams",
    name: "Bernard Williams",
    country: "United Kingdom",
    category: "Ethics / Personhood / Responsibility",
    field: ["ethics", "integrity"],
    auditFunction: "Integrity and moral-limit audit",
    keyConcepts: ["integrity", "internal reasons", "moral luck", "critique of utilitarianism"],
    appUse: "Detects when system optimization or abstract morality destroys individual integrity and personal reasons."
  },
  {
    id: "parfit",
    name: "Derek Parfit",
    country: "United Kingdom",
    category: "Ethics / Personhood / Responsibility",
    field: ["personal identity", "future ethics"],
    auditFunction: "Personal identity and future-person audit",
    keyConcepts: ["personal identity", "reasons", "future generations", "reductionism"],
    appUse: "Audits claims about future persons and long-term consequences. Checks personal identity assumptions."
  },
  {
    id: "scanlon",
    name: "T. M. Scanlon",
    country: "United States",
    category: "Ethics / Personhood / Responsibility",
    field: ["ethics", "justification"],
    auditFunction: "Justifiability-to-others audit",
    keyConcepts: ["contractualism", "reasons", "what we owe to each other"],
    appUse: "Checks whether a claim or action could be justified to all affected parties. Detects unjustifiable impositions."
  },
  {
    id: "korsgaard",
    name: "Christine Korsgaard",
    country: "United States",
    category: "Ethics / Personhood / Responsibility",
    field: ["ethics", "autonomy"],
    auditFunction: "Autonomy and practical identity audit",
    keyConcepts: ["practical identity", "self-constitution", "Kantian constructivism"],
    appUse: "Detects when practical identities are imposed rather than self-constituted. Audits autonomy undermining."
  },
  {
    id: "mcdowell",
    name: "John McDowell",
    country: "South Africa / United Kingdom / United States",
    category: "Ethics / Personhood / Responsibility",
    field: ["reason", "formation", "ethics"],
    auditFunction: "Second nature and reason-responsiveness audit",
    keyConcepts: ["second nature", "space of reasons", "mind and world", "ethical formation"],
    appUse: "Detects when a claim fixes a person by past data and closes formation possibility. Audits reason-responsiveness."
  },
  {
    id: "rawls",
    name: "John Rawls",
    country: "United States",
    category: "Justice / Freedom / Non-Domination",
    field: ["justice", "institution"],
    auditFunction: "Basic-structure justice audit",
    keyConcepts: ["justice as fairness", "original position", "veil of ignorance", "basic structure"],
    appUse: "Audits institutional arrangements for fairness. Checks whether claims could be justified from behind a veil of ignorance."
  },
  {
    id: "anderson",
    name: "Elizabeth Anderson",
    country: "United States",
    category: "Justice / Freedom / Non-Domination",
    field: ["equality", "social relations"],
    auditFunction: "Relational equality audit",
    keyConcepts: ["democratic equality", "relational equality", "social hierarchy", "workplace domination"],
    appUse: "Detects social hierarchy and domination. Audits whether claims support or undermine relational equality."
  },
  {
    id: "pettit",
    name: "Philip Pettit",
    country: "Ireland",
    category: "Justice / Freedom / Non-Domination",
    field: ["freedom", "non-domination"],
    auditFunction: "Non-domination audit",
    keyConcepts: ["freedom as non-domination", "republicanism", "arbitrary power"],
    appUse: "Detects arbitrary institutional power and opacity. Audits whether appeal paths exist and domination is absent."
  },
  {
    id: "raz",
    name: "Joseph Raz",
    country: "Israel / United Kingdom",
    category: "Justice / Freedom / Non-Domination",
    field: ["authority", "autonomy"],
    auditFunction: "Authority and autonomy audit",
    keyConcepts: ["authority", "autonomy", "reasons", "perfectionism"],
    appUse: "Audits claims of authority. Checks whether authority is justified by serving the autonomous reasoning of those subject to it."
  },
  {
    id: "hart",
    name: "H. L. A. Hart",
    country: "United Kingdom",
    category: "Justice / Freedom / Non-Domination",
    field: ["law", "institution"],
    auditFunction: "Rule-system and legal-institution audit",
    keyConcepts: ["legal positivism", "rule of recognition", "internal point of view"],
    appUse: "Audits institutional rule systems and their internal logic. Detects when legal or institutional structures are treated as self-justifying."
  },
  {
    id: "dworkin",
    name: "Ronald Dworkin",
    country: "United States",
    category: "Justice / Freedom / Non-Domination",
    field: ["law", "rights", "interpretation"],
    auditFunction: "Rights and principle-based interpretation audit",
    keyConcepts: ["law as integrity", "rights", "principles", "interpretation"],
    appUse: "Audits whether institutional decisions respect rights as trumps. Checks interpretive coherence of institutional claims."
  },
  {
    id: "dennett",
    name: "Daniel Dennett",
    country: "United States",
    category: "AI / Mind / Cognitive Environment",
    field: ["mind", "AI", "attribution"],
    auditFunction: "Intentional-stance and AI-attribution audit",
    keyConcepts: ["intentional stance", "consciousness", "free will", "evolution"],
    appUse: "Audits when intentional-stance language is applied to AI systems. Detects when AI attribution exceeds valid inference."
  },
  {
    id: "clark",
    name: "Andy Clark",
    country: "United Kingdom",
    category: "AI / Mind / Cognitive Environment",
    field: ["cognition", "environment", "AI"],
    auditFunction: "Extended cognition and cognitive-environment audit",
    keyConcepts: ["extended mind", "predictive processing", "embodied cognition", "cognitive scaffolding"],
    appUse: "Audits claims about minds and cognitive systems extended into environments and tools. Detects cognitive-environment conflation."
  },
  {
    id: "engel",
    name: "Pascal Engel",
    country: "France",
    category: "Logic / Meaning / Truth",
    field: ["truth", "normativity"],
    auditFunction: "Truth norm audit — separates truth from consensus, utility, and popularity",
    keyConcepts: ["truth norm", "alethic normativity", "anti-pragmatism", "belief correctness"],
    appUse: "Detects when truth is reduced to consensus, usefulness, or social approval. Audits truth/consensus confusion."
  }
];

export const philosopherCategories = [
  "Logic / Meaning / Truth",
  "Belief / Knowledge / Evidence",
  "Language / Action / Institution",
  "Classification / Science / Models",
  "Ethics / Personhood / Responsibility",
  "Justice / Freedom / Non-Domination",
  "AI / Mind / Cognitive Environment",
];

export function getPhilosopherById(id: string): Philosopher | undefined {
  return philosophers.find(p => p.id === id);
}

export function getPhilosophersByCategory(category: string): Philosopher[] {
  return philosophers.filter(p => p.category === category);
}
