"use client";

import { LocalizedLink as Link } from "@/components/LocalizedLink";
import {
  Zap,
  ListChecks,
  ChevronRight,
  Lock,
  ScrollText,
  Brain,
  Flame,
  Vote,
} from "lucide-react";
import { InteractiveFlagBackdrop } from "@/components/InteractiveFlagBackdrop";
import { CompassBackdrop } from "@/components/CompassBackdrop";
import { CompassMark } from "@/components/CompassMark";
import { JsonLd } from "@/components/JsonLd";
import { getSiteUrl } from "@/utils/site";
import { ogLocaleFor } from "@/i18n/config";
import { useDictionary } from "@/i18n/DictionaryProvider";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const { dict, locale, dir } = useDictionary();
  const t = dict.home;
  const hoverNudge =
    dir === "rtl" ? "group-hover:-translate-x-1" : "group-hover:translate-x-1";

  // WebSite + Organization emitted as one @graph rather than two separate script
  // tags, so the `publisher` reference below resolves to the same node instead of
  // duplicating the organization. The @id values are the stable identifiers
  // Google uses to tie the two together.
  const homeJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${getSiteUrl()}/#website`,
        name: dict.meta.siteName,
        url: getSiteUrl(),
        description: dict.meta.description,
        // schema.org wants BCP-47 ("he-IL"); the registry stores the og:locale
        // form ("he_IL") since that's what Open Graph needs — same value, so
        // just swap the separator instead of storing it twice.
        inLanguage: ogLocaleFor(locale).replace("_", "-"),
        publisher: { "@id": `${getSiteUrl()}/#organization` },
      },
      {
        "@type": "Organization",
        "@id": `${getSiteUrl()}/#organization`,
        name: dict.meta.siteName,
        url: getSiteUrl(),
        description: dict.meta.description,
        logo: {
          "@type": "ImageObject",
          url: `${getSiteUrl()}/icon-512.png`,
          width: 512,
          height: 512,
        },
      },
    ],
  };

  return (
    <main className="flex-1">
      <JsonLd data={homeJsonLd} />
      {/* Mobile: fits one viewport in portrait, but min-h (not h) + no clipping
          so landscape — where the content is taller than the screen — stays
          scrollable instead of cutting the headline off with no way to reach it. */}
      <div className="relative flex min-h-[calc(100dvh-var(--mobile-nav-h))] flex-col overflow-hidden px-4 pb-3 pt-6 lg:hidden">
        {/* Dark-to-light wash behind the kicker/headline only — the quiz
            cards and everything below sit back on the page's own light
            background, unrelated to this gradient. */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-[62dvh]"
          style={{
            background:
              "linear-gradient(to bottom, var(--color-navy) 0%, var(--color-navy) 30%, transparent 100%)",
          }}
        />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[62dvh] overflow-hidden">
          <CompassBackdrop className="absolute -top-10 start-1/2 h-[420px] w-[420px] -translate-x-1/2 rtl:translate-x-1/2 opacity-90" />
        </div>

        <div className="absolute start-3 top-3 z-20 flex -rotate-[8deg] flex-col overflow-hidden rounded shadow-ambient-lg">
          <span className="bg-success px-3 py-1 text-[10px] font-bold tracking-wide text-white">
            {t.badgeObjective}
          </span>
          <span className="bg-white px-3 py-1 text-[10px] font-bold tracking-wide text-navy">
            {t.badgeFunded}
          </span>
        </div>

        <div className="relative z-10 flex flex-1 flex-col justify-center gap-8">
          <div>
            <div className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-sapphire-light">
              <CompassMark animate className="h-4 w-4 text-sapphire-light" />
              <span>{t.kicker}</span>
            </div>
            <h1 className="font-display text-3xl font-normal leading-[1.15] text-white">
              {t.headingStart}{" "}
              <span className="text-gradient-sapphire-emerald font-bold">
                {t.headingHighlight}
              </span>{" "}
              {t.headingEnd}
            </h1>
            <p className="mt-2 text-xs leading-relaxed text-white/70">
              {t.subtitleMobile}
            </p>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-white/55">
              <Lock className="h-3 w-3 shrink-0" />
              <span>{t.privacyNoteMobile}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Link href="/quiz?mode=short" className="group block">
              <div className="notch-card-sm bg-grain relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-navy to-navy-light p-4 text-white shadow-[0_14px_32px_-10px_rgba(11,19,43,0.55)] ring-1 ring-white/10">
                <div className="relative z-10 flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 shadow-inner ring-1 ring-white/15 backdrop-blur-sm">
                  <Zap className="h-4 w-4" />
                </div>
                <h2 className="font-display relative z-10 mt-2 text-xl font-normal">
                  {t.fastTrack.title}
                </h2>
                <div className="relative z-10 mt-auto flex items-center justify-between pt-3 text-xs">
                  <span className="rounded-full bg-white/10 px-2 py-0.5 font-medium">
                    {t.fastTrack.durationShort}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
                </div>
              </div>
            </Link>

            <Link href="/quiz?mode=long" className="group block">
              <div className="flex h-full flex-col rounded-2xl bg-white p-4 shadow-ambient ring-1 ring-navy/5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sapphire/15 to-sapphire/5 text-sapphire shadow-inner ring-1 ring-sapphire/10">
                  <ListChecks className="h-4 w-4" />
                </div>
                <h2 className="font-display mt-2 text-xl font-normal text-navy">
                  {t.comprehensiveTrack.title}
                </h2>
                <div className="mt-auto flex items-center justify-between pt-3 text-xs">
                  <span className="rounded-full bg-gray-light px-2 py-0.5 font-medium text-navy">
                    {t.comprehensiveTrack.durationShort}
                  </span>
                  <ChevronRight className="h-3.5 w-3.5 text-navy rtl:rotate-180" />
                </div>
              </div>
            </Link>
          </div>

          <div>
            <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-dark">
              {t.moreOnSite}
            </p>
            <div className="grid grid-cols-2 gap-2">
              <Link
                href="/how-it-works"
                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white py-4 shadow-ambient ring-1 ring-navy/5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sapphire/15 to-sapphire/5 text-sapphire shadow-inner ring-1 ring-sapphire/10">
                  <Vote className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-bold text-navy">
                  {t.links.howItWorks.labelShort}
                </span>
              </Link>
              <Link
                href="/platforms"
                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white py-4 shadow-ambient ring-1 ring-navy/5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-success/20 to-success/5 text-success shadow-inner ring-1 ring-success/10">
                  <ScrollText className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-bold text-navy">
                  {t.links.platforms.labelShort}
                </span>
              </Link>
              <Link
                href="/hot-topics"
                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white py-4 shadow-ambient ring-1 ring-navy/5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-coral/20 to-coral/5 text-coral shadow-inner ring-1 ring-coral/10">
                  <Flame className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-bold text-navy">
                  {t.links.hotTopics.labelShort}
                </span>
              </Link>
              <Link
                href="/challenge"
                className="flex flex-col items-center justify-center gap-2 rounded-xl bg-white py-4 shadow-ambient ring-1 ring-navy/5"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-amber/20 to-amber/5 text-amber shadow-inner ring-1 ring-amber/10">
                  <Brain className="h-4 w-4" />
                </span>
                <span className="text-[10px] font-bold text-navy">
                  {t.links.challenge.labelShort}
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop / tablet: full layout. bg-dot-grid runs behind both the hero
          and the "more on site" list below so the wide gutters on large
          monitors carry the site's own texture (same treatment as the about/
          platforms/challenge pages) instead of sitting flat and empty. */}
      <div className="hidden bg-dot-grid lg:block">
        <div className="relative overflow-hidden">
          <InteractiveFlagBackdrop className="pointer-events-none absolute -inset-y-16 inset-x-[-15%] opacity-[0.18]" />

          <div className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pt-20">
            <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-7">
                <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-sapphire">
                  <CompassMark animate className="h-6 w-6 text-sapphire" />
                  <span>{t.kicker}</span>
                </div>
                <h1 className="font-display text-4xl font-normal leading-[1.15] text-navy sm:text-6xl">
                  {t.headingStart}{" "}
                  <span className="text-gradient-sapphire-emerald font-bold">
                    {t.headingHighlight}
                  </span>{" "}
                  {t.headingEnd}
                </h1>
                <p className="mt-6 max-w-xl text-base leading-relaxed text-gray-dark sm:text-lg">
                  {t.subtitleDesktop}
                </p>
                <div className="mt-4 flex items-center gap-2 text-sm text-gray-dark">
                  <Lock className="h-4 w-4 shrink-0 text-navy" />
                  <span>{t.privacyNoteDesktop}</span>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="relative flex min-h-[190px] items-center overflow-hidden">
                  <div className="absolute left-1/2 top-1/2 flex w-[140%] -translate-x-1/2 -translate-y-1/2 -rotate-[8deg] flex-col gap-3">
                    <div className="bg-success py-3 text-center text-lg font-bold tracking-wide text-white shadow-lg sm:text-xl">
                      {t.badgeObjective}
                    </div>
                    <div className="bg-white py-3 text-center text-lg font-bold tracking-wide text-navy shadow-lg sm:text-xl">
                      {t.badgeFunded}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-12">
              <Link href="/quiz?mode=short" className="group block lg:col-span-7">
                <div className="notch-card bg-grain relative flex h-full flex-col overflow-hidden bg-gradient-to-br from-navy to-navy-light p-8 text-white transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-[0_16px_40px_-6px_rgba(37,99,235,0.4)] sm:p-10">
                  <div className="relative z-10 mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white backdrop-blur-md">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h2 className="font-display relative z-10 text-3xl font-normal">
                    {t.fastTrack.title}
                  </h2>
                  <p className="relative z-10 mt-3 max-w-md flex-1 text-sm leading-relaxed text-white/75">
                    {t.fastTrack.description}
                  </p>
                  <div className="relative z-10 mt-8 flex items-center justify-between text-sm">
                    <span className="rounded-full bg-white/10 px-3 py-1 font-medium backdrop-blur-md">
                      {t.fastTrack.duration}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      {t.fastTrack.cta}
                      <ChevronRight className={cn("h-4 w-4 rtl:rotate-180 transition-transform", hoverNudge)} />
                    </span>
                  </div>
                </div>
              </Link>

              <Link href="/quiz?mode=long" className="group block lg:col-span-5">
                <div className="flex h-full flex-col rounded-2xl border border-gray/80 bg-white p-8 shadow-ambient transition-all duration-200 group-hover:-translate-y-1 group-hover:border-sapphire/50 group-hover:shadow-ambient-lg">
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-sapphire/10 text-sapphire">
                    <ListChecks className="h-6 w-6" />
                  </div>
                  <h2 className="font-display text-3xl font-normal text-navy">
                    {t.comprehensiveTrack.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-dark">
                    {t.comprehensiveTrack.description}
                  </p>
                  <div className="mt-8 flex items-center justify-between text-sm">
                    <span className="rounded-full bg-gray-light px-3 py-1 font-medium text-navy">
                      {t.comprehensiveTrack.duration}
                    </span>
                    <span className="flex items-center gap-1 font-semibold text-navy">
                      {t.comprehensiveTrack.cta}
                      <ChevronRight className={cn("h-4 w-4 rtl:rotate-180 transition-transform", hoverNudge)} />
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 pb-20">
          <div className="mt-2">
            <p className="mb-4 text-sm font-bold uppercase tracking-wider text-gray-dark">
              {t.moreOnSite}
            </p>
            <div className="divide-y divide-gray overflow-hidden rounded-2xl border border-gray/80 bg-white">
              <Link
                href="/how-it-works"
                className="group flex items-center gap-5 p-5 transition-colors hover:bg-sapphire/5"
              >
                <span className="font-display shrink-0 text-xl font-normal text-gray-dark/50 transition-colors group-hover:text-sapphire">
                  01
                </span>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sapphire/10 text-sapphire">
                  <Vote className="h-5 w-5" />
                </div>
                <div className="flex-1 text-start">
                  <h3 className="font-display text-lg font-normal text-navy">
                    {t.links.howItWorks.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-dark sm:text-sm">
                    {t.links.howItWorks.description}
                  </p>
                </div>
                <ChevronRight className={cn("h-4 w-4 shrink-0 text-gray-dark rtl:rotate-180 transition-transform", hoverNudge)} />
              </Link>

              <Link
                href="/platforms"
                className="group flex items-center gap-5 p-5 transition-colors hover:bg-success-light/20"
              >
                <span className="font-display shrink-0 text-xl font-normal text-gray-dark/50 transition-colors group-hover:text-success">
                  02
                </span>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-success/10 text-success">
                  <ScrollText className="h-5 w-5" />
                </div>
                <div className="flex-1 text-start">
                  <h3 className="font-display text-lg font-normal text-navy">
                    {t.links.platforms.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-dark sm:text-sm">
                    {t.links.platforms.description}
                  </p>
                </div>
                <ChevronRight className={cn("h-4 w-4 shrink-0 text-gray-dark rtl:rotate-180 transition-transform", hoverNudge)} />
              </Link>

              <Link
                href="/hot-topics"
                className="group flex items-center gap-5 p-5 transition-colors hover:bg-coral/10"
              >
                <span className="font-display shrink-0 text-xl font-normal text-gray-dark/50 transition-colors group-hover:text-coral">
                  03
                </span>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-coral/15 text-coral">
                  <Flame className="h-5 w-5" />
                </div>
                <div className="flex-1 text-start">
                  <h3 className="font-display text-lg font-normal text-navy">
                    {t.links.hotTopics.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-dark sm:text-sm">
                    {t.links.hotTopics.description}
                  </p>
                </div>
                <ChevronRight className={cn("h-4 w-4 shrink-0 text-gray-dark rtl:rotate-180 transition-transform", hoverNudge)} />
              </Link>

              <Link
                href="/challenge"
                className="group flex items-center gap-5 p-5 transition-colors hover:bg-amber-light/20"
              >
                <span className="font-display shrink-0 text-xl font-normal text-gray-dark/50 transition-colors group-hover:text-amber">
                  04
                </span>
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-amber/15 text-amber">
                  <Brain className="h-5 w-5" />
                </div>
                <div className="flex-1 text-start">
                  <h3 className="font-display text-lg font-normal text-navy">
                    {t.links.challenge.title}
                  </h3>
                  <p className="mt-0.5 text-xs text-gray-dark sm:text-sm">
                    {t.links.challenge.description}
                  </p>
                </div>
                <ChevronRight className={cn("h-4 w-4 shrink-0 text-gray-dark rtl:rotate-180 transition-transform", hoverNudge)} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
