import { defineContentConfig, defineCollection, z } from '@nuxt/content'

// Caleb edits these markdown files directly. There is no ingest step.
// Extra frontmatter keys (hero, ctas, laurels...) land in `meta` and are read by the page templates.
export default defineContentConfig({
  collections: {
    // Structured copy for hand-built pages (home, film, contact, press kit...)
    site: defineCollection({
      type: 'page',
      source: { include: 'site/*.md', prefix: '/_site' },
      schema: z.object({ fullTitle: z.string().optional(), ogImage: z.string().optional() }),
    }),
    // Generic content pages rendered at /<slug> (legal, SMS, about, 8 campaign pages)
    pages: defineCollection({
      type: 'page',
      source: { include: 'pages/*.md', prefix: '/' },
      schema: z.object({
        layout: z.enum(['legal', 'optin', 'about', 'campaign']).default('campaign'),
        sourceUrl: z.string().optional(),
        scrapedAt: z.string().optional(),
        reason: z.string().optional(),
      }),
    }),
    blog: defineCollection({
      type: 'page',
      source: { include: 'blog/*.md', prefix: '/indie-doc-journey' },
      schema: z.object({
        slug: z.string().optional(),
        tags: z.array(z.string()).default([]),
        cover: z.string().optional(),
        rawbody: z.string(),
        sourceUrl: z.string().optional(),
        scrapedAt: z.string().optional(),
        reason: z.string().optional(),
      }),
    }),
    people: defineCollection({
      type: 'page',
      source: { include: 'people/*.md', prefix: '/people' },
      schema: z.object({
        name: z.string(),
        role: z.string(),
        order: z.number(),
        lede: z.string(),
        years: z.string().optional(),
        portrait: z.string().optional(),
        portraitAlt: z.string().optional(),
      }),
    }),
    dispatch: defineCollection({
      type: 'page',
      source: { include: 'special-dispatch/*.md', prefix: '/special-dispatch' },
      schema: z.object({
        fullTitle: z.string().optional(),
        h1: z.string(),
        ogImage: z.string().optional(),
        featuredAlt: z.string().optional(),
        eyebrow: z.string().optional(),
        pdf: z.string().optional(),
        part2: z.string().optional(),
        faqIntro: z.string().optional(),
        faqs: z.array(z.object({ question: z.string(), answer: z.string() })).default([]),
      }),
    }),
  },
})
