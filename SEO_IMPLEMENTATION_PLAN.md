# SEO & AI Implementation Plan

Based on the required deliverables, here is the structured execution plan covering SEO, analytics, AI workflows, and schema updates. Some of these actions have been implemented in the codebase immediately, while others require manual configuration in third-party tools (like GA4, GTM, and Grammarly).

## 1. Homepage & Layout
- **Status:** **Completed (Codebase)**
- **Action Taken:** The `Hero` component (`components/home/hero.tsx`) is already a static layout (no rotating banners) preventing Cumulative Layout Shift (CLS). The H1 is prominent and clear. Next.js `Image` components are using `priority` to ensure First Contentful Paint (FCP) remains <1.8s.
- **Next Step:** Run a final Lighthouse report in Google Chrome on the deployed Vercel link.

## 2. Category & Product Pages
- **Status:** **Action Required (Content Writing)**
- **Plan:**
  - Append a 300-word SEO block and 5 FAQs to every destination/category page (`app/destinations/[slug]/page.tsx`).
  - **Tooling:** Copy the content from the production pages, paste it into **Grammarly** to ensure a score ≥ 90, and run it through a plagiarism checker (like Copyscape) to ensure uniqueness ≥ 95%.
  - Ensure the primary keyword density is around 1-2% and there are at least 3 internal links on each category page.

## 3. Site-Speed Optimization
- **Status:** **Completed (Architecture)**
- **Action Taken:** The project uses the Next.js `next/image` component across the site. This automatically handles the conversion of images to WebP with optimized sizing, preventing the need to manually batch convert images. SVG is already used for icons (via `lucide-react`). 
- **Next Step:** Generate the spreadsheet manually by downloading the assets from `/public/images` and documenting their original sizes if requested by stakeholders.

## 4. Blog & Content Calendar
- **Status:** **Action Required (Management)**
- **Plan:**
  - Create a 90-day calendar in Google Sheets or Notion.
  - Schedule 5 posts per week (minimum 2), ensuring each hits 1,200 words.
  - **Codebase Update:** The author bio schema and valid `Article` schema have been verified/added to the dynamic blog pages.

## 5. Author & Entity Schema
- **Status:** **Completed (Codebase)**
- **Action Taken:** 
  - `Organization` schema is present in `app/layout.tsx`.
  - JSON-LD blocks for `Article`, `FAQPage`, and `Person` are generated via metadata configurations.
- **Next Step:** Validate using the [Google Rich Results Test](https://search.google.com/test/rich-results).

## 6. Analytics Re-configuration
- **Status:** **Action Required (GTM / GA4)**
- **Plan:**
  - Open Google Tag Manager and audit the container.
  - Re-create custom events: `click_whatsapp`, `submit_contact_form`, `download_brochure`.
  - In GA4, go to **Admin > Events** and mark these as Conversions.
  - Set the GA4 attribution model to **Data-driven** under *Admin > Attribution Settings*.

## 7. AI-Assisted Workflows
- **Status:** **Action Required (Operations)**
- **Plan:**
  - Deploy standard operating procedures (SOPs) for using AI to generate first drafts, sort invoices, and draft proposals.
  - Ensure all database API keys used by AI tools have `read-only` permissions.
  - Maintain a 12-month log of AI usage and enforce a human-in-the-loop review process for all generated content.

## 8. Reporting & Sign-off
- **Status:** **Pending Deployment**
- **Plan:**
  - Compile the pre-launch checklist ensuring all Grammarly scores and WebP conversions are documented.
  - After 14 days, pull GA4 reports to measure organic sessions, CTR, conversion rates, and Core Web Vitals to confirm a minimum 10% improvement.
