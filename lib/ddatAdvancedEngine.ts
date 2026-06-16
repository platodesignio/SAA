import {
  DDATAdvancedResult,
  DDATAdvancedScores,
  RiskLevel,
  DialecticalDirectionResult,
  UseContextProblem,
} from "./auditTypes";

// ── Wittgensteinian loaded-term list ─────────────────────────────────────────

const LOADED_TERMS: { term: RegExp; label: string; problem: string; clarification: string }[] = [
  {
    term: /\b(information|情報|信息|información|information|информация|정보|معلومات|जानकारी)\b/i,
    label: "information",
    problem: "The term 'information' moves between technical (Shannon entropy), semantic, institutional, and metaphysical registers without warning. Its meaning shifts silently across these contexts.",
    clarification: "Specify: physical signal, semantic content, institutional record, or ontological category?"
  },
  {
    term: /\b(intelligence|知能|知性|inteligencia|intelligence|интеллект|지능|ذكاء|बुद्धि)\b/i,
    label: "intelligence",
    problem: "'Intelligence' conflates cognitive capacity, biological trait, institutional measurement, and AI system capability. Each use imports different normative assumptions.",
    clarification: "Specify: human cognitive ability, AI system performance metric, or institutional classification?"
  },
  {
    term: /\b(consciousness|意識|意识|conciencia|conscience|сознание|의식|وعي|चेतना)\b/i,
    label: "consciousness",
    problem: "'Consciousness' spans phenomenology, neuroscience, philosophy of mind, and AI discourse. It generates high truth-feeling while remaining definitionally contested.",
    clarification: "Specify: phenomenal experience, neural correlate, functional capacity, or institutional attribution?"
  },
  {
    term: /\b(freedom|自由|liberté|Freiheit|libertad|свобода|자유|حرية|स्वतंत्रता)\b/i,
    label: "freedom",
    problem: "'Freedom' is used as if it were a substance that can be present or absent. It conflates negative freedom (absence of interference), positive freedom (capacity), and republican non-domination.",
    clarification: "Specify: freedom from interference, freedom to act, or freedom from arbitrary power?"
  },
  {
    term: /\b(responsibility|責任|responsabilité|Verantwortung|responsabilidad|ответственность|책임|مسؤولية|जिम्मेदारी)\b/i,
    label: "responsibility",
    problem: "'Responsibility' alternates between causal attribution, moral accountability, legal liability, and institutional assignment without distinguishing them.",
    clarification: "Specify: causal, moral, legal, or institutional responsibility? Attributed to whom?"
  },
  {
    term: /\b(credit|クレジット|crédit|Kredit|crédito|кредит|신용|ائتمان|क्रेडिट)\b/i,
    label: "credit",
    problem: "'Credit' conflates financial creditworthiness, social credibility, epistemic trustworthiness, and moral desert.",
    clarification: "Specify: financial scoring, social reputation, or epistemic credibility?"
  },
  {
    term: /\b(score|スコア|score|Punktzahl|puntuación|оценка|점수|درجة|स्कोर)\b/i,
    label: "score",
    problem: "'Score' is treated as a neutral measure but embeds value judgments, power relations, and institutional authority.",
    clarification: "Who assigns this score? By what criteria? With what consequences for revision?"
  },
  {
    term: /\b(value|価値|valeur|Wert|valor|ценность|가치|قيمة|मूल्य)\b/i,
    label: "value",
    problem: "'Value' slides between economic exchange value, moral worth, and institutional measurement without distinction.",
    clarification: "Specify: market value, moral worth, institutional rating, or ecological importance?"
  },
  {
    term: /\b(trust|信頼|confiance|Vertrauen|confianza|доверие|신뢰|ثقة|विश्वास)\b/i,
    label: "trust",
    problem: "'Trust' moves between interpersonal relational trust, institutional reliability, and algorithmic creditworthiness — three very different claims.",
    clarification: "Specify: relational trust between persons, institutional reliability, or algorithmic score?"
  },
  {
    term: /\b(risk|リスク|risque|Risiko|riesgo|риск|위험|خطر|जोखिम)\b/i,
    label: "risk",
    problem: "'Risk' presents probabilistic prediction as if it were a property of a person or situation rather than a model output.",
    clarification: "Specify: actuarial probability, subjective uncertainty, or institutional classification?"
  },
  {
    term: /\b(optimization|最適化|optimisation|Optimierung|optimización|оптимизация|최적화|تحسين|अनुकूलन)\b/i,
    label: "optimization",
    problem: "'Optimization' imports technical mathematical meaning into institutional and ethical discourse, treating human situations as if they were engineering problems.",
    clarification: "What is being optimized? By whose criteria? With what excluded from the objective function?"
  },
  {
    term: /\b(evolution|進化|évolution|Evolution|evolución|эволюция|진화|تطور|विकास)\b/i,
    label: "evolution",
    problem: "'Evolution' shifts between biological process, social metaphor, and institutional naturalization. Used rhetorically, it implies inevitability and natural selection.",
    clarification: "Specify: biological evolution, technological change, or institutional development — and distinguish from teleological progress."
  },
  {
    term: /\b(truth|真実|vérité|Wahrheit|verdad|истина|진실|حقيقة|सत्य)\b/i,
    label: "truth",
    problem: "'Truth' is used as if it were a simple binary, ignoring the distinction between correspondence, coherence, pragmatic success, and institutional authorization.",
    clarification: "Specify: empirically verified claim, logically valid inference, institutionally certified fact, or social consensus?"
  },
  {
    term: /\b(efficiency|効率|efficacité|Effizienz|eficiencia|эффективность|효율|كفاءة|दक्षता)\b/i,
    label: "efficiency",
    problem: "'Efficiency' treats a ratio of input to output as a neutral metric while concealing what is excluded from measurement and whose interests define the denominator.",
    clarification: "Efficient by what measure? Whose costs are included? What is excluded from the calculation?"
  },
  {
    term: /\b(merit|メリット|mérite|Verdienst|mérito|заслуга|능력|جدارة|योग्यता)\b/i,
    label: "merit",
    problem: "'Merit' naturalizes institutional reward structures as if they reflected inherent individual qualities rather than socially mediated performance under specific conditions.",
    clarification: "Specify: performance on what task, under what conditions, measured by whom, with what baseline?"
  },
  {
    term: /\b(failure|失敗|échec|Versagen|fracaso|провал|실패|فشل|विफलता)\b/i,
    label: "failure",
    problem: "'Failure' converts a relative outcome under specific conditions into a property of a person, concealing the institutional conditions that define the threshold.",
    clarification: "Failed by which standard? Under what conditions? With what opportunity for reconsideration?"
  },
  {
    term: /\b(reality|現実|réalité|Realität|realidad|реальность|현실|واقع|वास्तविकता)\b/i,
    label: "reality",
    problem: "'Reality' is invoked as a self-evident ground for claims that are actually theory-laden, institutionally constructed, or model-dependent.",
    clarification: "Whose reality? Constructed through which framework? Accessible through which practices?"
  },
];

// ── Pattern detection helpers ─────────────────────────────────────────────────

const GENERATION_SOURCE_PATTERNS: { source: string; pattern: RegExp }[] = [
  { source: "empirical observation", pattern: /observed|found|data shows|evidence|survey|experiment|測定|観察|実験|데이터|наблюдение/i },
  { source: "statistical model", pattern: /statistic|probability|predict|model|regression|correlation|likelihood|統計|予測|확률|статистика/i },
  { source: "mathematical abstraction", pattern: /mathemati|formula|equation|proof|theorem|axiom|数学|공식|математик/i },
  { source: "scientific vocabulary", pattern: /quantum|neuro|physics|biology|chemistry|DNA|entropy|thermodynamic|量子|神経|물리학|физика/i },
  { source: "AI-generated output", pattern: /AI|artificial intelligence|language model|GPT|LLM|algorithm output|人工知能|인공지능|искусственный интеллект/i },
  { source: "institutional classification", pattern: /classified|categorized|rated|scored|ranked|certified|label|tagged|分類|분류|классификация/i },
  { source: "legal or administrative category", pattern: /legal|law|regulation|policy|comply|rule|administrative|contract|法律|법|закон/i },
  { source: "moral judgment", pattern: /should|ought|must|wrong|right|good|bad|evil|virtue|moral|道徳|윤리|мораль/i },
  { source: "cultural repetition", pattern: /everyone knows|tradition|culture|always been|society has|cultural|文化|문화|культура/i },
  { source: "social media discourse", pattern: /trending|viral|post|tweet|comment|share|followers|influencer|SNS|拡散|트렌드/i },
  { source: "market ideology", pattern: /market|economic|profit|growth|ROI|investment|GDP|competition|市場|시장|рынок/i },
  { source: "metaphysical speculation", pattern: /essence|nature of|fundamental|universe|being|existence|consciousness|reality itself|本質|存在|존재/i },
  { source: "bodily or ecological condition", pattern: /body|physical|embodied|ecology|environment|climate|soil|labor|身体|环境|신체/i },
  { source: "technological fatalism", pattern: /inevitable|unavoidable|the future|will replace|end of|no choice|automation|必然|필연|неизбежно/i },
];

const LAYER_PATTERNS: { layer: string; pattern: RegExp }[] = [
  { layer: "empirical layer", pattern: /observed|evidence|data|experiment|survey|fact|実験|データ|데이터|данные/i },
  { layer: "statistical layer", pattern: /statistic|probability|correlation|regression|predict|model|統計|확률|статистика/i },
  { layer: "mathematical layer", pattern: /mathemati|formula|proof|theorem|equation|axiom|数学|수학|математика/i },
  { layer: "scientific layer", pattern: /quantum|neuro|physics|science|biology|DNA|theory|量子|과학|физика/i },
  { layer: "linguistic layer", pattern: /meaning|language|term|concept|word|definition|言語|언어|язык/i },
  { layer: "institutional layer", pattern: /institution|system|policy|organization|government|platform|制度|기관|институт/i },
  { layer: "ethical layer", pattern: /moral|should|ought|right|wrong|good|evil|ethical|道徳|도덕|мораль/i },
  { layer: "existential layer", pattern: /freedom|autonomy|dignity|person|identity|self|existence|自由|자유|свобода/i },
  { layer: "ontological layer", pattern: /being|reality|existence|essence|nature of|what is|存在|본질|бытие/i },
  { layer: "metaphysical layer", pattern: /universe|consciousness|soul|absolute|fundamental|infinite|宇宙|우주|вселенная/i },
];

const LAYER_OVERREACH_PATTERNS: { pattern: string; from: string; to: string; regex: RegExp }[] = [
  { pattern: "statistical prediction → moral judgment", from: "statistical", to: "ethical", regex: /predict|probabilit|risk score|likelihood.{0,60}(should|wrong|unfit|danger|threat)/i },
  { pattern: "mathematical model → ontology", from: "mathematical", to: "ontological", regex: /(formula|model|equation|mathemati).{0,80}(reality|being|what.{0,10}is|nature|truth)/i },
  { pattern: "AI output → social truth", from: "institutional", to: "ontological", regex: /(AI|algorithm|model|system).{0,60}(prove|truth|fact|certain|confirm|definitively)/i },
  { pattern: "institutional score → personal essence", from: "institutional", to: "existential", regex: /(score|rank|rating|classify).{0,80}(person|human|individual|identity|who they are)/i },
  { pattern: "scientific description → total worldview", from: "scientific", to: "metaphysical", regex: /(quantum|neuro|physic|science).{0,80}(everything|all|universe|reality|consciousness)/i },
  { pattern: "market result → proof of human value", from: "institutional", to: "ethical", regex: /(market|profit|GDP|economic.success).{0,80}(worth|value|deserve|merit|prove)/i },
  { pattern: "cultural repetition → natural necessity", from: "linguistic", to: "ontological", regex: /(always|tradition|culture|society.{0,20}has).{0,60}(natural|inevitable|must|always will)/i },
  { pattern: "technological change → historical destiny", from: "institutional", to: "metaphysical", regex: /(AI|automation|technology|digital).{0,60}(end of|destroy|inevitable|replace.{0,20}all|no choice)/i },
  { pattern: "prediction → destiny", from: "statistical", to: "existential", regex: /(predict|will be|destined|certain to|inevitably).{0,80}(person|individual|group|community)/i },
];

const BELIEF_RISK_PATTERNS: { pattern: string; regex: RegExp; severity: number }[] = [
  { pattern: "technological fatalism", regex: /inevitable|no choice|will replace|end of|cannot stop|必然|불가피|неизбежно/i, severity: 3 },
  { pattern: "high truth-feeling with low grounding", regex: /obviously|clearly|everyone knows|it is a fact|undeniable|明らかに|당연히|очевидно/i, severity: 2 },
  { pattern: "anxiety amplification", regex: /danger|threat|collapse|destroy|end|extinction|crisis|catastroph|危機|위기|кризис/i, severity: 2 },
  { pattern: "AI authority illusion", regex: /(AI|algorithm|system).{0,40}(decided|determined|proved|says|confirms)/i, severity: 3 },
  { pattern: "data immortalism", regex: /data never lies|data is objective|numbers don't lie|データは嘘をつかない|数据不会说谎/i, severity: 3 },
  { pattern: "market inevitability", regex: /market forces|market decides|market is always right|市場が決める|시장이 결정/i, severity: 2 },
  { pattern: "naturalization of winners", regex: /(success|winner|top.{0,10}percent).{0,60}(deserve|natural|inevitable|earned)/i, severity: 2 },
  { pattern: "moralization of losers", regex: /(failure|loser|bottom|unqualified).{0,60}(fault|blame|lazy|deserve|chose)/i, severity: 3 },
  { pattern: "responsibility displacement", regex: /system|algorithm|society|market.{0,60}(to blame|responsible|caused)/i, severity: 1 },
  { pattern: "metaphysical closure", regex: /(end of|death of|the end|collapse of).{0,60}(freedom|humanity|truth|society)/i, severity: 3 },
];

const JUSTIFICATION_PATTERNS: { pattern: string; regex: RegExp; severity: number }[] = [
  { pattern: "classification fixation", regex: /classify|categorize|label|type|kind of person|score.{0,30}determines/i, severity: 3 },
  { pattern: "score absolutization", regex: /score.{0,40}(cannot|never|always|final|definitive|absolute)/i, severity: 3 },
  { pattern: "winner naturalization", regex: /(success|top|elite|winner).{0,60}(natural|deserve|inevitable|talent)/i, severity: 2 },
  { pattern: "loser moralization", regex: /(failure|loser|low.{0,10}score|unqualified).{0,60}(fault|blame|chose|moral)/i, severity: 3 },
  { pattern: "institutional self-justification", regex: /system is correct|algorithm is objective|process is fair|institution knows best/i, severity: 3 },
  { pattern: "AI authority inflation", regex: /(AI|algorithm).{0,50}(always|never wrong|objective|neutral|unbiased)/i, severity: 3 },
  { pattern: "cultural closure", regex: /always been this way|tradition requires|culture demands|it has always/i, severity: 2 },
  { pattern: "market fatalism", regex: /market forces|market decides|market is natural|markets always/i, severity: 2 },
  { pattern: "responsibility dumping", regex: /it is the individual|personal choice|their fault|take responsibility/i, severity: 2 },
  { pattern: "reduction of persons to categories", regex: /(this type|this kind|this category).{0,50}(person|people|individual)/i, severity: 2 },
];

const FREEDOM_PATTERNS: { pattern: string; regex: RegExp; score: number }[] = [
  { pattern: "responsibility-generation", regex: /responsible|accountable|who decides|who is responsible|answer to/i, score: 15 },
  { pattern: "re-challenge possibility", regex: /can try again|appeal|reconsider|revision|revisable|not final/i, score: 15 },
  { pattern: "institutional correction", regex: /reform|correct|audit|review|oversight|check|accountability/i, score: 10 },
  { pattern: "relational reorganization", regex: /relation|reorganize|redistribute|share|cooperate|collective/i, score: 10 },
  { pattern: "anti-fatalism", regex: /can change|is possible|alternative|not inevitable|open to|revisable/i, score: 15 },
  { pattern: "future openness", regex: /could|might|possibility|potential|open question|depends on/i, score: 10 },
  { pattern: "anti-totalization", regex: /specific|particular|not all|some|context-dependent|qualified/i, score: 10 },
  { pattern: "hypothesis framing", regex: /hypothesis|conjecture|provisional|suggests|may indicate/i, score: 15 },
];

// ── Core analysis functions ───────────────────────────────────────────────────

function detectPropositionType(text: string): string {
  const types: string[] = [];

  if (/quantum|neuro|physics|mathemati|equation|量子|물리/i.test(text)) types.push("scientific-ontological");
  if (/AI|algorithm|score|rank|automat|人工知能|알고리즘/i.test(text)) types.push("techno-institutional");
  if (/should|must|wrong|right|moral|ought|ethical|道徳|윤리/i.test(text)) types.push("normative-ethical");
  if (/freedom|end of|death of|collapse|destiny|inevitable|自由|자유/i.test(text)) types.push("metaphysical-political");
  if (/statistic|predict|probabilit|model|data|データ|통계/i.test(text)) types.push("statistical-predictive");
  if (/institution|govern|policy|law|regulate|制度|기관/i.test(text)) types.push("institutional-administrative");
  if (/culture|tradition|always been|society|文化|문화/i.test(text)) types.push("socio-cultural");
  if (/market|economic|profit|GDP|invest|시장|市場/i.test(text)) types.push("market-ideological");

  if (types.length === 0) return "General declarative proposition requiring scope clarification.";

  const typeMap: Record<string, string> = {
    "scientific-ontological": "Scientific vocabulary extended into ontological claim",
    "techno-institutional": "Techno-institutional diagnosis",
    "normative-ethical": "Normative-ethical judgment",
    "metaphysical-political": "Metaphysical-political diagnosis",
    "statistical-predictive": "Statistical-predictive assertion",
    "institutional-administrative": "Institutional-administrative classification",
    "socio-cultural": "Socio-cultural generalization",
    "market-ideological": "Market-ideological claim",
  };

  const labels = types.map(t => typeMap[t] ?? t);
  if (labels.length === 1) return labels[0] + ".";
  return labels.slice(0, -1).join(", ") + ", with elements of " + labels[labels.length - 1] + ".";
}

function detectGenerationSources(text: string): string[] {
  return GENERATION_SOURCE_PATTERNS
    .filter(p => p.pattern.test(text))
    .map(p => p.source);
}

function detectHiddenAssumptions(text: string, sources: string[]): string[] {
  const assumptions: string[] = [];

  if (sources.includes("statistical model")) assumptions.push("That the statistical model captures the relevant features of the situation.");
  if (sources.includes("AI-generated output")) assumptions.push("That AI outputs are epistemically authoritative beyond their training conditions.");
  if (sources.includes("scientific vocabulary")) assumptions.push("That scientific vocabulary retains its expert-domain constraints when transferred to public discourse.");
  if (sources.includes("institutional classification")) assumptions.push("That institutional categories are neutral descriptions rather than power-laden constructions.");
  if (sources.includes("moral judgment")) assumptions.push("That moral standards being applied are universally valid and context-independent.");
  if (sources.includes("cultural repetition")) assumptions.push("That cultural consensus establishes factual or normative necessity.");
  if (sources.includes("market ideology")) assumptions.push("That market outcomes reflect underlying merit or value.");
  if (sources.includes("technological fatalism")) assumptions.push("That technological trajectories are fixed and cannot be redirected through collective action.");
  if (sources.includes("metaphysical speculation")) assumptions.push("That metaphysical categories can be transferred directly into empirical or institutional discourse.");

  if (assumptions.length === 0) assumptions.push("The proposition assumes its key terms carry stable, context-independent meanings.");
  return assumptions;
}

function detectMissingConditions(text: string, sources: string[]): string[] {
  const conditions: string[] = [];

  if (sources.includes("statistical model")) conditions.push("Scope conditions: what population, time frame, and context the model applies to.");
  if (sources.includes("AI-generated output")) conditions.push("Disclosure of the AI system's training data, objective function, and failure modes.");
  if (sources.includes("institutional classification")) conditions.push("The appeal mechanism, revision procedure, and accountability structure of the classification system.");
  if (sources.includes("scientific vocabulary")) conditions.push("The inferential bridge between the scientific claim and the broader conclusion.");
  if (sources.includes("moral judgment")) conditions.push("The justificatory basis for the moral standard being applied.");
  if (sources.includes("technological fatalism")) conditions.push("Evidence of technological trajectories that were redirected through collective or political action.");
  if (conditions.length === 0) conditions.push("Definition of key terms, scope conditions, and evidence requirements.");

  return conditions;
}

function detectLayers(text: string): string[] {
  return LAYER_PATTERNS.filter(p => p.pattern.test(text)).map(p => p.layer);
}

function detectLayerOverreach(text: string, layers: string[]): {
  riskLevel: RiskLevel;
  patterns: string[];
  explanation: string;
} {
  const matched = LAYER_OVERREACH_PATTERNS.filter(p => p.regex.test(text));

  if (matched.length === 0 && layers.length <= 1) {
    return {
      riskLevel: "Low",
      patterns: [],
      explanation: "No significant layer transfer detected. The proposition operates within a single layer or makes modest cross-layer claims."
    };
  }

  if (matched.length === 0 && layers.length > 1) {
    return {
      riskLevel: "Low",
      patterns: [],
      explanation: `The proposition spans ${layers.join(", ")} layers. No explicit overreach pattern detected, but the multi-layer structure should be examined for implicit authority transfers.`
    };
  }

  const riskLevel: RiskLevel = matched.length >= 3 ? "Critical" : matched.length === 2 ? "High" : "Medium";
  const patterns = matched.map(m => m.pattern);

  const explanations = matched.map(m =>
    `${m.pattern}: A claim with authority in the ${m.from} domain is being transferred to justify a ${m.to} conclusion without the appropriate inferential bridge.`
  );

  return {
    riskLevel,
    patterns,
    explanation: explanations.join(" ") + (matched.length > 1 ? " This stacking of layer overreach compounds the illegitimacy of the claim." : "")
  };
}

function detectUseContextProblems(text: string): UseContextProblem[] {
  return LOADED_TERMS
    .filter(t => t.term.test(text))
    .slice(0, 5)
    .map(t => ({
      term: t.label,
      problem: t.problem,
      suggestedClarification: t.clarification,
    }));
}

function detectBeliefRisk(text: string): {
  riskLevel: RiskLevel;
  patterns: string[];
  explanation: string;
} {
  const matched = BELIEF_RISK_PATTERNS.filter(p => p.regex.test(text));
  const totalSeverity = matched.reduce((s, p) => s + p.severity, 0);

  const riskLevel: RiskLevel =
    totalSeverity >= 8 ? "Critical" :
    totalSeverity >= 5 ? "High" :
    totalSeverity >= 2 ? "Medium" : "Low";

  const patterns = matched.map(m => m.pattern);

  let explanation = "";
  if (riskLevel === "Low") {
    explanation = "The proposition does not appear to generate excessive belief. It makes modest, revisable claims.";
  } else if (riskLevel === "Medium") {
    explanation = `The proposition may generate elevated belief-certainty in the reader. Detected patterns: ${patterns.join(", ")}. The claim would benefit from explicit qualification and scope limitation.`;
  } else if (riskLevel === "High") {
    explanation = `The proposition generates high truth-feeling with limited grounding. Patterns detected: ${patterns.join(", ")}. This can produce fatalistic acceptance, anxiety, or false certainty that forecloses inquiry.`;
  } else {
    explanation = `Critical belief-generation risk. Patterns: ${patterns.join(", ")}. The proposition may produce a self-sealing belief that resists correction, disempowers alternatives, and converts institutional or technological conditions into metaphysical necessity.`;
  }

  return { riskLevel, patterns, explanation };
}

function detectJustificationRisk(text: string): {
  riskLevel: RiskLevel;
  patterns: string[];
  explanation: string;
} {
  const matched = JUSTIFICATION_PATTERNS.filter(p => p.regex.test(text));
  const totalSeverity = matched.reduce((s, p) => s + p.severity, 0);

  const riskLevel: RiskLevel =
    totalSeverity >= 8 ? "Critical" :
    totalSeverity >= 5 ? "High" :
    totalSeverity >= 2 ? "Medium" : "Low";

  const patterns = matched.map(m => m.pattern);

  let explanation = "";
  if (riskLevel === "Low") {
    explanation = "The proposition does not appear to generate strong justification for existing power structures or classifications.";
  } else {
    explanation = `The proposition risks justifying institutional classifications, power arrangements, or social hierarchies. Patterns: ${patterns.join(", ")}. When justification-generation is high, the proposition tends to protect institutions from correction rather than opening them to audit.`;
  }

  return { riskLevel, patterns, explanation };
}

function detectDialecticalDirection(
  text: string,
  beliefRisk: RiskLevel,
  justificationRisk: RiskLevel
): { result: DialecticalDirectionResult; explanation: string } {
  const freedomScore = FREEDOM_PATTERNS.reduce((s, p) => s + (p.regex.test(text) ? p.score : 0), 0);

  const beliefScore = { Low: 0, Medium: 20, High: 40, Critical: 60 }[beliefRisk];
  const justScore = { Low: 0, Medium: 20, High: 40, Critical: 60 }[justificationRisk];
  const closureScore = beliefScore + justScore;

  let result: DialecticalDirectionResult;
  let explanation: string;

  if (freedomScore >= 40 && closureScore <= 20) {
    result = "Freedom-Generating";
    explanation = "The proposition tends toward freedom-generation. It qualifies claims, opens futures, assigns responsibility, and preserves revisability. It operates as an audit-oriented proposition rather than a closure statement.";
  } else if (closureScore >= 80) {
    result = "Self-Enclosed Dialectic";
    explanation = "The proposition generates a self-enclosed dialectic: it produces belief in its own necessity while foreclosing external correction. It converts contingent conditions into necessary structures and resists revision.";
  } else if (justScore >= 40) {
    result = "Justification-Generating";
    explanation = "The proposition tends toward justification-generation. It tends to protect existing classifications, authority structures, or market outcomes from audit rather than opening them to correction.";
  } else if (closureScore >= 40 || beliefScore >= 40) {
    result = "Ambivalent";
    explanation = "The proposition contains both freedom-generating elements (openness, qualification, hypothesis framing) and justification-generating elements (fatalism, authority inflation, classification fixation). Its direction depends on how its key terms are resolved.";
  } else if (/must be revised|requires revision|should be reframed|inadequate|insufficient|incomplete/i.test(text)) {
    result = "Requires Revision";
    explanation = "The proposition as stated requires revision before its dialectical direction can be assessed. Its current form is too ambiguous, overextended, or underspecified to generate either freedom or justification reliably.";
  } else {
    result = "Ambivalent";
    explanation = "The proposition does not clearly move in either direction. Its dialectical direction depends on how it is used, in what institutional context, and by whom.";
  }

  return { result, explanation };
}

function detectInstitutionalEffect(text: string, sources: string[]): DDATAdvancedResult["institutionalEffect"] {
  const classified: string[] = [];
  const authorized: string[] = [];
  const agencyLoss: string[] = [];
  const invisible: string[] = [];
  const protected_: string[] = [];

  if (/person|individual|user|worker|student|patient|citizen|employee/i.test(text)) {
    classified.push("Individuals named or implied by the proposition");
  }
  if (/group|community|population|demographic|category of people/i.test(text)) {
    classified.push("Social groups or demographic categories");
  }
  if (/AI|algorithm|system|institution|platform|government|employer/i.test(text)) {
    authorized.push("Institutions or automated systems whose authority the proposition assumes or reinforces");
  }
  if (/score|rank|classify|determine|decide.{0,20}(person|individual|future)/i.test(text)) {
    agencyLoss.push("Persons whose futures are determined by the classification described");
    protected_.push("The classification system or institution performing the ranking");
  }
  if (/objective|neutral|fair|scientific|data-driven|evidence-based/i.test(text)) {
    invisible.push("The value judgments, social conditions, and power relations embedded in the supposedly neutral method");
  }
  if (sources.includes("market ideology")) {
    invisible.push("Labor conditions, ecological costs, and social reproduction that market metrics do not capture");
    protected_.push("Market institutions and their authority to assign value");
  }
  if (sources.includes("technological fatalism")) {
    invisible.push("The political and institutional decisions that could redirect technological development");
    agencyLoss.push("Those whose futures are foreclosed by the proposition's fatalistic framing");
  }
  if (sources.includes("institutional classification")) {
    invisible.push("The contestation process, error rate, and appeal mechanism of the classification system");
    protected_.push("The institution performing the classification");
  }

  if (classified.length === 0) classified.push("Not explicitly identified — the proposition may affect unnamed persons or groups");
  if (authorized.length === 0) authorized.push("Not explicitly identified");
  if (agencyLoss.length === 0) agencyLoss.push("Not explicitly identified");
  if (invisible.length === 0) invisible.push("Background conditions are not specified in the proposition");

  return {
    classifiedSubjects: classified,
    authorizedAgents: authorized,
    agencyLoss,
    invisibleConditions: invisible,
    protectedInstitutions: protected_,
  };
}

function detectEcologicalContext(text: string, sources: string[]): DDATAdvancedResult["ecologicalGenerativeContext"] {
  const erased: string[] = [];
  const embodied: string[] = [];
  const technological: string[] = [];
  const institutional: string[] = [];

  if (!/labor|work|worker|人間の労働|노동|труд/i.test(text)) erased.push("The labor conditions that produced the data, system, or institution being described");
  if (!/body|physical|embodied|bodily|身体|신체|тело/i.test(text)) erased.push("The embodied and situated experience of those affected by the proposition");
  if (!/environment|ecology|climate|natural|生態|환경|экология/i.test(text)) erased.push("The ecological conditions and material substrates that make the described system possible");
  if (!/history|historical|context|条件|역사|история/i.test(text)) erased.push("The historical conditions and power relations that generated the current situation");

  if (sources.includes("AI-generated output") || sources.includes("statistical model")) {
    technological.push("AI infrastructure, data pipelines, training compute, energy consumption");
    technological.push("Human annotation labor that produced the training data");
    institutional.push("Organizational decisions about model deployment and evaluation criteria");
  }
  if (sources.includes("market ideology")) {
    institutional.push("Market structures, property regimes, and regulatory frameworks");
    erased.push("Unpaid social reproduction and care labor that market accounting excludes");
  }
  if (sources.includes("scientific vocabulary")) {
    institutional.push("Research funding, peer review systems, and knowledge production institutions");
    embodied.push("The practical and experimental conditions that produced the scientific claim");
  }

  if (embodied.length === 0) embodied.push("Bodily, practical, and experiential conditions are not specified");
  if (technological.length === 0) technological.push("Technological infrastructure is not explicitly addressed");
  if (institutional.length === 0) institutional.push("Institutional conditions of production are not specified");

  return { erasedContexts: erased, embodiedConditions: embodied, technologicalConditions: technological, institutionalConditions: institutional };
}

function computeScores(
  layerOverreach: RiskLevel,
  beliefRisk: RiskLevel,
  justificationRisk: RiskLevel,
  direction: DialecticalDirectionResult,
  freedomPatterns: number,
  overreachPatternCount: number
): DDATAdvancedScores {
  const r = (v: RiskLevel) => ({ Low: 15, Medium: 40, High: 65, Critical: 85 }[v]);

  const freedom: Record<DialecticalDirectionResult, number> = {
    "Freedom-Generating": 75,
    "Ambivalent": 45,
    "Requires Revision": 30,
    "Justification-Generating": 20,
    "Self-Enclosed Dialectic": 10,
  };

  return {
    layerOverreachRisk: Math.min(100, r(layerOverreach) + overreachPatternCount * 5),
    beliefGenerationRisk: r(beliefRisk),
    justificationGenerationRisk: r(justificationRisk),
    institutionalHarmRisk: Math.min(100, Math.round((r(justificationRisk) + r(beliefRisk)) / 2)),
    freedomGenerationPotential: Math.min(100, freedom[direction] + freedomPatterns * 3),
    revisionNecessity: Math.min(100, Math.round((r(layerOverreach) + r(beliefRisk) + r(justificationRisk)) / 3)),
  };
}

function buildRevisedProposition(text: string, propositionType: string, overreachPatterns: string[], useContextProblems: UseContextProblem[], direction: DialecticalDirectionResult): string {
  const problems = overreachPatterns.length > 0
    ? `The original proposition commits ${overreachPatterns[0]}. `
    : "";

  const termIssue = useContextProblems.length > 0
    ? `The term "${useContextProblems[0].term}" requires disambiguation. `
    : "";

  const directionNote = direction === "Self-Enclosed Dialectic" || direction === "Justification-Generating"
    ? "A more responsible proposition would: (1) specify the scope and conditions of the claim, (2) identify the institutional mechanisms that could be audited or redesigned, (3) preserve the possibility of correction and revision, and (4) assign responsibility to identifiable agents rather than to fate, technology, or nature."
    : "A more responsible version of this proposition would: (1) qualify the scope, (2) distinguish the empirical claim from the normative or ontological conclusion, and (3) identify what evidence could disconfirm it.";

  return `${problems}${termIssue}${directionNote}\n\nRevised form: Rather than stating the proposition in its current form, consider: "[The specific institutional or empirical condition described], under [specified conditions], tends toward [specified effect]. This tendency is not inevitable — it can be audited, redesigned, and redirected through [identified mechanisms]. The claim requires evidence of [specified type] and remains open to revision when [specified correction conditions are met]."`;
}

function buildShortDiagnosis(
  propositionType: string,
  direction: DialecticalDirectionResult,
  layerOverreach: RiskLevel,
  beliefRisk: RiskLevel
): string {
  const directionNote: Record<DialecticalDirectionResult, string> = {
    "Freedom-Generating": "Its direction is broadly freedom-generating, though it would benefit from greater precision.",
    "Ambivalent": "Its direction is ambivalent — it contains both opening and closing movements that depend on how its terms are resolved.",
    "Justification-Generating": "Its direction tends toward justification-generation: it risks protecting existing structures from audit rather than opening them to correction.",
    "Self-Enclosed Dialectic": "It generates a self-enclosed dialectic that produces belief in its own necessity while foreclosing external correction.",
    "Requires Revision": "In its current form it cannot be reliably directed toward freedom or justification — it requires revision before the direction can be assessed.",
  };

  return `This proposition is classified as: ${propositionType} Layer overreach risk is ${layerOverreach}. Belief-generation risk is ${beliefRisk}. ${directionNote[direction]} The proposition would benefit from scope qualification, term disambiguation, and the addition of an explicit audit path — specifying what institutions, mechanisms, or criteria should be examined, by whom, and with what accountability.`;
}

function generateMarkdownAdvanced(text: string, result: DDATAdvancedResult): string {
  const lines = [
    `# Statement Audit — Advanced DDAT Audit`,
    ``,
    `**Date:** ${new Date().toISOString().split("T")[0]}`,
    ``,
    `---`,
    ``,
    `## Original Proposition`,
    ``,
    `> ${text}`,
    ``,
    `---`,
    ``,
    `## 1. Proposition Type`,
    ``,
    result.propositionType,
    ``,
    `## 2. Generation Conditions`,
    ``,
    `**Primary sources:** ${result.generationConditions.primarySources.join(", ") || "Not detected"}`,
    ``,
    `**Hidden assumptions:**`,
    ...result.generationConditions.hiddenAssumptions.map(a => `- ${a}`),
    ``,
    `**Missing conditions:**`,
    ...result.generationConditions.missingConditions.map(c => `- ${c}`),
    ``,
    `## 3. Layer Classification`,
    ``,
    (result.layerClassification.join(", ") || "Not classified"),
    ``,
    `## 4. Layer Overreach`,
    ``,
    `**Risk level:** ${result.layerOverreach.riskLevel}`,
    ``,
    result.layerOverreach.patterns.length > 0 ? `**Patterns:** ${result.layerOverreach.patterns.join("; ")}` : "",
    ``,
    result.layerOverreach.explanation,
    ``,
    `## 5. Use-Context Problems`,
    ``,
    ...result.useContextProblems.map(p => `**"${p.term}"** — ${p.problem}\n*Clarification needed:* ${p.suggestedClarification}`),
    ``,
    `## 6. Belief-Generation Risk`,
    ``,
    `**Level:** ${result.beliefGenerationRisk.riskLevel}`,
    ``,
    result.beliefGenerationRisk.explanation,
    ``,
    `## 7. Justification-Generation Risk`,
    ``,
    `**Level:** ${result.justificationGenerationRisk.riskLevel}`,
    ``,
    result.justificationGenerationRisk.explanation,
    ``,
    `## 8. Dialectical Direction`,
    ``,
    `**Result:** ${result.dialecticalDirection.result}`,
    ``,
    result.dialecticalDirection.explanation,
    ``,
    `## 9. Institutional Effect`,
    ``,
    `**Classified subjects:** ${result.institutionalEffect.classifiedSubjects.join("; ")}`,
    `**Authorized agents:** ${result.institutionalEffect.authorizedAgents.join("; ")}`,
    `**Agency loss:** ${result.institutionalEffect.agencyLoss.join("; ")}`,
    `**Invisible conditions:** ${result.institutionalEffect.invisibleConditions.join("; ")}`,
    `**Protected institutions:** ${result.institutionalEffect.protectedInstitutions.join("; ") || "None identified"}`,
    ``,
    `## 10. Ecological Generative Context`,
    ``,
    `**Erased contexts:** ${result.ecologicalGenerativeContext.erasedContexts.join("; ")}`,
    ``,
    `## 11. Heuristic Scores`,
    ``,
    `> These scores are heuristic audit indicators, not moral judgments of persons.`,
    ``,
    `| Indicator | Score |`,
    `|-----------|-------|`,
    `| Layer Overreach Risk | ${result.scores.layerOverreachRisk}/100 |`,
    `| Belief-Generation Risk | ${result.scores.beliefGenerationRisk}/100 |`,
    `| Justification-Generation Risk | ${result.scores.justificationGenerationRisk}/100 |`,
    `| Institutional Harm Risk | ${result.scores.institutionalHarmRisk}/100 |`,
    `| Freedom-Generation Potential | ${result.scores.freedomGenerationPotential}/100 |`,
    `| Revision Necessity | ${result.scores.revisionNecessity}/100 |`,
    ``,
    `## 12. Revised Proposition`,
    ``,
    result.revisedProposition,
    ``,
    `## 13. Short Final Diagnosis`,
    ``,
    result.shortFinalDiagnosis,
    ``,
    `---`,
    ``,
    `*Statement Audit — We audit propositions and systems, not persons.*`,
    `*These scores are heuristic audit indicators, not moral judgments of persons.*`,
  ];

  return lines.filter(l => l !== undefined).join("\n");
}

// ── Main export ───────────────────────────────────────────────────────────────

export function runDDATAdvancedAudit(text: string): DDATAdvancedResult {
  const sources = detectGenerationSources(text);
  const layers = detectLayers(text);
  const overreach = detectLayerOverreach(text, layers);
  const useContext = detectUseContextProblems(text);
  const beliefRisk = detectBeliefRisk(text);
  const justRisk = detectJustificationRisk(text);
  const propositionType = detectPropositionType(text);
  const direction = detectDialecticalDirection(text, beliefRisk.riskLevel, justRisk.riskLevel);
  const institutional = detectInstitutionalEffect(text, sources);
  const ecological = detectEcologicalContext(text, sources);
  const freedomPatternCount = FREEDOM_PATTERNS.filter(p => p.regex.test(text)).length;

  const scores = computeScores(
    overreach.riskLevel,
    beliefRisk.riskLevel,
    justRisk.riskLevel,
    direction.result,
    freedomPatternCount,
    overreach.patterns.length
  );

  const revised = buildRevisedProposition(text, propositionType, overreach.patterns, useContext, direction.result);
  const diagnosis = buildShortDiagnosis(propositionType, direction.result, overreach.riskLevel, beliefRisk.riskLevel);

  const result: DDATAdvancedResult = {
    mode: "ddat-advanced",
    propositionType,
    generationConditions: {
      primarySources: sources,
      hiddenAssumptions: detectHiddenAssumptions(text, sources),
      missingConditions: detectMissingConditions(text, sources),
    },
    layerClassification: layers,
    layerOverreach: overreach,
    useContextProblems: useContext,
    beliefGenerationRisk: beliefRisk,
    justificationGenerationRisk: justRisk,
    dialecticalDirection: direction,
    institutionalEffect: institutional,
    ecologicalGenerativeContext: ecological,
    scores,
    revisedProposition: revised,
    shortFinalDiagnosis: diagnosis,
    markdownExport: "",
  };

  result.markdownExport = generateMarkdownAdvanced(text, result);
  return result;
}
