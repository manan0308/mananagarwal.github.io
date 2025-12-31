import { merge } from "theme-ui"
import originalTheme from "@lekoarts/gatsby-theme-minimal-blog/src/gatsby-plugin-theme-ui"

const theme = merge(originalTheme, {
  // Reduce top spacing on all sections
  section_hero: {
    mt: ["-16px", "-24px", "-32px"],
  },
  layout: {
    container: {
      maxWidth: `960px`,
      px: [4, 4, 5],
    },
    main: {
      mt: ["-20px", "-32px", "-40px"],
    },
  },
  fonts: {
    body: `"Source Sans 3", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`,
    heading: `"Oswald", "Bebas Neue", Impact, sans-serif`,
    monospace: `"JetBrains Mono", "SF Mono", Consolas, monospace`,
  },
  fontWeights: {
    body: 400,
    heading: 600,
    bold: 700,
  },
  lineHeights: {
    body: 1.7,
    heading: 1.2,
  },
  colors: {
    primary: `#6B46C1`,
    secondary: `#64748b`,
    heading: `#0f172a`,
    text: `#1e293b`,
    muted: `#f1f5f9`,
    divide: `#e2e8f0`,
    modes: {
      dark: {
        primary: `#a78bfa`,
        secondary: `#94a3b8`,
        heading: `#f8fafc`,
        text: `#e2e8f0`,
        background: `#0f172a`,
        muted: `#1e293b`,
        divide: `#334155`,
      },
    },
  },
  styles: {
    root: {
      fontFamily: `body`,
      fontWeight: `body`,
      lineHeight: `body`,
    },
    h1: {
      fontFamily: `heading`,
      fontWeight: 700,
      fontSize: ["36px", "44px", "52px"],
      letterSpacing: `-0.02em`,
      lineHeight: 1.1,
      mt: 0,
      mb: 4,
    },
    h2: {
      fontFamily: `heading`,
      fontWeight: 600,
      fontSize: [4, 5, 5],
      letterSpacing: `-0.01em`,
      lineHeight: 1.2,
      mt: 5,
      mb: 3,
    },
    h3: {
      fontFamily: `heading`,
      fontWeight: 600,
      fontSize: [3, 4, 4],
      letterSpacing: `-0.01em`,
      lineHeight: 1.25,
      mt: 4,
      mb: 3,
    },
    h4: {
      fontFamily: `heading`,
      fontWeight: 600,
      fontSize: [2, 3, 3],
      lineHeight: 1.3,
      mt: 4,
      mb: 2,
    },
    p: {
      fontSize: [1, 2, 2],
      lineHeight: 1.75,
      mb: 4,
    },
    a: {
      color: `primary`,
      textDecoration: `none`,
      transition: `color 0.2s ease`,
      "&:hover": {
        color: `heading`,
      },
    },
    blockquote: {
      borderLeftColor: `primary`,
      borderLeftWidth: `3px`,
      borderLeftStyle: `solid`,
      pl: 4,
      ml: 0,
      mr: 0,
      fontStyle: `normal`,
      color: `secondary`,
      p: {
        fontStyle: `normal`,
      },
    },
    img: {
      borderRadius: `8px`,
      maxWidth: `100%`,
    },
  },
  text: {
    heading: {
      fontFamily: `heading`,
      fontWeight: `heading`,
      lineHeight: `heading`,
      color: `heading`,
      letterSpacing: `-0.01em`,
    },
  },
  links: {
    secondary: {
      color: `secondary`,
      textDecoration: `none`,
      fontWeight: 500,
      transition: `color 0.2s ease`,
      "&:hover": {
        color: `primary`,
      },
    },
    listItem: {
      fontSize: [2, 3, 3],
      color: `heading`,
      fontWeight: 600,
      fontFamily: `heading`,
      letterSpacing: `-0.01em`,
      transition: `color 0.2s ease`,
      "&:hover": {
        color: `primary`,
      },
    },
  },
})

export default theme
