import { useState } from "react";
import "./Awareness.css";

/* Static awareness content organized into tabs */
const SECTIONS = [
  {
    id: "importance",
    title: "Importance of Clean Water",
    icon: "💧",
    content: [
      {
        heading: "Why Clean Water Matters",
        text: "Clean water is essential for human survival. It is vital for drinking, cooking, sanitation, and agriculture. Access to safe water directly impacts public health, economic development, and overall quality of life.",
      },
      {
        heading: "Health Impact",
        text: "Clean water prevents waterborne diseases such as cholera, typhoid, and dysentery. According to the WHO, contaminated water causes over 500,000 diarrheal deaths annually. Safe drinking water can reduce childhood mortality by up to 21%.",
      },
      {
        heading: "Economic Benefits",
        text: "Communities with access to clean water experience better economic outcomes. Reduced healthcare costs, higher productivity, and improved school attendance are direct benefits of clean water access.",
      },
      {
        heading: "Environmental Role",
        text: "Clean water ecosystems support biodiversity and are critical for maintaining the balance of natural habitats. Protecting water sources protects entire ecological systems.",
      },
    ],
  },
  {
    id: "pollution",
    title: "Water Pollution Causes",
    icon: "🏭",
    content: [
      {
        heading: "Industrial Discharge",
        text: "Factories release heavy metals, chemicals, and toxic waste into water bodies. Mercury, lead, and cadmium contamination from industries can cause severe neurological and organ damage in humans.",
      },
      {
        heading: "Agricultural Runoff",
        text: "Pesticides, fertilizers, and animal waste from farmlands flow into rivers and groundwater. Excess nitrogen and phosphorus cause algal blooms that deplete oxygen and kill aquatic life.",
      },
      {
        heading: "Sewage and Wastewater",
        text: "Untreated or inadequately treated sewage is a major source of water contamination. It introduces pathogens, pharmaceuticals, and excess nutrients into water supplies.",
      },
      {
        heading: "Plastic Pollution",
        text: "Over 8 million tons of plastic enter oceans annually. Microplastics have been found in drinking water worldwide, posing risks that scientists are still working to fully understand.",
      },
      {
        heading: "Oil Spills",
        text: "Oil spills devastate marine ecosystems and contaminate coastal water supplies. Even small leaks from pipelines and storage tanks can pollute groundwater for decades.",
      },
    ],
  },
  {
    id: "diseases",
    title: "Diseases from Unsafe Water",
    icon: "🦠",
    content: [
      {
        heading: "Cholera",
        text: "A severe diarrheal disease caused by Vibrio cholerae bacteria. Spread through contaminated water, it can kill within hours if untreated. Proper sanitation and clean water access are the best prevention.",
      },
      {
        heading: "Typhoid Fever",
        text: "Caused by Salmonella typhi, typhoid spreads through contaminated water and food. Symptoms include high fever, weakness, and stomach pain. It affects approximately 11-20 million people annually.",
      },
      {
        heading: "Dysentery",
        text: "An intestinal infection causing severe diarrhea with blood. Both bacterial (Shigella) and amoebic types spread through contaminated water. Most common in areas with poor sanitation.",
      },
      {
        heading: "Hepatitis A",
        text: "A viral liver infection spread through contaminated water and food. Causes fatigue, nausea, and jaundice. Vaccination and clean water are effective prevention measures.",
      },
      {
        heading: "Lead Poisoning",
        text: "Caused by lead leaching from old pipes into drinking water. Particularly dangerous for children, causing developmental delays and neurological damage. No safe level of lead exposure exists.",
      },
      {
        heading: "Fluorosis",
        text: "Excessive fluoride in drinking water causes dental and skeletal fluorosis. Affects millions in regions with naturally high fluoride levels in groundwater.",
      },
    ],
  },
  {
    id: "prevention",
    title: "Prevention Tips",
    icon: "🛡️",
    content: [
      {
        heading: "Boil Your Water",
        text: "Boiling water for at least 1 minute (3 minutes at high altitude) kills most pathogens. This is the simplest and most reliable method for making water safe when other treatment is unavailable.",
      },
      {
        heading: "Use Water Filters",
        text: "Activated carbon filters remove chlorine and organic compounds. Ceramic filters block bacteria. For comprehensive purification, use multi-stage filtration systems or RO purifiers for high TDS water.",
      },
      {
        heading: "Regular Testing",
        text: "Test your water at least twice a year for pH, TDS, turbidity, and bacterial contamination. Use home testing kits or send samples to certified laboratories for thorough analysis.",
      },
      {
        heading: "Protect Water Sources",
        text: "Keep potential pollutants away from wells, springs, and water tanks. Ensure septic systems are properly maintained. Never dump chemicals, oils, or waste near water sources.",
      },
      {
        heading: "Proper Storage",
        text: "Store water in clean, food-grade containers with tight lids. Keep containers in cool, dark places. Clean storage tanks regularly and replace filters according to manufacturer guidelines.",
      },
      {
        heading: "Community Action",
        text: "Advocate for water quality monitoring in your community. Support water treatment infrastructure. Report pollution to local authorities. Educate others about the importance of clean water.",
      },
    ],
  },
];

export default function Awareness() {
  const [activeTab, setActiveTab] = useState("importance");
  const activeSection = SECTIONS.find((s) => s.id === activeTab);

  return (
    <div className="awareness">
      <div className="awareness-header">
        <h1>Water Quality Awareness</h1>
        <p>
          Learn about water quality, pollution, waterborne diseases, and how to
          protect yourself and your community.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="tab-nav">
        {SECTIONS.map((s) => (
          <button
            key={s.id}
            className={`tab-btn ${activeTab === s.id ? "active" : ""}`}
            onClick={() => setActiveTab(s.id)}
          >
            <span className="tab-icon">{s.icon}</span>
            <span className="tab-label">{s.title}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeSection && (
        <div className="tab-content" key={activeSection.id}>
          <h2>
            {activeSection.icon} {activeSection.title}
          </h2>
          <div className="content-grid">
            {activeSection.content.map((item, i) => (
              <div className="content-card" key={i}>
                <h3>{item.heading}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
