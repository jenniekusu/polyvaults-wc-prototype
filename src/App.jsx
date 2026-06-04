import { useState, useEffect, useMemo, useCallback } from "react";
import {
  mockUser,
  credentialsList,
  campaignSteps,
  wcIndexes,
  explorerIndexes,
  leaderboard,
  faqItems,
} from "./data/mockData";

/* ── Logo ── */
function Logo() {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className="w-7 h-7">
      <path d="M8 4h16v2.5H10.5L18 14h-3.5L6 4.5V4h2zm16 24H8v-2.5h13.5L14 18h3.5L26 27.5V28h-2z" />
      <path d="M4 8v16h2.5V10.5L14 18h-3.5L4 8zm24 16V8h-2.5v13.5L18 14h3.5L28 24z" />
    </svg>
  );
}

/* ── Arrow icon ── */
function ArrowRight({ className = "w-3.5 h-3.5" }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
  );
}

/* ── External link icon ── */
function ExternalIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  );
}

/* ── Countdown hook ── */
function useCountdown(targetDate) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, new Date(targetDate).getTime() - now);
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}

function CountdownInline({ targetDate, label }) {
  const { days, hours, mins, secs } = useCountdown(targetDate);
  const pad = (n) => String(n).padStart(2, "0");
  return (
    <span className="font-mono text-xs text-ink-muted">
      {label}{" "}
      <span className="text-ink font-semibold">
        {pad(days)}d {pad(hours)}h {pad(mins)}m {pad(secs)}s
      </span>
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   NAV BAR
   ══════════════════════════════════════════════════════════════════ */
function Navbar() {
  return (
    <nav className="flex items-center justify-between px-5 md:px-8 py-3 border-b border-border bg-cream/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <Logo />
        <span className="font-semibold text-ink text-sm tracking-tight">Polyvaults</span>
      </div>
      <div className="hidden md:flex items-center gap-6 text-sm text-ink-muted">
        <a href="https://app.polyvaults.ai" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">Strategies</a>
        <a href="https://app.polyvaults.ai" target="_blank" rel="noopener noreferrer" className="hover:text-ink transition-colors">Dashboard</a>
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden md:inline text-xs text-ink-faint">jenniekusu.eth</span>
        <button className="px-4 py-1.5 bg-ink text-cream text-xs font-medium rounded-full hover:bg-ink-light transition-colors">
          Connect
        </button>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════════
   HERO BANNER
   ══════════════════════════════════════════════════════════════════ */
function HeroBanner() {
  return (
    <div className="bg-warm-white border-b border-border">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-5 md:py-7">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl font-semibold text-ink leading-tight tracking-tight">
              Football Manager World Cup
            </h1>
            <p className="text-ink-muted text-sm mt-1 max-w-lg">
              Name your fund. Earn your credentials. Pick your squad. Compete for{" "}
              <span className="text-amber font-semibold">$20,000 USDC</span>.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-1.5 shrink-0">
            <div className="flex gap-4">
              <CountdownInline targetDate="2026-06-11T00:00:00Z" label="Kickoff" />
              <CountdownInline targetDate="2026-07-19T00:00:00Z" label="Final" />
            </div>
            <div className="text-[11px] text-ink-faint">
              🏆 Performance $16,000 · 🎖 Licensed $4,000
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   FUND STATUS BAR
   ══════════════════════════════════════════════════════════════════ */
function FundStatusBar() {
  const u = mockUser;
  return (
    <div className="border-b border-border bg-cream">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-2.5 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-ink text-sm">{u.fundName}</span>
          <button className="text-ink-faint hover:text-ink transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
        <div className="flex items-center gap-4 text-ink-muted font-mono">
          <span>AUM <span className="text-ink font-semibold">${u.aum}</span></span>
          <span>ROI <span className="text-green font-semibold">+{u.roiPct}%</span></span>
          <span>Rank <span className="text-ink font-semibold">#{u.rank}/{u.totalParticipants.toLocaleString()}</span></span>
          <span>💰×{u.depositMultiplier} 🌍×{u.explorerMultiplier}</span>
        </div>
        <div className="flex items-center gap-1.5 ml-auto">
          {u.squad.map((t) => (
            <span key={t.code} className={t.alive ? "" : "opacity-25 line-through"} title={t.name}>
              {t.flag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB SYSTEM
   ══════════════════════════════════════════════════════════════════ */
const TABS = [
  { id: "intro", label: "Overview" },
  { id: "credentials", label: "Credentials", badge: "5/6" },
  { id: "strategy", label: "Strategy" },
  { id: "indexes", label: "Indexes" },
  { id: "calculator", label: "Calculator" },
  { id: "rankings", label: "Rankings" },
  { id: "report", label: "Fund Report" },
  { id: "rules", label: "Rules" },
];

function TabBar({ active, onSelect }) {
  return (
    <div className="border-b border-border bg-cream sticky top-[49px] z-40">
      <div className="max-w-6xl mx-auto px-5 md:px-8">
        <div className="flex gap-1 overflow-x-auto py-2 -mb-px scrollbar-none">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSelect(tab.id)}
              className={`shrink-0 px-4 py-2 text-sm font-medium rounded-full transition-all ${
                active === tab.id
                  ? "bg-ink text-cream"
                  : "text-ink-muted hover:bg-cream-dark hover:text-ink"
              }`}
            >
              {tab.label}
              {tab.badge && (
                <span className={`ml-1.5 text-[10px] px-1.5 py-0.5 rounded-full font-mono ${
                  active === tab.id ? "bg-cream/20 text-cream" : "bg-amber-bg text-amber"
                }`}>
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB: Campaign Intro (Overview)
   ══════════════════════════════════════════════════════════════════ */
function IntroTab({ onNavigate }) {
  const u = mockUser;
  const completedSteps = [true, u.credentialsCompleted >= 6, !!u.wcIndexChoice, true, true];

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-serif text-2xl font-semibold text-ink">How It Works</h2>
        <p className="text-ink-muted text-sm mt-1 max-w-2xl">
          The Football Manager World Cup is a 5-week campaign running alongside FIFA World Cup 2026.
          You play as a fund manager — pick teams, track their performance, earn credentials, and
          compete for a share of the <span className="text-amber font-semibold">$20,000 USDC</span> prize pool.
        </p>
      </div>

      <div className="space-y-3">
        {campaignSteps.map((step, i) => {
          const done = completedSteps[i];
          const isNext = !done && (i === 0 || completedSteps[i - 1]);
          return (
            <div
              key={step.number}
              className={`rounded-xl border p-5 transition-all ${
                isNext
                  ? "bg-amber-bg border-amber-light/40 shadow-sm"
                  : done
                    ? "bg-green-bg border-green/15"
                    : "bg-warm-white border-border"
              }`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold ${
                  done
                    ? "bg-green/10 text-green"
                    : isNext
                      ? "bg-amber/10 text-amber"
                      : "bg-cream-darker text-ink-faint"
                }`}>
                  {done ? "✓" : step.number}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold text-ink text-sm">{step.title}</h3>
                    {done && (
                      <span className="text-[10px] px-2 py-0.5 bg-green/10 text-green rounded-full font-medium shrink-0">
                        Completed
                      </span>
                    )}
                  </div>
                  <p className="text-ink-muted text-sm mt-1 leading-relaxed">{step.description}</p>
                  {(isNext || !done) && (
                    <button
                      onClick={() => onNavigate(step.tab)}
                      className={`mt-3 inline-flex items-center gap-1.5 text-xs font-medium transition-colors ${
                        isNext
                          ? "px-4 py-2 bg-ink text-cream rounded-full hover:bg-ink-light"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      {isNext ? "Start This Step" : "Go to Step"}
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                  {done && !isNext && (
                    <button
                      onClick={() => onNavigate(step.tab)}
                      className="mt-2 text-xs text-ink-faint hover:text-ink transition-colors inline-flex items-center gap-1"
                    >
                      View details <ArrowRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 rounded-xl bg-ink text-cream p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <p className="font-serif text-lg font-semibold">Ready to compete?</p>
          <p className="text-cream/60 text-sm mt-0.5">
            Complete all credentials to unlock the full $20,000 prize pool.
          </p>
        </div>
        <button
          onClick={() => onNavigate("credentials")}
          className="px-6 py-2.5 bg-cream text-ink text-sm font-medium rounded-full hover:bg-cream-dark transition-colors shrink-0"
        >
          Start Earning Credentials →
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB: Credentials
   ══════════════════════════════════════════════════════════════════ */
function CredentialsTab({ credentials, onComplete, onNavigate }) {
  const completed = Object.values(credentials).filter((c) => c.earned).length;
  const [copied, setCopied] = useState(false);

  const handleAction = useCallback((cred) => {
    if (cred.actionType === "external") {
      window.open(cred.actionUrl, "_blank", "noopener,noreferrer");
    } else if (cred.actionType === "copy") {
      navigator.clipboard.writeText(cred.copyValue).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    } else if (cred.actionType === "internal") {
      onNavigate(cred.targetTab);
    }
  }, [onNavigate]);

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-ink">Manager Credentials</h2>
          <p className="text-ink-muted text-sm mt-0.5">Complete tasks to become a Licensed Manager</p>
        </div>
        <div className="text-right">
          <span className="text-2xl font-serif font-bold text-amber">{completed}/6</span>
          <p className="text-xs text-ink-faint mt-0.5">
            {completed >= 6 ? "Licensed!" : `${6 - completed} remaining`}
          </p>
        </div>
      </div>

      {/* progress bar */}
      <div className="mb-5 rounded-full bg-cream-darker h-2 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber to-amber-light rounded-full transition-all duration-500"
          style={{ width: `${(completed / 6) * 100}%` }}
        />
      </div>

      <div className="space-y-3">
        {credentialsList.map((c) => {
          const cred = credentials[c.key];
          const earned = cred.earned;
          const isLocked = c.key === "pressConference" && !earned;
          return (
            <div
              key={c.key}
              className={`rounded-xl border p-4 transition-all ${
                earned
                  ? "bg-green-bg border-green/15"
                  : isLocked
                    ? "bg-cream-dark border-border opacity-50"
                    : "bg-white border-border hover:border-cream-darker"
              }`}
            >
              <div className="flex items-center gap-4">
                <span className="text-xl shrink-0">{c.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className={`font-medium text-sm ${earned ? "text-ink" : isLocked ? "text-ink-faint" : "text-ink"}`}>
                      {c.name}
                    </p>
                    {earned && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-green/10 text-green rounded-full font-mono">
                        {cred.date}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-ink-muted mt-0.5">{c.description}</p>
                </div>
                <div className="shrink-0">
                  {earned ? (
                    <span className="w-8 h-8 rounded-full bg-green/10 text-green flex items-center justify-center text-sm font-bold">
                      ✓
                    </span>
                  ) : isLocked ? (
                    <span className="text-ink-faint text-sm">🔒</span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleAction(c)}
                        className="px-3.5 py-1.5 bg-ink text-cream text-xs font-medium rounded-full hover:bg-ink-light transition-colors inline-flex items-center gap-1.5"
                      >
                        {c.actionType === "copy" && copied ? "Copied!" : c.actionLabel}
                        {c.actionType === "external" && <ExternalIcon />}
                      </button>
                      <button
                        onClick={() => onComplete(c.key)}
                        className="px-3 py-1.5 border border-green/30 text-green text-xs font-medium rounded-full hover:bg-green-bg transition-colors"
                        title="Mark as verified"
                      >
                        Verify ✓
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {isLocked && c.lockedHint && (
                <p className="text-[10px] text-ink-faint font-mono mt-2 ml-9">{c.lockedHint}</p>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-5 text-center">
        {completed >= 6 ? (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-bg border border-green/20 text-green text-sm font-medium">
            ✅ Licensed Manager — Eligible for Prize Pool
          </span>
        ) : (
          <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-bg border border-amber-light/30 text-amber text-sm font-medium">
            ⏳ {6 - completed} credential{6 - completed > 1 ? "s" : ""} remaining to unlock Licensed Pool
          </span>
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB: Strategy
   ══════════════════════════════════════════════════════════════════ */
function StrategyTab() {
  const [selected, setSelected] = useState(mockUser.wcIndexChoice);
  const [confirmed, setConfirmed] = useState(!!mockUser.wcIndexChoice);
  const u = mockUser;

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-ink">Choose Your Strategy</h2>
          <p className="text-ink-muted text-sm mt-0.5">Select a World Cup Index or build a custom squad</p>
        </div>
        {confirmed && (
          <span className="px-3 py-1.5 bg-green-bg border border-green/15 text-green text-xs font-medium rounded-full">
            ✓ Strategy Active
          </span>
        )}
      </div>

      {/* current squad display when confirmed */}
      {confirmed && (
        <div className="mb-5 rounded-xl bg-warm-white border border-border p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-ink-faint uppercase tracking-wider mb-1">Your Active Squad</p>
              <div className="flex items-center gap-2">
                {u.squad.map((t) => (
                  <span
                    key={t.code}
                    className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium ${
                      t.alive
                        ? "bg-green-bg text-ink border border-green/15"
                        : "bg-red-bg text-ink-faint line-through border border-red-muted/10"
                    }`}
                  >
                    {t.flag} {t.name}
                  </span>
                ))}
              </div>
            </div>
            <button
              onClick={() => setConfirmed(false)}
              className="text-xs text-ink-muted hover:text-ink transition-colors underline underline-offset-2"
            >
              Change
            </button>
          </div>
          <div className="mt-3 pt-3 border-t border-border flex items-center gap-4 text-xs text-ink-muted">
            <span>Next: <span className="text-ink font-medium">{u.nextRound.name}</span> · {u.nextRound.date}</span>
            <span>Alive: {u.squad.filter(t => t.alive).length}/{u.squad.length} teams</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {wcIndexes.map((idx) => (
          <button
            key={idx.id}
            onClick={() => { setSelected(idx.id); setConfirmed(false); }}
            className={`text-left rounded-xl p-5 border-2 transition-all ${
              selected === idx.id
                ? "border-ink bg-white shadow-sm"
                : "border-border bg-warm-white hover:border-cream-darker"
            }`}
          >
            <span className="text-2xl block mb-2">{idx.icon}</span>
            <p className="text-ink font-semibold text-sm">{idx.name}</p>
            {idx.teams && <p className="text-base mt-1 leading-tight">{idx.teams}</p>}
            <p className="text-xs text-ink-muted mt-1">{idx.tagline}</p>
            {idx.isCustom && (
              <span className="inline-block mt-2 text-amber text-xs font-medium">Select Teams →</span>
            )}
            {selected === idx.id && (
              <div className="mt-2 flex items-center gap-1.5 text-ink text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-ink" />
                Selected
              </div>
            )}
          </button>
        ))}
      </div>

      <div className="mt-5 flex flex-col md:flex-row gap-3 justify-center items-center">
        {!confirmed && (
          <button
            onClick={() => setConfirmed(true)}
            className="px-6 py-2.5 bg-ink text-cream text-sm font-medium rounded-full hover:bg-ink-light transition-colors"
          >
            Confirm Strategy →
          </button>
        )}
        <a
          href="https://app.polyvaults.ai"
          target="_blank"
          rel="noopener noreferrer"
          className="px-5 py-2.5 border border-border text-ink-muted text-sm font-medium rounded-full hover:bg-cream-dark hover:text-ink transition-colors inline-flex items-center gap-1.5"
        >
          Open in PolyVaults App <ExternalIcon />
        </a>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB: Indexes (Explorer)
   ══════════════════════════════════════════════════════════════════ */
function IndexesTab() {
  const u = mockUser;
  const participatingCount = Object.values(u.explorerIndexes).filter((e) => e.participating).length;
  const multiplierMap = { 1: 1.0, 2: 1.25, 3: 1.5, 4: 2.0 };
  const currentMult = multiplierMap[participatingCount] || 1.0;

  return (
    <div>
      <div className="flex items-start justify-between mb-5">
        <div>
          <h2 className="font-serif text-2xl font-semibold text-ink">Explore More Indexes</h2>
          <p className="text-ink-muted text-sm mt-0.5">Each additional Index boosts your Explorer Multiplier</p>
        </div>
        <span className="px-3 py-1.5 rounded-full bg-amber-bg text-amber text-xs font-mono font-semibold">
          🌍×{currentMult} ({participatingCount}/4)
        </span>
      </div>

      <div className="flex items-center gap-4 mb-5 text-xs text-ink-faint font-mono">
        {[1,2,3,4].map((n) => (
          <span key={n} className={participatingCount >= n ? "text-amber font-semibold" : ""}>
            {n} = {multiplierMap[n]}×
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {explorerIndexes.map((idx) => {
          const userIdx = u.explorerIndexes[idx.id];
          const active = userIdx?.participating;
          return (
            <div key={idx.id} className={`rounded-xl p-4 border transition-all ${
              active ? "bg-green-bg border-green/20" : "bg-warm-white border-border hover:border-cream-darker"
            }`}>
              <p className="text-ink font-semibold text-sm">{idx.name}</p>
              <p className={`text-xl font-mono font-bold mt-1 mb-3 ${idx.roi >= 0 ? "text-green" : "text-red-muted"}`}>
                {idx.roi >= 0 ? "+" : ""}{idx.roi}%
              </p>
              {active ? (
                <span className="text-xs text-green font-medium">✓ Participating ${userIdx.amount}</span>
              ) : (
                <a
                  href="https://app.polyvaults.ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-ink font-medium hover:text-ink-light transition-colors inline-flex items-center gap-1 px-3 py-1.5 bg-cream-dark rounded-full"
                >
                  Join — min $50 <ExternalIcon />
                </a>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB: Calculator
   ══════════════════════════════════════════════════════════════════ */
function CalculatorTab() {
  const [deposit, setDeposit] = useState(500);
  const [indexes, setIndexes] = useState(2);

  const calc = useMemo(() => {
    let depMult;
    if (deposit >= 1000) depMult = 3.0;
    else if (deposit >= 500) depMult = 2.0;
    else if (deposit >= 200) depMult = 1.5;
    else if (deposit >= 100) depMult = 1.0;
    else depMult = 0.5;
    const expMap = { 1: 1.0, 2: 1.25, 3: 1.5, 4: 2.0 };
    const expMult = expMap[indexes] || 1.0;
    const combined = depMult * expMult;
    return { depMult, expMult, combined, estimated: 1000 * combined };
  }, [deposit, indexes]);

  return (
    <div className="max-w-xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl font-semibold text-ink">Calculate Your Edge</h2>
        <p className="text-ink-muted text-sm mt-0.5">See how deposits and indexes affect your prize</p>
      </div>
      <div className="bg-white rounded-2xl border border-border p-6">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-xs text-ink-muted mb-1.5 font-medium">Deposit Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint text-sm">$</span>
              <input
                type="number"
                value={deposit}
                onChange={(e) => setDeposit(Math.max(0, Number(e.target.value)))}
                className="w-full bg-warm-white border border-border rounded-xl pl-7 pr-3 py-2.5 text-ink font-mono text-sm focus:border-ink focus:outline-none transition-colors"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs text-ink-muted mb-1.5 font-medium">Existing Indexes</label>
            <select
              value={indexes}
              onChange={(e) => setIndexes(Number(e.target.value))}
              className="w-full bg-warm-white border border-border rounded-xl px-3 py-2.5 text-ink font-mono text-sm focus:border-ink focus:outline-none transition-colors appearance-none"
            >
              {[1,2,3,4].map((n) => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 mb-4">
          {[
            { label: "Deposit", value: `💰×${calc.depMult}` },
            { label: "Explorer", value: `🌍×${calc.expMult}` },
            { label: "Combined", value: `×${calc.combined.toFixed(2)}`, accent: true },
            { label: "Est. Prize", value: `$${calc.estimated.toLocaleString()}`, gold: true },
          ].map((item) => (
            <div key={item.label} className="text-center py-3 rounded-xl bg-warm-white">
              <p className="text-[10px] text-ink-faint uppercase tracking-wider mb-1">{item.label}</p>
              <p className={`text-sm md:text-base font-bold font-mono ${
                item.gold ? "text-amber" : item.accent ? "text-ink" : "text-ink-muted"
              }`}>{item.value}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-xs text-ink-faint">
          Rank #5 estimated: <span className="text-amber font-medium">${calc.estimated.toLocaleString()}</span> (base $1,000 × {calc.combined.toFixed(2)})
        </p>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB: Rankings
   ══════════════════════════════════════════════════════════════════ */
function RankingsTab() {
  return (
    <div>
      <div className="mb-5">
        <h2 className="font-serif text-2xl font-semibold text-ink">Manager Rankings</h2>
        <p className="text-ink-muted text-sm mt-0.5">Live leaderboard by ROI performance</p>
      </div>
      <div className="overflow-x-auto rounded-xl border border-border bg-white">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-ink-faint text-[10px] uppercase tracking-wider border-b border-border">
              <th className="px-4 py-2.5 text-left">#</th>
              <th className="px-4 py-2.5 text-left">Fund</th>
              <th className="px-4 py-2.5 text-left">Squad</th>
              <th className="px-4 py-2.5 text-right">ROI</th>
              <th className="px-4 py-2.5 text-right">💰</th>
              <th className="px-4 py-2.5 text-right">🌍</th>
              <th className="px-4 py-2.5 text-right">Prize</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((row) => (
              <tr key={row.rank} className={`border-t border-border/50 transition-colors ${
                row.isUser ? "bg-amber-bg" : "hover:bg-warm-white"
              }`}>
                <td className="px-4 py-2.5 font-mono text-xs">
                  {row.rank <= 3 ? <span className="text-amber font-bold">{row.rank}</span> : <span className="text-ink-faint">{row.rank}</span>}
                </td>
                <td className="px-4 py-2.5 font-medium text-ink">
                  {row.fundName}
                  {row.isUser && <span className="ml-1.5 text-[9px] px-1.5 py-0.5 bg-amber text-white rounded-full font-bold uppercase">You</span>}
                </td>
                <td className="px-4 py-2.5">{row.squad}</td>
                <td className="px-4 py-2.5 text-right font-mono text-green font-medium">+{row.roi}%</td>
                <td className="px-4 py-2.5 text-right font-mono text-ink-muted text-xs">×{row.depositMult}</td>
                <td className="px-4 py-2.5 text-right font-mono text-ink-muted text-xs">×{row.explorerMult}</td>
                <td className="px-4 py-2.5 text-right font-mono text-amber font-bold">${row.prize.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB: Fund Report — World Cup themed card
   ══════════════════════════════════════════════════════════════════ */
function ReportTab() {
  const u = mockUser;
  const aliveSquad = u.squad.filter((t) => t.alive);
  const outSquad = u.squad.filter((t) => !t.alive);

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <h2 className="font-serif text-2xl font-semibold text-ink">Your Latest Fund Report</h2>
        <p className="text-ink-muted text-sm mt-0.5">Shareable card for your network</p>
      </div>

      {/* ── The Report Card ── */}
      <div className="rounded-2xl overflow-hidden shadow-lg">
        {/* top banner — field green with pitch lines */}
        <div className="relative bg-[#1B4332] px-6 pt-6 pb-8 overflow-hidden">
          {/* pitch lines decoration */}
          <div className="absolute inset-0 opacity-[0.07]">
            <div className="absolute top-0 left-0 right-0 h-px bg-white" />
            <div className="absolute bottom-0 left-0 right-0 h-px bg-white" />
            <div className="absolute top-0 bottom-0 left-0 w-px bg-white" />
            <div className="absolute top-0 bottom-0 right-0 w-px bg-white" />
            <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full border border-white" />
            {/* penalty arcs */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-10 border-b border-l border-r border-white rounded-b-full" />
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-10 border-t border-l border-r border-white rounded-t-full" />
          </div>

          {/* content */}
          <div className="relative text-center">
            <div className="flex items-center justify-center gap-2 mb-1">
              <span className="text-lg">⚽</span>
              <p className="text-white/50 text-[9px] font-mono uppercase tracking-[0.4em]">
                Football Manager World Cup
              </p>
            </div>
            <h3 className="text-white text-2xl font-serif font-bold mt-2 mb-1">
              {u.fundName.toUpperCase()}
            </h3>
            <p className="text-[#C9A84C] text-xs font-medium">
              Quarterfinal Report
            </p>
          </div>

          {/* trophy / rank badge */}
          <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/30 flex items-center justify-center">
            <span className="text-[#C9A84C] text-xs font-bold font-mono">#{u.rank}</span>
          </div>
        </div>

        {/* dark card body */}
        <div className="bg-[#0D1B0D] px-6 py-5">
          {/* main stats row */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            {[
              { label: "AUM", value: `$${u.aum}`, sub: `→ $${u.currentValue}` },
              { label: "ROI", value: `+${u.roiPct}%`, accent: true },
              { label: "RANK", value: `#${u.rank}`, sub: `/ ${u.totalParticipants.toLocaleString()}` },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-white/30 text-[9px] font-mono uppercase tracking-wider">{s.label}</p>
                <p className={`text-lg font-bold font-mono ${s.accent ? "text-[#4ADE80]" : "text-white"}`}>
                  {s.value}
                </p>
                {s.sub && <p className="text-white/30 text-[10px] font-mono">{s.sub}</p>}
              </div>
            ))}
          </div>

          {/* squad */}
          <div className="mb-4">
            <p className="text-white/30 text-[9px] font-mono uppercase tracking-wider mb-2">Squad</p>
            <div className="flex items-center gap-2 flex-wrap">
              {aliveSquad.map((t) => (
                <span key={t.code} className="inline-flex items-center gap-1 px-2 py-0.5 bg-[#4ADE80]/10 border border-[#4ADE80]/20 rounded text-xs text-white">
                  {t.flag} {t.name}
                </span>
              ))}
              {outSquad.map((t) => (
                <span key={t.code} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/5 border border-white/10 rounded text-xs text-white/30 line-through">
                  {t.flag} {t.name}
                </span>
              ))}
            </div>
          </div>

          {/* multipliers + credentials row */}
          <div className="flex items-center justify-between py-3 border-t border-white/10">
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-[#C9A84C]">💰×{u.depositMultiplier}</span>
              <span className="text-[#C9A84C]">🌍×{u.explorerMultiplier}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < u.credentialsCompleted ? "bg-[#C9A84C]" : "bg-white/15"
                  }`}
                />
              ))}
              <span className="text-white/40 text-[10px] font-mono ml-1">{u.credentialsCompleted}/6</span>
            </div>
          </div>

          {/* next round */}
          <div className="pt-3 border-t border-white/10 text-center">
            <p className="text-white/30 text-[10px]">
              Next: <span className="text-white/60">{u.nextRound.name}</span> · {u.nextRound.date}
            </p>
          </div>
        </div>

        {/* footer bar */}
        <div className="bg-[#0A130A] px-6 py-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <Logo />
            <span className="text-white/30 text-[10px] font-medium">Polyvaults</span>
          </div>
          <span className="text-white/20 text-[9px] font-mono">polyvaults.xyz/wc</span>
        </div>
      </div>

      <div className="flex gap-3 justify-center mt-5">
        <button className="px-5 py-2 bg-card border border-border rounded-full text-ink text-sm font-medium hover:bg-card-hover transition-colors">
          📸 Download Image
        </button>
        <button className="px-5 py-2 bg-[#1DA1F2]/10 border border-[#1DA1F2]/20 rounded-full text-[#1DA1F2] text-sm font-medium hover:bg-[#1DA1F2]/20 transition-colors">
          Share to X
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   TAB: Rules
   ══════════════════════════════════════════════════════════════════ */
function RulesTab() {
  const [open, setOpen] = useState(null);
  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-5">
        <h2 className="font-serif text-2xl font-semibold text-ink">Rules & FAQ</h2>
      </div>
      <div className="space-y-2">
        {faqItems.map((item, i) => (
          <div key={i} className="border border-border rounded-xl overflow-hidden bg-white">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-3.5 text-left hover:bg-warm-white transition-colors"
            >
              <span className="text-ink font-medium text-sm">{item.question}</span>
              <svg
                className={`w-4 h-4 text-ink-faint transition-transform shrink-0 ml-4 ${open === i ? "rotate-180" : ""}`}
                fill="none" stroke="currentColor" viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {open === i && (
              <div className="px-5 pb-4">
                <p className="text-ink-muted text-sm leading-relaxed">{item.answer}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   APP
   ══════════════════════════════════════════════════════════════════ */
export default function App() {
  const [activeTab, setActiveTab] = useState("intro");
  const [credentials, setCredentials] = useState(mockUser.credentials);

  const handleComplete = useCallback((key) => {
    setCredentials((prev) => ({
      ...prev,
      [key]: { earned: true, date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }) },
    }));
  }, []);

  const renderTab = () => {
    switch (activeTab) {
      case "intro": return <IntroTab onNavigate={setActiveTab} />;
      case "credentials": return <CredentialsTab credentials={credentials} onComplete={handleComplete} onNavigate={setActiveTab} />;
      case "strategy": return <StrategyTab />;
      case "indexes": return <IndexesTab />;
      case "calculator": return <CalculatorTab />;
      case "rankings": return <RankingsTab />;
      case "report": return <ReportTab />;
      case "rules": return <RulesTab />;
      default: return <IntroTab onNavigate={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <HeroBanner />
      <FundStatusBar />
      <TabBar active={activeTab} onSelect={setActiveTab} />
      <main className="flex-1">
        <div className="max-w-6xl mx-auto px-5 md:px-8 py-6 md:py-8">
          {renderTab()}
        </div>
      </main>
      <footer className="border-t border-border py-4 text-center">
        <p className="text-ink-faint text-xs">
          Polyvaults © 2026 · FIFA World Cup 2026
        </p>
      </footer>
    </div>
  );
}
