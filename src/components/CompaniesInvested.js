"use client";
import Image from "next/image";

const partners = [
  {
    name: "TATA Group",
    subtitle: "Anchor Semiconductor Fab & Power",
    logoType: "downloaded",
    logoPath: "/assets/logos/tata.svg"
  },
  {
    name: "Torrent Power",
    subtitle: "Smart Power Distribution Grid",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "32px", width: "100%" }}>
        <g fill="var(--text-primary)">
          <rect x="0" y="5" width="30" height="30" rx="4" fill="#E58F12" />
          <circle cx="8" cy="13" r="3" fill="#ffffff" />
          <circle cx="22" cy="13" r="3" fill="#ffffff" />
          <circle cx="8" cy="27" r="3" fill="#ffffff" />
          <circle cx="22" cy="27" r="3" fill="#ffffff" />
          <circle cx="15" cy="20" r="4" fill="#ffffff" />
          <text x="38" y="24" fontFamily="var(--font-headings)" fontSize="14" fontWeight="bold" fill="currentColor">torrent</text>
          <text x="38" y="34" fontFamily="var(--font-body)" fontSize="9" letterSpacing="0.1em" fill="var(--text-muted)">POWER</text>
        </g>
      </svg>
    )
  },
  {
    name: "ReNew Power",
    subtitle: "Utility-Scale Solar Generation",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "32px", width: "100%" }}>
        <g fill="currentColor">
          <path d="M10,8 C18,8 24,14 24,22 C24,30 18,32 10,32 C2,32 0,26 0,20 C0,12 5,8 10,8 Z" fill="#10B981" />
          <path d="M10,12 C14,12 18,16 18,20 C18,24 14,26 10,26 C6,26 6,22 6,20 C6,16 8,12 10,12 Z" fill="#ffffff" />
          <text x="32" y="24" fontFamily="var(--font-headings)" fontSize="16" fontWeight="700" fill="#10B981">ReNew</text>
          <text x="32" y="34" fontFamily="var(--font-body)" fontSize="9" letterSpacing="0.15em" fill="var(--text-muted)">POWER</text>
        </g>
      </svg>
    )
  },
  {
    name: "HPCL",
    subtitle: "Oil & Gas Conduit Network",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "35px", width: "100%" }}>
        <g>
          <circle cx="18" cy="20" r="15" fill="#005A9C" />
          <path d="M12,12 L12,28 M24,12 L24,28 M12,20 L24,20" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" />
          <text x="40" y="24" fontFamily="var(--font-headings)" fontSize="16" fontWeight="bold" fill="#005A9C">HPCL</text>
          <text x="40" y="34" fontFamily="var(--font-body)" fontSize="9" letterSpacing="0.05em" fill="var(--text-muted)">HINDUSTAN PETROLEUM</text>
        </g>
      </svg>
    )
  },
  {
    name: "Polycab India",
    subtitle: "Electrical & Cabling Manufacture",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "32px", width: "100%" }}>
        <g fill="currentColor">
          <path d="M5,30 L20,5 L35,30 Z" fill="#DC2626" />
          <path d="M12,25 L20,10 L28,25 Z" fill="#ffffff" />
          <text x="42" y="25" fontFamily="var(--font-headings)" fontSize="15" fontWeight="800" fill="#111111">POLYCAB</text>
          <text x="42" y="35" fontFamily="var(--font-body)" fontSize="8" letterSpacing="0.08em" fill="var(--text-muted)">CONNECTION ZONES</text>
        </g>
      </svg>
    )
  },
  {
    name: "Linde India",
    subtitle: "Industrial Gas Infrastructure",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "32px", width: "100%" }}>
        <g fill="currentColor">
          <rect x="0" y="5" width="25" height="30" rx="3" fill="#00A3E0" />
          <path d="M8,12 L8,28 L20,28" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="35" y="25" fontFamily="var(--font-headings)" fontSize="16" fontWeight="700" fill="#00A3E0">Linde</text>
          <text x="35" y="34" fontFamily="var(--font-body)" fontSize="8" letterSpacing="0.1em" fill="var(--text-muted)">INDIA</text>
        </g>
      </svg>
    )
  },
  {
    name: "Avaada Energy",
    subtitle: "Clean Energy Solutions",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "32px", width: "100%" }}>
        <g fill="currentColor">
          <circle cx="15" cy="20" r="12" fill="none" stroke="#E58F12" strokeWidth="4" />
          <path d="M15,8 L20,15 L10,15 Z" fill="#E58F12" />
          <text x="36" y="25" fontFamily="var(--font-headings)" fontSize="16" fontWeight="800" fill="#111111">AVAADA</text>
          <text x="36" y="34" fontFamily="var(--font-body)" fontSize="8" letterSpacing="0.1em" fill="var(--text-muted)">ENERGY SOLUTIONS</text>
        </g>
      </svg>
    )
  },
  {
    name: "Inox Air Products",
    subtitle: "Specialty Gas Production",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "32px", width: "100%" }}>
        <g fill="currentColor">
          <text x="0" y="24" fontFamily="var(--font-headings)" fontSize="18" fontWeight="900" fill="#005A9C">INOX</text>
          <text x="0" y="34" fontFamily="var(--font-body)" fontSize="9" letterSpacing="0.05em" fill="var(--text-muted)">AIR PRODUCTS</text>
          <circle cx="55" cy="16" r="3" fill="#E58F12" />
          <circle cx="63" cy="12" r="2" fill="#005A9C" />
        </g>
      </svg>
    )
  },
  {
    name: "Vedanta Resources",
    subtitle: "Heavy Metal & Semi-Fab Zone",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "35px", width: "100%" }}>
        <g>
          <circle cx="16" cy="20" r="12" fill="#059669" />
          <path d="M12,16 L16,24 L20,16" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
          <text x="36" y="24" fontFamily="var(--font-headings)" fontSize="15" fontWeight="700" fill="#059669">vedanta</text>
          <text x="36" y="34" fontFamily="var(--font-body)" fontSize="8" letterSpacing="0.05em" fill="var(--text-muted)">RESOURCES</text>
        </g>
      </svg>
    )
  },
  {
    name: "Grew Energy",
    subtitle: "Solar Panel Component Fab",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "32px", width: "100%" }}>
        <g>
          <circle cx="15" cy="20" r="12" fill="none" stroke="#E58F12" strokeWidth="4" />
          <path d="M15,20 L24,20" stroke="#10B981" strokeWidth="4" strokeLinecap="round" />
          <text x="36" y="24" fontFamily="var(--font-headings)" fontSize="15" fontWeight="700" fill="#111111">Grew Energy</text>
          <text x="36" y="34" fontFamily="var(--font-body)" fontSize="8" fill="var(--text-muted)">SOLAR POWER</text>
        </g>
      </svg>
    )
  },
  {
    name: "Chiripal Group",
    subtitle: "Textiles & Materials Manufacture",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "32px", width: "100%" }}>
        <g>
          <circle cx="15" cy="20" r="12" fill="none" stroke="#E58F12" strokeWidth="2" strokeDasharray="4 2" />
          <circle cx="15" cy="20" r="6" fill="#E58F12" />
          <text x="36" y="24" fontFamily="var(--font-headings)" fontSize="15" fontWeight="700" fill="#111111">Chiripal</text>
          <text x="36" y="34" fontFamily="var(--font-body)" fontSize="8" letterSpacing="0.05em" fill="var(--text-muted)">INDUSTRIES</text>
        </g>
      </svg>
    )
  },
  {
    name: "Ghripal Industries",
    subtitle: "Core Material Processing",
    logoType: "svg",
    renderSvg: () => (
      <svg viewBox="0 0 120 40" style={{ height: "32px", width: "100%" }}>
        <g>
          <rect x="5" y="15" width="20" height="18" rx="2" fill="#DC2626" />
          <path d="M3,16 L15,5 L27,16" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" fill="none" />
          <text x="36" y="24" fontFamily="var(--font-headings)" fontSize="15" fontWeight="700" fill="#111111">Ghripal</text>
          <text x="36" y="34" fontFamily="var(--font-body)" fontSize="8" letterSpacing="0.05em" fill="var(--text-muted)">INDUSTRIES LTD</text>
        </g>
      </svg>
    )
  }
];

export default function CompaniesInvested() {
  return (
    <section id="companies-invested" className="section-padding" style={{ backgroundColor: "transparent" }}>
      <div className="container">
        <div style={{ marginBottom: "64px", maxWidth: "800px" }}>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-orange)", fontWeight: "600", display: "block", marginBottom: "12px" }}>
            Institutional Capital
          </span>
          <h2 style={{ marginBottom: "20px" }}>Companies Invested in Dholera SIR</h2>
          <p>
            Dholera's strategic infrastructure has attracted some of the most significant industrial, manufacturing, and energy corporations in India and globally.
          </p>
        </div>

        <div className="grid-12" style={{ gap: "24px" }}>
          {partners.map((partner, index) => (
            <div key={index} className="col-3 col-6-tablet col-12-mobile">
              <div 
                className="feature-card" 
                style={{ 
                  display: "flex", 
                  flexDirection: "column", 
                  justifyContent: "space-between", 
                  alignItems: "center", 
                  padding: "32px 24px",
                  height: "170px",
                  textAlign: "center",
                  backgroundColor: "var(--bg-surface)",
                  borderRadius: "16px",
                  border: "1px solid var(--border-color)"
                }}
              >
                {/* Logo wrapper */}
                <div style={{ height: "45px", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", marginBottom: "12px" }}>
                  {partner.logoType === "downloaded" ? (
                    <div style={{ position: "relative", width: "100px", height: "40px" }}>
                      <Image 
                        src={partner.logoPath} 
                        alt={partner.name} 
                        fill 
                        style={{ objectFit: "contain" }} 
                      />
                    </div>
                  ) : (
                    partner.renderSvg()
                  )}
                </div>

                {/* Subtitles */}
                <div>
                  <h4 style={{ fontSize: "1.1rem", fontWeight: "600", color: "var(--text-primary)", marginBottom: "4px" }}>
                    {partner.name}
                  </h4>
                  <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)", display: "block", lineHeight: "1.3" }}>
                    {partner.subtitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
