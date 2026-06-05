export const mockUser = {
  fundName: "Samba Dream Team",
  aum: 500,
  currentValue: 615,
  roiPct: 23.0,
  rank: 3,
  totalParticipants: 1200,
  depositMultiplier: 1.5, // $500 deposit → 1.5× (deposit ladder)
  explorerMultiplier: 1.25, // 2 participating indexes → 1.25× (explorer ladder)
  combinedMultiplier: 1.875, // deposit × explorer = 1.5 × 1.25
  wcIndexChoice: "custom",
  squad: [
    { code: "BRA", name: "Brazil", flag: "\u{1F1E7}\u{1F1F7}", alive: true },
    { code: "FRA", name: "France", flag: "\u{1F1EB}\u{1F1F7}", alive: true },
    { code: "ARG", name: "Argentina", flag: "\u{1F1E6}\u{1F1F7}", alive: true },
    { code: "POR", name: "Portugal", flag: "\u{1F1F5}\u{1F1F9}", alive: false },
    { code: "GER", name: "Germany", flag: "\u{1F1E9}\u{1F1EA}", alive: false },
  ],
  credentials: {
    fundManager: { earned: true, date: "Jun 11" },
    media: { earned: true, date: "Jun 11" },
    club: { earned: true, date: "Jun 12" },
    multiAsset: { earned: true, date: "Jun 13" },
    scout: { earned: true, date: "Jun 14" },
    pressConference: { earned: false, date: null },
  },
  credentialsCompleted: 5,
  isLicensed: false,
  explorerIndexes: {
    btc: { participating: true, amount: 50 },
    eth: { participating: true, amount: 75 },
    oil: { participating: false, amount: 0 },
    taco: { participating: false, amount: 0 },
  },
  lastSettledRound: "quarterfinal",
  nextRound: { name: "Semifinals", date: "Jul 8–9" },
  estimatedPrize: { performance: 2160, licensed: 23 },
};

export const credentialsList = [
  {
    key: "fundManager",
    icon: "\u{1F3DF}️",
    name: "Fund Manager License",
    description: "Register your fund & deposit",
    actionLabel: "Register Fund",
    actionUrl: "https://app.polyvaults.ai",
    actionType: "external",
  },
  {
    key: "media",
    icon: "\u{1F4FA}",
    name: "Media License",
    description: "Follow @PolyVaults on Twitter",
    actionLabel: "Follow on X",
    actionUrl: "https://x.com/polyvaults_ai",
    actionType: "external",
  },
  {
    key: "club",
    icon: "\u{1F91D}",
    name: "Club Membership",
    description: "Join the Managers’ Club on Telegram",
    actionLabel: "Join Telegram",
    actionUrl: "https://t.me/polyvaults",
    actionType: "external",
  },
  {
    key: "multiAsset",
    icon: "\u{1F30D}",
    name: "Multi-Asset Badge",
    description: "Participate in at least 1 existing Index",
    actionLabel: "Explore Indexes",
    actionUrl: "https://app.polyvaults.ai",
    actionType: "external",
  },
  {
    key: "scout",
    icon: "\u{1F50D}",
    name: "Scout License",
    description: "Successfully invite 1 new user",
    actionLabel: "Copy Referral Link",
    actionType: "copy",
    copyValue: "https://polyvaults.xyz/wc?ref=samba-dream-team",
  },
  {
    key: "pressConference",
    icon: "\u{1F399}️",
    name: "Press Conference",
    description: "Share your Fund Report on Twitter",
    actionLabel: "Share Report",
    actionType: "internal",
    targetTab: "report",
    lockedHint: "Complete after any round settles",
  },
];

export const campaignSteps = [
  {
    number: 1,
    title: "Name Your Fund",
    description: "Create your fund identity. Choose a name that strikes fear into rival managers.",
    tab: "credentials",
    credentialKey: "fundManager",
  },
  {
    number: 2,
    title: "Earn Your Credentials",
    description: "Complete 6 tasks to become a Licensed Manager. Follow us on X, join Telegram, explore indexes, invite friends, and share your report.",
    tab: "credentials",
  },
  {
    number: 3,
    title: "Pick Your Strategy",
    description: "Choose a World Cup Index — a pre-built basket of teams — or build a custom squad. Your fund tracks their tournament performance.",
    tab: "strategy",
  },
  {
    number: 4,
    title: "Boost Your Multiplier",
    description: "Participate in additional PolyVaults indexes (BTC, ETH, OIL, TACO) to increase your Explorer Multiplier up to 2.0×.",
    tab: "indexes",
  },
  {
    number: 5,
    title: "Compete & Climb",
    description: "Your fund auto-tracks the World Cup bracket. As rounds settle, your ROI updates. Climb the rankings to claim your share of the $10,000 USDT prize pool.",
    tab: "rankings",
  },
];

export const wcIndexes = [
  {
    id: "south-america",
    icon: "\u{1F30E}",
    name: "South America",
    teams: "\u{1F1E7}\u{1F1F7}\u{1F1E6}\u{1F1F7}\u{1F1FA}\u{1F1FE}\u{1F1E8}\u{1F1F4}\u{1F1EA}\u{1F1E8}\u{1F1F5}\u{1F1FE}",
    tagline: "6 teams, high risk, high drama",
    teamCount: 6,
  },
  {
    id: "host-nations",
    icon: "\u{1F3E0}",
    name: "Host Nations",
    teams: "\u{1F1FA}\u{1F1F8}\u{1F1F2}\u{1F1FD}\u{1F1E8}\u{1F1E6}",
    tagline: "3 teams, home advantage thesis",
    teamCount: 3,
  },
  {
    id: "europe",
    icon: "\u{1F1EA}\u{1F1FA}",
    name: "Europe",
    teams: "\u{1F1EA}\u{1F1F8}\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}\u{1F1EB}\u{1F1F7}\u{1F1E9}\u{1F1EA}\u{1F1F5}\u{1F1F9}\u{1F1F3}\u{1F1F1}…",
    tagline: "16 teams, robust basket",
    teamCount: 16,
  },
  {
    id: "custom",
    icon: "\u{1F3AF}",
    name: "Custom Squad",
    teams: "",
    tagline: "Build your own squad",
    teamCount: null,
    isCustom: true,
  },
];

export const explorerIndexes = [
  { id: "btc", name: "BTC Index", roi: 12.4 },
  { id: "eth", name: "ETH Index", roi: 8.7 },
  { id: "oil", name: "OIL Index", roi: -3.2 },
  { id: "taco", name: "TACO Index", roi: 45.6 },
];

export const leaderboard = [
  { rank: 1, fundName: "Tango Capital", squad: "\u{1F1E6}\u{1F1F7}\u{1F1E7}\u{1F1F7}\u{1F1EB}\u{1F1F7}\u{1F1EA}\u{1F1F8}\u{1F1E9}\u{1F1EA}", roi: 52.3, depositMult: 3.0, explorerMult: 2.0, prize: 5413 },
  { rank: 2, fundName: "Les Bleus Fund", squad: "\u{1F1EB}\u{1F1F7}\u{1F1EA}\u{1F1F8}\u{1F1E9}\u{1F1EA}\u{1F1F3}\u{1F1F1}\u{1F1F5}\u{1F1F9}", roi: 45.1, depositMult: 2.0, explorerMult: 1.5, prize: 2970 },
  { rank: 3, fundName: "Samba Dream Team", squad: "\u{1F1E7}\u{1F1F7}\u{1F1EB}\u{1F1F7}\u{1F1E6}\u{1F1F7}\u{1F1F5}\u{1F1F9}\u{1F1E9}\u{1F1EA}", roi: 41.8, depositMult: 1.5, explorerMult: 1.25, prize: 2160, isUser: true },
  { rank: 4, fundName: "La Roja Ventures", squad: "\u{1F1EA}\u{1F1F8}\u{1F1EB}\u{1F1F7}\u{1F1E6}\u{1F1F7}\u{1F1E7}\u{1F1F7}\u{1F1FA}\u{1F1FE}", roi: 38.5, depositMult: 1.5, explorerMult: 1.25, prize: 1350 },
  { rank: 5, fundName: "Host Town Heroes", squad: "\u{1F1FA}\u{1F1F8}\u{1F1F2}\u{1F1FD}\u{1F1E8}\u{1F1E6}\u{1F1E7}\u{1F1F7}\u{1F1EB}\u{1F1F7}", roi: 35.2, depositMult: 1.0, explorerMult: 2.0, prize: 1000 },
  { rank: 6, fundName: "Nordic Edge", squad: "\u{1F1F3}\u{1F1F4}\u{1F1F3}\u{1F1F1}\u{1F1E9}\u{1F1EA}\u{1F1EB}\u{1F1F7}\u{1F1EA}\u{1F1F8}", roi: 31.7, depositMult: 2.0, explorerMult: 1.0, prize: 800 },
  { rank: 7, fundName: "CR7 & Friends", squad: "\u{1F1F5}\u{1F1F9}\u{1F1E7}\u{1F1F7}\u{1F1EB}\u{1F1F7}\u{1F1EA}\u{1F1F8}\u{1F1E6}\u{1F1F7}", roi: 28.4, depositMult: 1.5, explorerMult: 1.25, prize: 750 },
  { rank: 8, fundName: "Vault Street Bets", squad: "\u{1F1E6}\u{1F1F7}\u{1F1E7}\u{1F1F7}\u{1F1FA}\u{1F1FE}\u{1F1E8}\u{1F1F4}\u{1F1EA}\u{1F1E8}", roi: 25.1, depositMult: 1.0, explorerMult: 1.5, prize: 600 },
  { rank: 9, fundName: "Three Lions Fund", squad: "\u{1F3F4}\u{E0067}\u{E0062}\u{E0065}\u{E006E}\u{E0067}\u{E007F}\u{1F1EB}\u{1F1F7}\u{1F1E9}\u{1F1EA}\u{1F1F3}\u{1F1F1}\u{1F1EA}\u{1F1F8}", roi: 22.6, depositMult: 0.8, explorerMult: 1.0, prize: 320 },
  { rank: 10, fundName: "Maple Leaf Capital", squad: "\u{1F1E8}\u{1F1E6}\u{1F1FA}\u{1F1F8}\u{1F1F2}\u{1F1FD}\u{1F1E7}\u{1F1F7}\u{1F1E6}\u{1F1F7}", roi: 19.3, depositMult: 1.5, explorerMult: 1.25, prize: 750 },
];

// Base prize share by final rank (#1–#20), used by the Multiplier Calculator.
// Estimated prize = basePrizeShares[rank - 1] × Combined Multiplier.
// Halved for the $10,000 USDT pool (was scaled for $20,000).
export const basePrizeShares = [
  1500, 1100, 800, 600, 500, 400, 400, 400, 400, 400,
  150, 150, 150, 150, 150, 150, 150, 150, 150, 150,
];

export const faqItems = [
  {
    question: "How do credentials work?",
    answer: "Complete 6 on-chain and social tasks to earn your Manager Credentials. Each credential is verified automatically. Earning all 6 makes you a Licensed Manager, qualifying you for the Licensed Pool ($2,000 USDT) on top of the Performance Pool.",
  },
  {
    question: "How are multipliers calculated?",
    answer: "Deposit Multiplier scales with your deposit size (e.g., $500 = 1.5×). Explorer Multiplier grows as you participate in more Indexes: 1 = 1.0×, 2 = 1.25×, 3 = 1.5×, 4 = 2.0×. Your Combined Multiplier is Deposit × Explorer, applied to your base prize allocation.",
  },
  {
    question: "How is the prize pool distributed?",
    answer: "The $10,000 USDT pool splits into Performance ($8,000) and Licensed ($2,000). Performance prizes are ranked by ROI and weighted by your Combined Multiplier. Licensed prizes are split equally among all managers who complete 6/6 credentials.",
  },
  {
    question: "What happens each round?",
    answer: "Your fund tracks the World Cup bracket. When a team in your squad is eliminated, it’s marked as out. Your ROI adjusts after each round settles. The fund continues as long as you have at least one surviving team. Final rankings are based on cumulative ROI at the end of the tournament.",
  },
];
