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
  FiClock,
  FiDownload,
  FiGlobe,
  FiHeadphones,
  FiLayers,
  FiLock,
  FiLogIn,
  FiMail,
  FiMinus,
  FiPieChart,
  FiPlus,
  FiRefreshCw,
  FiShield,
  FiSmartphone,
  FiTrendingUp,
  FiUserCheck,
  FiZap,
} from "react-icons/fi";

// TODO: replace with the real EAS APK URL when it's ready.
const APK_URL = "#apk-coming-soon";
const SUPPORT_EMAIL = "support@ajmeraexchange.in";

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

const FAQS: { q: string; a: string }[] = [
  {
    q: "How do I get an account?",
    a: "Fill out the signup form with your KYC details (PAN, Aadhaar, bank, signature). The Ajmera Exchange team reviews each request and emails your Client ID and password from support@ajmeraexchange.in once approved.",
  },
  {
    q: "How fresh is the market data?",
    a: "Candles stream from our Angel One integration. Intraday charts refresh every few seconds and the last candle ticks live between fetches using a server-sent-events stream.",
  },
  {
    q: "Can I use the web and Android app at the same time?",
    a: "Yes. Both share the same session and the same backend, so placing an order on one reflects on the other the moment you refresh.",
  },
  {
    q: "What markets are supported?",
    a: "NSE (equities + indices), BSE (SENSEX), and MCX (gold, silver, crude, natural gas, copper and more) — plus mutual funds with live NAV.",
  },
  {
    q: "Where can I reach support?",
    a: `Email ${SUPPORT_EMAIL}. Replies to your credential email land straight in the same inbox.`,
  },
];

export default function HomePage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

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
      {/* Decorative background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[900px]"
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
      <header
        className="sticky top-0 z-20 backdrop-blur-md"
        style={{
          backgroundColor: "rgba(255,255,255,0.72)",
          borderBottom: "1px solid var(--ax-border-light)",
        }}
      >
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
            {[
              { href: "#features", label: "Features" },
              { href: "#how", label: "How it works" },
              { href: "#security", label: "Security" },
              { href: "#faq", label: "FAQ" },
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="hidden rounded-lg px-3 py-1.5 text-xs font-medium hover:bg-slate-100 md:inline"
                style={{ color: "var(--ax-text-secondary)" }}
              >
                {item.label}
              </a>
            ))}
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

      {/* Ticker */}
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
                    style={{ color: positive ? "#00ffa3" : "#ff7a85" }}
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
        <section className="mx-auto grid max-w-6xl items-center gap-10 px-5 pt-12 pb-16 md:px-6 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pt-20 lg:pb-20">
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
              Live charts, orders, mutual funds and a running ledger — all in
              one place. Sign in on the web, or take Ajmera Exchange with you
              on Android. One account. Every market.
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

        {/* Stats strip */}
        <section
          className="border-y"
          style={{
            borderColor: "var(--ax-border-light)",
            backgroundColor: "#fff",
          }}
        >
          <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-5 py-8 text-center md:grid-cols-4 md:px-6">
            <Stat value="3" label="Exchanges · NSE / BSE / MCX" />
            <Stat value="1,000+" label="Symbols tracked live" />
            <Stat value="6" label="Timeframes · 1m → 1W" />
            <Stat value="< 2s" label="Tick-to-chart latency" />
          </div>
        </section>

        {/* How it works */}
        <section id="how" className="mx-auto max-w-6xl px-5 py-16 md:px-6 lg:py-24">
          <div className="mb-12 max-w-2xl">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--ax-primary)" }}
            >
              How it works
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--ax-text-primary)" }}
            >
              Three steps to your first trade.
            </h2>
            <p
              className="mt-3 text-base"
              style={{ color: "var(--ax-text-secondary)" }}
            >
              No cold onboarding. Every account is reviewed by the Ajmera
              Exchange team before it goes live.
            </p>
          </div>
          <div className="relative grid gap-5 md:grid-cols-3">
            <StepCard
              number="01"
              icon={FiUserCheck}
              title="Request your account"
              text="Fill in the signup form with KYC basics — name, email, phone, PAN, Aadhaar, bank and signature."
            />
            <StepCard
              number="02"
              icon={FiMail}
              title="Admin approval"
              text={`Our team verifies your details and emails your Client ID and password from ${SUPPORT_EMAIL}.`}
            />
            <StepCard
              number="03"
              icon={FiZap}
              title="Trade live"
              text="Sign in on web or Android, load real-time charts, and place orders in seconds."
            />
          </div>
        </section>

        {/* Features */}
        <section
          id="features"
          className="mx-auto max-w-6xl px-5 pb-16 md:px-6 lg:pb-24"
        >
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
              The same live data your mobile app serves, laid out beautifully
              for the web.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              icon={FiActivity}
              title="Live charts"
              text="Candlesticks, volume, live price line — intraday through weekly."
            />
            <FeatureCard
              icon={FiBarChart2}
              title="Markets feed"
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
            <FeatureCard
              icon={FiLayers}
              title="Options & F&O"
              text="CE / PE pricing, strike selection and clear side pills across positions."
            />
            <FeatureCard
              icon={FiRefreshCw}
              title="Live tick stream"
              text="Server-sent events update the last candle and LTPs between fetches."
            />
          </div>
        </section>

        {/* Product deep-dives */}
        <section
          className="border-y"
          style={{
            borderColor: "var(--ax-border-light)",
            backgroundColor: "var(--ax-card)",
          }}
        >
          <div className="mx-auto max-w-6xl space-y-20 px-5 py-16 md:px-6 lg:py-24">
            <ProductRow
              badge="Charts"
              title="Real-time candlesticks, right in the browser."
              text="Six timeframes from 1m to 1W. Green/red candles, volume bars, a live price line that follows the stream, and a crosshair that reads out OHLC + volume on hover."
              bullets={[
                "Silent background refresh on a per-range schedule",
                "Live LTP stream updates the last candle's close, high and low",
                "Same Angel One data your mobile app uses",
              ]}
              visual={<ChartVisual />}
            />
            <ProductRow
              reverse
              badge="Orders"
              title="Positions, holdings and a running ledger."
              text="One card shows your total P&L with the invested and current figures alongside. Filter chips for positions, holdings and history — every executed order lands in the ledger."
              bullets={[
                "Total P&L hero with +/- color accents",
                "Exit / sell strip on open positions",
                "One-click CSV export for the full ledger",
              ]}
              visual={<OrdersVisual />}
            />
            <ProductRow
              badge="Markets"
              title="Indices, funds and commodities — one place."
              text="Tap an index to switch the hero chart. The Explore tab scrolls your watchlist, top gainers, top losers, mutual funds and commodity futures as horizontal cards."
              bullets={[
                "NSE · BSE · MCX coverage out of the box",
                "Mutual-fund NAV with change % baked in",
                "Commodities sorted by name or by today's move",
              ]}
              visual={<MarketsVisual />}
            />
          </div>
        </section>

        {/* Security */}
        <section
          id="security"
          className="mx-auto max-w-6xl px-5 py-16 md:px-6 lg:py-24"
        >
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <p
                className="text-[11px] font-semibold uppercase tracking-[0.18em]"
                style={{ color: "var(--ax-primary)" }}
              >
                Security you can feel
              </p>
              <h2
                className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
                style={{ color: "var(--ax-text-primary)" }}
              >
                Built with the basics done right.
              </h2>
              <p
                className="mt-3 text-base"
                style={{ color: "var(--ax-text-secondary)" }}
              >
                No shortcuts on the parts that matter. Passwords are hashed.
                Sessions are HTTP-only cookies. Every account is reviewed
                manually before it ever places a trade.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <SecurityBullet
                  icon={FiLock}
                  title="bcrypt-hashed passwords"
                  text="Plain passwords never touch the database. All hashes are salted."
                />
                <SecurityBullet
                  icon={FiShield}
                  title="HTTP-only sessions"
                  text="Session cookies are inaccessible to client-side scripts."
                />
                <SecurityBullet
                  icon={FiUserCheck}
                  title="Admin-approved onboarding"
                  text="Every signup is reviewed before credentials are issued."
                />
                <SecurityBullet
                  icon={FiMail}
                  title="Branded email delivery"
                  text={`Credentials are sent from ${SUPPORT_EMAIL} — never shared.`}
                />
              </div>
            </div>
            <div
              className="relative overflow-hidden rounded-3xl border p-8"
              style={{
                borderColor: "var(--ax-border)",
                background:
                  "linear-gradient(135deg, rgba(0,208,156,0.08), rgba(59,130,246,0.05))",
              }}
            >
              <div
                aria-hidden
                className="absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(closest-side, rgba(0,208,156,0.25), rgba(0,208,156,0))",
                }}
              />
              <FiShield
                className="h-10 w-10"
                style={{ color: "var(--ax-primary)" }}
              />
              <p
                className="mt-6 text-xl font-semibold leading-snug"
                style={{ color: "var(--ax-text-primary)" }}
              >
                “Trading infrastructure shouldn&apos;t feel intimidating. We
                handle the boring security parts so you can focus on the
                markets.”
              </p>
              <p
                className="mt-4 text-sm font-medium"
                style={{ color: "var(--ax-text-secondary)" }}
              >
                — Ajmera Exchange team
              </p>
              <div
                className="mt-8 flex flex-wrap gap-2 border-t pt-6 text-[10px] font-semibold uppercase tracking-wider"
                style={{
                  borderColor: "rgba(15,23,42,0.08)",
                  color: "var(--ax-text-secondary)",
                }}
              >
                {[
                  "TLS everywhere",
                  "No 3rd-party sharing",
                  "Manual onboarding",
                  "Audit trail",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border bg-white px-3 py-1"
                    style={{ borderColor: "var(--ax-border)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Download */}
        <section
          id="download"
          className="border-y"
          style={{
            borderColor: "var(--ax-border-light)",
            backgroundColor: "#0f172a",
          }}
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
                your phone. Your web and mobile accounts share the same
                session.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={APK_URL}
                  target={isApkReady ? "_blank" : undefined}
                  rel={isApkReady ? "noreferrer" : undefined}
                  aria-disabled={!isApkReady}
                  className="inline-flex items-center gap-3 rounded-xl px-5 py-3.5 text-sm font-semibold shadow-lg transition"
                  style={{
                    backgroundColor: isApkReady
                      ? "var(--ax-primary)"
                      : "#334155",
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
                  <FiZap
                    className="h-5 w-5"
                    style={{ color: "#5eead4" }}
                  />
                  <span className="flex flex-col items-start leading-tight">
                    <span className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
                      Or open
                    </span>
                    <span>Web version</span>
                  </span>
                </a>
              </div>
              <div className="mt-8 grid grid-cols-3 gap-3 text-center">
                {[
                  { icon: FiGlobe, label: "NSE · BSE · MCX" },
                  { icon: FiClock, label: "Live · < 2s latency" },
                  { icon: FiHeadphones, label: "Email support" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="rounded-xl border border-slate-700 bg-slate-800/40 px-3 py-3"
                  >
                    <Icon
                      className="mx-auto h-4 w-4"
                      style={{ color: "#5eead4" }}
                    />
                    <p className="mt-2 text-[11px] font-medium text-slate-300">
                      {label}
                    </p>
                  </div>
                ))}
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

        {/* Testimonial */}
        <section className="mx-auto max-w-5xl px-5 py-16 md:px-6 lg:py-24">
          <div
            className="relative overflow-hidden rounded-3xl border p-8 text-center md:p-12"
            style={{
              borderColor: "var(--ax-border)",
              background:
                "linear-gradient(135deg, rgba(0,208,156,0.06), rgba(59,130,246,0.04))",
            }}
          >
            <svg
              aria-hidden
              width="40"
              height="30"
              viewBox="0 0 40 30"
              className="mx-auto mb-6 opacity-20"
              style={{ color: "var(--ax-primary)" }}
            >
              <path
                d="M9 30C3.4 30 0 26.6 0 21C0 15.4 3.4 12 9 12C10.4 12 11.7 12.3 13 12.7C12 5.8 7 0 0 0V4C4 4 7 7 7 11C7 11.3 7 11.7 6.9 12C4 13.5 2 16.5 2 21C2 26.6 5.4 30 9 30ZM31 30C25.4 30 22 26.6 22 21C22 15.4 25.4 12 31 12C32.4 12 33.7 12.3 35 12.7C34 5.8 29 0 22 0V4C26 4 29 7 29 11C29 11.3 29 11.7 28.9 12C26 13.5 24 16.5 24 21C24 26.6 27.4 30 31 30Z"
                fill="currentColor"
              />
            </svg>
            <p
              className="mx-auto max-w-3xl text-xl font-medium leading-relaxed sm:text-2xl"
              style={{ color: "var(--ax-text-primary)" }}
            >
              Everything you need — charts, orders, funds, ledger — without
              the noise. Clean on the web, equally clean on Android.
            </p>
            <div className="mt-6 flex items-center justify-center gap-3">
              <div
                className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: "var(--ax-primary)" }}
              >
                AE
              </div>
              <div className="text-left">
                <p
                  className="text-sm font-semibold"
                  style={{ color: "var(--ax-text-primary)" }}
                >
                  Ajmera Exchange
                </p>
                <p
                  className="text-xs"
                  style={{ color: "var(--ax-text-secondary)" }}
                >
                  Product mandate
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          id="faq"
          className="mx-auto max-w-4xl px-5 py-16 md:px-6 lg:py-24"
        >
          <div className="mb-10 text-center">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.18em]"
              style={{ color: "var(--ax-primary)" }}
            >
              Frequently asked
            </p>
            <h2
              className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              style={{ color: "var(--ax-text-primary)" }}
            >
              Good questions, quick answers.
            </h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((item, i) => {
              const open = openFaq === i;
              return (
                <div
                  key={item.q}
                  className="overflow-hidden rounded-2xl border bg-white transition"
                  style={{ borderColor: "var(--ax-border)" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span
                      className="text-sm font-semibold"
                      style={{ color: "var(--ax-text-primary)" }}
                    >
                      {item.q}
                    </span>
                    <span
                      className="flex h-7 w-7 items-center justify-center rounded-full border"
                      style={{
                        borderColor: "var(--ax-border)",
                        color: "var(--ax-primary)",
                      }}
                    >
                      {open ? (
                        <FiMinus className="h-3.5 w-3.5" />
                      ) : (
                        <FiPlus className="h-3.5 w-3.5" />
                      )}
                    </span>
                  </button>
                  {open ? (
                    <p
                      className="px-5 pb-5 text-sm leading-relaxed"
                      style={{ color: "var(--ax-text-secondary)" }}
                    >
                      {item.a}
                    </p>
                  ) : null}
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-6xl px-5 pb-16 md:px-6 lg:pb-24">
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
                  Request an account — the Ajmera Exchange team reviews every
                  request and emails credentials from {SUPPORT_EMAIL} once
                  approved.
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

      {/* Footer */}
      <footer
        className="border-t"
        style={{
          borderColor: "var(--ax-border-light)",
          backgroundColor: "#0f172a",
          color: "#cbd5e1",
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-6">
          <div className="grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md shadow-emerald-500/20"
                  style={{ backgroundColor: "var(--ax-primary)" }}
                >
                  AE
                </div>
                <div className="leading-none">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: "#5eead4" }}
                  >
                    Ajmera
                  </p>
                  <p className="mt-0.5 text-lg font-bold text-white">
                    Exchange
                  </p>
                </div>
              </div>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-slate-400">
                Live markets, orders, mutual funds and a running ledger — on
                web and Android, backed by the same data pipeline.
              </p>
              <a
                href={`mailto:${SUPPORT_EMAIL}`}
                className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-xs font-medium text-slate-200 hover:bg-slate-800"
              >
                <FiMail className="h-3.5 w-3.5" />
                {SUPPORT_EMAIL}
              </a>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Product
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#features" className="hover:text-white">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#how" className="hover:text-white">
                    How it works
                  </a>
                </li>
                <li>
                  <a href="#security" className="hover:text-white">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#download" className="hover:text-white">
                    Download APK
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Account
              </p>
              <ul className="mt-4 space-y-2 text-sm text-slate-400">
                <li>
                  <a href="#signin" className="hover:text-white">
                    Sign in
                  </a>
                </li>
                <li>
                  <Link href="/signup" className="hover:text-white">
                    Request account
                  </Link>
                </li>
                <li>
                  <Link href="/admin" className="hover:text-white">
                    Admin panel
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${SUPPORT_EMAIL}`}
                    className="hover:text-white"
                  >
                    Contact support
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start justify-between gap-2 border-t border-slate-800 pt-6 text-xs text-slate-500 md:flex-row md:items-center">
            <p>© {new Date().getFullYear()} Ajmera Exchange. All rights reserved.</p>
            <p>
              Investments in securities market are subject to market risks.
              Read all scheme related documents carefully.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ───────── Presentational helpers ───────── */

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p
        className="text-3xl font-bold tracking-tight sm:text-4xl"
        style={{
          backgroundImage:
            "linear-gradient(90deg, var(--ax-primary), #3B82F6)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        {value}
      </p>
      <p
        className="mt-1 text-xs font-medium"
        style={{ color: "var(--ax-text-secondary)" }}
      >
        {label}
      </p>
    </div>
  );
}

function StepCard({
  number,
  icon: Icon,
  title,
  text,
}: {
  number: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border bg-white p-6"
      style={{ borderColor: "var(--ax-border)" }}
    >
      <span
        className="absolute right-4 top-4 text-4xl font-bold opacity-10"
        style={{ color: "var(--ax-primary)" }}
      >
        {number}
      </span>
      <div
        className="flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          backgroundColor: "var(--ax-primary-muted)",
          color: "var(--ax-primary)",
        }}
      >
        <Icon className="h-5 w-5" />
      </div>
      <h3
        className="mt-5 text-base font-semibold"
        style={{ color: "var(--ax-text-primary)" }}
      >
        {title}
      </h3>
      <p
        className="mt-2 text-sm leading-relaxed"
        style={{ color: "var(--ax-text-secondary)" }}
      >
        {text}
      </p>
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

function ProductRow({
  badge,
  title,
  text,
  bullets,
  visual,
  reverse,
}: {
  badge: string;
  title: string;
  text: string;
  bullets: string[];
  visual: React.ReactNode;
  reverse?: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${
        reverse ? "lg:[direction:rtl]" : ""
      }`}
    >
      <div className={reverse ? "lg:[direction:ltr]" : ""}>
        <span
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold"
          style={{
            backgroundColor: "var(--ax-primary-muted)",
            color: "var(--ax-primary)",
          }}
        >
          {badge}
        </span>
        <h3
          className="mt-4 text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--ax-text-primary)" }}
        >
          {title}
        </h3>
        <p
          className="mt-3 max-w-xl text-base leading-relaxed"
          style={{ color: "var(--ax-text-secondary)" }}
        >
          {text}
        </p>
        <ul className="mt-6 space-y-2.5">
          {bullets.map((b) => (
            <li
              key={b}
              className="flex items-start gap-2.5 text-sm"
              style={{ color: "var(--ax-text-primary)" }}
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                style={{
                  backgroundColor: "var(--ax-primary-muted)",
                  color: "var(--ax-primary)",
                }}
              >
                <FiCheck className="h-3 w-3" strokeWidth={3} />
              </span>
              {b}
            </li>
          ))}
        </ul>
      </div>
      <div className={reverse ? "lg:[direction:ltr]" : ""}>{visual}</div>
    </div>
  );
}

function SecurityBullet({
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
      className="rounded-2xl border bg-white p-4"
      style={{ borderColor: "var(--ax-border)" }}
    >
      <div
        className="flex h-9 w-9 items-center justify-center rounded-xl"
        style={{
          backgroundColor: "var(--ax-primary-muted)",
          color: "var(--ax-primary)",
        }}
      >
        <Icon className="h-4 w-4" />
      </div>
      <p
        className="mt-3 text-sm font-semibold"
        style={{ color: "var(--ax-text-primary)" }}
      >
        {title}
      </p>
      <p
        className="mt-1 text-xs leading-relaxed"
        style={{ color: "var(--ax-text-secondary)" }}
      >
        {text}
      </p>
    </div>
  );
}

/* ───────── Decorative visuals ───────── */

function ChartVisual() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl border bg-white p-4 shadow-xl shadow-slate-200/70"
      style={{ borderColor: "var(--ax-border)" }}
    >
      <div className="flex items-center justify-between text-[11px]">
        <div className="flex items-center gap-1.5">
          <span
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ backgroundColor: "var(--ax-positive)" }}
          />
          <span
            className="font-bold tracking-wider"
            style={{ color: "var(--ax-positive)" }}
          >
            LIVE · 5m
          </span>
        </div>
        <span
          className="rounded px-2 py-0.5 text-[10px] font-bold text-white"
          style={{ backgroundColor: "var(--ax-positive)" }}
        >
          24,583.10
        </span>
      </div>
      <MockChart large />
      <div className="mt-3 flex gap-1 rounded-xl bg-slate-50 p-1">
        {["1m", "5m", "15m", "1H", "1D", "1W"].map((t, i) => (
          <span
            key={t}
            className="flex-1 rounded-lg py-1.5 text-center text-[11px] font-semibold"
            style={
              i === 1
                ? {
                    backgroundColor: "#fff",
                    color: "var(--ax-primary)",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
                  }
                : { color: "var(--ax-text-secondary)" }
            }
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function OrdersVisual() {
  const rows = [
    { sym: "RELIANCE", side: "BUY", qty: 10, pnl: 1240, pct: 2.1 },
    { sym: "TCS", side: "BUY", qty: 5, pnl: 420, pct: 0.9 },
    { sym: "HDFCBANK", side: "SELL", qty: 15, pnl: -310, pct: -0.6 },
  ];
  return (
    <div
      className="overflow-hidden rounded-3xl border bg-white shadow-xl shadow-slate-200/70"
      style={{ borderColor: "var(--ax-border)" }}
    >
      <div
        className="flex items-center justify-between gap-4 border-l-4 p-5"
        style={{
          borderLeftColor: "var(--ax-positive)",
        }}
      >
        <div>
          <p
            className="text-[10px] font-semibold uppercase tracking-wider"
            style={{ color: "var(--ax-text-secondary)" }}
          >
            Total P&amp;L
          </p>
          <p
            className="mt-1 text-2xl font-bold"
            style={{ color: "var(--ax-positive)" }}
          >
            +₹1,350.00
          </p>
          <p
            className="text-xs font-semibold"
            style={{ color: "var(--ax-positive)" }}
          >
            +1.42%
          </p>
        </div>
        <div className="text-right text-xs">
          <p style={{ color: "var(--ax-text-secondary)" }}>Invested</p>
          <p
            className="font-bold"
            style={{ color: "var(--ax-text-primary)" }}
          >
            ₹95,120
          </p>
          <p className="mt-1" style={{ color: "var(--ax-text-secondary)" }}>
            Current
          </p>
          <p
            className="font-bold"
            style={{ color: "var(--ax-text-primary)" }}
          >
            ₹96,470
          </p>
        </div>
      </div>
      <div
        className="flex gap-2 px-5 py-3"
        style={{ borderTop: "1px solid var(--ax-border)" }}
      >
        {["Positions", "Holdings", "History"].map((t, i) => (
          <span
            key={t}
            className="rounded-full border px-3 py-1 text-[11px] font-semibold"
            style={
              i === 0
                ? {
                    backgroundColor: "var(--ax-primary)",
                    borderColor: "var(--ax-primary)",
                    color: "#fff",
                  }
                : {
                    borderColor: "var(--ax-border)",
                    color: "var(--ax-text-secondary)",
                  }
            }
          >
            {t}
          </span>
        ))}
      </div>
      <div className="divide-y" style={{ borderColor: "var(--ax-border)" }}>
        {rows.map((r) => (
          <div
            key={r.sym}
            className="flex items-center justify-between px-5 py-3"
          >
            <div>
              <div className="flex items-center gap-2">
                <p
                  className="text-sm font-bold"
                  style={{ color: "var(--ax-text-primary)" }}
                >
                  {r.sym}
                </p>
                <span
                  className="rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wider"
                  style={
                    r.side === "BUY"
                      ? {
                          backgroundColor: "rgba(0,179,134,0.12)",
                          color: "var(--ax-positive)",
                        }
                      : {
                          backgroundColor: "rgba(229,84,97,0.12)",
                          color: "var(--ax-negative)",
                        }
                  }
                >
                  {r.side}
                </span>
              </div>
              <p
                className="mt-0.5 text-[11px]"
                style={{ color: "var(--ax-text-secondary)" }}
              >
                Qty {r.qty}
              </p>
            </div>
            <p
              className="text-sm font-bold"
              style={{
                color: r.pnl >= 0 ? "var(--ax-positive)" : "var(--ax-negative)",
              }}
            >
              {r.pnl >= 0 ? "+" : ""}₹{Math.abs(r.pnl).toLocaleString("en-IN")}
              <span className="ml-1 text-[10px]">
                ({r.pnl >= 0 ? "+" : ""}
                {r.pct.toFixed(1)}%)
              </span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function MarketsVisual() {
  const items = [
    { name: "NIFTY 50", value: "24,583.10", pct: 0.42, accent: "var(--ax-positive)" },
    { name: "BANK NIFTY", value: "52,110.85", pct: 0.71, accent: "var(--ax-positive)" },
    { name: "SENSEX", value: "80,920.15", pct: 0.38, accent: "var(--ax-positive)" },
    { name: "GOLD", value: "74,210.00", pct: 0.95, accent: "var(--ax-positive)" },
    { name: "SILVER", value: "89,345.00", pct: 1.34, accent: "var(--ax-positive)" },
    { name: "CRUDE", value: "6,728.00", pct: -0.46, accent: "var(--ax-negative)" },
  ];
  return (
    <div
      className="rounded-3xl border bg-white p-5 shadow-xl shadow-slate-200/70"
      style={{ borderColor: "var(--ax-border)" }}
    >
      <div className="flex items-center justify-between">
        <p
          className="text-sm font-semibold"
          style={{ color: "var(--ax-text-primary)" }}
        >
          Markets feed
        </p>
        <span
          className="flex items-center gap-1.5 text-[10px] font-bold"
          style={{ color: "var(--ax-positive)" }}
        >
          <span
            className="inline-block h-1.5 w-1.5 animate-pulse rounded-full"
            style={{ backgroundColor: "var(--ax-positive)" }}
          />
          LIVE
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
        {items.map((it) => {
          const positive = it.pct >= 0;
          return (
            <div
              key={it.name}
              className="rounded-xl border p-3"
              style={{ borderColor: "var(--ax-border-light)" }}
            >
              <p
                className="text-[10px] font-medium"
                style={{ color: "var(--ax-text-secondary)" }}
              >
                {it.name}
              </p>
              <p
                className="mt-1 text-sm font-bold"
                style={{ color: "var(--ax-text-primary)" }}
              >
                {it.value}
              </p>
              <p
                className="mt-0.5 text-[10px] font-semibold"
                style={{ color: it.accent }}
              >
                {positive ? "+" : ""}
                {it.pct.toFixed(2)}%
              </p>
            </div>
          );
        })}
      </div>
      <div
        className="mt-4 flex items-center justify-between border-t pt-3 text-[11px]"
        style={{
          borderColor: "var(--ax-border)",
          color: "var(--ax-text-secondary)",
        }}
      >
        <span className="flex items-center gap-1">
          <FiTrendingUp
            className="h-3 w-3"
            style={{ color: "var(--ax-positive)" }}
          />
          5 up · 1 down
        </span>
        <span>Updated a moment ago</span>
      </div>
    </div>
  );
}

function MockChart({ large = false }: { large?: boolean }) {
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
  const height = large ? 180 : 120;
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
