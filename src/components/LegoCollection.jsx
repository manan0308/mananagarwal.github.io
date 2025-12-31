/** @jsx jsx */
import { jsx } from "theme-ui"
import { useState, useEffect, useRef, useMemo } from "react"

// Lego collection data
const legoSets = [
  { date: "2023-11-26", theme: "Technic", name: "McLaren Formula 1 Race Car", parts: 1434, image: "mclaren-f1.jpg" },
  { date: "2024-01-13", theme: "Technic", name: "Peugeot 9X8 24H Le Mans Hybrid Hypercar", parts: 1775, image: "peugeot-9x8.jpg" },
  { date: "2024-02-02", theme: "Technic", name: "Heavy-Duty Tow Truck", parts: 2017, image: "Heavy-Duty Tow Truck.JPG" },
  { date: "2024-02-19", theme: "Icons", name: "NASA Space Shuttle Discovery", parts: 2354, image: "Space Shuttle Discovery.jpg" },
  { date: "2024-04-15", theme: "Technic", name: "Mercedes-AMG F1 W14 E Performance", parts: 1642, image: "mercedes-f1.jpg" },
  { date: "2024-04-16", theme: "Technic", name: "Ferrari Daytona SP3", parts: 3778, image: "ferrari-daytona.jpg" },
  { date: "2024-05-04", theme: "Icons", name: "PAC-MAN Arcade", parts: 2651, image: "PAC-MAN Arcade.jpg" },
  { date: "2024-05-16", theme: "Icons", name: "Bonsai Tree", parts: 878, image: "bonsai-tree.png" },
  { date: "2024-06-08", theme: "Icons", name: "NASA Artemis Space Launch System", parts: 3601, image: "artemis-sls.jpg" },
  { date: "2024-09-25", theme: "Technic", name: "Mercedes-Benz G 500 PROFESSIONAL Line", parts: 2891, image: "Mercedes-Benz G 500 PROFESSIONAL Line.jpg" },
  { date: "2024-09-26", theme: "Icons", name: "Concorde", parts: 2083, image: "concorde.png" },
  { date: "2024-09-26", theme: "Icons", name: "Flower Bouquet", parts: 756, image: "Flower Bouquet.JPG" },
  { date: "2024-10-04", theme: "Icons", name: "NASA Apollo 11 Lunar Lander", parts: 1087, image: "NASA Apollo 11 Lunar Lander.jpg" },
  { date: "2024-12-18", theme: "Architecture", name: "Taj Mahal", parts: 2022, image: "Taj Mahal.jpg" },
  { date: "2025-02-20", theme: "Technic", name: "Deep-Sea Research Submarine", parts: 413, image: "submarine.png" },
  { date: "2025-03-01", theme: "Speed Champions", name: "Red Bull RB20 & Ferrari SF-24", parts: 522, image: "oracle-ferrari.jpg" },
  { date: "2025-04-28", theme: "Technic", name: "McLaren P1", parts: 3893, image: "mclaren-p1.jpg" },
  { date: "2025-04-28", theme: "Icons", name: "Chrysanthemum & Plum Blossom", parts: 605, image: "chrysanthemum-plum-blossom.png" },
  { date: "2025-04-28", theme: "Art", name: "Hokusai – The Great Wave", parts: 1810, image: "great-wave.jpg" },
]

const totalSets = 21 // Unique sets (some cards show multiple sets together)
const totalParts = legoSets.reduce((sum, set) => sum + set.parts, 0)
const allThemes = ["All", ...new Set(legoSets.map(s => s.theme))]

// Theme colors
const themeColors = {
  "Technic": { bg: "#0369a1", light: "#e0f2fe" },
  "Icons": { bg: "#7c3aed", light: "#ede9fe" },
  "Architecture": { bg: "#b45309", light: "#fef3c7" },
  "Speed Champions": { bg: "#dc2626", light: "#fee2e2" },
  "Art": { bg: "#be185d", light: "#fce7f3" },
}

// Animated Counter
const AnimatedCounter = ({ end, duration = 2000, label }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let startTime = null
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const easeOutExpo = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCount(Math.floor(easeOutExpo * end))
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible, end, duration])

  return (
    <div ref={ref} sx={{ textAlign: "center" }}>
      <div sx={{
        fontSize: ["22px", "36px", "42px"],
        fontWeight: "700",
        fontFamily: "'Oswald', sans-serif",
        color: "#6B46C1",
        lineHeight: 1,
      }}>
        {count.toLocaleString()}
      </div>
      <div sx={{
        fontSize: ["8px", "10px"],
        color: "secondary",
        textTransform: "uppercase",
        letterSpacing: "0.15em",
        fontWeight: "500",
        marginTop: ["2px", "4px"],
      }}>
        {label}
      </div>
    </div>
  )
}

// Format date
const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// Lego Brick Placeholder
const LegoBrickPlaceholder = ({ theme }) => {
  const colors = themeColors[theme] || themeColors["Icons"]
  return (
    <div sx={{
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.light,
    }}>
      <svg width="80" height="70" viewBox="0 0 120 100" sx={{ opacity: 0.5 }}>
        <path d="M60 15 L95 32 L60 49 L25 32 Z" fill={colors.bg} opacity="0.8"/>
        <path d="M95 32 L95 68 L60 85 L60 49 Z" fill={colors.bg} opacity="0.5"/>
        <path d="M25 32 L25 68 L60 85 L60 49 Z" fill={colors.bg} opacity="0.3"/>
        <ellipse cx="47" cy="28" rx="7" ry="3.5" fill={colors.bg}/>
        <ellipse cx="73" cy="28" rx="7" ry="3.5" fill={colors.bg}/>
        <ellipse cx="47" cy="40" rx="7" ry="3.5" fill={colors.bg} opacity="0.7"/>
        <ellipse cx="73" cy="40" rx="7" ry="3.5" fill={colors.bg} opacity="0.7"/>
      </svg>
    </div>
  )
}

// Lightbox Component
const Lightbox = ({ image, name, onClose }) => {
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose() }
    document.addEventListener("keydown", handleEsc)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleEsc)
      document.body.style.overflow = "auto"
    }
  }, [onClose])

  return (
    <div
      onClick={onClose}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.9)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        cursor: "zoom-out",
        padding: "20px",
      }}
    >
      <button
        onClick={onClose}
        sx={{
          position: "absolute",
          top: "20px",
          right: "20px",
          background: "none",
          border: "none",
          color: "#fff",
          fontSize: "32px",
          cursor: "pointer",
          padding: "8px",
          lineHeight: 1,
          "&:hover": { opacity: 0.7 },
        }}
      >
        ×
      </button>
      <img
        src={`/lego/${image}`}
        alt={name}
        onClick={(e) => e.stopPropagation()}
        sx={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          objectFit: "contain",
          cursor: "default",
          borderRadius: "8px",
        }}
      />
      <div sx={{
        position: "absolute",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        color: "#fff",
        fontSize: "16px",
        fontWeight: "500",
        textAlign: "center",
      }}>
        {name}
      </div>
    </div>
  )
}

// Lego Card Component
const LegoCard = ({ set, index, onImageClick }) => {
  const [imageError, setImageError] = useState(false)
  const colors = themeColors[set.theme] || themeColors["Icons"]

  return (
    <article
      sx={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "background",
        boxShadow: "0 4px 20px -5px rgba(0,0,0,0.15)",
        transition: "all 0.4s cubic-bezier(0.23, 1, 0.32, 1)",
        transform: "translateY(0)",
        border: "1px solid",
        borderColor: "muted",
        animation: `fadeIn 0.5s ease ${index * 0.05}s both`,
        "@keyframes fadeIn": {
          from: { opacity: 0, transform: "translateY(20px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        "&:hover": {
          boxShadow: "0 20px 40px -15px rgba(0,0,0,0.3)",
          transform: "translateY(-6px)",
          borderColor: colors.bg,
        },
        "&:hover img": {
          transform: "translate(-50%, -50%) scale(1.05)",
        },
      }}
    >
      <div
        onClick={() => !imageError && onImageClick(set)}
        sx={{
          position: "relative",
          width: "100%",
          paddingTop: "75%",
          overflow: "hidden",
          backgroundColor: "#f8fafc",
          cursor: imageError ? "default" : "zoom-in",
        }}
      >
        {!imageError ? (
          <img
            src={`/lego/${set.image}`}
            alt={set.name}
            onError={() => setImageError(true)}
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              maxWidth: "90%",
              maxHeight: "90%",
              width: "auto",
              height: "auto",
              objectFit: "contain",
              transition: "transform 0.5s ease",
            }}
          />
        ) : (
          <LegoBrickPlaceholder theme={set.theme} />
        )}
        <div sx={{
          position: "absolute",
          top: "12px",
          left: "12px",
          padding: "5px 10px",
          borderRadius: "6px",
          backgroundColor: colors.bg,
          fontSize: "10px",
          fontWeight: "600",
          color: "#fff",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          {set.theme}
        </div>
      </div>
      <div sx={{ padding: "16px 18px 18px" }}>
        <h3 sx={{
          margin: 0,
          fontSize: "15px",
          fontWeight: "600",
          color: "text",
          lineHeight: 1.4,
          marginBottom: "12px",
          minHeight: "42px",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}>
          {set.name}
        </h3>
        <div sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: "12px",
          borderTop: "1px solid",
          borderColor: "muted",
        }}>
          <span sx={{ fontSize: "12px", color: "secondary" }}>
            {formatDate(set.date)}
          </span>
          <span sx={{ fontSize: "14px", fontWeight: "700", color: colors.bg }}>
            {set.parts.toLocaleString()} pcs
          </span>
        </div>
      </div>
    </article>
  )
}

// Filter Button Component
const FilterButton = ({ active, onClick, children }) => (
  <button
    onClick={onClick}
    sx={{
      padding: "6px 12px",
      borderRadius: "6px",
      border: "1px solid",
      borderColor: active ? "primary" : "muted",
      backgroundColor: active ? "primary" : "transparent",
      color: active ? "#fff" : "secondary",
      fontSize: "12px",
      fontWeight: "500",
      cursor: "pointer",
      transition: "all 0.2s ease",
      "&:hover": {
        borderColor: "primary",
        color: active ? "#fff" : "primary",
      },
    }}
  >
    {children}
  </button>
)

// Main Component
const LegoCollection = () => {
  const [selectedTheme, setSelectedTheme] = useState("All")
  const [sortBy, setSortBy] = useState("date-desc")
  const [lightboxSet, setLightboxSet] = useState(null)

  const filteredAndSortedSets = useMemo(() => {
    let sets = [...legoSets]

    // Filter by theme
    if (selectedTheme !== "All") {
      sets = sets.filter(s => s.theme === selectedTheme)
    }

    // Sort
    switch (sortBy) {
      case "date-desc":
        sets.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case "date-asc":
        sets.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case "parts-desc":
        sets.sort((a, b) => b.parts - a.parts)
        break
      case "parts-asc":
        sets.sort((a, b) => a.parts - b.parts)
        break
      default:
        break
    }

    return sets
  }, [selectedTheme, sortBy])

  return (
    <div sx={{ maxWidth: "1000px", margin: "0 auto", marginTop: ["-56px", "-72px", "-80px"] }}>
      {/* Header Row */}
      <div sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        gap: ["16px", "32px"],
        marginBottom: ["16px", "32px"],
      }}>
        <h1 sx={{
          fontSize: ["28px", "44px", "52px"],
          fontWeight: "700",
          color: "text",
          margin: 0,
          fontFamily: "'Oswald', sans-serif",
          letterSpacing: "-0.02em",
        }}>
          Lego Land
        </h1>
        <div sx={{ display: "flex", gap: ["20px", "48px"] }}>
          <AnimatedCounter end={totalSets} label="Sets" duration={1200} />
          <AnimatedCounter end={totalParts} label="Pieces" duration={2000} />
        </div>
      </div>

      {/* Intro with Heart Image */}
      <div sx={{
        display: "flex",
        gap: ["12px", "28px"],
        alignItems: "center",
        marginBottom: ["16px", "24px"],
        marginTop: ["-4px", "-12px"],
        flexDirection: "row",
      }}>
        <p sx={{
          fontSize: ["13px", "17px", "18px"],
          color: "secondary",
          margin: 0,
          lineHeight: 1.7,
          flex: 1,
        }}>
          A record of LEGO sets built since late 2023. It started as a farewell gift when I left Razorpay. Somewhere along the way, building LEGO became a way to slow down and sit with my thoughts. Two years and 36,000+ pieces later, this page is simply a record of what I've built, every set documented, brick by brick (or pixel by pixel, #sorrynotsorry).
        </p>
        <img
          src="/lego/heart.png"
          alt="LEGO Heart"
          sx={{
            width: ["100px", "180px", "200px"],
            height: "auto",
            borderRadius: "8px",
            flexShrink: 0,
          }}
        />
      </div>

      {/* Divider with Filters */}
      <div sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: ["flex-start", "center"],
        flexDirection: ["column", "row"],
        gap: "16px",
        paddingBottom: ["20px", "24px"],
        marginBottom: ["24px", "32px"],
        borderBottom: "1px solid",
        borderColor: "muted",
      }}>
        {/* Theme Filter */}
        <div sx={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {allThemes.map(theme => (
            <FilterButton
              key={theme}
              active={selectedTheme === theme}
              onClick={() => setSelectedTheme(theme)}
            >
              {theme}
            </FilterButton>
          ))}
        </div>

        {/* Sort Dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          sx={{
            padding: "8px 12px",
            borderRadius: "6px",
            border: "1px solid",
            borderColor: "muted",
            backgroundColor: "background",
            color: "text",
            fontSize: "12px",
            fontWeight: "500",
            cursor: "pointer",
            outline: "none",
            "&:focus": {
              borderColor: "primary",
            },
          }}
        >
          <option value="date-desc">Newest First</option>
          <option value="date-asc">Oldest First</option>
          <option value="parts-desc">Most Pieces</option>
          <option value="parts-asc">Fewest Pieces</option>
        </select>
      </div>

      {/* Results count */}
      <p sx={{
        fontSize: "13px",
        color: "secondary",
        margin: 0,
        marginBottom: "20px",
      }}>
        Showing {filteredAndSortedSets.length} {filteredAndSortedSets.length === 1 ? 'set' : 'sets'}
      </p>

      {/* Grid */}
      <div sx={{
        display: "grid",
        gridTemplateColumns: ["1fr", "repeat(2, 1fr)", "repeat(3, 1fr)"],
        gap: ["20px", "24px"],
      }}>
        {filteredAndSortedSets.map((set, index) => (
          <LegoCard
            key={`${set.name}-${set.date}`}
            set={set}
            index={index}
            onImageClick={setLightboxSet}
          />
        ))}
      </div>

      {/* Lightbox */}
      {lightboxSet && (
        <Lightbox
          image={lightboxSet.image}
          name={lightboxSet.name}
          onClose={() => setLightboxSet(null)}
        />
      )}

      {/* Footer */}
      <div sx={{
        marginTop: ["48px", "64px"],
        paddingTop: "24px",
        borderTop: "1px solid",
        borderColor: "muted",
        textAlign: "center",
      }}>
        <p sx={{ margin: 0, fontSize: "13px", color: "secondary" }}>
          Collection started November 2023 · + building four more...
        </p>
      </div>
    </div>
  )
}

export default LegoCollection
