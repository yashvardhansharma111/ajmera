"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiBookOpen,
  FiCheck,
  FiDownload,
  FiLock,
  FiLogIn,
  FiPieChart,
  FiShield,
  FiSmartphone,
  FiTrendingUp,
  FiZap,
} from "react-icons/fi";

// TODO: replace with the real EAS APK URL when it's ready.
const APK_URL = "#apk-coming-soon";

const TICKER = [
  { symbol: "NIFTY 50", value: "24,583.10", changePct: 0.42 },
  { symbol: "BANK NIFTY", value: "52,110.85", changePct: 0.71 },
  { symbol: "SENSEX", value: "80,920.15", changePct: 0.38 },
  { symbol: "RELIANCE", value: "2,914.30", changePct: 1.12 },
  { symbol: "HDFCBANK", value: "1,671.55", changePct: -0.23 },
  { symbol: "TCS", value: "3,948.20", changePct: 0.57 },
  { symbol: "INFY", value: "1,503.45", changePct: -0.18 },
  { symbol: "GOLD", value: "74,210.00", changePct: 0.95 },
  { symbol: "SILVER", value: "89,345.00", changePct: 1.34 },
  { symbol: "CRUDE", value: "6,728.00", changePct: -0.46 },
];

export default function HomePage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ clientId: loginId, password }),
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
      router.replace("/app/markets");
      router.refresh();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const isApkReady = APK_URL !== "#apk-coming-soon";

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-900">
      {/* Decorative background gradient blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div
          className="absolute -top-40 -left-40 h-[480px] w-[480px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,208,156,0.22), rgba(0,208,156,0))",
          }}
        />
        <div
          className="absolute -top-24 right-0 h-[420px] w-[420px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(59,130,246,0.14), rgba(59,130,246,0))",
          }}
        />
        <div
          className="absolute bottom-0 left-1/2 h-[360px] w-[720px] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(closest-side, rgba(0,208,156,0.10), rgba(0,208,156,0))",
          }}
        />
        {/* Faint grid */}
        <svg
          className="absolute inset-0 h-full w-full opacity-[0.35]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern
              id="ax-grid"
              width="32"
              height="32"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 32 0 L 0 0 0 32"
                fill="none"
                stroke="rgba(15,23,42,0.04)"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ax-grid)" />
        </svg>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md"
        style={{ backgroundColor: "rgba(255,255,255,0.65)", borderBottom: "1px solid var(--ax-border-light)" }}>
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 md:px-6">
          <Link href="/" className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold shadow-md shadow-emerald-500/20"
              style={{ backgroundColor: "var(--ax-primary)" }}
            >
              AE
            </div>
            <div className="leading-none">
              <p
                className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--ax-primary)" }}
              >
                Ajmera
              </p>
              <p
                className="mt-0.5 text-base font-bold"
                style={{ color: "var(--ax-text-primary)" }}
              >
                Exchange
              </p>
            </div>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-3">
            <a
              href="#features"
              className="hidden rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-slate-100 sm:inline"
              style={{ color: "var(--ax-text-secondary)" }}
            >
              Features
            </a>
            <a
              href="#download"
              className="hidden rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-slate-100 sm:inline"
              style={{ color: "var(--ax-text-secondary)" }}
            >
              Download
            </a>
            <Link
              href="/admin"
              className="rounded-lg border px-3 py-1.5 text-xs font-medium"
              style={{
                borderColor: "var(--ax-border)",
                color: "var(--ax-text-primary)",
                backgroundColor: "#fff",
              }}
            >
              Admin
            </Link>
          </nav>
        </div>
      </header>

      {/* Ticker strip */}
      <div
        className="border-b"
        style={{
          borderColor: "var(--ax-border-light)",
          backgroundColor: "#0f172a",
        }}
      >
        <div className="relative flex overflow-hidden">
          <div className="ax-marquee flex shrink-0 items-center gap-8 whitespace-nowrap px-6 py-2.5">
            {[...TICKER, ...TICKER].map((t, i) => {
              const positive = t.changePct >= 0;
              return (
                <span
                  key={`${t.symbol}-${i}`}
                  className="flex items-center gap-2 text-[11px] font-medium text-slate-300"
                >
                  <span className="font-semibold text-white">{t.symbol}</span>
                  <span>{t.value}</span>
                  <span
                    style={{
                      color: positive ? "#00ffa3" : "#ff7a85",
                    }}
                  >
                    {positive ? "+" : ""}
                    {t.changePct.toFixed(2)}%
                  </span>
                </span>
              );
            })}
          </div>
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 top-0 h-full w-16"
            style={{
              background:
                "linear-gradient(90deg, #0f172a, rgba(15,23,42,0))",
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute right-0 top-0 h-full w-16"
            style={{
              background:
                "linear-gradient(270deg, #0f172a, rgba(15,23,42,0))",
            }}
          />
        </div>
        <style jsx>{`
          .ax-marquee {
            animation: ax-marquee 40s linear infinite;
          }
          @keyframes ax-marquee {
            from { transform: translateX(0); }
            to { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* Hero */}
      <main className="relative">
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-10 pb-16 md:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pt-16 lg:pb-20">
          <div>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-[11px] font-semibold"
              style={{
                borderColor: "rgba(0,208,156,0.35)",
                backgroundColor: "rgba(0,208,156,0.08)",
                color: "var(--ax-primary)",
              }}
            >
              <span
                className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                style={{ backgroundColor: "var(--ax-primary)" }}
              />
              LIVE MARKETS · NSE · BSE · MCX
            </span>

            <h1
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[56px]"
              style={{ color: "var(--ax-text-primary)" }}
            >
              Trade smarter.
              <br />
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(90deg, var(--ax-primary), #3B82F6)",
                }}
              >
                Wherever you are.
              </span>
            </h1>

            <p
              className="mt-5 max-w-xl text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--ax-text-secondary)" }}
            >
              Live charts, orders, mutual funds and a running ledger — all in one
              place. Sign in on the web, or take Ajmera Exchange with you on
              Android.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#signin"
                className="group inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:shadow-emerald-500/30"
                style={{ backgroundColor: "var(--ax-primary)" }}
              >
                <FiLogIn className="h-4 w-4" />
                Sign in
                <FiArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
              </a>
              <a
                href="#download"
                className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold hover:bg-slate-50"
                style={{
                  borderColor: "var(--ax-border)",
                  color: "var(--ax-text-primary)",
                  backgroundColor: "#fff",
                }}
              >
                <FiDownload className="h-4 w-4" />
                Download APK
              </a>
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
              {[
                "Real-time candlestick charts",
                "Positions · holdings · ledger",
                "Admin-approved onboarding",
                "Mutual funds in one view",
              ].map((f) => (
                <li
                  key={f}
                  className="flex items-center gap-2 text-sm"
                  style={{ color: "var(--ax-text-secondary)" }}
                >
                  <span
                    className="flex h-5 w-5 items-center justify-center rounded-full"
                    style={{
                      backgroundColor: "var(--ax-primary-muted)",
                      color: "var(--ax-primary)",
                    }}
                  >
                    <FiCheck className="h-3 w-3" strokeWidth={3} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Login card */}
          <div id="signin" className="relative">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[32px] opacity-70 blur-2xl"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,208,156,0.25), rgba(59,130,246,0.18))",
              }}
            />
            <div
              className="relative overflow-hidden rounded-3xl border bg-white p-7 shadow-2xl shadow-slate-200/60 sm:p-8"
              style={{ borderColor: "var(--ax-border)" }}
            >
              <div
                aria-hidden
                className="absolute -top-12 -right-12 h-40 w-40 rounded-full blur-2xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(0,208,156,0.18), rgba(0,208,156,0))",
                }}
              />

              <div className="mb-6 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="flex h-9 w-9 items-center justify-center rounded-xl"
                    style={{
                      backgroundColor: "var(--ax-primary-muted)",
                      color: "var(--ax-primary)",
                    }}
                  >
                    <FiLogIn className="h-4 w-4" />
                  </span>
                  <h2
                    className="text-lg font-bold"
                    style={{ color: "var(--ax-text-primary)" }}
                  >
                    Welcome back
                  </h2>
                </div>
                <span
                  className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold"
                  style={{
                    backgroundColor: "rgba(0,208,156,0.10)",
                    color: "var(--ax-primary)",
                  }}
                >
                  <FiShield className="h-3 w-3" />
                  Secure
                </span>
              </div>

              <form onSubmit={submit} className="space-y-4">
                <div>
                  <label
                    className="text-xs font-medium"
                    style={{ color: "var(--ax-text-secondary)" }}
                  >
                    Client ID or email
                  </label>
                  <input
                    type="text"
                    value={loginId}
                    onChange={(e) => setLoginId(e.target.value)}
                    className="mt-1 w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-[var(--ax-primary)] focus:ring-4"
                    style={{
                      borderColor: "var(--ax-border)",
                      backgroundColor: "var(--ax-card-muted)",
                    }}
                    placeholder="your-client-id"
                    autoComplete="username"
                  />
                </div>
                <div>
                  <label
                    className="text-xs font-medium"
                    style={{ color: "var(--ax-text-secondary)" }}
                  >
                    Password
                  </label>
                  <div className="relative mt-1">
                    <FiLock
                      className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
                      style={{ color: "var(--ax-text-secondary)" }}
                    />
                    <input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border py-3 pl-9 pr-4 text-sm outline-none transition focus:border-[var(--ax-primary)] focus:ring-4"
                      style={{
                        borderColor: "var(--ax-border)",
                        backgroundColor: "var(--ax-card-muted)",
                      }}
                      placeholder="••••••••"
                      autoComplete="current-password"
                    />
                  </div>
                </div>

                {err ? (
                  <p
                    className="rounded-lg px-3 py-2 text-sm"
                    style={{
                      backgroundColor: "rgba(229,84,97,0.08)",
                      color: "var(--ax-negative)",
                    }}
                  >
                    {err}
                  </p>
                ) : null}

                <button
                  type="submit"
                  disabled={loading || !loginId || !password}
                  className="group flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:shadow-emerald-500/30 disabled:cursor-not-allowed disabled:opacity-50 disabled:shadow-none"
                  style={{ backgroundColor: "var(--ax-primary)" }}
                >
                  {loading ? (
                    "Signing in…"
                  ) : (
                    <>
                      Continue
                      <FiArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
              </form>

              <div
                className="mt-6 rounded-xl border px-4 py-3 text-center text-sm"
                style={{
                  borderColor: "var(--ax-border)",
                  backgroundColor: "var(--ax-card-muted)",
                  color: "var(--ax-text-secondary)",
                }}
              >
                New to Ajmera Exchange?{" "}
                <Link
                  href="/signup"
                  className="font-semibold"
                  style={{ color: "var(--ax-primary)" }}
                >
                  Request account →
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section id="features" className="mx-auto max-w-6xl px-5 pb-16 md:px-6 lg:pb-24">
          <div className="mb-10 max-w-2xl">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--ax-primary)" }}
            >
              Everything you need
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--ax-text-primary)" }}
            >
              One account. Every market.
            </h2>
            <p
              className="mt-3 text-base"
              style={{ color: "var(--ax-text-secondary)" }}
            >
              The same live data your mobile app serves, laid out beautifully for
              the web.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              icon={FiActivity}
              title="Live charts"
              text="Candlesticks, volume, live price line — intraday through weekly."
            />
            <FeatureCard
              icon={FiBarChart2}
              title="Markets"
              text="Indices, equities, mutual funds and commodities in one feed."
            />
            <FeatureCard
              icon={FiBookOpen}
              title="Orders & ledger"
              text="Positions, holdings and a running order ledger with CSV export."
            />
            <FeatureCard
              icon={FiPieChart}
              title="Mutual funds"
              text="Live NAV, top gainers and losers at a glance."
            />
          </div>
        </section>

        {/* Download */}
        <section
          id="download"
          className="border-y"
          style={{ borderColor: "var(--ax-border-light)", backgroundColor: "#0f172a" }}
        >
          <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:px-6 md:py-20 lg:grid-cols-2 lg:items-center">
            <div>
              <span
                className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold"
                style={{
                  backgroundColor: "rgba(0,208,156,0.15)",
                  color: "#5eead4",
                }}
              >
                <FiSmartphone className="h-3.5 w-3.5" />
                Android app
              </span>
              <h2 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Trade on the go.
              </h2>
              <p className="mt-3 max-w-xl text-base text-slate-300">
                Install the APK to get live markets, orders and mutual funds on
                your phone. Your web and mobile accounts share the same session.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={APK_URL}
                  target={isApkReady ? "_blank" : undefined}
                  rel={isApkReady ? "noreferrer" : undefined}
                  aria-disabled={!isApkReady}
                  className="inline-flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold shadow-lg transition"
                  style={{
                    backgroundColor: isApkReady ? "var(--ax-primary)" : "#334155",
                    color: isApkReady ? "#fff" : "#94a3b8",
                    pointerEvents: isApkReady ? "auto" : "none",
                    boxShadow: isApkReady
                      ? "0 10px 30px -12px rgba(0,208,156,0.45)"
                      : undefined,
                  }}
                >
                  <FiDownload className="h-5 w-5" />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-medium uppercase tracking-wider opacity-80">
                      {isApkReady ? "Download" : "Coming soon"}
                    </span>
                    <span>Android APK</span>
                  </span>
                </a>
                <a
                  href="#signin"
                  className="inline-flex items-center gap-3 rounded-xl border border-slate-700 px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800/60"
                >
                  <FiZap className="h-5 w-5" style={{ color: "#5eead4" }} />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Or open
                    </span>
                    <span>Web version</span>
                  </span>
                </a>
              </div>
              {!isApkReady ? (
                <p className="mt-4 text-xs text-slate-400">
                  The download link will be enabled once the EAS build is
                  published.
                </p>
              ) : null}
            </div>

            {/* Phone mockup */}
            <div className="relative mx-auto w-full max-w-sm">
              <div
                className="absolute -inset-8 rounded-[48px] opacity-70 blur-3xl"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(0,208,156,0.35), rgba(59,130,246,0.25))",
                }}
              />
              <div className="relative overflow-hidden rounded-[36px] border border-slate-700 bg-slate-900 p-3 shadow-2xl">
                <div className="overflow-hidden rounded-[28px] bg-white">
                  <div
                    className="flex items-center justify-between px-4 py-3 text-[10px] font-semibold"
                    style={{ color: "var(--ax-text-primary)" }}
                  >
                    <span>Markets</span>
                    <span
                      className="flex items-center gap-1"
                      style={{ color: "var(--ax-primary)" }}
                    >
                      <span
                        className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
                        style={{ backgroundColor: "var(--ax-primary)" }}
                      />
                      LIVE
                    </span>
                  </div>
                  <MockChart />
                  <div className="grid grid-cols-2 gap-2 p-3">
                    {TICKER.slice(0, 4).map((t) => {
                      const positive = t.changePct >= 0;
                      return (
                        <div
                          key={t.symbol}
                          className="rounded-xl border p-2.5"
                          style={{ borderColor: "var(--ax-border-light)" }}
                        >
                          <p className="text-[10px] font-medium text-slate-500">
                            {t.symbol}
                          </p>
                          <p
                            className="mt-1 text-sm font-bold"
                            style={{ color: "var(--ax-text-primary)" }}
                          >
                            {t.value}
                          </p>
                          <p
                            className="mt-0.5 text-[10px] font-semibold"
                            style={{
                              color: positive
                                ? "var(--ax-positive)"
                                : "var(--ax-negative)",
                            }}
                          >
                            {positive ? "+" : ""}
                            {t.changePct.toFixed(2)}%
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA strip */}
        <section className="mx-auto max-w-6xl px-5 py-14 md:px-6 lg:py-20">
          <div
            className="overflow-hidden rounded-3xl border p-8 md:p-12"
            style={{
              borderColor: "var(--ax-border)",
              background:
                "linear-gradient(135deg, rgba(0,208,156,0.08), rgba(59,130,246,0.06))",
            }}
          >
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <div className="max-w-xl">
                <h3
                  className="text-2xl font-bold sm:text-3xl"
                  style={{ color: "var(--ax-text-primary)" }}
                >
                  Ready to get started?
                </h3>
                <p
                  className="mt-2 text-sm sm:text-base"
                  style={{ color: "var(--ax-text-secondary)" }}
                >
                  Request an account — admin reviews each request and emails your
                  Client ID and password once approved.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/signup"
                  className="inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:shadow-emerald-500/30"
                  style={{ backgroundColor: "var(--ax-primary)" }}
                >
                  Request account
                  <FiArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#signin"
                  className="inline-flex items-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold"
                  style={{
                    borderColor: "var(--ax-border)",
                    color: "var(--ax-text-primary)",
                    backgroundColor: "#fff",
                  }}
                >
                  Sign in
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="border-t"
        style={{ borderColor: "var(--ax-border-light)", backgroundColor: "#fff" }}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-5 py-6 md:flex-row md:items-center md:px-6">
          <div className="flex items-center gap-3">
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{ backgroundColor: "var(--ax-primary)" }}
            >
              AE
            </div>
            <p
              className="text-xs"
              style={{ color: "var(--ax-text-secondary)" }}
            >
              © {new Date().getFullYear()} Ajmera Exchange. All rights reserved.
            </p>
          </div>
          <nav className="flex gap-5 text-xs">
            <a
              href="#features"
              style={{ color: "var(--ax-text-secondary)" }}
            >
              Features
            </a>
            <a
              href="#download"
              style={{ color: "var(--ax-text-secondary)" }}
            >
              Download
            </a>
            <Link
              href="/admin"
              style={{ color: "var(--ax-text-secondary)" }}
            >
              Admin
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border bg-white p-5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-slate-200/60"
      style={{ borderColor: "var(--ax-border)" }}
    >
      <div
        aria-hidden
        className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(closest-side, rgba(0,208,156,0.22), rgba(0,208,156,0))",
        }}
      />
      <div
        className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor: "var(--ax-primary-muted)",
          color: "var(--ax-primary)",
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3
        className="text-base font-semibold"
        style={{ color: "var(--ax-text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="mt-1 text-sm leading-relaxed"
        style={{ color: "var(--ax-text-secondary)" }}
      >
        {text}
      </p>
    </div>
  );
}

function MockChart() {
  // A stylized static candlestick preview — purely decorative.
  const candles = [
    { o: 40, c: 52, h: 58, l: 36 },
    { o: 52, c: 48, h: 55, l: 44 },
    { o: 48, c: 56, h: 60, l: 46 },
    { o: 56, c: 62, h: 66, l: 54 },
    { o: 62, c: 58, h: 64, l: 55 },
    { o: 58, c: 68, h: 72, l: 56 },
    { o: 68, c: 74, h: 78, l: 66 },
    { o: 74, c: 70, h: 76, l: 68 },
    { o: 70, c: 80, h: 84, l: 68 },
    { o: 80, c: 86, h: 90, l: 78 },
    { o: 86, c: 82, h: 88, l: 80 },
    { o: 82, c: 90, h: 94, l: 80 },
    { o: 90, c: 96, h: 100, l: 88 },
    { o: 96, c: 92, h: 98, l: 90 },
    { o: 92, c: 102, h: 106, l: 90 },
  ];
  const width = 280;
  const height = 120;
  const padY = 10;
  const maxY = 115;
  const minY = 30;
  const scale = (v: number) =>
    height - padY - ((v - minY) / (maxY - minY)) * (height - padY * 2);
  const cw = width / candles.length;
  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      style={{ display: "block" }}
    >
      {/* gridlines */}
      {[0.25, 0.5, 0.75].map((p) => (
        <line
          key={p}
          x1={0}
          x2={width}
          y1={height * p}
          y2={height * p}
          stroke="rgba(15,23,42,0.05)"
          strokeDasharray="3,3"
        />
      ))}
      {candles.map((c, i) => {
        const x = i * cw + cw / 2;
        const up = c.c >= c.o;
        const color = up ? "#00B386" : "#E55461";
        const bodyTop = scale(Math.max(c.o, c.c));
        const bodyH = Math.max(2, Math.abs(scale(c.o) - scale(c.c)));
        return (
          <g key={i}>
            <line
              x1={x}
              x2={x}
              y1={scale(c.h)}
              y2={scale(c.l)}
              stroke={color}
              strokeWidth={1}
            />
            <rect
              x={x - cw * 0.3}
              y={bodyTop}
              width={cw * 0.6}
              height={bodyH}
              fill={color}
              rx={1}
            />
          </g>
        );
      })}
      {/* live price line */}
      <line
        x1={0}
        x2={width}
        y1={scale(candles[candles.length - 1].c)}
        y2={scale(candles[candles.length - 1].c)}
        stroke="#00B386"
        strokeDasharray="2,3"
        strokeOpacity={0.5}
      />
    </svg>
  );
}
