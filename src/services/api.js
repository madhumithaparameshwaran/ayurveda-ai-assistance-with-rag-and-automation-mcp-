/**
 * Backend-Ready Service Layer
 * 
 * This service module connects the React frontend to the backend.
 * Currently, it provides robust simulated responses based on the local demo dataset
 * with realistic asynchronous latency (representing RAG retrieval & vector scoring).
 * 
 * When deploying with the FastAPI backend, replace the simulated return statements
 * with actual fetch/axios calls to the indicated endpoints.
 */

import { DEMO_PATENTS, DEMO_SAMPLE_INVENTION } from '../data/patents';

// Simulated network delay helper
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 1. SEARCH PATENTS & PRIOR ART
 * FastAPI Integration: GET /api/patents/search?q={query}&category={category}&status={status}
 */
export async function searchPatents(query = '', filters = {}) {
  await delay(600); // Simulate vector database similarity indexing

  let results = [...DEMO_PATENTS];

  if (query.trim()) {
    const q = query.toLowerCase();
    results = results.filter((p) => {
      const matchTitle = p.title.toLowerCase().includes(q);
      const matchAbstract = p.abstract.toLowerCase().includes(q);
      const matchKeywords = p.keywords.some((k) => k.toLowerCase().includes(q));
      const matchIngredients = p.ingredients.some((ing) => ing.name.toLowerCase().includes(q));
      const matchId = p.id.toLowerCase().includes(q);
      return matchTitle || matchAbstract || matchKeywords || matchIngredients || matchId;
    });
  }

  if (filters.category && filters.category !== 'All') {
    results = results.filter((p) => p.category === filters.category);
  }

  if (filters.status && filters.status !== 'All') {
    results = results.filter((p) => p.status === filters.status);
  }

  if (filters.minSimilarity) {
    results = results.filter((p) => p.similarity >= Number(filters.minSimilarity));
  }

  return {
    success: true,
    count: results.length,
    totalRecordsInIndex: DEMO_PATENTS.length,
    queryUsed: query,
    results,
    notice: "Demo dataset — records shown for prototype demonstration."
  };
}

/**
 * 2. GET PATENT DETAILS
 * FastAPI Integration: GET /api/patents/{id}
 */
export async function getPatentDetails(id) {
  await delay(350);
  const patent = DEMO_PATENTS.find((p) => p.id === id);
  if (!patent) {
    throw new Error(`Patent record with ID ${id} not found in prototype database.`);
  }
  return {
    success: true,
    data: patent,
    notice: "Demo dataset — records shown for prototype demonstration."
  };
}

/**
 * 3. AI INVENTION & PRIOR-ART ANALYSIS (RAG PIPELINE SIMULATION)
 * FastAPI Integration: POST /api/invention/analyze
 * Request Body: { title, field, problem, solution, ingredients, method, uniqueFeatures, expectedBenefits }
 */
export async function analyzeInvention(data) {
  await delay(1200); // Simulate dense embedding vector search and similarity calculation

  const textToScan = `${data.title} ${data.field} ${data.problem} ${data.solution} ${data.ingredients} ${data.method} ${data.uniqueFeatures}`.toLowerCase();

  // Extract key concept tags from input
  const extractedConcepts = [];
  const conceptLibrary = [
    { tag: "Ayurveda", match: ["ayurved", "traditional", "dosha", "rasayana"] },
    { tag: "Polyherbal formulation", match: ["polyherbal", "combination", "multiple herbs", "botanical blend"] },
    { tag: "Blood glucose regulation", match: ["glucose", "sugar", "glycemic", "diabetes", "prameha", "islet"] },
    { tag: "Bioavailability enhancement", match: ["bioavailability", "piperine", "absorption", "solubility", "permeation"] },
    { tag: "Enteric coating", match: ["enteric", "pellet", "capsule", "delayed release", "granule"] },
    { tag: "Metabolic disorder", match: ["metabolic", "lipid", "cholesterol", "obesity", "syndrome"] },
    { tag: "Anti-inflammatory", match: ["inflammation", "pain", "swelling", "curcumin", "joint", "arthritis"] },
    { tag: "Targeted delivery", match: ["targeted", "nanoparticle", "liposome", "nanosome", "hydrogel"] },
    { tag: "Standardized extract", match: ["extract", "standardized", "solvent", "fraction", "hplc"] }
  ];

  conceptLibrary.forEach((c) => {
    if (c.match.some((m) => textToScan.includes(m))) {
      extractedConcepts.push(c.tag);
    }
  });

  if (extractedConcepts.length === 0) {
    extractedConcepts.push("Ayurveda", "Herbal formulation", "Bioactive botanicals");
  }

  // Calculate similarity rankings against demo patents
  const scoredPatents = DEMO_PATENTS.map((p) => {
    let score = 30; // base floor
    if (textToScan.includes("glucose") || textToScan.includes("glycemic") || textToScan.includes("karela") || textToScan.includes("gymnema")) {
      if (p.id === "DEMO-AYU-2026-001") score = 87;
      if (p.id === "DEMO-AYU-2026-008") score = 65;
    } else if (textToScan.includes("joint") || textToScan.includes("arthritis") || textToScan.includes("curcumin") || textToScan.includes("pain")) {
      if (p.id === "DEMO-AYU-2026-002") score = 84;
      if (p.id === "DEMO-AYU-2026-006") score = 62;
    } else if (textToScan.includes("memory") || textToScan.includes("neuro") || textToScan.includes("ashwagandha")) {
      if (p.id === "DEMO-AYU-2026-003") score = 81;
      if (p.id === "DEMO-AYU-2026-010") score = 69;
    } else {
      score = p.similarity;
    }
    return { ...p, calculatedSimilarity: score };
  }).sort((a, b) => b.calculatedSimilarity - a.calculatedSimilarity);

  const top3 = scoredPatents.slice(0, 3);

  // Generate realistic similarities & distinguishing features
  const similarities = [
    `Therapeutic Objective: Shares common biological intent regarding ${extractedConcepts[1] || 'metabolic & cellular balance'} with prior documents like ${top3[0]?.id}.`,
    `Core Botanical Base: Employs widely documented Ayurvedic botanical taxa cited in classical Ayurvedic treatises (e.g., Caraka & Sushruta Samhitas).`,
    `Hydro-alcoholic Extraction: Methodology utilizes solvent concentrations similar to published methods for phytocompound preservation.`
  ];

  const distinguishingFeatures = [
    `Novel Synergy & Ratios: Introduces specific standardized proportions not directly disclosed in ${top3[0]?.id} or ${top3[1]?.id}.`,
    `Dosage Form Modernization: Formulation as enteric-coated micro-particulates overcomes gastric bio-degradation commonly cited in baseline prior art.`,
    `Bio-enhancement Mechanism: Novel integration of kinetic bio-enhancers yields distinct plasma retention profiles.`
  ];

  const researchGuidance = [
    "Preliminary AI-assisted analysis indicates potentially relevant prior-art documents in the metabolic and polyherbal domain.",
    "Section 3(p) of the Indian Patents Act prohibits patenting of traditional knowledge per se or mere aggregation of known properties. The applicant should emphasize synergistic efficacy data and specialized dosage form characteristics (e.g., enteric micro-pellets).",
    "Further prior-art review and professional patent attorney assessment are strongly recommended prior to formal statutory filing."
  ];

  return {
    success: true,
    inventionAnalyzed: data.title || "Proposed Ayurvedic Formulation",
    extractedConcepts,
    relevantDocuments: top3,
    similarities,
    distinguishingFeatures,
    aiGuidance: researchGuidance,
    cautiousNotice: "Preliminary AI-assisted analysis — for academic research only. Not an official patentability guarantee."
  };
}

/**
 * 4. AI CHATBOT (RAG QUERY)
 * FastAPI Integration: POST /api/rag/query
 * Request Body: { message, conversationHistory }
 */
export async function askAssistant(message, history = []) {
  await delay(800); // Simulate RAG query embedding retrieval & prompt synthesis

  const text = message.toLowerCase();

  if (text.includes("glucose") || text.includes("sugar") || text.includes("diabetes") || text.includes("gymnema")) {
    return {
      understanding: "You have described a polyherbal Ayurvedic formulation primarily intended to support blood glucose management and metabolic balance.",
      extractedConcepts: ["Ayurveda", "Polyherbal formulation", "Blood glucose regulation", "Pancreatic support", "Gymnema sylvestre"],
      relevantDocuments: [
        { id: "DEMO-AYU-2026-001", title: "Synergistic Polyherbal Formulation Comprising Gymnema Sylvestre and Momordica Charantia...", similarity: 87 },
        { id: "DEMO-AYU-2026-008", title: "Targeted Phytopharmaceutical Formulation of Tinospora Cordifolia...", similarity: 65 }
      ],
      similarityInfo: "Prior document DEMO-AYU-2026-001 uses Gymnema and Momordica fruit extracts for blood glucose modulation with piperine bio-enhancers.",
      distinctions: "Your formulation may distinguish itself if it utilizes distinct standardized fractions, an enteric-coated delivery system, or novel adjuvant botanicals such as Cinnamomum verum.",
      suggestedNextSteps: [
        "Run an in-depth prior-art similarity scan in the Invention Analysis module.",
        "Document specific extraction solvents and quantitative HPLC marker assays.",
        "Proceed to the Patent Application Wizard to prepare initial specification draft."
      ],
      recommendedAction: "analyze"
    };
  }

  if (text.includes("joint") || text.includes("curcumin") || text.includes("arthritis") || text.includes("inflammation") || text.includes("gel")) {
    return {
      understanding: "You have described an Ayurvedic topical or oral anti-inflammatory intervention utilizing curcuminoid and botanical resins for joint health.",
      extractedConcepts: ["Ayurveda", "Curcuma longa", "Boswellia serrata", "Topical hydrogel", "Osteoarthritis"],
      relevantDocuments: [
        { id: "DEMO-AYU-2026-002", title: "Nano-Curcuminoid Topical Hydrogel Formulation Fortified with Boswellia Serrata...", similarity: 84 },
        { id: "DEMO-AYU-2026-006", title: "Standardized Solid Dispersion of Zingiber Officinale and Boswellia...", similarity: 62 }
      ],
      similarityInfo: "Document DEMO-AYU-2026-002 specifically describes a nano-emulgel of Curcuma longa and Boswellia serrata for osteoarthritis.",
      distinctions: "Distinctions can be established in the polymer carrier, transdermal penetration rate, or novel solvent-free extraction protocols.",
      suggestedNextSteps: [
        "Compare particle size distribution and stability profiles with prior document DEMO-AYU-2026-002.",
        "Verify non-obvious synergistic ratios of AKBA to curcuminoids."
      ],
      recommendedAction: "search"
    };
  }

  // Default general assistant response
  return {
    understanding: `I have received your technical description regarding: "${message}". I have cross-referenced the Ayurvedic classical corpus and indexed prototype patent records.`,
    extractedConcepts: ["Ayurvedic formulation", "Botanical synergy", "Phytomedicine", "Patent specification drafting"],
    relevantDocuments: [
      { id: "DEMO-AYU-2026-001", title: "Synergistic Polyherbal Formulation Comprising Gymnema Sylvestre...", similarity: 72 },
      { id: "DEMO-AYU-2026-003", title: "Synergistic Standardized Composition of Withania Somnifera...", similarity: 68 },
      { id: "DEMO-AYU-2026-004", title: "Ayurvedic Kashayam Decoction Concentrate with Piperine Bio-Enhancer...", similarity: 58 }
    ],
    similarityInfo: "Preliminary semantic search retrieved related polyherbal compositions sharing similar botanical therapeutic classes.",
    distinctions: "Novelty in Ayurvedic patenting under Section 3(p) requires demonstrating a clear synergistic effect rather than a mere admixture of known herbs.",
    suggestedNextSteps: [
      "Click [Analyze My Invention] to evaluate your exact formulation ratios.",
      "Explore existing documents in [Search Existing Solutions].",
      "Draft structured claims in [Prepare Application]."
    ],
    recommendedAction: "analyze"
  };
}

/**
 * 5. AI-ASSISTED APPLICATION FILLING
 * FastAPI Integration: POST /api/application/generate
 * Request Body: { inventionData, analysisData }
 */
export async function generateApplication(inventionData = {}) {
  await delay(1000);

  const baseTitle = inventionData.title || DEMO_SAMPLE_INVENTION.title;
  const baseProblem = inventionData.problem || DEMO_SAMPLE_INVENTION.problem;
  const baseSolution = inventionData.solution || DEMO_SAMPLE_INVENTION.solution;
  const baseIngredients = inventionData.ingredients || DEMO_SAMPLE_INVENTION.ingredients;

  return {
    success: true,
    notice: "AI-generated draft — requires human review.",
    draft: {
      suggestedTitle: baseTitle.toUpperCase().startsWith("AN IMPROVED") ? baseTitle : `AN IMPROVED ${baseTitle}`,
      fieldOfInvention: "PHARMACEUTICAL FORMULATIONS / AYURVEDIC MEDICINE / CONTROLLED-RELEASE BOTANICAL COMPOSITIONS",
      abstract: `The present invention relates to an improved, synergistic botanical composition designed for targeted metabolic homeostasis. The composition comprises standardized extracts of ${baseIngredients || 'botanical herbs'} formulated into micro-particulate delivery systems. The formulation provides sustained bioavailability of bio-active markers while masking herbal bitterness and eliminating gastric degradation. In vivo evaluations demonstrate synergistic therapeutic efficacy surpassing mere mechanical admixtures.`,
      problemStatement: baseProblem || "Existing herbal formulations suffer from rapid enzymatic degradation, non-standardized marker concentrations, and bitter palatability leading to poor regimen adherence.",
      proposedSolution: baseSolution || "A multi-particulate solid oral dosage form utilizing enteric-coated micro-pellets designed for site-specific duodenal dissolution.",
      keyFeatures: [
        "Synergistic proportioning of standardized botanical hydro-alcoholic fractions.",
        "Enteric core-shell microencapsulation preventing premature acidic dissolution.",
        "Integration of natural bio-enhancers reducing required dosage thresholds.",
        "Compliance with classical Ayurvedic Pharmacopoeia parameters with modern stability."
      ],
      technicalDescription: `FIELD OF THE INVENTION:\nThis invention falls under IPC classes A61K 36/00 and A61P 3/00, specifically dealing with standardized Ayurvedic formulations.\n\nDETAILED PROCESS:\nBotanical constituents are subjected to standardized Shodhana, followed by aqueous-ethanolic extraction at 45°C. The liquid extract is concentrated under vacuum, blended with microcrystalline excipients, and spheronized into 1mm cores. The cores receive an enteric film coating of 8% weight gain using an aqueous dispersion.\n\nCLAIMS DRAFT (PRELIMINARY):\n1. A synergistic oral polyherbal formulation characterized by standardized botanical extracts in an enteric-coated particulate matrix.\n2. The formulation of claim 1, further comprising a secondary botanical bio-enhancer at 5-10% by weight.\n3. A process for manufacturing the composition of claim 1 involving low-temperature vacuum extraction and fluid-bed spheronization.`
    }
  };
}

/**
 * 6. SUBMIT PROTOTYPE APPLICATION
 * FastAPI Integration: POST /api/application/create
 * Request Body: Full multi-step form data
 */
export async function createApplication(applicationData) {
  await delay(900);

  // Generate simulated academic prototype tracking number
  const randomSeq = Math.floor(100000 + Math.random() * 900000);
  const applicationId = `PROT-2026-${randomSeq}`;
  const submissionDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const createdRecord = {
    applicationId,
    submissionDate,
    status: "Submitted for Prototype Review",
    currentStageIndex: 4, // 0: Created, 1: Info Prepared, 2: Prior-Art Done, 3: Draft Prepared, 4: Submitted for Review, 5: Examination, 6: Final Decision
    applicant: applicationData.applicant || {
      name: "Demo Applicant / Research Scholar",
      organization: "Academic Research Institute",
      email: "scholar@university-research.edu",
      applicantType: "Academic / Educational Institution"
    },
    invention: applicationData.invention || {
      title: "Example Ayurvedic Polyherbal Formulation",
      field: "Ayurvedic Phytopharmaceuticals"
    },
    technical: applicationData.technical || {},
    documents: [
      { name: "Abstract_Specification.pdf", size: "1.4 MB", status: "Verified" },
      { name: "Complete_Technical_Description.pdf", size: "3.8 MB", status: "Verified" },
      { name: "Prior_Art_Search_Report.pdf", size: "2.1 MB", status: "Verified" },
      { name: "Supporting_HPLC_Chromatograms.pdf", size: "4.5 MB", status: "Verified" }
    ],
    timeline: [
      { stage: "Application Created", date: submissionDate, completed: true, status: "completed" },
      { stage: "Invention Information Prepared", date: submissionDate, completed: true, status: "completed" },
      { stage: "Prior-Art Search Completed", date: submissionDate, completed: true, status: "completed" },
      { stage: "Application Draft Prepared", date: submissionDate, completed: true, status: "completed" },
      { stage: "Submitted for Prototype Review", date: submissionDate, completed: true, status: "current" },
      { stage: "Simulated Patent Office Examination", date: "Pending Schedule", completed: false, status: "pending" },
      { stage: "Final Advisory Decision", date: "Pending Schedule", completed: false, status: "pending" }
    ],
    notice: "This submission is simulated for academic demonstration and does not constitute an actual patent filing."
  };

  // Persist into localStorage for live prototype tracking
  try {
    const existing = JSON.parse(localStorage.getItem('ayur_applications') || '[]');
    existing.unshift(createdRecord);
    localStorage.setItem('ayur_applications', JSON.stringify(existing));
  } catch (e) {
    console.warn("Could not save application to localStorage:", e);
  }

  return {
    success: true,
    data: createdRecord
  };
}

/**
 * 7. GET APPLICATION STATUS & TIMELINE
 * FastAPI Integration: GET /api/application/{id}/status
 */
export async function getApplicationStatus(id) {
  await delay(500);

  // Check localStorage first
  let stored = [];
  try {
    stored = JSON.parse(localStorage.getItem('ayur_applications') || '[]');
  } catch (e) {
    stored = [];
  }

  const found = stored.find((app) => app.applicationId.toLowerCase() === id.trim().toLowerCase());
  if (found) {
    return { success: true, data: found };
  }

  // Fallback demo record if searching for PROT-2026-000001
  if (id.trim().toUpperCase() === "PROT-2026-000001" || id.trim().toUpperCase() === "DEMO") {
    return {
      success: true,
      data: {
        applicationId: "PROT-2026-000001",
        submissionDate: "22 September 2026",
        status: "Submitted for Prototype Review",
        currentStageIndex: 4,
        applicant: {
          name: "Dr. A. K. Shastri",
          organization: "National Institute of Ayurvedic Research",
          email: "ak.shastri@ayur-res.edu",
          applicantType: "Research Institution"
        },
        invention: {
          title: "Standardized Polyherbal Micro-Pellets for Glycemic Control",
          field: "Ayurvedic Phytopharmaceuticals"
        },
        documents: [
          { name: "Abstract.pdf", size: "1.2 MB", status: "Verified" },
          { name: "Technical_Description.pdf", size: "3.5 MB", status: "Verified" },
          { name: "Supporting_Document.pdf", size: "2.1 MB", status: "Verified" }
        ],
        timeline: [
          { stage: "Application Created", date: "22 September 2026", completed: true, status: "completed" },
          { stage: "Invention Information Prepared", date: "22 September 2026", completed: true, status: "completed" },
          { stage: "Prior-Art Search Completed", date: "22 September 2026", completed: true, status: "completed" },
          { stage: "Application Draft Prepared", date: "22 September 2026", completed: true, status: "completed" },
          { stage: "Submitted for Prototype Review", date: "22 September 2026", completed: true, status: "current" },
          { stage: "Simulated Patent Office Examination", date: "Scheduled Oct 2026", completed: false, status: "pending" },
          { stage: "Final Advisory Decision", date: "Pending Examination", completed: false, status: "pending" }
        ],
        notice: "This submission is simulated for academic demonstration and does not constitute an actual patent filing."
      }
    };
  }

  throw new Error(`Application ${id} not found in prototype system. Try 'PROT-2026-000001'.`);
}
