"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const projectImages = [
  { src: "/assets/gallary/projects-1.png", title: "Zoning & Utility Layout" },
  { src: "/assets/gallary/projects-2.png", title: "Smart Road Grading" },
  { src: "/assets/gallary/projects-3.png", title: "High-Voltage Distribution Lines" },
  { src: "/assets/gallary/projects-4.png", title: "Underground Conduit Duct Placement" },
  { src: "/assets/gallary/projects-5.png", title: "Plot Marker Demarcation" },
  { src: "/assets/gallary/projects-6.png", title: "Avenue Tree & Green Belt Layout" },
  { src: "/assets/gallary/projects-7.png", title: "Substation Infrastructure" },
  { src: "/assets/gallary/projects-8.png", title: "Greenfield Residential Sector Entry" }
];

const newsImages = [
  { src: "/assets/gallary/news-1.png", title: "Dholera SIR: India's Pioneer Smart City" },
  { src: "/assets/gallary/news-2.png", title: "Tata Electronics Semi-Fab Anchor Coverage" },
  { src: "/assets/gallary/news-3.png", title: "High-Speed Expressway Infrastructure Milestones" },
  { src: "/assets/gallary/news-4.png", title: "Industrial Boom in the Gulf of Khambhat" }
];

export default function GallerySection() {
  const projectScrollRef = useRef(null);
  const newsScrollRef = useRef(null);

  const [projectProgress, setProjectProgress] = useState(0);
  const [newsProgress, setNewsProgress] = useState(0);

  const handleScroll = (ref, setProgress) => {
    const el = ref.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    if (maxScroll <= 0) return;
    const percentage = (el.scrollLeft / maxScroll) * 100;
    setProgress(percentage);
  };

  const scroll = (ref, direction) => {
    const el = ref.current;
    if (!el) return;
    const scrollAmount = direction === "left" ? -400 : 400;
    el.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="gallery" className="section-padding" style={{ backgroundColor: "transparent", position: "relative" }}>
      <div className="container">
        
        {/* Editorial Header */}
        <div style={{ marginBottom: "64px", maxWidth: "800px" }}>
          <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", color: "var(--accent-orange)", fontWeight: "600", display: "block", marginBottom: "12px" }}>
            Visual Telemetry
          </span>
          <h2 style={{ marginBottom: "20px" }}>Development Gallery & Media Highlights</h2>
          <p>
            Review the real-time development phase milestones at our active sites and inspect national media features charting the Dholera SIR project growth.
          </p>
        </div>

        {/* ========================================================
            TRACK 1: PROJECT SITE PROGRESS
            ======================================================== */}
        <div style={{ marginBottom: "80px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Project Site Progress</h3>
            
            {/* Scroll Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button 
                onClick={() => scroll(projectScrollRef, "left")}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  transition: "var(--transition-fast)"
                }}
                aria-label="Scroll left projects"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll(projectScrollRef, "right")}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  transition: "var(--transition-fast)"
                }}
                aria-label="Scroll right projects"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Scrolling Flex Row */}
          <div 
            ref={projectScrollRef}
            onScroll={() => handleScroll(projectScrollRef, setProjectProgress)}
            className="gallery-scroll-container"
            style={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: "20px",
              scrollBehavior: "smooth"
            }}
          >
            {projectImages.map((img, idx) => (
              <div 
                key={idx}
                className="gallery-card"
                style={{
                  flex: "0 0 320px",
                  scrollSnapAlign: "start",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {/* Image container */}
                <div style={{ position: "relative", height: "200px", width: "100%", overflow: "hidden" }}>
                  <Image 
                    src={img.src} 
                    alt={img.title} 
                    fill 
                    sizes="320px"
                    style={{ objectFit: "cover" }} 
                  />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%)" }} />
                </div>
                {/* Description details */}
                <div style={{ padding: "20px" }}>
                  <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "var(--accent-orange)", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                    PHASE MILESTONE {idx + 1}
                  </span>
                  <h4 style={{ fontSize: "1rem", fontWeight: "600", color: "var(--text-primary)" }}>{img.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll progress bar */}
          <div style={{ height: "3px", width: "100%", backgroundColor: "var(--border-color)", borderRadius: "2px", position: "relative", marginTop: "12px" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${projectProgress}%`, backgroundColor: "var(--accent-orange)", borderRadius: "2px", transition: "width 0.1s ease" }} />
          </div>
        </div>

        {/* ========================================================
            TRACK 2: PRESS & MEDIA HIGHLIGHTS
            ======================================================== */}
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "600" }}>Press Highlights & Media Features</h3>
            
            {/* Scroll Buttons */}
            <div style={{ display: "flex", gap: "8px" }}>
              <button 
                onClick={() => scroll(newsScrollRef, "left")}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  transition: "var(--transition-fast)"
                }}
                aria-label="Scroll left news"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={() => scroll(newsScrollRef, "right")}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "var(--text-primary)",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.02)",
                  transition: "var(--transition-fast)"
                }}
                aria-label="Scroll right news"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>

          {/* Scrolling Flex Row */}
          <div 
            ref={newsScrollRef}
            onScroll={() => handleScroll(newsScrollRef, setNewsProgress)}
            className="gallery-scroll-container"
            style={{
              display: "flex",
              gap: "24px",
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              paddingBottom: "20px",
              scrollBehavior: "smooth"
            }}
          >
            {newsImages.map((img, idx) => (
              <div 
                key={idx}
                className="gallery-card"
                style={{
                  flex: "0 0 380px",
                  scrollSnapAlign: "start",
                  borderRadius: "16px",
                  overflow: "hidden",
                  backgroundColor: "var(--bg-surface)",
                  border: "1px solid var(--border-color)",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.02)",
                  transition: "all 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                }}
              >
                {/* Image container */}
                <div style={{ position: "relative", height: "230px", width: "100%", overflow: "hidden" }}>
                  <Image 
                    src={img.src} 
                    alt={img.title} 
                    fill 
                    sizes="380px"
                    style={{ objectFit: "cover" }} 
                  />
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "linear-gradient(to top, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 50%)" }} />
                </div>
                {/* Description details */}
                <div style={{ padding: "20px" }}>
                  <span style={{ fontSize: "0.7rem", fontFamily: "monospace", color: "var(--accent-orange)", fontWeight: "600", display: "block", marginBottom: "6px" }}>
                    NATIONAL MEDIA RELEASE
                  </span>
                  <h4 style={{ fontSize: "1.05rem", fontWeight: "600", color: "var(--text-primary)" }}>{img.title}</h4>
                </div>
              </div>
            ))}
          </div>

          {/* Scroll progress bar */}
          <div style={{ height: "3px", width: "100%", backgroundColor: "var(--border-color)", borderRadius: "2px", position: "relative", marginTop: "12px" }}>
            <div style={{ position: "absolute", left: 0, top: 0, height: "100%", width: `${newsProgress}%`, backgroundColor: "var(--accent-orange)", borderRadius: "2px", transition: "width 0.1s ease" }} />
          </div>
        </div>

      </div>
    </section>
  );
}
