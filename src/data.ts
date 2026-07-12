import { CheatConfig } from './types';

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

export const PREMIUM_FEATURES = [
  {
    category: 'COMBAT DOMINANCE',
    title: 'Precision Silent Aim & Recoil Eraser',
    description: 'Destroy lobbies with bone-locking silent aim. Bypasses client-side mouse hook captures to write sub-pixel vectors directly to the virtual input layer, creating absolute laser beams while bypassing human-like admin spectate checks.',
    highlights: ['100% Perfect Recoil Removal', 'Thick Bullets & Hitbox Expander', 'Multi-Bone lock (Head, Neck, Chest)', 'Silent Auto-Barrel instant farming']
  },
  {
    category: 'X-RAY VISION',
    title: 'Lag-Free Wallhack & Player ESP',
    description: 'Track enemy movements, health, weapons, and distance flawlessly in real-time. Rendered using a lightweight hardware-accelerated overlay that bypasses standard game stream captures so OBS can never record it.',
    highlights: ['3D Box & Full Skeleton bones', 'Active holding weapon & ammo counter', 'Reveal sleepers, bags, and base cores', 'Wounded diagnostic indicators & vis check']
  },
  {
    category: 'INSTANT REACTION',
    title: 'Hardware Triggerbot & Aim Assist',
    description: 'Automatically fire your weapons the microsecond an enemy model crosses your crosshair. Designed to guarantee instant reaction wins in tight base raid defenses or long-range bolty counters.',
    highlights: ['Customizable millisecond response delay', 'Target filter overrides (NPCs/Players)', 'Bone selective trigger matching', 'Advanced movement velocity prediction']
  },
  {
    category: 'HWID SHIELD',
    title: 'Ring 0 Hypervisor HWID Spoofer',
    description: 'Protect your hardware registry and serial keys. Our driver stack runs under the OS kernel to intercept registry checks and BIOS/hardware serial numbers, rendering HWID bans completely useless.',
    highlights: ['EAC & BE Registry trace cleaner', 'No clean Windows install required', 'Supports Windows 10 & 11 bypasses', 'Anti-virtualization safe sandbox hooks']
  }
];

export const SYSTEM_STATISTICS = [
  { label: 'Uptime Reliability', value: '100% ONLINE' },
  { label: 'Avg Injection Latency', value: '4ms (ULTRA FAST)' },
  { label: 'Anti-Cheat Safety Profile', value: 'RING 0 HYPERVISOR' },
  { label: 'Active Daily PVP Abusers', value: '4,890+ ONLINE' }
];

export const TESTIMONIALS = [
  {
    quote: "The recoil custom scaling is so smooth. You can make it look completely natural or use absolute beam mode. The Hypervisor spoofer has kept me safe for months.",
    author: "Kevlar_King",
    role: "Solo Survival Enthusiast",
    rating: 5
  },
  {
    quote: "Most client menus are cluttered and slow. Vanta's web dashboard and overlay UI look exceptionally futuristic, clear, and modern. Zero performance impact or fps drop.",
    author: "Zero_Recall",
    role: "Competitive Server Scrimmer",
    rating: 5
  },
  {
    quote: "Absolutely perfect aimbot smoothing. I've been using it to spray AK from 150m and nobody suspects a thing. The FOV customization is top tier.",
    author: "RustGod99",
    role: "Clan Leader",
    rating: 5
  },
  {
    quote: "The skeleton ESP is the cleanest I've ever seen. No clutter, just exact bone placement and weapon tags. Makes holding angles ridiculously easy.",
    author: "WipeDayWarrior",
    role: "PVP Chad",
    rating: 5
  },
  {
    quote: "Triggerbot is insane with the pump shotgun. Literally instantly deletes anyone coming through the door. 10/10 script.",
    author: "DoorCamperDan",
    role: "Base Defender",
    rating: 5
  },
  {
    quote: "Never gotten a single ban thanks to the HWID spoofer. I can finally play normally without worrying about random EAC flags on my machine.",
    author: "Shadow_Ban_Survivor",
    role: "Veteran Player",
    rating: 5
  },
  {
    quote: "The TC and Stash ESP alone is worth it. I can run around naked and walk out with full kits just by digging up buried loot.",
    author: "LootGoblinx",
    role: "Server Menace",
    rating: 5
  },
  {
    quote: "I've tried 5 different providers this year and Vanta's hit registration with the thick bullet module is unmatched. Complete domination.",
    author: "Apex_Predator",
    role: "Tournament Player",
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
