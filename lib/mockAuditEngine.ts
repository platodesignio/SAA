import { AuditRequest, AuditResult, AuditCard } from "./auditTypes";
import { detectRelatedLenses } from "./relatedLenses";
import { generateMarkdown } from "./markdown";

const EXAMPLE_INPUT = "Quantum information theory has produced the hypothesis that everything is quantum information, and this view is accepted among young people.";

function detectFlags(text: string): string[] {
  const flags: string[] = [];
  const t = text.toLowerCase();

  if (/\ball\b|\beverything\b|\balways\b|\bnever\b|\beveryone\b/.test(t)) flags.push("Overgeneralization / Scope Problem");
  if (/science proves|quantum|neuroscience|physics says|brain science/.test(t)) flags.push("Scientific Overreach Risk");
  if (/young people|everyone|people today|society|the public/.test(t)) flags.push("Social Generalization Risk");
  if (/\baccepted\b|\bpopular\b|\btrending\b|everyone knows/.test(t)) flags.push("Truth/Consensus Confusion");
  if (/\bdata\b|\blog\b|\bscore\b|AI says|algorithm/.test(t)) flags.push("Data Givenness Risk");
  if (/dangerous person|high risk|low trust|unqualified/.test(t)) flags.push("Classification Risk");
  if (/the system decided|automatically|algorithm decided/.test(t)) flags.push("Responsibility Diffusion");
  if (/cannot appeal|banned|suspended|no explanation/.test(t)) flags.push("Non-Domination Risk");
  if (/for the greater good|optimization|maximize/.test(t)) flags.push("Integrity Risk");
  if (/must be|essentially|by nature/.test(t)) flags.push("Essentialization Risk");
  if (/just data|only numbers|mere statistics/.test(t)) flags.push("Data Reduction Risk");
  if (/hypothesis|theory|suggests|may/.test(t)) flags.push("Hypothetical Status Unclear");
  if (flags.length === 0) flags.push("Requires Scope Clarification");

  return flags;
}

function extractUndefinedTerms(text: string): string[] {
  const candidates: string[] = [];
  const t = text.toLowerCase();

  const termPatterns: [RegExp, string][] = [
    [/quantum information/i, "quantum information"],
    [/everything/i, "everything"],
    [/hypothesis/i, "hypothesis (scope unclear)"],
    [/accepted/i, "accepted (by whom, to what degree)"],
    [/young people/i, "young people (age range, which demographic)"],
    [/society/i, "society (which society, context)"],
    [/dangerous/i, "dangerous (to whom, under what conditions)"],
    [/risk/i, "risk (probability and severity undefined)"],
    [/intelligence/i, "intelligence (which conception)"],
    [/freedom/i, "freedom (positive or negative, relational)"],
    [/truth/i, "truth (correspondence, coherence, pragmatic)"],
    [/natural/i, "natural (naturalistic fallacy risk)"],
    [/progress/i, "progress (by whose standard)"],
    [/harm/i, "harm (threshold and type undefined)"],
    [/science/i, "science (which field, which consensus)"],
  ];

  for (const [pattern, term] of termPatterns) {
    if (pattern.test(text) && !candidates.includes(term)) {
      candidates.push(term);
    }
  }

  return candidates.slice(0, 6);
}

function buildQuickAuditCards(text: string, flags: string[]): AuditCard[] {
  const isExample = text.trim() === EXAMPLE_INPUT;
  const undefinedTerms = extractUndefinedTerms(text);

  const claimCore = isExample
    ? "The statement connects quantum information theory, an ontological claim about everything being quantum information, and a sociological claim about youth acceptance."
    : `The statement makes a claim about: "${text.slice(0, 120)}${text.length > 120 ? "…" : ""}". The core assertion requires scope, evidence, and definitional clarification before it can be evaluated.`;

  return [
    {
      id: "claim-core",
      title: "Claim Core",
      content: claimCore
    },
    {
      id: "main-problem",
      title: "Main Problem",
      content: flags.length > 0
        ? `The primary audit concern is: ${flags[0]}. ${getflagExplanation(flags[0])}`
        : "The claim requires scope and definitional clarification before it can be evaluated."
    },
    {
      id: "undefined-terms",
      title: "Undefined Terms",
      content: undefinedTerms.length > 0
        ? undefinedTerms.map(t => `• ${t}`).join("\n")
        : "No obviously undefined terms detected. Check whether key terms carry assumed specialist meanings."
    },
    {
      id: "evidence-needed",
      title: "Evidence Needed",
      content: buildEvidenceNeeded(text, flags)
    },
    {
      id: "audit-flags",
      title: "Audit Flags",
      content: flags.map(f => `• ${f}`).join("\n")
    },
    {
      id: "better-version",
      title: "Better Version",
      content: buildBetterVersion(text, flags, "quick")
    }
  ];
}

function buildDeepAuditCards(text: string, flags: string[]): AuditCard[] {
  const isExample = text.trim() === EXAMPLE_INPUT;
  const undefinedTerms = extractUndefinedTerms(text);

  return [
    {
      id: "claim-core",
      title: "Claim Core",
      content: isExample
        ? "The statement connects quantum information theory, an ontological claim about everything being quantum information, and a sociological claim about youth acceptance. These three levels — scientific, ontological, and sociological — are not separated."
        : `The statement makes a claim that can be decomposed into multiple propositions. The core claim concerns: "${text.slice(0, 100)}${text.length > 100 ? "…" : ""}".`
    },
    {
      id: "proposition-split",
      title: "Proposition Split",
      content: isExample
        ? "1. Quantum information theory exists.\n2. Quantum information theory produced the hypothesis that everything is quantum information.\n3. Everything is quantum information.\n4. This view is accepted among young people."
        : buildPropositionSplit(text)
    },
    {
      id: "key-terms",
      title: "Key Terms",
      content: isExample
        ? "• quantum information theory — a scientific field\n• quantum information — a technical concept\n• hypothesis — epistemic status unclear\n• everything — a totalizing ontological term\n• accepted — social or epistemic agreement?\n• young people — a demographic generalization"
        : buildKeyTerms(text)
    },
    {
      id: "undefined-terms",
      title: "Undefined Terms",
      content: undefinedTerms.length > 0
        ? undefinedTerms.map(t => `• ${t}`).join("\n")
        : "No obviously undefined terms detected. Verify that specialist terms carry precise, agreed-upon definitions in this context."
    },
    {
      id: "truth-conditions",
      title: "Truth Conditions",
      content: isExample
        ? "For the statement to be true, three separate sets of conditions must be met:\n1. Evidence that this hypothesis actually emerged from quantum information theory.\n2. A rigorous definition of 'quantum information' at the ontological level.\n3. Sociological evidence that young people as a demographic hold this view."
        : buildTruthConditions(text, flags)
    },
    {
      id: "evidence-needed",
      title: "Evidence Needed",
      content: buildEvidenceNeeded(text, flags)
    },
    {
      id: "conceptual-overreach",
      title: "Conceptual Overreach",
      content: isExample
        ? "The statement moves from a scientific theory to a totalizing ontological claim ('everything is quantum information') and then to a sociological claim about youth acceptance, without separating these three levels or providing bridges between them."
        : detectConceptualOverreach(text, flags)
    },
    {
      id: "background-assumptions",
      title: "Background Assumptions",
      content: buildBackgroundAssumptions(text, flags)
    },
    {
      id: "meaning-drift",
      title: "Meaning Drift",
      content: isExample
        ? "The term 'quantum information' moves from a precise technical concept in physics to an ontological category applied to 'everything.' This drift from expert to lay usage risks losing the constraints that give the term its scientific validity."
        : detectMeaningDrift(text, flags)
    },
    {
      id: "truth-vs-consensus",
      title: "Truth vs. Consensus",
      content: isExample
        ? "Even if this view is accepted among young people, social acceptance does not establish truth. The statement conflates the social spread of a view with its epistemic justification."
        : detectTruthConsensus(text, flags)
    },
    {
      id: "epistemic-injustice",
      title: "Epistemic Injustice Risk",
      content: isExample
        ? "The claim 'accepted among young people' may erase internal disagreement within that demographic. It treats a group as epistemically uniform, potentially suppressing dissenting young voices who do not hold this view."
        : detectEpistemicInjustice(text, flags)
    },
    {
      id: "classification-risk",
      title: "Classification Risk",
      content: detectClassificationRisk(text, flags)
    },
    {
      id: "responsibility-diffusion",
      title: "Responsibility Diffusion",
      content: detectResponsibilityDiffusion(text, flags)
    },
    {
      id: "non-domination-risk",
      title: "Non-Domination Risk",
      content: detectNonDominationRisk(text, flags)
    },
    {
      id: "ddat-direction",
      title: "DDAT Direction",
      content: buildDDATDirection(text, flags)
    },
    {
      id: "neutral-reconstruction",
      title: "Neutral Reconstruction",
      content: isExample
        ? "Quantum information theory has encouraged some researchers to explore whether informational concepts have a foundational role in physics. The proposal that 'everything is quantum information' represents one ontological interpretation, not a consensus scientific conclusion. Whether this view is more prevalent among younger people remains an empirical question requiring survey evidence."
        : buildNeutralReconstruction(text, flags)
    },
    {
      id: "better-version",
      title: "Better Version",
      content: buildBetterVersion(text, flags, "deep")
    },
    {
      id: "calm-reply",
      title: "Calm Reply",
      content: buildCalmReply(text, flags)
    }
  ];
}

function buildDDATAuditCards(text: string, flags: string[]): AuditCard[] {
  return [
    {
      id: "claim-direction",
      title: "Claim Direction",
      content: buildClaimDirection(flags)
    },
    {
      id: "freedom-generation",
      title: "Freedom-Generation Potential",
      content: buildFreedomGeneration(text, flags)
    },
    {
      id: "responsibility-generation",
      title: "Responsibility-Generation Potential",
      content: buildResponsibilityGeneration(text, flags)
    },
    {
      id: "reality-contact",
      title: "Reality-Contact Condition",
      content: "The statement's contact with external reality depends on whether its key terms are grounded in verifiable conditions. If central terms lack external referents, the claim risks becoming self-contained and untestable."
    },
    {
      id: "external-corrective",
      title: "External Corrective Signal",
      content: flags.includes("Scientific Overreach Risk") || flags.includes("Truth/Consensus Confusion")
        ? "The claim appears resistant to external correction. It may treat internal consensus or scientific vocabulary as sufficient validation, without openness to falsification or external challenge."
        : "The claim may be open to external corrective signals, but this depends on whether undefined terms are made specific enough to allow evaluation."
    },
    {
      id: "epistemic-injustice-ddat",
      title: "Epistemic Injustice Risk",
      content: detectEpistemicInjustice(text, flags)
    },
    {
      id: "future-closure",
      title: "Future Closure Risk",
      content: detectFutureClosure(text, flags)
    },
    {
      id: "self-justification",
      title: "Self-Justification Risk",
      content: detectSelfJustification(text, flags)
    },
    {
      id: "return-reentry",
      title: "Return / Re-entry Condition",
      content: buildReentryCondition(text, flags)
    },
    {
      id: "ddat-reconstruction",
      title: "DDAT Reconstruction",
      content: buildDDATReconstruction(text, flags)
    }
  ];
}

function buildRewriteCards(text: string): AuditCard[] {
  return [
    {
      id: "original",
      title: "Original Claim",
      content: text
    },
    {
      id: "neutral",
      title: "Neutral Version",
      content: buildNeutralReconstruction(text, detectFlags(text))
    },
    {
      id: "academic",
      title: "Academic Version",
      content: buildAcademicVersion(text)
    },
    {
      id: "sns",
      title: "SNS Reply Version",
      content: buildSNSVersion(text)
    },
    {
      id: "strong-careful",
      title: "Strong but Careful Version",
      content: buildStrongCarefulVersion(text)
    }
  ];
}

function buildReplyCards(text: string, flags: string[]): AuditCard[] {
  return [
    {
      id: "very-short",
      title: "Very Short Reply",
      content: buildVeryShortReply(text, flags)
    },
    {
      id: "balanced",
      title: "Balanced Reply",
      content: buildBalancedReply(text, flags)
    },
    {
      id: "research-oriented",
      title: "Research-Oriented Reply",
      content: buildResearchReply(text, flags)
    },
    {
      id: "gentle-question",
      title: "Gentle Question Reply",
      content: buildGentleQuestion(text, flags)
    }
  ];
}

// Helper builders

function getflagExplanation(flag: string): string {
  const explanations: Record<string, string> = {
    "Overgeneralization / Scope Problem": "The claim uses totalizing terms ('all', 'everything', 'always', 'never') without limiting its scope. A bounded claim is more defensible and auditable.",
    "Scientific Overreach Risk": "Scientific vocabulary is being used to support a claim that goes beyond what the cited science can establish. The inferential bridge from science to conclusion is missing.",
    "Social Generalization Risk": "The claim generalizes across a social group without accounting for internal differences, dissenting members, or sampling evidence.",
    "Truth/Consensus Confusion": "The claim treats social acceptance, popularity, or consensus as evidence of truth. These are separate questions.",
    "Data Givenness Risk": "Data, logs, AI outputs, or statistical results are treated as self-justifying. The step from raw data to knowledge requires an inferential bridge.",
    "Classification Risk": "The claim classifies a person or group in a way that may have real effects on how they are treated, without examining whether the classification is justified or whether it loops back to shape what it measures.",
    "Responsibility Diffusion": "The claim attributes a decision or outcome to a system, algorithm, or process rather than to responsible human agents.",
    "Non-Domination Risk": "The claim describes or implies a situation where a person or group is subject to arbitrary power without appeal or recourse.",
    "Integrity Risk": "The claim justifies an action or policy through abstract optimization or 'greater good' reasoning that may destroy individual integrity or personal reasons.",
    "Essentialization Risk": "The claim treats a property as essential or necessary when it may be contingent or context-dependent.",
    "Data Reduction Risk": "A person or complex situation is reduced to data points, losing the intentional, relational, and formative dimensions.",
  };
  return explanations[flag] || "This flag indicates a claim that requires clarification before it can be properly evaluated.";
}

function buildEvidenceNeeded(text: string, flags: string[]): string {
  const lines: string[] = ["To evaluate this claim, the following would be needed:"];
  if (flags.includes("Scientific Overreach Risk")) lines.push("• Specific citations from peer-reviewed literature establishing the scope of the scientific claim");
  if (flags.includes("Social Generalization Risk")) lines.push("• Survey or demographic data specifying which group, how they were sampled, and what 'acceptance' means");
  if (flags.includes("Truth/Consensus Confusion")) lines.push("• A distinction between social acceptance and epistemic justification for the claim");
  if (flags.includes("Classification Risk")) lines.push("• Criteria for the classification, evidence of its validity, and examination of its effects");
  if (flags.includes("Data Givenness Risk")) lines.push("• An inferential account of how data was interpreted and what assumptions were made");
  if (flags.includes("Responsibility Diffusion")) lines.push("• Identification of the human agents responsible for the decision described");
  if (lines.length === 1) lines.push("• Definitions of key terms\n• Scope conditions: who, where, when\n• Source of the claim or observation");
  return lines.join("\n");
}

function buildPropositionSplit(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  if (sentences.length === 1) {
    return "The statement appears to combine multiple claims in a single sentence. Consider splitting it into:\n1. The descriptive claim (what is asserted to exist or occur)\n2. The evaluative claim (what is asserted to be true, good, or correct)\n3. The social claim (who is said to believe or accept this)";
  }
  return sentences.map((s, i) => `${i + 1}. ${s.trim()}.`).join("\n");
}

function buildKeyTerms(text: string): string {
  const terms = extractUndefinedTerms(text);
  if (terms.length === 0) return "Identify the central terms in the claim and check each for: stability of meaning across contexts, expert vs. lay usage, and hidden evaluative weight.";
  return terms.map(t => `• ${t}`).join("\n");
}

function buildTruthConditions(text: string, flags: string[]): string {
  const lines = ["For this statement to be true, the following conditions would need to hold:"];
  lines.push("• Key terms must be defined with sufficient precision to allow evaluation");
  lines.push("• The claim must be bounded by scope conditions (who, when, where, under what circumstances)");
  if (flags.includes("Scientific Overreach Risk")) lines.push("• The cited scientific authority must actually support the specific conclusion drawn");
  if (flags.includes("Social Generalization Risk")) lines.push("• The social or demographic claim must be supported by representative evidence");
  if (flags.includes("Truth/Consensus Confusion")) lines.push("• Social acceptance must be separated from epistemic justification");
  return lines.join("\n");
}

function detectConceptualOverreach(text: string, flags: string[]): string {
  if (flags.includes("Scientific Overreach Risk")) {
    return "The statement borrows authority from a scientific or technical domain and applies it to a conclusion that goes beyond what that domain can establish. The inferential bridge between the scientific premise and the conclusion is missing or implicit.";
  }
  if (flags.includes("Overgeneralization / Scope Problem")) {
    return "The statement uses totalizing language that extends the claim beyond its defensible scope. A more careful version would specify conditions, populations, timeframes, and exceptions.";
  }
  return "The claim may be operating across different levels of description — empirical, theoretical, and normative — without distinguishing them. Separating these levels would clarify what is actually being asserted.";
}

function buildBackgroundAssumptions(text: string, flags: string[]): string {
  const lines = ["The claim appears to rest on the following background assumptions:"];
  if (flags.includes("Scientific Overreach Risk")) lines.push("• Scientific vocabulary carries direct truth authority without further argument");
  if (flags.includes("Truth/Consensus Confusion")) lines.push("• Social consensus is a reliable indicator of truth");
  if (flags.includes("Social Generalization Risk")) lines.push("• Groups named are epistemically homogeneous");
  if (flags.includes("Classification Risk")) lines.push("• The classification system in use is neutral and objective");
  if (flags.includes("Responsibility Diffusion")) lines.push("• Systems and algorithms can be the locus of decision-making responsibility");
  if (lines.length === 1) lines.push("• The claim's key terms carry stable, agreed-upon meanings\n• The claim's scope is obvious and does not need to be specified");
  return lines.join("\n");
}

function detectMeaningDrift(text: string, flags: string[]): string {
  if (flags.includes("Scientific Overreach Risk")) {
    return "Scientific terms in this statement appear to have drifted from their expert-domain meaning into a broader rhetorical or popular usage. The expert constraints that give these terms their precision may not carry over into this new context.";
  }
  return "Check whether key terms in this statement move between technical, institutional, or everyday registers without acknowledging the shift. Meaning drift can make a claim appear more authoritative than it is.";
}

function detectTruthConsensus(text: string, flags: string[]): string {
  if (flags.includes("Truth/Consensus Confusion")) {
    return "The statement appears to treat social acceptance, popularity, or consensus as evidence for truth. These are distinct questions. A claim can be widely accepted and false, or rejected and true. The truth of a claim depends on evidence and reasoning, not on how many people hold it.";
  }
  return "No direct truth/consensus confusion detected. However, verify that any appeals to what 'people believe,' 'science says,' or 'institutions accept' are kept separate from direct truth claims.";
}

function detectEpistemicInjustice(text: string, flags: string[]): string {
  if (flags.includes("Social Generalization Risk")) {
    return "The statement generalizes about a social group without acknowledging internal differences. Members of that group who hold dissenting views are at risk of having their testimony erased by the generalization. This is a testimonial injustice risk.";
  }
  if (flags.includes("Classification Risk")) {
    return "Classification of people or groups risks dismissing or devaluing testimony from those classified. If the classification affects credibility assessments, this constitutes testimonial injustice. Check whether affected people have interpretive resources to understand and contest the classification.";
  }
  return "No direct epistemic injustice detected in this claim. However, check whether any testimony the claim relies on reflects a fair distribution of credibility across social positions.";
}

function detectClassificationRisk(text: string, flags: string[]): string {
  if (flags.includes("Classification Risk")) {
    return "This statement classifies a person or group. Classifications have effects beyond description: they can reshape behavior, close futures, and become self-confirming through looping effects. Ask whether the classification is revisable, whether those classified can contest it, and whether it is producing the phenomenon it claims to measure.";
  }
  return "No explicit classification of persons or groups detected. If implicit classifications are present in background assumptions, apply the same scrutiny.";
}

function detectResponsibilityDiffusion(text: string, flags: string[]): string {
  if (flags.includes("Responsibility Diffusion")) {
    return "The statement attributes a decision, outcome, or action to an automated system, process, or algorithm. This risks dissolving responsibility that should rest with human agents. Ask: who designed the system? Who authorized its use in this context? Who can be held accountable for its outputs?";
  }
  return "No explicit responsibility diffusion detected. If the claim involves collective decisions or automated processes, verify that human responsibility is clearly located.";
}

function detectNonDominationRisk(text: string, flags: string[]): string {
  if (flags.includes("Non-Domination Risk")) {
    return "The situation described involves a person or group subject to a decision or power structure from which they cannot appeal. Even if no active interference is occurring, the possibility of arbitrary interference constitutes domination in the republican sense. An appeal path and reasons for decisions are required.";
  }
  return "No direct non-domination risk detected. However, check whether any institutional decisions described have adequate transparency, reasoning, and appeal mechanisms.";
}

function buildDDATDirection(text: string, flags: string[]): string {
  const positive = [];
  const negative = [];

  if (flags.includes("Truth/Consensus Confusion")) negative.push("Truth/Consensus Confusion");
  if (flags.includes("Scientific Overreach Risk")) negative.push("Data Givenness Risk");
  if (flags.includes("Social Generalization Risk")) negative.push("Epistemic Injustice Risk");
  if (flags.includes("Classification Risk")) negative.push("Classification Fixation Risk");
  if (flags.includes("Responsibility Diffusion")) negative.push("Responsibility Diffusion");
  if (flags.includes("Non-Domination Risk")) negative.push("Non-Domination Risk");
  if (flags.includes("Overgeneralization / Scope Problem")) negative.push("Conceptual Overreach");
  if (flags.includes("Hypothetical Status Unclear")) positive.push("Better as Hypothesis");

  if (negative.length === 0 && positive.length === 0) {
    return "DDAT Status: Needs Definition\n\nThe claim's direction cannot be fully assessed until key terms are defined and scope conditions are specified.";
  }

  const parts = [];
  if (negative.length > 0) parts.push(`Negative closure directions detected:\n${negative.map(f => `• ${f}`).join("\n")}`);
  if (positive.length > 0) parts.push(`Positive directions detected:\n${positive.map(f => `• ${f}`).join("\n")}`);

  return parts.join("\n\n") + "\n\nFor this claim to move in a clarification-oriented direction, it would need: defined terms, bounded scope, separation of empirical and normative levels, and openness to external correction.";
}

function buildNeutralReconstruction(text: string, flags: string[]): string {
  if (text.trim() === EXAMPLE_INPUT) {
    return "Quantum information theory has encouraged some researchers to explore whether informational concepts have a foundational role in physics. The proposal that 'everything is quantum information' represents one ontological interpretation, not a consensus scientific conclusion. Whether this view is more prevalent among younger people remains an empirical question requiring survey evidence.";
  }
  return `A more carefully bounded version of this claim might read:\n\n"[Subject, precisely defined] [predicate, with scope conditions] [under conditions: when, where, for whom], [with the following evidence required: ___]. This claim is distinguished from the related but separate claim that [identify the conflated additional claim]."\n\nNeutral reconstruction requires: defining key terms, limiting scope, separating descriptive from evaluative claims, and specifying what evidence would be required.`;
}

function buildBetterVersion(text: string, flags: string[], mode: string): string {
  if (text.trim() === EXAMPLE_INPUT) {
    return "Quantum information theory has encouraged some thinkers to reconsider the role of information in physical theory. However, the claim that everything is quantum information requires a separate ontological argument, and the claim that young people accept this view requires sociological evidence.";
  }
  const improvements: string[] = [];
  if (flags.includes("Overgeneralization / Scope Problem")) improvements.push("limit scope by specifying who, when, where, and under what conditions");
  if (flags.includes("Scientific Overreach Risk")) improvements.push("separate the scientific finding from the broader conclusion");
  if (flags.includes("Truth/Consensus Confusion")) improvements.push("distinguish social acceptance from epistemic justification");
  if (flags.includes("Social Generalization Risk")) improvements.push("replace group generalization with specific, evidenced demographic claims");
  if (flags.includes("Hypothetical Status Unclear")) improvements.push("mark the hypothesis as tentative and specify what evidence would confirm or disconfirm it");

  if (improvements.length === 0) return "A better version would define key terms, specify scope conditions, and identify what evidence would be needed to evaluate the claim.";
  return `A stronger version of this claim would: ${improvements.join(", ")}.\n\nThis would make the claim more auditable, more defensible, and more useful for genuine inquiry.`;
}

function buildCalmReply(text: string, flags: string[]): string {
  if (text.trim() === EXAMPLE_INPUT) {
    return "Interesting point, but I think we need to separate three layers: quantum information theory, the ontological claim that everything is quantum information, and the sociological claim that young people accept it. The second needs philosophical argument, and the third needs survey evidence.";
  }
  const parts = ["That's worth thinking through carefully."];
  if (flags.includes("Truth/Consensus Confusion")) parts.push("One thing I'd want to separate is whether this is widely believed versus whether it's well-evidenced — those are different questions.");
  if (flags.includes("Scientific Overreach Risk")) parts.push("I'd also want to see the specific scientific source you're drawing on, since scientific fields often contain more internal debate than headlines suggest.");
  if (flags.includes("Social Generalization Risk")) parts.push("I'm also curious about the group claim here — it seems like it might vary a lot within that group.");
  if (flags.includes("Overgeneralization / Scope Problem")) parts.push("Could we narrow the scope a bit? The claim as stated covers a very large territory.");
  parts.push("I don't want to dismiss what you're pointing to — I just think the claim would be stronger with a bit more precision.");
  return parts.join(" ");
}

function buildClaimDirection(flags: string[]): string {
  const negativeFlags = flags.filter(f => [
    "Truth/Consensus Confusion",
    "Scientific Overreach Risk",
    "Social Generalization Risk",
    "Classification Risk",
    "Responsibility Diffusion",
    "Non-Domination Risk",
    "Essentialization Risk"
  ].includes(f));

  if (negativeFlags.length >= 3) {
    return `DDAT Status: Conceptual Overreach\n\nThis claim moves in multiple negative-closure directions simultaneously. It would benefit from being decomposed into separate, clearly scoped propositions before evaluation.`;
  }
  if (negativeFlags.length > 0) {
    return `DDAT Status: Needs Definition\n\nDetected negative-closure patterns:\n${negativeFlags.map(f => `• ${f}`).join("\n")}\n\nThe claim can be redirected toward clarification by defining terms, specifying scope, and separating its component propositions.`;
  }
  return `DDAT Status: Requires External Correction\n\nThe claim's direction is not immediately negative, but it lacks the specificity needed to be genuinely open to external corrective signals. Defining key terms and specifying scope would enable meaningful external evaluation.`;
}

function buildFreedomGeneration(text: string, flags: string[]): string {
  if (flags.some(f => ["Non-Domination Risk", "Classification Risk", "Responsibility Diffusion"].includes(f))) {
    return "Freedom-Generation Potential: Low. The claim as stated may reduce rather than expand the range of action and self-determination available to those it concerns. Redirection toward transparent criteria, appeal paths, and reclassification possibilities would increase freedom-generation.";
  }
  return "Freedom-Generation Potential: Conditional. Whether this claim generates or restricts freedom depends on how its terms are defined and implemented. A claim that clarifies conditions and keeps futures open generates more freedom than one that fixes categories or closes options.";
}

function buildResponsibilityGeneration(text: string, flags: string[]): string {
  if (flags.includes("Responsibility Diffusion")) {
    return "Responsibility-Generation Potential: Low. The claim diffuses responsibility into a system or process rather than locating it in accountable human agents. Redirecting the claim to identify who decides, who is accountable, and who can be addressed would increase responsibility-generation.";
  }
  return "Responsibility-Generation Potential: Moderate. The claim could generate responsibility if it is followed by clear attribution of who is responsible for what, and what the correction mechanisms are.";
}

function detectFutureClosure(text: string, flags: string[]): string {
  if (flags.includes("Classification Risk") || flags.includes("Essentialization Risk")) {
    return "Future Closure Risk: Present. The claim may fix categories or properties in ways that close future possibilities for those classified. Ask whether the classification allows revision, correction, and re-entry into different categories.";
  }
  return "Future Closure Risk: Low, but conditional. Check whether the claim's categories or conclusions allow for revision, formation, and change over time.";
}

function detectSelfJustification(text: string, flags: string[]): string {
  if (flags.includes("Truth/Consensus Confusion") || flags.includes("Data Givenness Risk")) {
    return "Self-Justification Risk: Present. The claim appears to use social acceptance or data as its own justification, without grounding in external criteria. This risks creating a self-confirming loop where the claim is validated by what it assumes.";
  }
  return "Self-Justification Risk: Low. The claim does not appear to be obviously self-referential. However, check whether any evidence cited for the claim is itself produced or selected by the same system making the claim.";
}

function buildReentryCondition(text: string, flags: string[]): string {
  return "Re-entry condition: A well-formed version of this claim would allow those affected to: (1) understand the criteria used, (2) contest classifications or conclusions, (3) provide additional context that could change the evaluation, and (4) demonstrate change or correction. If none of these paths are available, the claim closes rather than opens inquiry.";
}

function buildDDATReconstruction(text: string, flags: string[]): string {
  return "DDAT Reconstruction: A claim that moves in a positive direction would:\n• Define its key terms with precision\n• Specify its scope: who, when, where, under what conditions\n• Separate empirical claims from normative claims\n• Identify what evidence could disconfirm it\n• Preserve the possibility of correction, re-entry, and revision\n• Locate responsibility with identifiable human agents\n• Acknowledge dissent and alternative interpretations\n\nThe current claim would benefit from being reformulated with these conditions in view.";
}

function buildAcademicVersion(text: string): string {
  return `An academically defensible formulation of this claim might read:\n\n"The available evidence suggests that [bounded claim], under conditions [scope], with the following caveats: [limitations]. Further research would be needed to establish [additional conditions]. This claim is independent of the related but separate claim that [identify any conflated claims]."\n\nThis version separates empirical claims from normative ones, specifies scope, acknowledges limitations, and avoids totalizing language.`;
}

function buildSNSVersion(text: string): string {
  const flags = detectFlags(text);
  return buildCalmReply(text, flags);
}

function buildStrongCarefulVersion(text: string): string {
  const flags = detectFlags(text);
  const improvements: string[] = [];
  if (flags.includes("Overgeneralization / Scope Problem")) improvements.push("with clear scope limits");
  if (flags.includes("Scientific Overreach Risk")) improvements.push("grounded in specific cited evidence");
  if (flags.includes("Truth/Consensus Confusion")) improvements.push("distinguished from claims about social acceptance");

  return `A strong but careful version of this claim makes a bold assertion while remaining auditable:\n\n"I want to claim that [specific bounded claim], based on [specific evidence]. I acknowledge this does not establish [list of things the claim does NOT establish]. This claim can be contested by [specify what evidence or argument would change it]."\n\n${improvements.length > 0 ? "Key improvements needed: " + improvements.join(", ") + "." : "A strong claim earns its strength through precision, not breadth."}`;
}

function buildVeryShortReply(text: string, flags: string[]): string {
  if (flags.includes("Truth/Consensus Confusion")) return "Interesting — but is that widely believed, or well-evidenced? Those are different questions.";
  if (flags.includes("Scientific Overreach Risk")) return "What does the actual science say exactly? The conclusion might outrun the evidence here.";
  if (flags.includes("Overgeneralization / Scope Problem")) return "Could you narrow this down? 'Everything'/'always'/'everyone' is a lot of territory.";
  if (flags.includes("Social Generalization Risk")) return "Does that hold across the whole group, or are there significant differences within it?";
  return "Worth clarifying: what would make this claim false? That would help us know exactly what's being claimed.";
}

function buildBalancedReply(text: string, flags: string[]): string {
  const parts = ["There are some useful things in what you're saying, and I want to engage with them seriously rather than dismiss them."];
  if (flags.includes("Scientific Overreach Risk")) parts.push("I do want to distinguish the specific scientific finding from the broader conclusion, because I think the connection may need more argument.");
  if (flags.includes("Truth/Consensus Confusion")) parts.push("I also want to gently separate the question of whether this is widely held from whether it's well-established — they can diverge.");
  if (flags.includes("Social Generalization Risk")) parts.push("The group claim is interesting but I wonder if there are real differences within that group worth acknowledging.");
  parts.push("What would you need to see to update the claim? That would help me understand exactly what's being asserted.");
  return parts.join(" ");
}

function buildResearchReply(text: string, flags: string[]): string {
  const parts = ["This is worth investigating carefully."];
  if (flags.includes("Scientific Overreach Risk")) parts.push("A few questions: Which specific studies or papers are you drawing on? What do the original authors claim their findings establish?");
  if (flags.includes("Truth/Consensus Confusion")) parts.push("I'd also want to look at the evidence for the acceptance claim separately from the truth claim.");
  if (flags.includes("Social Generalization Risk")) parts.push("What's the evidence base for the group characterization? Is there variation within the group?");
  parts.push("I'm genuinely curious about this — the claim would be more evaluable with these pieces in place.");
  return parts.join(" ");
}

function buildGentleQuestion(text: string, flags: string[]): string {
  const questions: string[] = [];
  if (flags.includes("Overgeneralization / Scope Problem")) questions.push("Could you say more about who or what exactly this applies to?");
  if (flags.includes("Scientific Overreach Risk")) questions.push("Which part of this comes from the science, and which is your interpretation of what it means?");
  if (flags.includes("Truth/Consensus Confusion")) questions.push("Do you mean that many people believe this, or that it's been well established? Those feel like different claims to me.");
  if (flags.includes("Social Generalization Risk")) questions.push("I'm curious — does that hold across the whole group, or are there significant differences?");
  if (questions.length === 0) questions.push("What would make this claim false? I think knowing that would help me understand what exactly is being claimed.");
  return questions.join("\n");
}

// Main export

export function runMockAudit(request: AuditRequest): AuditResult {
  const { text, mode } = request;
  const flags = detectFlags(text);
  const relatedLenses = detectRelatedLenses(text, flags);

  let cards: AuditCard[] = [];
  let claimCore = "";
  let betterVersion: string | undefined;
  let calmReply: string | undefined;

  switch (mode) {
    case "quick":
      cards = buildQuickAuditCards(text, flags);
      claimCore = cards.find(c => c.id === "claim-core")?.content ?? "";
      betterVersion = cards.find(c => c.id === "better-version")?.content;
      break;
    case "deep":
      cards = buildDeepAuditCards(text, flags);
      claimCore = cards.find(c => c.id === "claim-core")?.content ?? "";
      betterVersion = cards.find(c => c.id === "better-version")?.content;
      calmReply = cards.find(c => c.id === "calm-reply")?.content;
      break;
    case "ddat":
      cards = buildDDATAuditCards(text, flags);
      claimCore = cards.find(c => c.id === "claim-direction")?.content ?? "";
      break;
    case "rewrite":
      cards = buildRewriteCards(text);
      claimCore = cards.find(c => c.id === "neutral")?.content ?? "";
      betterVersion = cards.find(c => c.id === "strong-careful")?.content;
      break;
    case "reply":
      cards = buildReplyCards(text, flags);
      claimCore = "Calm reply options generated.";
      calmReply = cards.find(c => c.id === "very-short")?.content;
      break;
  }

  const result: AuditResult = {
    mode,
    claimCore,
    auditFlags: flags,
    cards,
    betterVersion,
    calmReply,
    markdownExport: "",
    ...(mode === "deep" || mode === "ddat" ? { relatedLenses } : {})
  };

  result.markdownExport = generateMarkdown(text, result);
  return result;
}
