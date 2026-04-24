"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { CandleChart } from "@/components/app/CandleChart";
import { resolveChartSymbol } from "@/components/app/chartResolve";
import { formatINR, formatPct } from "@/components/app/format";

export default function StockDetailPage() {
  const params = useParams<{ symbol: string }>();
  const search = useSearchParams();
  const rawParam = decodeURIComponent(params.symbol || "NIFTY");
  const exchangeParam = search.get("exchange") || "";
  // Accept legacy/bookmarked URLs that still carry Yahoo-style "RELIANCE.NS"
  // or TradingView-style "NSE:NIFTY" in the path segment.
  const resolved = resolveChartSymbol(
    exchangeParam && !rawParam.includes(":") && !rawParam.endsWith(".NS")
      ? rawParam
      : rawParam,
  );
  const symbol = resolved.symbol;
  const exchange = exchangeParam || resolved.exchange;
  const name = search.get("name") || symbol;
  const price = Number(search.get("price") || 0);
  const changePct = Number(search.get("changePct") || 0);
  const positive = changePct >= 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-2">
        <Link
          href="/app/markets"
          className="rounded-lg p-2 hover:bg-slate-100"
          style={{ color: "var(--ax-text-primary)" }}
        >
          <FiArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0">
          <h2
            className="truncate text-xl font-bold"
            style={{ color: "var(--ax-text-primary)" }}
          >
            {name}
          </h2>
          <p
            className="text-xs"
            style={{ color: "var(--ax-text-secondary)" }}
          >
            {exchange}:{symbol}
          </p>
        </div>
      </div>

      <div className="ax-card flex flex-wrap items-end justify-between gap-3 p-5">
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--ax-text-secondary)" }}
          >
            Last price
          </p>
          <p
            className="mt-1 text-3xl font-bold"
            style={{ color: "var(--ax-text-primary)" }}
          >
            {price > 0 ? formatINR(price) : "—"}
          </p>
        </div>
        {changePct ? (
          <p
            className="text-sm font-semibold"
            style={{
              color: positive ? "var(--ax-positive)" : "var(--ax-negative)",
            }}
          >
            {formatPct(changePct)}
          </p>
        ) : null}
      </div>

      <CandleChart
        key={`${exchange}-${symbol}`}
        symbol={symbol}
        exchange={exchange}
        initialRange="5m"
        height={420}
      />
    </div>
  );
}
