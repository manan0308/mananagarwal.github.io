// Custom GA event instrumentation.
// gatsby-plugin-google-gtag handles initial pageview + SPA route pageviews.
// This file adds custom events on top.

const trackOutboundClick = (event) => {
  const link = event.target.closest("a")
  if (!link) return
  const href = link.getAttribute("href")
  if (!href) return

  // Treat anything with a different host as outbound.
  let outbound = false
  try {
    const url = new URL(href, window.location.origin)
    outbound = url.host && url.host !== window.location.host
  } catch (e) {
    return
  }
  if (!outbound) return

  if (typeof window.gtag !== "function") return

  // GA4 recommended event for outbound link clicks.
  window.gtag("event", "click", {
    event_category: "outbound",
    event_label: href,
    transport_type: "beacon",
    link_url: href,
    link_domain: new URL(href, window.location.origin).host,
    link_text: (link.textContent || "").trim().slice(0, 100),
    outbound: true,
  })
}

const trackProjectToggle = (event) => {
  const details = event.target
  if (!details || details.tagName !== "DETAILS") return
  if (typeof window.gtag !== "function") return

  const summary = details.querySelector("summary")
  const titleEl = summary && summary.querySelector("span:nth-child(2)")
  const yearEl = summary && summary.querySelector("span:nth-child(1)")
  const title = titleEl ? titleEl.textContent.trim() : ""
  const year = yearEl ? yearEl.textContent.trim() : ""

  window.gtag("event", details.open ? "project_expand" : "project_collapse", {
    event_category: "ai_tinkering",
    event_label: title,
    project_year: year,
    page_path: window.location.pathname,
  })
}

export const onClientEntry = () => {
  if (typeof window === "undefined") return
  document.addEventListener("click", trackOutboundClick, true)
  // <details> fires "toggle" only on the element itself, so we listen in capture phase.
  document.addEventListener("toggle", trackProjectToggle, true)
}
