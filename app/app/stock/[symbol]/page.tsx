"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import { CandleChart } from "@/components/app/CandleChart";
import { OptionChain } from "@/components/app/OptionChain";
import { resolveChartSymbol } from "@/components/app/chartResolve";
import { formatINR, formatPct } from "@/components/app/format";

const OPTION_EXCHANGES: Record<string, string> = {
  NSE: "NFO",
  BSE: "BFO",
  NFO: "NFO",
  BFO: "BFO",
  MCX: "MCX",
};

const OPTION_ELIGIBLE = new Set([
  "NIFTY", "BANKNIFTY", "FINNIFTY", "MIDCPNIFTY", "SENSEX", "BANKEX",
  "RELIANCE", "TCS", "INFY", "HDFCBANK", "ICICIBANK", "SBIN",
  "BAJFINANCE", "AXISBANK", "KOTAKBANK", "LT", "WIPRO", "HCLTECH",
  "TATAMOTORS", "TATASTEEL", "MARUTI", "ADANIPORTS", "ONGC",
]);

const TABS = ["Chart", "Option Chain"] as const;
type Tab = (typeof TABS)[number];

export default function StockDetailPage() {
  const params = useParams<{ symbol: string }>();
  const search = useSearchParams();
  const [activeTab, setActiveTab] = useState<Tab>("Chart");

  const rawParam = decodeURIComponent(params.symbol || "NIFTY");
  const exchangeParam = search.get("exchange") || "";
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

  const optionExchange = OPTION_EXCHANGES[exchange] ?? "NFO";
  const hasOptions = OPTION_ELIGIBLE.has(symbol.toUpperCase());

  return (
    <div className="space-y-5">
      {/* Back + title */}
      <div className="flex items-center gap-2">
        <Link
          href="/app/markets"
          className="rounded-lg p-2 hover:bg-slate-100"
          style={{ color: "var(--ax-text-primary)" }}
        >
          <FiArrowLeft className="h-5 w-5" />
        </Link>
        <div className="min-w-0">
          <h2 className="truncate text-xl font-bold" style={{ color: "var(--ax-text-primary)" }}>
            {name}
          </h2>
          <p className="text-xs" style={{ color: "var(--ax-text-secondary)" }}>
            {exchange}:{symbol}
          </p>
        </div>
      </div>

      {/* Price card */}
      <div className="ax-card flex flex-wrap items-end justify-between gap-3 p-5">
        <div>
          <p
            className="text-[11px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--ax-text-secondary)" }}
          >
            Last price
          </p>
          <p className="mt-1 text-3xl font-bold" style={{ color: "var(--ax-text-primary)" }}>
            {price > 0 ? formatINR(price) : "—"}
          </p>
        </div>
        {changePct ? (
          <p
            className="text-sm font-semibold"
            style={{ color: positive ? "var(--ax-positive)" : "var(--ax-negative)" }}
          >
            {formatPct(changePct)}
          </p>
        ) : null}
      </div>

      {/* Tabs — only show Option Chain tab for eligible symbols */}
      {hasOptions && (
        <div
          className="flex rounded-2xl p-1"
          style={{ background: "var(--ax-surface-muted, rgba(15,23,42,0.06))" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className="flex-1 rounded-xl py-2 text-sm font-semibold transition"
              style={{
                background: activeTab === tab ? "var(--ax-surface)" : "transparent",
                color: activeTab === tab ? "var(--ax-text-primary)" : "var(--ax-text-secondary)",
                boxShadow: activeTab === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {activeTab === "Chart" || !hasOptions ? (
        <CandleChart
          key={`${exchange}-${symbol}`}
          symbol={symbol}
          exchange={exchange}
          initialRange="5m"
          height={420}
        />
      ) : (
        <OptionChain
          symbol={symbol}
          exchange={optionExchange}
          spotChangePct={changePct}
        />
      )}
    </div>
  );
}
