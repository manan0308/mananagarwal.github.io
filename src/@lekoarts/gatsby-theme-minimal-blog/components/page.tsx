/** @jsx jsx */
import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { jsx, Heading } from "theme-ui"
import Layout from "@lekoarts/gatsby-theme-minimal-blog/src/components/layout"
import Seo from "@lekoarts/gatsby-theme-minimal-blog/src/components/seo"

type MBPageProps = {
  page: {
    title: string
    slug: string
    excerpt: string
  }
}

// Per-page SEO overrides — when a page's frontmatter title is empty (because
// the page component owns its own h1), look up better metadata here so social
// previews on WhatsApp/Twitter show something specific.
const PAGE_META: Record<string, { title: string; description: string }> = {
  "/ai-tinkering": {
    title: "Built with AI",
    description:
      "Nine personal AI projects — most started as weekend curiosity, a few graduated into things I use every day. Built with Claude Code or Codex.",
  },
  "/lego": {
    title: "Lego Land",
    description:
      "My LEGO collection — every set I've built, with parts counts, themes and photos.",
  },
}

const Page: React.FC<React.PropsWithChildren<PageProps<MBPageProps>>> = ({
  data: { page },
  children,
}) => (
  <Layout>
    {page.title ? (
      <Heading as="h1" variant="styles.h1">
        {page.title}
      </Heading>
    ) : null}
    <section sx={{ my: 5, variant: `layout.content` }}>{children}</section>
  </Layout>
)

export default Page

export const Head: HeadFC<MBPageProps> = ({ data: { page } }) => {
  const meta = PAGE_META[page.slug]
  const title = meta?.title || page.title
  const description = meta?.description || page.excerpt
  return <Seo title={title} description={description} pathname={page.slug} />
}
