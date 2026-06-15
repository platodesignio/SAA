/**
 * Multilingual audit pattern detection.
 * Covers: English, Japanese, Chinese (Simplified & Traditional),
 * Spanish, French, German, Portuguese, Arabic, Hindi, Korean,
 * Italian, Russian, Turkish, Indonesian/Malay, Dutch, Polish.
 */

export interface FlagPatterns {
  overgeneralization: RegExp;
  scientificOverreach: RegExp;
  socialGeneralization: RegExp;
  truthConsensus: RegExp;
  dataGivenness: RegExp;
  classificationRisk: RegExp;
  responsibilityDiffusion: RegExp;
  nonDominationRisk: RegExp;
  integrityRisk: RegExp;
  essentialization: RegExp;
  dataReduction: RegExp;
  hypotheticalStatus: RegExp;
}

// ── Overgeneralization ────────────────────────────────────────────────────────
// "all / everything / always / never / nobody / everyone / 全て / すべて / 誰もが
//  / 总是 / 从不 / 所有 / 一切 / toujours / jamais / tous / immer / niemals / alle
//  / sempre / nunca / todos / всегда / никогда / все / hep / asla / hiçbir /
//  semua / altijd / nooit / zawsze / nigdy / wszyscy / كل / دائمًا / أبدًا /
//  हमेशा / कभी नहीं / सब / 항상 / 절대 / 모든"
export const overgeneralizationPattern = new RegExp([
  // English
  "\\ball\\b", "\\beverything\\b", "\\balways\\b", "\\bnever\\b", "\\beveryone\\b", "\\bnobody\\b", "\\bnothing\\b", "\\bno one\\b", "\\bwithout exception\\b",
  // Japanese
  "すべて", "全て", "全ての", "誰もが", "誰でも", "いつも", "常に", "決して", "絶対に", "全人類", "全員", "みんな", "あらゆる",
  // Chinese (Simplified + Traditional)
  "所有人", "每个人", "总是", "从不", "一切", "全部", "永远", "絕對", "所有", "任何人都", "從不", "每個人",
  // Spanish
  "\\btodos\\b", "\\btodas\\b", "\\btodo\\b", "\\btoda\\b", "\\bsiempre\\b", "\\bnunca\\b", "\\bjamás\\b", "\\bnada\\b", "\\bnadie\\b", "\\bcada uno\\b",
  // French
  "\\btoujours\\b", "\\bjamais\\b", "\\btous\\b", "\\btout le monde\\b", "\\btout\\b", "\\bpersonne\\b", "\\brien\\b", "\\btoutes\\b",
  // German
  "\\bimmer\\b", "\\bniemals\\b", "\\balle\\b", "\\balles\\b", "\\bjeder\\b", "\\bnichts\\b", "\\bniemand\\b", "\\bstets\\b",
  // Portuguese
  "\\bsempre\\b", "\\bnunca\\b", "\\btodos\\b", "\\bninguém\\b", "\\btudo\\b", "\\bnada\\b",
  // Arabic
  "دائمًا", "أبدًا", "كل شيء", "الجميع", "لا أحد", "لا شيء",
  // Hindi
  "हमेशा", "कभी नहीं", "सभी", "सब कुछ", "सब", "हर कोई", "कुछ नहीं", "कोई नहीं",
  // Korean
  "항상", "절대", "모든", "누구나", "아무도", "언제나",
  // Italian
  "\\bsempre\\b", "\\bmai\\b", "\\btutti\\b", "\\bnessuno\\b", "\\btutto\\b",
  // Russian
  "всегда", "никогда", "все", "никто", "всё", "ничего",
  // Turkish
  "\\bhep\\b", "\\basla\\b", "\\bhiçbir\\b", "\\bherkes\\b", "\\bher şey\\b",
  // Indonesian/Malay
  "\\bselalu\\b", "\\btidak pernah\\b", "\\bsemua\\b", "\\bsetiap orang\\b",
  // Dutch
  "\\baltijd\\b", "\\bnooit\\b", "\\biedereen\\b", "\\balles\\b",
  // Polish
  "zawsze", "nigdy", "wszyscy", "wszystko", "nikt",
].join("|"), "i");

// ── Scientific Overreach ──────────────────────────────────────────────────────
export const scientificOverreachPattern = new RegExp([
  // English
  "science proves", "quantum", "neuroscience", "physics says", "brain science", "studies show", "research confirms", "scientists say", "data confirms", "ai proves",
  // Japanese
  "量子", "神経科学", "科学が証明", "研究によると", "データが示す", "AIが言う", "科学的に証明", "脳科学", "物理学によれば",
  // Chinese
  "量子", "神经科学", "科学证明", "研究表明", "数据显示", "人工智能表明", "物理学证明",
  // Spanish
  "la ciencia prueba", "la neurociencia", "investigaciones demuestran", "la física dice", "la inteligencia artificial dice", "cuántic",
  // French
  "la science prouve", "la neuroscience", "les recherches montrent", "la physique dit", "l'ia dit", "quantique",
  // German
  "die wissenschaft beweist", "die neurowissenschaft", "forschung zeigt", "physik sagt", "ki sagt", "quanten",
  // Portuguese
  "a ciência prova", "a neurociência", "pesquisas mostram", "a física diz", "a ia diz", "quântic",
  // Arabic
  "العلم يثبت", "علم الأعصاب", "الأبحاث تُظهر", "الفيزياء تقول", "الذكاء الاصطناعي يقول", "الكمومي", "نظرية المعلومات",
  // Hindi
  "विज्ञान साबित करता है", "तंत्रिका विज्ञान", "शोध दिखाता है", "भौतिकी कहती है", "एआई कहता है", "क्वांटम",
  // Korean
  "과학이 증명", "신경과학", "연구에 따르면", "물리학이 말하길", "AI가 말하길",
  // Italian
  "la scienza dimostra", "la neuroscienza", "le ricerche mostrano", "la fisica dice", "l'ia dice",
  // Russian
  "наука доказывает", "нейронаука", "исследования показывают", "физика говорит", "ии говорит",
  // Turkish
  "bilim kanıtlar", "sinirbilim", "araştırmalar gösteriyor", "fizik diyor", "yapay zeka diyor",
  // Indonesian
  "ilmu pengetahuan membuktikan", "neurosains", "penelitian menunjukkan", "ai mengatakan",
  // Dutch
  "de wetenschap bewijst", "neurowetenschappen", "onderzoek toont aan", "ai zegt",
  // Polish
  "nauka udowadnia", "neuronauka", "badania pokazują", "fizyka mówi",
].join("|"), "i");

// ── Social Generalization ─────────────────────────────────────────────────────
export const socialGeneralizationPattern = new RegExp([
  // English
  "young people", "the public", "people today", "modern society", "millennials", "gen z", "the youth", "ordinary people", "the masses", "society",
  // Japanese
  "若者", "現代人", "社会", "一般の人", "大衆", "国民", "人々", "今の若い人",
  // Chinese
  "年轻人", "现代人", "社会大众", "普通人", "民众", "公众",
  // Spanish
  "los jóvenes", "la gente hoy", "la sociedad moderna", "el público", "las masas", "la gente común",
  // French
  "les jeunes", "les gens aujourd'hui", "la société moderne", "le public", "les masses", "les gens ordinaires",
  // German
  "die jugend", "die leute heute", "die moderne gesellschaft", "die öffentlichkeit", "die massen",
  // Portuguese
  "os jovens", "as pessoas hoje", "a sociedade moderna", "o público", "as massas",
  // Arabic
  "الشباب", "الناس اليوم", "المجتمع الحديث", "الجمهور", "الجماهير", "بين الشباب",
  // Hindi
  "युवा लोग", "युवा", "आज के लोग", "आधुनिक समाज", "जनता", "आम लोग",
  // Korean
  "젊은이", "청년", "요즘 사람들", "현대 사회", "대중", "일반인",
  // Italian
  "i giovani", "la gente oggi", "la società moderna", "il pubblico", "le masse",
  // Russian
  "молодёж", "молодежь", "люди сегодня", "современное общество", "публика", "массы",
  // Turkish
  "gençler", "bugünün insanları", "modern toplum", "halk", "kitleler",
  // Indonesian
  "anak muda", "masyarakat modern", "publik", "massa",
  // Dutch
  "jongeren", "mensen van vandaag", "de moderne samenleving", "het publiek", "de massa",
  // Polish
  "młodzi ludzie", "ludzie dziś", "nowoczesne społeczeństwo", "społeczeństwo", "masy",
].join("|"), "i");

// ── Truth / Consensus Confusion ───────────────────────────────────────────────
export const truthConsensusPattern = new RegExp([
  // English
  "\\baccepted\\b", "\\bpopular\\b", "\\btrending\\b", "everyone knows", "widely believed", "mainstream", "consensus", "common knowledge", "most people think", "universally accepted",
  // Japanese
  "広く受け入れられ", "一般的に認められ", "みんなが知っている", "常識", "広く信じられ", "コンセンサス", "主流", "世論",
  // Chinese
  "普遍接受", "大家都知道", "公认", "众所周知", "主流观点", "共识",
  // Spanish
  "ampliamente aceptad", "todo el mundo sabe", "consenso", "conocimiento común", "la mayoría piensa",
  // French
  "largement accepté", "largement acceptée", "tout le monde sait", "consensus", "connaissance commune", "la plupart pensent",
  // German
  "allgemein akzeptiert", "weitgehend akzeptiert", "jeder weiß", "konsens", "allgemeinwissen", "die meisten denken",
  // Portuguese
  "amplamente aceito", "todo mundo sabe", "consenso", "conhecimento comum", "a maioria pensa",
  // Arabic
  "على نطاق واسع", "الجميع يعلم", "توافق", "معرفة شائعة", "متقبلة", "مقبول",
  // Hindi
  "व्यापक रूप से स्वीकृत", "व्यापक रूप से स्वीकार", "सभी जानते हैं", "आम सहमति", "सामान्य ज्ञान",
  // Korean
  "널리 받아들여진", "모두가 알고 있는", "합의", "상식", "대부분이 생각하는",
  // Italian
  "ampiamente accettato", "tutti sanno", "consenso", "conoscenza comune",
  // Russian
  "широко принят", "все знают", "консенсус", "общеизвестно", "широко принимается",
  // Turkish
  "yaygın olarak kabul edilen", "herkes biliyor", "uzlaşı", "ortak bilgi",
  // Indonesian
  "diterima secara luas", "semua orang tahu", "konsensus", "pengetahuan umum",
  // Dutch
  "breed geaccepteerd", "iedereen weet", "consensus", "algemene kennis",
  // Polish
  "powszechnie akceptowany", "wszyscy wiedzą", "konsensus", "powszechna wiedza",
].join("|"), "i");

// ── Data Givenness Risk ───────────────────────────────────────────────────────
export const dataGivennessPattern = new RegExp([
  // English
  "\\bdata\\b", "\\bscore\\b", "ai says", "the algorithm", "the model says", "\\blog\\b", "metrics show", "statistics prove", "numbers show", "the ai",
  // Japanese
  "データが", "スコア", "AIが", "アルゴリズムが", "ログ", "統計が", "数字が", "モデルが",
  // Chinese
  "数据显示", "分数", "人工智能说", "算法", "日志", "统计数据",
  // Spanish
  "los datos muestran", "puntuación", "la ia dice", "el algoritmo", "el registro", "las estadísticas",
  // French
  "les données montrent", "score", "l'ia dit", "l'algorithme", "le journal", "les statistiques",
  // German
  "die daten zeigen", "punktzahl", "die ki sagt", "der algorithmus", "das protokoll", "die statistik",
  // Portuguese
  "os dados mostram", "pontuação", "a ia diz", "o algoritmo", "o registro", "as estatísticas",
  // Arabic
  "تُظهر البيانات", "النقاط", "يقول الذكاء الاصطناعي", "الخوارزمية", "السجل", "الإحصاءات",
  // Hindi
  "डेटा दिखाता है", "स्कोर", "एआई कहता है", "एल्गोरिदम", "लॉग", "आँकड़े",
  // Korean
  "데이터가 보여주듯", "점수", "AI가 말하길", "알고리즘", "로그", "통계",
  // Italian
  "i dati mostrano", "punteggio", "l'ia dice", "l'algoritmo", "il registro", "le statistiche",
  // Russian
  "данные показывают", "оценка", "ии говорит", "алгоритм", "журнал", "статистика",
  // Turkish
  "veriler gösteriyor", "puan", "ai diyor", "algoritma", "günlük", "istatistikler",
  // Indonesian
  "data menunjukkan", "skor", "ai mengatakan", "algoritma", "log", "statistik",
  // Dutch
  "de gegevens tonen", "score", "ai zegt", "algoritme", "logboek", "statistieken",
  // Polish
  "dane pokazują", "wynik", "ai mówi", "algorytm", "dziennik", "statystyki",
].join("|"), "i");

// ── Classification Risk ───────────────────────────────────────────────────────
export const classificationRiskPattern = new RegExp([
  // English
  "dangerous person", "high risk", "low trust", "unqualified", "threat level", "risk score", "blacklisted", "flagged", "categorized as",
  // Japanese
  "危険人物", "高リスク", "低信頼", "不適格", "脅威レベル", "リスクスコア", "ブラックリスト", "フラグ", "分類された",
  // Chinese
  "危险人物", "高风险", "低信任", "不合格", "威胁等级", "风险分数", "黑名单", "被标记", "被归类为",
  // Spanish
  "persona peligrosa", "alto riesgo", "baja confianza", "no calificado", "nivel de amenaza", "puntuación de riesgo", "lista negra", "marcado", "categorizado como",
  // French
  "personne dangereuse", "risque élevé", "faible confiance", "non qualifié", "niveau de menace", "score de risque", "liste noire", "signalé", "catégorisé comme",
  // German
  "gefährliche person", "hohes risiko", "geringes vertrauen", "unqualifiziert", "bedrohungsstufe", "risikobewertung", "schwarze liste", "markiert", "kategorisiert als",
  // Portuguese
  "pessoa perigosa", "alto risco", "baixa confiança", "não qualificado", "nível de ameaça", "pontuação de risco", "lista negra", "sinalizado", "categorizado como",
  // Arabic
  "شخص خطير", "مخاطرة عالية", "ثقة منخفضة", "غير مؤهل", "مستوى التهديد", "قائمة سوداء", "مُصنَّف",
  // Hindi
  "खतरनाक व्यक्ति", "उच्च जोखिम", "कम विश्वास", "अयोग्य", "खतरे का स्तर", "काली सूची",
  // Korean
  "위험 인물", "고위험", "낮은 신뢰", "자격 미달", "위협 수준", "블랙리스트", "분류된",
  // Italian
  "persona pericolosa", "alto rischio", "bassa fiducia", "non qualificato", "livello di minaccia", "lista nera", "classificato come",
  // Russian
  "опасный человек", "высокий риск", "низкое доверие", "неквалифицированный", "чёрный список", "помечен", "классифицирован как",
  // Turkish
  "tehlikeli kişi", "yüksek risk", "düşük güven", "niteliksiz", "kara liste", "işaretlenmiş", "olarak sınıflandırıldı",
  // Indonesian
  "orang berbahaya", "risiko tinggi", "kepercayaan rendah", "tidak memenuhi syarat", "daftar hitam", "dikategorikan sebagai",
  // Dutch
  "gevaarlijk persoon", "hoog risico", "laag vertrouwen", "niet gekwalificeerd", "zwarte lijst", "gecategoriseerd als",
  // Polish
  "niebezpieczna osoba", "wysokie ryzyko", "niskie zaufanie", "niekwalifikowany", "czarna lista", "sklasyfikowany jako",
].join("|"), "i");

// ── Responsibility Diffusion ──────────────────────────────────────────────────
export const responsibilityDiffusionPattern = new RegExp([
  // English
  "the system decided", "automatically", "algorithm decided", "the ai decided", "decided by the model", "no one is responsible", "process determined",
  // Japanese
  "システムが決めた", "自動的に", "アルゴリズムが決めた", "AIが決めた", "誰も責任がない", "プロセスが決定", "自動判定",
  // Chinese
  "系统决定了", "自动地", "算法决定了", "人工智能决定了", "没有人负责", "流程决定",
  // Spanish
  "el sistema decidió", "automáticamente", "el algoritmo decidió", "la ia decidió", "nadie es responsable", "el proceso determinó",
  // French
  "le système a décidé", "automatiquement", "l'algorithme a décidé", "l'ia a décidé", "personne n'est responsable", "le processus a déterminé",
  // German
  "das system hat entschieden", "automatisch", "der algorithmus hat entschieden", "die ki hat entschieden", "niemand ist verantwortlich",
  // Portuguese
  "o sistema decidiu", "automaticamente", "o algoritmo decidiu", "a ia decidiu", "ninguém é responsável",
  // Arabic
  "قرر النظام", "تلقائيًا", "قرر الخوارزم", "قرر الذكاء الاصطناعي", "لا أحد مسؤول",
  // Hindi
  "सिस्टम ने तय किया", "स्वचालित रूप से", "एल्गोरिदम ने तय किया", "एआई ने तय किया", "कोई जिम्मेदार नहीं",
  // Korean
  "시스템이 결정했다", "자동으로", "알고리즘이 결정했다", "AI가 결정했다", "아무도 책임이 없다",
  // Italian
  "il sistema ha deciso", "automaticamente", "l'algoritmo ha deciso", "l'ia ha deciso", "nessuno è responsabile",
  // Russian
  "система решила", "автоматически", "алгоритм решил", "ии решил", "никто не несёт ответственности",
  // Turkish
  "sistem karar verdi", "otomatik olarak", "algoritma karar verdi", "yapay zeka karar verdi", "kimse sorumlu değil",
  // Indonesian
  "sistem memutuskan", "secara otomatis", "algoritma memutuskan", "ai memutuskan", "tidak ada yang bertanggung jawab",
  // Dutch
  "het systeem besliste", "automatisch", "het algoritme besliste", "de ai besliste", "niemand is verantwoordelijk",
  // Polish
  "system zdecydował", "automatycznie", "algorytm zdecydował", "ai zdecydował", "nikt nie jest odpowiedzialny",
].join("|"), "i");

// ── Non-Domination Risk ───────────────────────────────────────────────────────
export const nonDominationRiskPattern = new RegExp([
  // English
  "cannot appeal", "banned", "suspended", "no explanation", "no recourse", "arbitrary decision", "opaque",
  // Japanese
  "異議申し立てができない", "禁止された", "停止された", "説明なし", "不透明", "恣意的な決定", "不服申し立て不可",
  // Chinese
  "无法申诉", "被禁止", "被暂停", "没有解释", "不透明", "任意决定",
  // Spanish
  "no se puede apelar", "prohibido", "suspendido", "sin explicación", "sin recurso", "decisión arbitraria", "opaco",
  // French
  "ne peut pas faire appel", "interdit", "suspendu", "sans explication", "sans recours", "décision arbitraire", "opaque",
  // German
  "kann nicht einlegen", "verboten", "gesperrt", "ohne erklärung", "kein rechtsbehelf", "willkürliche entscheidung", "undurchsichtig",
  // Portuguese
  "não pode apelar", "proibido", "suspenso", "sem explicação", "sem recurso", "decisão arbitrária", "opaco",
  // Arabic
  "لا يمكن الاستئناف", "محظور", "معلق", "بدون تفسير", "لا مجال للطعن", "قرار تعسفي", "غامض",
  // Hindi
  "अपील नहीं कर सकते", "प्रतिबंधित", "निलंबित", "कोई स्पष्टीकरण नहीं", "मनमाना निर्णय", "अपारदर्शी",
  // Korean
  "항소할 수 없다", "금지됨", "정지됨", "설명 없음", "불투명한", "자의적 결정",
  // Italian
  "non può fare appello", "vietato", "sospeso", "senza spiegazione", "senza ricorso", "decisione arbitraria", "opaco",
  // Russian
  "нельзя обжаловать", "запрещено", "заблокировано", "без объяснений", "нет средств защиты", "произвольное решение", "непрозрачный",
  // Turkish
  "itiraz edilemez", "yasaklandı", "askıya alındı", "açıklama yok", "başvuru yolu yok", "keyfi karar", "şeffaf olmayan",
  // Indonesian
  "tidak bisa mengajukan banding", "dilarang", "ditangguhkan", "tanpa penjelasan", "keputusan sewenang-wenang", "tidak transparan",
  // Dutch
  "kan niet in beroep", "verboden", "geschorst", "geen uitleg", "willekeurige beslissing", "ondoorzichtig",
  // Polish
  "nie można się odwołać", "zakazany", "zawieszony", "bez wyjaśnienia", "arbitralna decyzja", "nieprzejrzysty",
].join("|"), "i");

// ── Integrity Risk ────────────────────────────────────────────────────────────
export const integrityRiskPattern = new RegExp([
  // English
  "for the greater good", "optimization", "maximize", "sacrifice", "cost-benefit", "collateral", "unavoidable loss",
  // Japanese
  "より大きな善のために", "最適化", "最大化", "犠牲", "コスト・ベネフィット", "やむを得ない損失", "全体のために",
  // Chinese
  "为了更大的善", "优化", "最大化", "牺牲", "成本效益", "不可避免的损失", "为了整体利益",
  // Spanish
  "por el bien mayor", "optimización", "maximizar", "sacrificio", "costo-beneficio", "pérdida inevitable",
  // French
  "pour le plus grand bien", "optimisation", "maximiser", "sacrifice", "coût-bénéfice", "perte inévitable",
  // German
  "für das größere wohl", "optimierung", "maximieren", "opfer", "kosten-nutzen", "unvermeidlicher verlust",
  // Portuguese
  "pelo bem maior", "otimização", "maximizar", "sacrifício", "custo-benefício", "perda inevitável",
  // Arabic
  "من أجل الصالح العام", "تحسين", "تعظيم", "تضحية", "تكلفة وفائدة", "خسارة لا مفر منها",
  // Hindi
  "बड़े भले के लिए", "अनुकूलन", "अधिकतम करना", "बलिदान", "लागत-लाभ",
  // Korean
  "더 큰 선을 위해", "최적화", "극대화", "희생", "비용 편익", "불가피한 손실",
  // Italian
  "per il bene maggiore", "ottimizzazione", "massimizzare", "sacrificio", "costi-benefici", "perdita inevitabile",
  // Russian
  "ради большего блага", "оптимизация", "максимизировать", "жертва", "затраты и выгоды", "неизбежные потери",
  // Turkish
  "daha büyük iyilik için", "optimizasyon", "maksimize etmek", "fedakarlık", "maliyet-fayda", "kaçınılmaz kayıp",
  // Indonesian
  "demi kebaikan yang lebih besar", "optimasi", "memaksimalkan", "pengorbanan", "biaya-manfaat",
  // Dutch
  "voor het grotere goed", "optimalisatie", "maximaliseren", "opoffering", "kosten-baten",
  // Polish
  "dla większego dobra", "optymalizacja", "maksymalizować", "ofiara", "koszty i korzyści",
].join("|"), "i");

// ── Essentialization ──────────────────────────────────────────────────────────
export const essentialiationPattern = new RegExp([
  // English
  "must be", "essentially", "by nature", "inherently", "in their nature", "naturally", "by definition",
  // Japanese
  "本質的に", "生まれつき", "本来", "定義上", "必然的に", "本性として", "必ず",
  // Chinese
  "本质上", "天生", "本来", "根据定义", "必然", "天性",
  // Spanish
  "por naturaleza", "esencialmente", "inherentemente", "por definición", "naturalmente",
  // French
  "par nature", "essentiellement", "par définition", "naturellement", "inhéremment",
  // German
  "von natur aus", "im wesentlichen", "von definition", "naturgemäß", "inhärent",
  // Portuguese
  "por natureza", "essencialmente", "por definição", "naturalmente", "inerentemente",
  // Arabic
  "بطبيعته", "بالأساس", "بحكم التعريف", "بالضرورة", "بطبيعة الحال",
  // Hindi
  "स्वभाव से", "मूल रूप से", "परिभाषा के अनुसार", "स्वाभाविक रूप से",
  // Korean
  "본질적으로", "타고나기를", "정의상", "자연스럽게", "본성적으로",
  // Italian
  "per natura", "essenzialmente", "per definizione", "naturalmente", "inerentemente",
  // Russian
  "по природе", "по существу", "по определению", "естественно", "по своей сути",
  // Turkish
  "doğası gereği", "özünde", "tanım gereği", "doğal olarak", "içsel olarak",
  // Indonesian
  "pada dasarnya", "secara alami", "menurut definisi", "secara inheren",
  // Dutch
  "van nature", "in wezen", "per definitie", "van nature", "inherent",
  // Polish
  "z natury", "zasadniczo", "z definicji", "naturalnie", "inherentnie",
].join("|"), "i");

// ── Data Reduction ────────────────────────────────────────────────────────────
export const dataReductionPattern = new RegExp([
  // English
  "just data", "only numbers", "mere statistics", "just a number", "only metrics",
  // Japanese
  "ただのデータ", "数字にすぎない", "単なる統計", "ただの数値",
  // Chinese
  "只是数据", "只是数字", "仅仅是统计", "只是一个数字",
  // Spanish
  "solo datos", "solo números", "meras estadísticas", "solo una cifra",
  // French
  "juste des données", "seulement des chiffres", "de simples statistiques", "juste un nombre",
  // German
  "nur daten", "nur zahlen", "bloße statistiken", "nur eine zahl",
  // Portuguese
  "apenas dados", "apenas números", "meras estatísticas", "apenas um número",
  // Arabic
  "مجرد بيانات", "مجرد أرقام", "إحصائيات فحسب",
  // Hindi
  "सिर्फ डेटा", "सिर्फ संख्याएं", "केवल आँकड़े",
  // Korean
  "그냥 데이터", "그냥 숫자", "단순한 통계",
  // Italian
  "solo dati", "solo numeri", "mere statistiche", "solo un numero",
  // Russian
  "просто данные", "только числа", "просто статистика",
  // Turkish
  "sadece veri", "sadece sayılar", "basit istatistikler",
  // Indonesian
  "hanya data", "hanya angka", "sekadar statistik",
  // Dutch
  "gewoon data", "alleen cijfers", "louter statistieken",
  // Polish
  "tylko dane", "tylko liczby", "zwykłe statystyki",
].join("|"), "i");

// ── Hypothetical Status ───────────────────────────────────────────────────────
export const hypotheticalStatusPattern = new RegExp([
  // English
  "hypothesis", "theory", "suggests", "may", "might", "could be", "it is possible", "perhaps",
  // Japanese
  "仮説", "理論", "示唆する", "かもしれない", "可能性がある", "おそらく", "ありうる",
  // Chinese
  "假设", "理论", "表明", "可能", "也许", "或许", "有可能",
  // Spanish
  "hipótesis", "teoría", "sugiere", "puede", "podría ser", "es posible", "quizás",
  // French
  "hypothèse", "théorie", "suggère", "peut", "pourrait être", "il est possible", "peut-être",
  // German
  "hypothese", "theorie", "legt nahe", "könnte", "vielleicht", "möglicherweise", "es ist möglich",
  // Portuguese
  "hipótese", "teoria", "sugere", "pode", "poderia ser", "é possível", "talvez",
  // Arabic
  "فرضية", "نظرية", "يقترح", "قد يكون", "ربما", "من المحتمل", "افتراض",
  // Hindi
  "परिकल्पना", "सिद्धांत", "सुझाव देता है", "हो सकता है", "शायद", "संभव है", "अनुमान",
  // Korean
  "가설", "이론", "시사한다", "일 수도 있다", "아마도", "가능하다",
  // Italian
  "ipotesi", "teoria", "suggerisce", "può", "potrebbe essere", "è possibile", "forse",
  // Russian
  "гипотеза", "теория", "предполагает", "может", "возможно", "быть может",
  // Turkish
  "hipotez", "teori", "öneriyor", "olabilir", "belki", "mümkün",
  // Indonesian
  "hipotesis", "teori", "menunjukkan", "mungkin", "bisa jadi", "kemungkinan",
  // Dutch
  "hypothese", "theorie", "suggereert", "kan", "misschien", "het is mogelijk",
  // Polish
  "hipoteza", "teoria", "sugeruje", "może", "być może", "możliwe",
].join("|"), "i");
