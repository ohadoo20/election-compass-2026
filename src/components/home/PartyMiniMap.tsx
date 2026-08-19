import { partiesCore } from "@/data/parties/core";
import { getParties } from "@/data/parties";
import type { SpectrumCategory, BlocStance } from "@/types";
import { useDictionary } from "@/i18n/DictionaryProvider";

/**
 * Political left/right is a fixed real-world convention (like compass
 * north) — it must stay put regardless of reading direction, so pin
 * placement here uses physical left/right (via a 0–100 x computed once,
 * rendered with the CSS physical `left` property), never RTL logical
 * start/end. See the audit note this pattern came from: an inset-inline-*
 * version silently mirrored the axis in RTL.
 */
const SPECTRUM_X: Record<SpectrumCategory, number> = {
  left: 12,
  "center-left": 28,
  center: 50,
  "center-right": 68,
  right: 82,
  "far-right": 93,
  sectoral: 50, // unused for placement — sectoral parties render in their own row
};

const BLOC_Y: Record<BlocStance, number> = {
  "pro-netanyahu": 24,
  unaligned: 50,
  "anti-netanyahu": 76,
};

interface PlacedParty {
  id: string;
  logo: string;
  color: string;
  x: number;
  y: number;
}

function placeParties() {
  const onAxis = partiesCore.filter((p) => p.spectrumCategory !== "sectoral");
  const sectoral = partiesCore.filter((p) => p.spectrumCategory === "sectoral");

  // Real parties cluster — several genuinely share the same category+bloc
  // cell (e.g. four different center/anti-netanyahu parties). Spread them
  // with a small deterministic offset instead of stacking pins exactly on
  // top of each other; the offset is derived from data (group order), not
  // hand-picked per party, so it stays correct if the roster changes.
  const cellGroups = new Map<string, typeof onAxis>();
  for (const p of onAxis) {
    const bloc = p.bloc?.stance ?? "unaligned";
    const key = `${p.spectrumCategory}|${bloc}`;
    const group = cellGroups.get(key) ?? [];
    group.push(p);
    cellGroups.set(key, group);
  }

  const placed: PlacedParty[] = [];
  for (const group of cellGroups.values()) {
    const baseX = SPECTRUM_X[group[0].spectrumCategory];
    const baseY = BLOC_Y[group[0].bloc?.stance ?? "unaligned"];
    const step = 7;
    const start = -((group.length - 1) * step) / 2;
    group.forEach((p, i) => {
      placed.push({
        id: p.id,
        logo: p.logo,
        color: p.color,
        x: Math.min(96, Math.max(4, baseX + start + i * step)),
        y: baseY,
      });
    });
  }

  return { placed, sectoral };
}

export function PartyMiniMap({ className }: { className?: string }) {
  const { dict, locale } = useDictionary();
  const t = dict.home.partyMap;
  const { placed, sectoral } = placeParties();
  const namesById = new Map(getParties(locale).map((p) => [p.id, p.name]));

  return (
    <div className={className}>
      <div className="relative h-[168px] overflow-hidden rounded-2xl border border-gray/80 bg-gray-light">
        <div className="bg-dot-grid absolute inset-0" />
        <div className="absolute inset-x-[8%] top-1/2 h-px bg-gray" />

        <div className="absolute start-2.5 top-2 text-[9px] font-bold text-gray-dark">
          {t.blocPro} ↑
        </div>
        <div className="absolute start-2.5 top-[22px] text-[9px] font-bold text-gray-dark">
          {t.blocAnti} ↓
        </div>
        {/* Physical left/right — see note above the SPECTRUM_X table. */}
        <div className="absolute bottom-1.5 text-[9.5px] font-bold text-gray-dark" style={{ left: "10px" }}>
          {t.left}
        </div>
        <div className="absolute bottom-1.5 text-[9.5px] font-bold text-gray-dark" style={{ right: "10px" }}>
          {t.right}
        </div>

        {placed.map((p) => (
          <div
            key={p.id}
            className="absolute flex h-[20px] w-[20px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[6px] text-[8px] font-extrabold text-white shadow-sm"
            style={{ left: `${p.x}%`, top: `${p.y}%`, backgroundColor: p.color }}
            title={namesById.get(p.id) ?? p.logo}
          >
            {p.logo}
          </div>
        ))}

        {/* Illustrative, not a real result — explicitly future-tense copy
            (t.youLabel) so this reads as "this is what the feature does",
            never as a fabricated current position. */}
        <div
          className="absolute flex h-[22px] w-[22px] -translate-x-1/2 -translate-y-1/2 animate-pulse items-center justify-center rounded-full border-2 border-dashed border-gold"
          style={{ left: "36%", top: "46%" }}
        >
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="text-gold">
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
            <path d="M15 9l-4 2-2 4 4-2 2-4z" fill="currentColor" />
          </svg>
        </div>
        <div
          className="absolute -translate-x-1/2 whitespace-nowrap rounded-full border border-gold bg-white px-1.5 py-0.5 text-[8px] font-extrabold text-navy"
          style={{ left: "36%", top: "66%" }}
        >
          {t.youLabel}
        </div>
      </div>

      {sectoral.length > 0 && (
        <div className="mt-2 flex items-center gap-2 text-[10.5px] text-gray-dark">
          <span>{t.sectoralLabel}</span>
          <div className="flex gap-1">
            {sectoral.map((p) => (
              <div
                key={p.id}
                className="flex h-[19px] w-[19px] items-center justify-center rounded-[5px] text-[8px] font-extrabold text-white"
                style={{ backgroundColor: p.color }}
                title={namesById.get(p.id) ?? p.logo}
              >
                {p.logo}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
