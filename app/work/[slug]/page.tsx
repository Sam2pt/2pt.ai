import { redirect } from "next/navigation"
import { CASES } from "@/lib/cases"

/**
 * /work/[slug] — canonical redirect.
 *
 * With only one live case, every /work/[slug] URL redirects to /work
 * (which already renders the case in full). When more cases are
 * re-enabled in lib/cases.ts, this route needs to be rebuilt to render
 * an individual case in isolation again.
 *
 * generateStaticParams still emits every enabled slug so old links
 * continue to redirect cleanly rather than 404.
 */

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }))
}

export default async function CaseStudyRedirect({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  await params
  redirect("/work")
}
