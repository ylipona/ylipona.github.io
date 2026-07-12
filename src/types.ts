export interface CheatConfig {
  // Aimbot
  aimEnabled: boolean;
  aimSilent: boolean;
  aimFov: number; // 10 to 300
  aimSmoothing: number; // 1 to 10
  aimBone: 'Head' | 'Chest' | 'Neck' | 'Random';
  
  // Weapon
  recoilEnabled: boolean;
  recoilControl: number; // 0 to 100%
  triggerbot: boolean;
  thickBullet: boolean;
  
  // Player ESP
  espBox: boolean;
  espName: boolean;
  espHealth: boolean;
  espDistance: boolean;
  espWeapon: boolean;
  espSnaplines: boolean;
}

export interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  badge?: string;
  popular?: boolean;
  features: string[];
}
