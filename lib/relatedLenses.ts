import { RelatedLens } from "./auditTypes";

type FlagLensMap = {
  pattern: RegExp;
  lenses: RelatedLens[];
};

const flagLensMap: FlagLensMap[] = [
  {
    pattern: /truth.?consensus|consensus.?truth|popular|everyone knows|widely accepted/i,
    lenses: [
      { philosopherId: "tarski", name: "Alfred Tarski", reason: "Provides truth-condition framework to separate truth from agreement." },
      { philosopherId: "engel", name: "Pascal Engel", reason: "Distinguishes truth norm from consensus, utility, and popularity." },
      { philosopherId: "davidson", name: "Donald Davidson", reason: "Grounds truth in world-contact, not social acceptance." },
    ]
  },
  {
    pattern: /quantum|neuroscience|science proves|physics says|data shows|AI says|algorithm/i,
    lenses: [
      { philosopherId: "sellars", name: "Wilfrid Sellars", reason: "Audits when scientific vocabulary is treated as self-justifying." },
      { philosopherId: "carnap", name: "Rudolf Carnap", reason: "Checks logical syntax and verifiability of scientific claims." },
      { philosopherId: "cartwright", name: "Nancy Cartwright", reason: "Audits model scope and extrapolation beyond valid range." },
      { philosopherId: "vanfraassen", name: "Bas van Fraassen", reason: "Separates empirical adequacy from metaphysical truth." },
    ]
  },
  {
    pattern: /young people|everyone|people today|society|all people|most people|the public/i,
    lenses: [
      { philosopherId: "fricker", name: "Miranda Fricker", reason: "Checks whether group generalization erases dissenting voices." },
      { philosopherId: "anderson", name: "Elizabeth Anderson", reason: "Audits social generalization for hierarchy assumptions." },
      { philosopherId: "longino", name: "Helen Longino", reason: "Examines whether social claims reflect genuine critical interaction." },
    ]
  },
  {
    pattern: /dangerous|high risk|low trust|unqualified|classified|score|label|category/i,
    lenses: [
      { philosopherId: "hacking", name: "Ian Hacking", reason: "Detects looping effects where labels reshape the people they classify." },
      { philosopherId: "fricker", name: "Miranda Fricker", reason: "Audits credibility deficits imposed through classification." },
      { philosopherId: "anderson", name: "Elizabeth Anderson", reason: "Checks whether classification reinforces social hierarchy." },
    ]
  },
  {
    pattern: /system decided|automatically|algorithm decided|AI decided|no explanation|no appeal/i,
    lenses: [
      { philosopherId: "lackey", name: "Jennifer Lackey", reason: "Audits responsibility diffusion in collective or automated decisions." },
      { philosopherId: "strawson", name: "P. F. Strawson", reason: "Checks whether persons remain responsibility subjects, not just processing objects." },
      { philosopherId: "hart", name: "H. L. A. Hart", reason: "Audits institutional rule systems and their internal accountability." },
    ]
  },
  {
    pattern: /banned|suspended|cannot appeal|no recourse|arbitrary|opaque decision/i,
    lenses: [
      { philosopherId: "pettit", name: "Philip Pettit", reason: "Detects arbitrary power and missing appeal paths." },
      { philosopherId: "raz", name: "Joseph Raz", reason: "Audits whether authority is justified by serving autonomous reasoning." },
      { philosopherId: "dworkin", name: "Ronald Dworkin", reason: "Checks whether rights are respected as trumps in institutional decisions." },
    ]
  },
  {
    pattern: /greater good|optimization|maximize|utilitarian|sacrifice|efficiency/i,
    lenses: [
      { philosopherId: "williams", name: "Bernard Williams", reason: "Detects when system optimization destroys individual integrity." },
      { philosopherId: "scanlon", name: "T. M. Scanlon", reason: "Checks whether the claim is justifiable to all affected parties." },
      { philosopherId: "korsgaard", name: "Christine Korsgaard", reason: "Audits whether autonomy and practical identity are preserved." },
    ]
  },
  {
    pattern: /log|data|behavior|pattern|metrics|track|record|profile/i,
    lenses: [
      { philosopherId: "anscombe", name: "Elizabeth Anscombe", reason: "Audits log-to-action reduction and the gap between behavior and intention." },
      { philosopherId: "davidson", name: "Donald Davidson", reason: "Reconstructs action descriptions with intention and context." },
      { philosopherId: "strawson", name: "P. F. Strawson", reason: "Checks whether the person remains a responsible subject in the description." },
    ]
  },
  {
    pattern: /past data|history shows|previous record|always been|fixed|permanent|cannot change/i,
    lenses: [
      { philosopherId: "mcdowell", name: "John McDowell", reason: "Detects when past data closes formation possibility and reason-responsiveness." },
      { philosopherId: "parfit", name: "Derek Parfit", reason: "Audits personal identity assumptions in future-fixing claims." },
      { philosopherId: "hacking", name: "Ian Hacking", reason: "Checks whether classification creates self-fulfilling future closure." },
    ]
  },
  {
    pattern: /meaning of|defined as|by definition|essentially|by nature|must be/i,
    lenses: [
      { philosopherId: "putnam", name: "Hilary Putnam", reason: "Detects meaning externalism issues and context-shift." },
      { philosopherId: "dummett", name: "Michael Dummett", reason: "Audits whether definitions are verifiable and manifest." },
      { philosopherId: "wittgenstein", name: "Ludwig Wittgenstein", reason: "Checks whether meaning is grounded in use, not isolated definition." },
    ]
  },
  {
    pattern: /hidden|assumes|takes for granted|implicit|presupposes/i,
    lenses: [
      { philosopherId: "russell", name: "Bertrand Russell", reason: "Detects hidden existence assumptions and ontological commitments." },
      { philosopherId: "quine", name: "W. V. O. Quine", reason: "Maps the background belief web supporting the claim." },
      { philosopherId: "fine", name: "Kit Fine", reason: "Audits grounding and essence assumptions." },
    ]
  },
  {
    pattern: /institution|policy|rule|regulation|authority|government|organization|platform/i,
    lenses: [
      { philosopherId: "austin", name: "J. L. Austin", reason: "Audits what the institutional speech act is doing, not just saying." },
      { philosopherId: "searle", name: "John Searle", reason: "Detects when institutional facts are treated as brute natural facts." },
      { philosopherId: "hart", name: "H. L. A. Hart", reason: "Audits legal and institutional rule systems." },
    ]
  },
];

export function detectRelatedLenses(text: string, flags: string[]): RelatedLens[] {
  const combined = text + " " + flags.join(" ");
  const seen = new Set<string>();
  const result: RelatedLens[] = [];

  for (const entry of flagLensMap) {
    if (entry.pattern.test(combined)) {
      for (const lens of entry.lenses) {
        if (!seen.has(lens.philosopherId) && result.length < 5) {
          seen.add(lens.philosopherId);
          result.push(lens);
        }
      }
    }
  }

  if (result.length < 3) {
    const defaults: RelatedLens[] = [
      { philosopherId: "tarski", name: "Alfred Tarski", reason: "Clarifies the truth conditions of the claim." },
      { philosopherId: "frege", name: "Gottlob Frege", reason: "Audits proposition structure and sense/reference." },
      { philosopherId: "sellars", name: "Wilfrid Sellars", reason: "Checks for data-to-knowledge gaps." },
    ];
    for (const d of defaults) {
      if (!seen.has(d.philosopherId) && result.length < 5) {
        seen.add(d.philosopherId);
        result.push(d);
      }
    }
  }

  return result.slice(0, 5);
}
