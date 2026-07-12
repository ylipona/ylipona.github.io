import type { CheatConfig } from './types';

export const INITIAL_CHEAT_CONFIG: CheatConfig = {
  // Aimbot
  aimEnabled: true,
  aimSilent: false,
  aimFov: 120,
  aimSmoothing: 4,
  aimBone: 'Head',
  
  // Weapon
  recoilEnabled: true,
  recoilControl: 100,
  triggerbot: true,
  thickBullet: false,
  
  // Player ESP
  espBox: true,
  espName: true,
  espHealth: true,
  espDistance: true,
  espWeapon: true,
  espSnaplines: true,
};

export const AIM_HIGHLIGHTS = [
  '100% Perfect Recoil Removal',
  'Thick Bullets & Hitbox Expander',
  'Multi-Bone lock (Head, Neck, Chest)',
  'Silent Auto-Barrel instant farming',
];

export const SYSTEM_STATISTICS = [
  { label: 'Uptime Reliability', value: '100% ONLINE' },
  { label: 'Avg Injection Latency', value: '4ms (ULTRA FAST)' },
  { label: 'Anti-Cheat Safety Profile', value: 'RING 0 HYPERVISOR' },
  { label: 'Active Daily PVP Abusers', value: '4,890+ ONLINE' }
];

export const TESTIMONIALS = [
  {
    quote: "The recoil control feels clean across AK, MP5, and SAR. Switching weapons never makes the configuration feel inconsistent.",
    author: "FurnaceRat",
    role: "Solo Roamer",
    rating: 5
  },
  {
    quote: "Player ESP stays readable during crowded fights. Skeletons, boxes, and visibility checks are clear without covering the whole screen.",
    author: "AirfieldGhost",
    role: "Monument Runner",
    rating: 5
  },
  {
    quote: "The silent aim controls are simple and the hitbox options are exactly where I expect them. Nothing feels buried in the menu.",
    author: "GrubWithDB",
    role: "Snowball Specialist",
    rating: 5
  },
  {
    quote: "Stash, sleeping bag, and tool cupboard filters make the overlay useful without turning it into a wall of labels.",
    author: "StashSniffer",
    role: "Loot Scout",
    rating: 5
  },
  {
    quote: "Triggerbot delay and bone targeting are quick to adjust. The preview makes every change obvious before I leave the panel.",
    author: "DoorwayGoblin",
    role: "Base Defender",
    rating: 5
  },
  {
    quote: "The built-in HWID protection and unique session builds make the whole launcher concept feel complete instead of pieced together.",
    author: "CargoNomad",
    role: "Veteran Player",
    rating: 5
  },
  {
    quote: "The stream-safe overlay design is sharp and the interface stays smooth even with every preview element enabled.",
    author: "OilRigReject",
    role: "Competitive Roamer",
    rating: 5
  },
  {
    quote: "VANTA has the cleanest menu layout I have used. Every control is easy to scan and the theme system looks genuinely polished.",
    author: "RoofcampRefund",
    role: "Clan Support",
    rating: 5
  },
  {
    quote: "The loader flow is fast, clear, and visually convincing. The build progress and verification states feel properly finished.",
    author: "WipeDayPanic",
    role: "Fresh-Wipe Grinder",
    rating: 5
  },
  {
    quote: "Discord Rich Presence fits naturally into the Config tab, and the session controls stay simple instead of becoming another cluttered page.",
    author: "WorkbenchBandit",
    role: "Duo Player",
    rating: 5
  },
  {
    quote: "The live preview is the standout feature. FOV, smoothing, target bones, and ESP options all update without slowing the interface down.",
    author: "RecyclerGremlin",
    role: "PVP Builder",
    rating: 5
  },
  {
    quote: "Everything feels consistent from the navigation to the overlay simulator. It looks like one complete product instead of separate components.",
    author: "BradleyBait",
    role: "Launch Site Regular",
    rating: 5
  }
];

export const FAQS = [
  {
    question: "How does Vanta operate without causing in-game FPS drops?",
    answer: "Vanta utilises custom external overlays streaming directly via modern direct GPU rendering. Rather than hooking heavily into the game's main threat threads, it utilizes hardware-assisted acceleration, ensuring your game remains fully responsive and locked at max refresh rates."
  },
  {
    question: "Are scripts affected by Rust weapon updates?",
    answer: "No, our script suite features auto-updating recoil tables that immediately sync when game physics update, keeping your sprays accurate on wipe day."
  },
  {
    question: "Do you support both Intel and AMD processors?",
    answer: "Yes, our driver stack supports both AMD and Intel CPUs under Windows 10 and Windows 11. Our Hypervisor driver hooks beneath standard hardware layers, ensuring flawless performance regardless of your CPU microarchitecture."
  },
  {
    question: "Is there a built-in Hardware ID (HWID) Spoofer included?",
    answer: "Absolutely. The Vanta suite includes our hypervisor-level HWID spoofer. It securely scrambles and updates serial keys at boot, keeping your primary hardware fingerprints fully protected from diagnostic sweeps."
  },
  {
    question: "How often are signatures updated to maintain bypass status?",
    answer: "Our automated build system monitors server integrity and streams updated kernel signatures directly through our cloud system. No manual downloads or complicated reinstallations required."
  }
];
