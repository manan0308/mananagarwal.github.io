/** @jsx jsx */
import * as React from "react"
import { jsx } from "theme-ui"

const projects = [
  {
    year: "2026",
    title: "Nifty 500 Momentum Picker",
    status: "Live",
    github: "https://github.com/manan0308/momentum-strat",
    body: (
      <p>
        A momentum stock-picker for the Nifty 500. <strong>10 strategies running live</strong>, with a{" "}
        <strong>46% 5-year backtest CAGR</strong>. The hard part was the data. NSE doesn&rsquo;t publish historical index
        membership, so I scraped years of press releases to reconstruct it. Without that, a backtest only runs on the
        companies that are in the index today, which inflates returns.
      </p>
    ),
  },
  {
    year: "2026",
    title: "Multi-Asset Portfolio Allocator",
    status: "Live",
    github: "https://github.com/manan0308/trader",
    body: (
      <p>
        A weekly rebalanced allocator across Nifty large, mid and smallcap, a US index, gold, silver and debt.{" "}
        <strong>25% CAGR over 14 years</strong>. Two versions run side by side. A pure quant model, and the same model
        with a Claude-powered macro overlay that can only reduce risk, never increase it. Running them in parallel shows
        whether the LLM is actually adding value or just adding cost.
      </p>
    ),
  },
  {
    year: "2026",
    title: "CT and MRI Explainer and Comparer",
    status: "Shipped",
    github: "https://github.com/manan0308/MedGamma",
    body: (
      <p>
        Built during my dad&rsquo;s illness to read his scans more carefully. Runs on Google&rsquo;s{" "}
        <strong>MedGemma 4B</strong>. Upload a CT, MRI or X-ray and it returns a structured radiology-style report plus
        a plain-English explanation, with prompts tuned per scan type. It can also line up two scans from different
        dates and flag changes in tumour size, position or appearance, which is normally a manual comparison.
      </p>
    ),
  },
  {
    year: "2026",
    title: "LLM-Powered Knowledge Base",
    status: "Live",
    github: "https://github.com/manan0308/knowledge-base",
    body: (
      <p>
        A Second Brain that reads everything I should be reading and remembers it for me, inspired by Karpathy&rsquo;s
        post on LLM knowledge bases. I drop in a podcast transcript, Substack post, article or thread, or point it at
        an entire YouTube channel, and the agent reads it end to end. It creates or updates a page for every person,
        company, concept and topic mentioned, with each claim attributed to who said it, where and when. Over time each
        page gets dense with actual information, fully searchable and fully cited. Solves two real problems for me:
        getting a nuanced view on a topic without re-listening to five podcasts, and retaining what I consume instead
        of letting it evaporate within a week.
      </p>
    ),
  },
  {
    year: "2025",
    title: "Bulk YouTube Channel Transcriber",
    status: "Shipped",
    github: null,
    body: (
      <p>
        Transcribes entire YouTube channels of <strong>500 to 1000 hours</strong> at{" "}
        <strong>150 to 200x realtime</strong>. A 150-minute video takes about a minute. Started as a way to build dense
        knowledge repos for niche podcast channels. Took me through speech-to-text at scale, from a single local GPU to
        parallel GPUs on Modal. Now feeds into the Knowledge Base above.
      </p>
    ),
  },
  {
    year: "2025",
    title: "Personal AI Agent Team",
    status: "Live",
    github: null,
    body: (
      <p>
        Always-on AI agents on a <strong>$5/month server</strong>. Jarvis routes tasks to specialists. Cadbury screens
        WhatsApp, Scoop sends a 9 AM retail digest, Postman summarises Substacks, Maharaj orders Swiggy, Mr. Market
        watches stocks, Archivist TLDRs YouTube and podcasts. Built on OpenClaw with Kimi K2.5.
      </p>
    ),
  },
  {
    year: "2025",
    title: "Mutual Fund Regret Calculator",
    status: "Shipped",
    github: "https://github.com/manan0308/mutual-fund-comparison",
    body: (
      <p>
        Pulls AMFI data and quantifies the cost of picking Fund X over Fund Y. Simulates SIPs and lump sums, shows the
        gap in rupees, and does the same for <strong>direct vs regular plans</strong> so the distributor commission
        shows up as a real number over time.
      </p>
    ),
  },
  {
    year: "2024",
    title: "Cricket Highlights Reel Feed",
    status: "Shipped",
    github: "https://github.com/manan0308/worldchampions",
    body: (
      <p>
        After India won the T20 World Cup my feed turned into nothing but cricket reels. Built a dedicated place to
        scroll through all of them. <strong>Hit 1000 users in 24 hours</strong>. Random reel feed, swipeable on mobile,
        with favourites and sharing.
      </p>
    ),
  },
  {
    year: "2024",
    title: "Atlas x Wordle",
    status: "Shipped",
    github: "https://github.com/manan0308/EndlessGeoWordle",
    body: (
      <p>
        My first proper build that wasn&rsquo;t on Lovable or Bolt, and the project that got me into Claude Code.
        Wordle for geography nerds. Daily puzzles on cities, countries and landmarks, with difficulty that scales by
        word length, a hint system, dark mode and shareable result cards.{" "}
        <strong>At peak 100 players used to play this, daily</strong>.
      </p>
    ),
  },
]

const STATUS_STYLES = {
  Live: { bg: `rgba(34, 139, 92, 0.12)`, fg: `#1f7a4f` },
  Shipped: { bg: `rgba(29, 78, 216, 0.10)`, fg: `#1d4ed8` },
}

const AITinkering = () => (
  <div>
    <h1
      sx={{
        fontFamily: `heading`,
        fontWeight: `heading`,
        letterSpacing: `-0.02em`,
        color: `heading`,
        fontSize: [`30px`, `36px`, `44px`],
        lineHeight: 1.05,
        mt: 0,
        mb: 3,
      }}
    >
      Built with AI
    </h1>

    <p
      sx={{
        fontFamily: `body`,
        fontSize: [`17px`, `18px`, `18px`],
        color: `secondary`,
        lineHeight: 1.6,
        maxWidth: `720px`,
        textAlign: `justify`,
        hyphens: `auto`,
        mt: 0,
        mb: [`32px`, `40px`, `48px`],
      }}
    >
      Solving problems or tinkering and going down a rabbit hole. Everything here is built on Claude Code or Codex, or
      both. Most of these started as weekend curiosity and stayed that way. A few graduated to things I actually use
      every day.
    </p>

    <div sx={{ borderTop: `1px solid`, borderColor: `divide` }}>
      {projects.map((p) => {
        const style = STATUS_STYLES[p.status] || STATUS_STYLES.Shipped
        return (
          <details
            key={p.title}
            sx={{
              borderBottom: `1px solid`,
              borderColor: `divide`,
              "& > summary": {
                listStyle: `none`,
                cursor: `pointer`,
                display: `grid`,
                gridTemplateColumns: [`48px 1fr auto`, null, `56px 1fr auto auto`],
                alignItems: `center`,
                gap: [`12px`, null, `16px`],
                padding: [`14px 0`, null, `18px 4px`],
              },
              "& > summary::-webkit-details-marker": { display: `none` },
              "& > summary::marker": { display: `none` },
              "& .chev": { transition: `transform 0.2s ease` },
              "&[open] .chev": { transform: `rotate(180deg)` },
            }}
          >
            <summary>
              <span sx={{ fontFamily: `monospace`, fontSize: `12px`, color: `secondary` }}>{p.year}</span>
              <span
                sx={{
                  fontFamily: `heading`,
                  fontWeight: `heading`,
                  letterSpacing: `-0.01em`,
                  color: `heading`,
                  fontSize: [`18px`, null, `22px`],
                  lineHeight: 1.2,
                }}
              >
                {p.title}
              </span>
              <span
                sx={{
                  display: [`none`, null, `inline-flex`],
                  alignItems: `center`,
                  borderRadius: `999px`,
                  padding: `4px 10px`,
                  fontFamily: `monospace`,
                  fontSize: `11px`,
                  fontWeight: 500,
                  textTransform: `uppercase`,
                  letterSpacing: `0.08em`,
                  background: style.bg,
                  color: style.fg,
                  whiteSpace: `nowrap`,
                  "&::before": {
                    content: `""`,
                    display: `inline-block`,
                    width: `6px`,
                    height: `6px`,
                    borderRadius: `50%`,
                    background: style.fg,
                    marginRight: `8px`,
                  },
                }}
              >
                {p.status}
              </span>
              <svg
                className="chev"
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                sx={{ color: `secondary`, flexShrink: 0 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div
              sx={{
                padding: [`0 0 18px 60px`, null, `0 4px 24px 76px`],
                "& p": {
                  fontFamily: `body`,
                  fontSize: `16px`,
                  lineHeight: 1.65,
                  color: `text`,
                  maxWidth: `60ch`,
                  textAlign: `justify`,
                  hyphens: `auto`,
                  mt: 0,
                  mb: `12px`,
                },
                "& strong": { fontWeight: 600, color: `heading` },
              }}
            >
              {p.body}
              <p
                sx={{
                  fontFamily: `monospace !important`,
                  fontSize: `12px !important`,
                  color: `secondary !important`,
                  textAlign: `left !important`,
                  mt: `8px !important`,
                  "& a": {
                    color: `primary`,
                    textDecoration: `none`,
                    "&:hover": { textDecoration: `underline` },
                  },
                }}
              >
                {p.github ? (
                  <>
                    <a href={p.github}>github</a> →
                  </>
                ) : (
                  `private`
                )}
              </p>
            </div>
          </details>
        )
      })}
    </div>
  </div>
)

export default AITinkering
