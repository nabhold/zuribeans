import Link from "next/link"
import type { MarketContext } from "@/lib/market/request"

export function MarketSwitcher({ marketContext }: { marketContext: MarketContext }) {
  const otherMarkets = marketContext.enabled.filter(
    (market) => market.marketKey !== marketContext.active.marketKey,
  )

  return (
    <div className="hidden items-center gap-2 text-xs font-semibold uppercase tracking-wide text-ink/50 lg:flex">
      <span>
        {marketContext.active.displayName} · {marketContext.active.currency}
      </span>
      {otherMarkets.map((market) => (
        <Link
          key={market.marketKey}
          href={`?market=${market.marketKey}`}
          className="underline decoration-dotted underline-offset-4 hover:text-ink"
        >
          Switch to {market.displayName}
        </Link>
      ))}
    </div>
  )
}
