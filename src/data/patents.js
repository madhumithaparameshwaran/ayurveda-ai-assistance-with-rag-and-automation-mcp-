/**
 * DEMO PATENT DATASET
 * Academic Prototype Demonstration Records
 * 
 * IMPORTANT: These records are fictional research artifacts created for an
 * M.Tech Data Science project prototype. They do NOT represent real government
 * patent filings or intellectual property registrations.
 */

export const DEMO_PATENTS = [
  {
    id: "DEMO-AYU-2026-001",
    title: "Synergistic Polyherbal Formulation Comprising Gymnema Sylvestre and Momordica Charantia for Glycemic Regulation and Pancreatic Beta-Cell Support",
    applicant: "AyurVeda Biosolutions Lab, Pune (Demo Academic Entity)",
    inventors: ["Dr. R. K. Sharma", "Dr. Anita Desai", "M. K. Varma"],
    category: "Ayurveda",
    subCategory: "Metabolic Disorders & Glycemic Management",
    status: "Published",
    filingDate: "2024-03-15",
    publicationDate: "2025-09-20",
    ipcClassification: "A61K 36/27, A61K 36/42, A61P 3/10",
    similarity: 87,
    abstract: "A novel synergistic polyherbal composition formulated using standardized hydro-ethanolic extracts of Gymnema sylvestre (Meshashringi) leaves and Momordica charantia (Karela) fruit, fortified with a bio-enhancing fraction of Piper nigrum (Maricha). The formulation is prepared through aqueous microwave-assisted extraction under controlled temperatures, yielding high gymnemic acid and charantin purity. In preclinical models, the formulation demonstrates enhanced glucose uptake and preservation of pancreatic islet integrity without adverse hepatic markers.",
    keywords: [
      "Ayurveda",
      "Polyherbal formulation",
      "Gymnema sylvestre",
      "Momordica charantia",
      "Blood glucose",
      "Piper nigrum",
      "Hydro-ethanolic extraction",
      "Metabolic disorder"
    ],
    ingredients: [
      { name: "Gymnema sylvestre (Meshashringi)", part: "Leaves", proportion: "40% w/w", activePhyto: "Gymnemic acids (>25%)" },
      { name: "Momordica charantia (Karela)", part: "Fresh Fruit pericarp", proportion: "35% w/w", activePhyto: "Charantin (>1.5%)" },
      { name: "Syzygium cumini (Jamun)", part: "Seed extract", proportion: "15% w/w", activePhyto: "Jamboline & Ellagic acid" },
      { name: "Piper nigrum (Maricha)", part: "Dried fruit", proportion: "10% w/w", activePhyto: "Piperine (>95% bio-enhancer)" }
    ],
    method: "Shodhana (purification) of raw botanical materials followed by ultrasonic-assisted hydro-ethanolic extraction (70:30 v/v) at 45°C for 90 minutes. Spray-dried at 140°C inlet temperature to achieve moisture content <4%. Standardized using HPLC-DAD profiling.",
    claims: [
      "1. A synergistic oral polyherbal formulation characterized by a 4:3.5:1.5 weight ratio of standardized extracts of Gymnema sylvestre, Momordica charantia, and Syzygium cumini.",
      "2. The formulation according to claim 1, further comprising 10% w/w piperine derived from Piper nigrum as a pharmacokinetics bio-enhancer.",
      "3. A method for preparing the composition of claim 1 utilizing controlled ultrasonic-assisted extraction at temperatures not exceeding 48°C."
    ],
    tkdlCrossReferences: ["TKDL-AY-V2/1894", "Caraka Samhita, Cikitsasthana 6/24 (Prameha Cikitsa)"],
    priorArtNotes: "Discloses standardized charantin and gymnemic combinations with piperine. Does not include lipid nanocarriers or sustained enteric-coated microgranules."
  },
  {
    id: "DEMO-AYU-2026-002",
    title: "Nano-Curcuminoid Topical Hydrogel Formulation Fortified with Boswellia Serrata for Chronic Osteoarthritis Management",
    applicant: "Dhanwantari Herbal Innovations Pvt Ltd (Demo)",
    inventors: ["Dr. S. N. Vaidya", "K. L. Nambiar"],
    category: "Herbal Medicine",
    subCategory: "Musculoskeletal & Joint Therapeutics",
    status: "Granted",
    filingDate: "2023-08-11",
    publicationDate: "2024-11-04",
    ipcClassification: "A61K 9/06, A61K 36/9066, A61P 19/02",
    similarity: 74,
    abstract: "An advanced topical hydrogel vehicle delivering self-assembled nano-curcuminoids derived from Curcuma longa (Haridra) rhizomes combined with AKBA-enriched Boswellia serrata (Shallaki) gum oleoresin. The delivery matrix utilizes a biodegradable Carbopol-chitosan crosslinked network to ensure transdermal permeation across dermal barriers, achieving sustained synovial anti-inflammatory concentrations with minimal dermal irritation.",
    keywords: [
      "Curcuma longa",
      "Boswellia serrata",
      "Nano-curcumin",
      "Hydrogel",
      "Osteoarthritis",
      "Transdermal delivery",
      "Shallaki"
    ],
    ingredients: [
      { name: "Curcuma longa (Haridra)", part: "Rhizome nanosomes", proportion: "3.5% w/w", activePhyto: "Total Curcuminoids (>95%)" },
      { name: "Boswellia serrata (Shallaki)", part: "Gum oleoresin", proportion: "5.0% w/w", activePhyto: "3-O-acetyl-11-keto-β-boswellic acid (AKBA)" },
      { name: "Gaultheria procumbens (Wintergreen)", part: "Volatile oil", proportion: "2.0% w/w", activePhyto: "Methyl salicylate" },
      { name: "Chitosan / Carbopol base", part: "Polymer carrier", proportion: "q.s. 100%", activePhyto: "Mucoadhesive polymeric scaffold" }
    ],
    method: "Curcumin is encapsulated via high-pressure homogenization into lipid nanospheres (average size 112 nm), blended into neutral Carbopol-940 aqueous gel containing Boswellia extract dissolved in non-ionic solubilizers.",
    claims: [
      "1. A topical nano-emulgel comprising 3-5% w/w colloidal lipid nanoparticles of Curcuma longa rhizome extract and 5% w/w Boswellia serrata oleoresin in a cross-linked chitosan-hydrogel.",
      "2. The hydrogel according to claim 1, wherein the average nanosphere diameter ranges between 90 nm and 140 nm."
    ],
    tkdlCrossReferences: ["TKDL-AY-V4/302", "Sushruta Samhita, Chikitsasthana 4/12 (Sandhivata)"],
    priorArtNotes: "Topical application of Haridra and Shallaki. Novelty lies in colloidal nano-micellar encapsulation."
  },
  {
    id: "DEMO-AYU-2026-003",
    title: "Synergistic Standardized Composition of Withania Somnifera and Bacopa Monnieri for Neuroprotective Cognitive Enhancement and Neurotransmitter Homeostasis",
    applicant: "Himalayan Phytocare Research Foundation (Demo)",
    inventors: ["Prof. Vikramaditya Joshi", "Dr. Priya Nair"],
    category: "Ayurveda",
    subCategory: "Neuropharmacology & Medhya Rasayana",
    status: "Published",
    filingDate: "2024-01-20",
    publicationDate: "2025-06-18",
    ipcClassification: "A61K 36/81, A61K 36/68, A61P 25/28",
    similarity: 68,
    abstract: "A standardized oral Medhya Rasayana composition comprising purified withanolides from Withania somnifera (Ashwagandha) and bacosides A and B from Bacopa monnieri (Brahmi) processed with cow ghee lipidic mediation (Ghrita Murchana). The composition modulates acetylcholinesterase inhibition and reduces oxidative stress in hippocampal tissue, significantly enhancing memory retention latency.",
    keywords: [
      "Withania somnifera",
      "Bacopa monnieri",
      "Ashwagandha",
      "Brahmi",
      "Medhya Rasayana",
      "Cognitive enhancement",
      "Lipid carrier",
      "Neuroprotective"
    ],
    ingredients: [
      { name: "Withania somnifera (Ashwagandha)", part: "Roots", proportion: "50% w/w", activePhyto: "Withaferin A & Withanolide A" },
      { name: "Bacopa monnieri (Brahmi)", part: "Whole herb", proportion: "40% w/w", activePhyto: "Bacosides A & B (>45%)" },
      { name: "Centella asiatica (Mandukaparni)", part: "Leaves", proportion: "10% w/w", activePhyto: "Asiaticoside" }
    ],
    method: "Herbal decoction followed by Sneha Paka (traditional lipidic extraction with clarified butter at 80°C) with subsequent lyophilization into a crystalline water-dispersible lipid powder.",
    claims: [
      "1. A lipid-conjugated bioactive herbal complex comprising Withania somnifera root extract and Bacopa monnieri whole plant extract in a dry powder form with at least 5% w/w total withanolides and 8% w/w total bacosides.",
      "2. The complex of claim 1 wherein the bio-actives are micellized in lipid carriers to enhance blood-brain barrier permeability."
    ],
    tkdlCrossReferences: ["TKDL-AY-V1/412", "Astanga Hrdaya, Uttarasthana 39/42"],
    priorArtNotes: "Combines Ashwagandha and Brahmi; traditional formulations exist; distinction centers around specific Sneha Paka lipid complexing."
  },
  {
    id: "DEMO-AYU-2026-004",
    title: "Ayurvedic Kashayam Decoction Concentrate with Piperine Bio-Enhancer for Bronchial Airway Clearance",
    applicant: "Kottakkal Herbal BioSciences Ltd (Demo)",
    inventors: ["Dr. C. P. Krishnan", "Dr. E. S. Menon"],
    category: "Medical Formulation",
    subCategory: "Pulmonary & Respiratory Therapeutics",
    status: "Application",
    filingDate: "2025-02-14",
    publicationDate: "2025-10-10",
    ipcClassification: "A61K 36/53, A61K 36/61, A61P 11/06",
    similarity: 58,
    abstract: "A spray-dried instantaneous herbal Kashayam (decoction) concentrate comprising Adhatoda vasica (Vasa), Ocimum sanctum (Tulsi), and Zingiber officinale (Shunti), formulated using fluid bed granulator technology. The composition exhibits dual bronchodilator and mucolytic activity through synergistic vasicine alkaloids and gingerols, stabilized without synthetic sulfites.",
    keywords: [
      "Adhatoda vasica",
      "Ocimum sanctum",
      "Kashayam",
      "Respiratory clearance",
      "Vasicine",
      "Bronchial asthma",
      "Bio-enhancer"
    ],
    ingredients: [
      { name: "Adhatoda vasica (Vasa)", part: "Fresh leaves", proportion: "45% w/w", activePhyto: "Vasicine & Vasicinone" },
      { name: "Ocimum sanctum (Tulsi)", part: "Aerial parts", proportion: "30% w/w", activePhyto: "Eugenol & Ursolic acid" },
      { name: "Zingiber officinale (Shunti)", part: "Rhizome", proportion: "15% w/w", activePhyto: "Gingerols & Shogaols" },
      { name: "Glycyrrhiza glabra (Yashtimadhu)", part: "Root extract", proportion: "10% w/w", activePhyto: "Glycyrrhizin" }
    ],
    method: "Controlled boiling in 16 parts demineralized water reduced to 1/4th volume under nitrogen sparging, followed by ultrafiltration and vacuum spray drying.",
    claims: [
      "1. A standardized vacuum-spray dried aqueous extract of Adhatoda vasica, Ocimum sanctum, and Zingiber officinale soluble in hot water within 15 seconds.",
      "2. The extract according to claim 1, displaying a minimum vasicine content of 1.2% by weight."
    ],
    tkdlCrossReferences: ["TKDL-AY-V3/118", "Sahasrayogam, Kashaya Prakarana"],
    priorArtNotes: "Classical Vasadi Kashayam modified into instantaneous reconstitutable granules."
  },
  {
    id: "DEMO-AYU-2026-005",
    title: "Phytopharmaceutical Phospholipid Complex of Phyllanthus Emblica for Dermal Oxidative Protection and Collagen Stabilization",
    applicant: "BioAyur NanoTech Consortium (Demo)",
    inventors: ["Dr. Meera Sen", "Dr. Alok Nath"],
    category: "Herbal Medicine",
    subCategory: "Dermatological Formulations",
    status: "Granted",
    filingDate: "2023-05-19",
    publicationDate: "2024-04-12",
    ipcClassification: "A61K 8/97, A61Q 19/08, A61K 36/47",
    similarity: 52,
    abstract: "A phytosome complex formed by reacting standardized tannins of Phyllanthus emblica (Amalaki) with soy phosphatidylcholine in an aprotic solvent. The resultant phytophospholipid complex demonstrates a 6-fold increase in dermal bioavailability and photostability compared to raw amla juice extracts.",
    keywords: [
      "Phyllanthus emblica",
      "Amalaki",
      "Phytosome",
      "Phospholipid complex",
      "Antioxidant",
      "Collagen",
      "Dermal protection"
    ],
    ingredients: [
      { name: "Phyllanthus emblica (Amalaki)", part: "Fruit pericarp", proportion: "50% w/w", activePhyto: "Emblicanin A & B, Punigluconin" },
      { name: "Hydrogenated Soy Phosphatidylcholine", part: "Synthetic-free lipid", proportion: "50% w/w", activePhyto: "PC >70%" }
    ],
    method: "Complexation at 1:1 molar ratio in dichloromethane-free ethanol at 40°C followed by solvent evaporation under reduced vacuum.",
    claims: [
      "1. A stoichiometric 1:1 to 1:2 complex of Phyllanthus emblica hydrolyzable tannins and soy phospholipid.",
      "2. A topical emulsion comprising 1.5% to 5.0% by weight of the complex of claim 1."
    ],
    tkdlCrossReferences: ["TKDL-AY-V5/892", "Caraka Samhita, Chikitsasthana 1/1 (Rasayana)"],
    priorArtNotes: "Amla extract is well known; novelty claimed in stoichiometric phytosome formulation."
  },
  {
    id: "DEMO-AYU-2026-006",
    title: "Standardized Solid Dispersion of Zingiber Officinale and Boswellia Serrata for Inflammatory Bowel Management",
    applicant: "Central Institute of Phytomedicine (Demo)",
    inventors: ["Dr. Tarun K. Bose", "Dr. Hema Sundaram"],
    category: "Ayurveda",
    subCategory: "Gastroenterology & Grahani Roga",
    status: "Published",
    filingDate: "2024-09-02",
    publicationDate: "2025-07-15",
    ipcClassification: "A61K 36/9068, A61P 1/00",
    similarity: 64,
    abstract: "A gastro-retentive solid dispersion matrix containing standardized gingerols from Zingiber officinale (Shunti) and 11-keto-boswellic acids from Boswellia serrata (Sallaki). The dispersion is prepared using hot-melt extrusion with hydroxypropyl methylcellulose (HPMC-AS), targeting sustained colonic release for inflammatory bowel and Grahani symptoms.",
    keywords: [
      "Zingiber officinale",
      "Boswellia serrata",
      "Solid dispersion",
      "Inflammatory bowel",
      "Colonic release",
      "Grahani"
    ],
    ingredients: [
      { name: "Zingiber officinale (Shunti)", part: "Dry rhizome extract", proportion: "30% w/w", activePhyto: "6-Gingerol & 6-Shogaol" },
      { name: "Boswellia serrata", part: "Oleoresin", proportion: "40% w/w", activePhyto: "AKBA & β-Boswellic acids" },
      { name: "HPMC Acetate Succinate", part: "Polymer carrier", proportion: "30% w/w", activePhyto: "Enteric polymer" }
    ],
    method: "Twin-screw hot melt extrusion at 135°C with a residence time under 2 minutes, followed by cryomilling into microgranules.",
    claims: [
      "1. A solid dispersion comprising amorphous Zingiber officinale extract and Boswellia serrata extract dispersed in an enteric polymer matrix.",
      "2. The solid dispersion of claim 1 exhibiting less than 10% release at pH 1.2 and greater than 80% release at pH 6.8."
    ],
    tkdlCrossReferences: ["TKDL-AY-V2/341", "Bhavaprakasha Nighantu, Haritakyadi Varga"],
    priorArtNotes: "Combines Shunti and Sallaki; novelty is the hot melt extrusion enteric matrix."
  },
  {
    id: "DEMO-AYU-2026-007",
    title: "Controlled-Fermentation Asava-Arishta Bioprocess with Standardized Alcohol Limit and High Flavonoid Retention",
    applicant: "National Ayurvedic Fermentation Research Consortium (Demo)",
    inventors: ["Dr. G. S. Murthy", "Dr. Vandana Rao"],
    category: "Ayurveda",
    subCategory: "Sandhana Kalpana (Biomedical Fermentation)",
    status: "Granted",
    filingDate: "2023-10-30",
    publicationDate: "2024-08-14",
    ipcClassification: "A61K 36/00, C12G 3/02",
    similarity: 48,
    abstract: "An automated bioreactor method for preparing Sandhana Kalpana (Ayurvedic biomedical ferments) utilizing inoculated Woodfordia fruticosa (Dhataki) immobilized flower blossoms and selected Saccharomyces cerevisiae strains. The process maintains strictly regulated natural self-generated alcohol levels (<9.5% v/v) while maximizing secondary metabolite and glycosidic polyphenol bio-conversion.",
    keywords: [
      "Sandhana Kalpana",
      "Asava",
      "Arishta",
      "Woodfordia fruticosa",
      "Dhataki",
      "Bioreactor fermentation",
      "Secondary metabolites"
    ],
    ingredients: [
      { name: "Woodfordia fruticosa (Dhataki)", part: "Immobilized flowers", proportion: "10% w/v", activePhyto: "Natural yeast inoculum" },
      { name: "Jaggery (Guda) / Honey", part: "Fermentation substrate", proportion: "30% w/v", activePhyto: "Sucrose & Invert sugars" },
      { name: "Herbal Kwatha core mixture", part: "Botanical blend", proportion: "60% v/v", activePhyto: "Flavonoid glycosides" }
    ],
    method: "Controlled closed-vessel anaerobic fermentation at 28°C with online dissolved oxygen and CO2 sensor monitoring, stopping fermentation automatically upon reaching 8.5% ethanol concentration.",
    claims: [
      "1. A closed-loop automated bioprocess for producing Ayurvedic biomedical fermented broths using immobilized Woodfordia fruticosa blossoms.",
      "2. The process of claim 1 characterized by ethanol production limited to between 6.0% and 9.5% v/v without chemical termination agents."
    ],
    tkdlCrossReferences: ["TKDL-AY-V1/901", "Sarangadhara Samhita, Madhyama Khanda 10"],
    priorArtNotes: "Modernizes classical wooden vessel fermentation into controlled sterile bioreactor processing."
  },
  {
    id: "DEMO-AYU-2026-008",
    title: "Targeted Phytopharmaceutical Formulation of Tinospora Cordifolia and Picrorhiza Kurroa for Hepatic Enzyme Normalization",
    applicant: "Vedic LifeSciences Institute (Demo)",
    inventors: ["Dr. Anupama Sethi", "Dr. B. R. Patil"],
    category: "Medical Formulation",
    subCategory: "Hepatology & Yakrit Roga",
    status: "Published",
    filingDate: "2024-06-12",
    publicationDate: "2025-04-05",
    ipcClassification: "A61K 36/59, A61K 36/68, A61P 1/16",
    similarity: 71,
    abstract: "A liver-targeted pharmaceutical composition comprising standardized aqueous-alcoholic extracts of Tinospora cordifolia (Guduchi) stems and Picrorhiza kurroa (Kutki) rhizomes in a 2:1 weight ratio. In vivo studies reveal significant suppression of elevated serum AST, ALT, and alkaline phosphatase in chemically induced hepatotoxicity models.",
    keywords: [
      "Tinospora cordifolia",
      "Picrorhiza kurroa",
      "Guduchi",
      "Kutki",
      "Hepatoprotective",
      "Liver enzymes",
      "Yakrit"
    ],
    ingredients: [
      { name: "Tinospora cordifolia (Guduchi)", part: "Mature stems", proportion: "60% w/w", activePhyto: "Cordifolioside A & Tinocordiside" },
      { name: "Picrorhiza kurroa (Kutki)", part: "Rhizomes", proportion: "30% w/w", activePhyto: "Picroside I & Picroside II (>8%)" },
      { name: "Boerhavia diffusa (Punarnava)", part: "Roots", proportion: "10% w/w", activePhyto: "Punarnavine" }
    ],
    method: "Supercritical fluid CO2 extraction at 250 bar pressure and 40°C temperature with 5% ethanol co-solvent.",
    claims: [
      "1. A synergistic composition comprising 50-65% w/w Tinospora cordifolia extract and 25-35% w/w Picrorhiza kurroa extract with total picrosides not less than 4% w/w.",
      "2. The composition of claim 1 formulated as sustained release hydrophilic matrix tablets."
    ],
    tkdlCrossReferences: ["TKDL-AY-V3/651", "Caraka Samhita, Chikitsasthana 16 (Pandu-Kamala)"],
    priorArtNotes: "Guduchi and Kutki are classical hepatic tonics. Supercritical CO2 fraction profile is novel."
  },
  {
    id: "DEMO-AYU-2026-009",
    title: "Herbal Antimicrobial Rinse Formulation Containing Azadirachta Indica and Ocimum Sanctum for Periodontal Pathogen Control",
    applicant: "AyurDent Research Labs (Demo)",
    inventors: ["Dr. Preeti Saxena", "Dr. N. Chandran"],
    category: "Herbal Medicine",
    subCategory: "Oral Healthcare & Danta Roga",
    status: "Application",
    filingDate: "2025-04-18",
    publicationDate: "2025-11-22",
    ipcClassification: "A61K 8/97, A61Q 11/00",
    similarity: 42,
    abstract: "An alcohol-free oral antimicrobial formulation comprising cold-pressed Azadirachta indica (Neem) bark extract and essential oil of Ocimum sanctum (Tulsi) solubilized with natural saponins from Sapindus mukorossi (Reetha). Exhibits potent bactericidal minimum inhibitory concentration (MIC) against Streptococcus mutans and Porphyromonas gingivalis without tooth enamel staining.",
    keywords: [
      "Azadirachta indica",
      "Ocimum sanctum",
      "Neem",
      "Tulsi",
      "Antimicrobial rinse",
      "Periodontal health",
      "Danta Roga"
    ],
    ingredients: [
      { name: "Azadirachta indica (Neem)", part: "Bark extract", proportion: "2.5% w/v", activePhyto: "Azadirachtin & Nimbin" },
      { name: "Ocimum sanctum (Tulsi)", part: "Steam distilled oil", proportion: "0.8% w/v", activePhyto: "Eugenol (>60%)" },
      { name: "Sapindus mukorossi (Reetha)", part: "Pericarp decoction", proportion: "3.0% w/v", activePhyto: "Natural saponins" },
      { name: "Purified Water & Menthol", part: "Vehicle", proportion: "q.s. 100%", activePhyto: "Aroma & cooling agent" }
    ],
    method: "Aqueous reflux extraction of bark followed by cold blending with essential oil nano-emulsion stabilized by bio-saponins.",
    claims: [
      "1. An aqueous alcohol-free oral mouthwash comprising 2-4% Azadirachta indica bark extract and 0.5-1.0% Ocimum sanctum oil stabilized with Sapindus mukorossi saponin.",
      "2. The oral mouthwash of claim 1 having a pH between 6.2 and 6.8 and stable for at least 24 months."
    ],
    tkdlCrossReferences: ["TKDL-AY-V2/098", "Sushruta Samhita, Mukharoga Nidana"],
    priorArtNotes: "Common dental herbs; distinction in alcohol-free natural saponin stabilization."
  },
  {
    id: "DEMO-AYU-2026-010",
    title: "Phyto-Conjugate Formulation Comprising Withania Somnifera and Tribulus Terrestris for Muscular Endurance and Adaptogenic Recovery",
    applicant: "Vaidya Sports PhytoMed Labs (Demo)",
    inventors: ["Dr. D. V. Raman", "Dr. Shalini Kapoor"],
    category: "Ayurveda",
    subCategory: "Sports Nutrition & Balya Rasayana",
    status: "Published",
    filingDate: "2024-05-10",
    publicationDate: "2025-03-01",
    ipcClassification: "A61K 36/81, A61K 36/185, A23L 33/105",
    similarity: 61,
    abstract: "A standardized adaptogenic botanical formulation combining Withania somnifera (Ashwagandha) root extract with Tribulus terrestris (Gokshura) fruit saponins, microencapsulated with prebiotic inulin to ensure gastrointestinal stability and delayed release. Promotes endogenous energy metabolism and accelerates post-exertional muscular recovery in athletic trials.",
    keywords: [
      "Withania somnifera",
      "Tribulus terrestris",
      "Ashwagandha",
      "Gokshura",
      "Balya Rasayana",
      "Adaptogen",
      "Microencapsulation"
    ],
    ingredients: [
      { name: "Withania somnifera (Ashwagandha)", part: "Roots", proportion: "55% w/w", activePhyto: "Withanolides (>5%)" },
      { name: "Tribulus terrestris (Gokshura)", part: "Spiny fruit", proportion: "35% w/w", activePhyto: "Protodioscin (>20%)" },
      { name: "Inulin carrier", part: "Chicory root", proportion: "10% w/w", activePhyto: "Prebiotic oligosaccharide" }
    ],
    method: "Fluidized bed spray coating of core botanical extracts with inulin solution under nitrogen blanket at 50°C.",
    claims: [
      "1. A microencapsulated solid dosage form comprising standardized Withania somnifera and Tribulus terrestris extracts in an inulin polymer coating.",
      "2. The solid dosage form of claim 1 wherein withanolides and protodioscin remain stable against gastric degradation at pH 1.5."
    ],
    tkdlCrossReferences: ["TKDL-AY-V4/115", "Caraka Samhita, Sutrasthana 4/7 (Balya Mahakasaya)"],
    priorArtNotes: "Ashwagandha and Gokshura combinations; novelty is in microencapsulation for athletic recovery."
  }
];

export const DEMO_SAMPLE_INVENTION = {
  title: "Polyherbal Glycemic Regulator Formulation Comprising Gymnema Sylvestre, Momordica Charantia, and Cinnamomum Verum Micro-Pellets",
  field: "Ayurvedic Phytopharmaceuticals & Metabolic Health",
  problem: "Conventional management of fluctuating post-prandial blood glucose levels in pre-diabetic and type-2 diabetic individuals often faces challenges of gastrointestinal intolerance, rapid degradation of active phyto-compounds in gastric acidity, and poor patient compliance due to bitter taste.",
  solution: "A novel oral multi-particulate polyherbal formulation combining hydro-alcoholic extracts of Gymnema sylvestre (Meshashringi), Momordica charantia (Karela), and aqueous Cinnamomum verum (Tvak) barks, formulated as enteric-coated sustained-release micro-pellets. This bypasses gastric destruction, improves bioavailability of gymnemic acids, and delivers active polyphenols directly to the duodenal absorption site.",
  ingredients: "Gymnema sylvestre (Meshashringi leaf extract, 40%), Momordica charantia (Karela fruit extract, 30%), Cinnamomum verum (Tvak bark extract, 20%), Piper longum (Pippali, 10% as bio-enhancer), microcrystalline cellulose base.",
  method: "Extrusion-spheronization to generate uniform micro-pellets (diameter 0.8–1.2 mm), followed by fluid bed coating with a pH-dependent enteric copolymer (Eudragit L30D-55 equivalent natural shellac/pectin composite).",
  uniqueFeatures: "1. Novel inclusion of Cinnamomum verum with standardized cinnamaldehyde.\n2. Enteric coating preventing early gastric release and masking intense bitterness.\n3. Synergistic pancreatic beta-cell stimulation and insulin receptor sensitization.",
  expectedBenefits: "Sustained 12-hour glycemic regulation, reduced HbA1c fluctuations, zero bitter aftertaste, improved patient compliance, and protection from diabetic microvascular stress."
};
