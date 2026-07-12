import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import type { Dispatch, KeyboardEvent as ReactKeyboardEvent, SetStateAction } from 'react';
import { Crosshair, Eye, LogOut, Monitor, Palette, RotateCcw, Settings, Sparkles } from 'lucide-react';
import { INITIAL_CHEAT_CONFIG } from '../data';
import type { CheatConfig } from '../types';

interface CheatMenuProps {
  config: CheatConfig;
  setConfig: Dispatch<SetStateAction<CheatConfig>>;
}

type TabType = 'combat' | 'visuals' | 'skins' | 'system' | 'config';
type ThemeName = 'ember' | 'crimson' | 'arctic';
type BooleanConfigKey = { [Key in keyof CheatConfig]: CheatConfig[Key] extends boolean ? Key : never }[keyof CheatConfig];
type NumberConfigKey = { [Key in keyof CheatConfig]: CheatConfig[Key] extends number ? Key : never }[keyof CheatConfig];

const TABS: Array<{ id: TabType; label: string; icon: typeof Crosshair }> = [
  { id: 'combat', label: 'COMBAT_AIM', icon: Crosshair },
  { id: 'visuals', label: 'VISUAL_ESP', icon: Eye },
  { id: 'skins', label: 'SKIN_CHANGER', icon: Sparkles },
  { id: 'system', label: 'SYSTEM_INFO', icon: Monitor },
  { id: 'config', label: 'CONFIG', icon: Settings },
];

function Toggle({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="font-mono text-[11px] text-white/70">{label}</span>
      <button type="button" onClick={onChange} aria-pressed={checked} aria-label={label} className={`ui-toggle ${checked ? 'is-on' : ''}`}>
        <span />
      </button>
    </div>
  );
}

function RangeControl({ label, value, min, max, suffix, disabled, onChange }: { label: string; value: number; min: number; max: number; suffix: string; disabled?: boolean; onChange: (value: number) => void }) {
  return (
    <label className={`block space-y-2 ${disabled ? 'opacity-35' : ''}`}>
      <span className="flex justify-between font-mono text-[10px] text-white/60"><span>{label}</span><b className="font-medium text-brand-primary">{value}{suffix}</b></span>
      <input type="range" min={min} max={max} value={value} disabled={disabled} onChange={(event) => onChange(Number(event.target.value))} className="control-range w-full cursor-pointer disabled:cursor-not-allowed" />
    </label>
  );
}

export default function CheatMenu({ config, setConfig }: CheatMenuProps) {
  const [activeTab, setActiveTab] = useState<TabType>('combat');
  const [theme, setTheme] = useState<ThemeName>('ember');
  const [glow, setGlow] = useState(true);
  const [screenshareBypass, setScreenshareBypass] = useState(false);
  const [discordPresence, setDiscordPresence] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.uiGlow = String(glow);
  }, [theme, glow]);

  const toggle = (key: BooleanConfigKey) => setConfig((previous) => ({ ...previous, [key]: !previous[key] }));
  const setNumber = (key: NumberConfigKey, value: number) => setConfig((previous) => ({ ...previous, [key]: value }));

  const resetAllSettings = () => {
    setConfig({ ...INITIAL_CHEAT_CONFIG });
    setTheme('ember');
    setGlow(true);
    setScreenshareBypass(false);
    setDiscordPresence(false);
  };

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number } | null>(null);
  const prevTabRef = useRef<TabType>(activeTab);
  const [pulsingTab, setPulsingTab] = useState<TabType | null>(null);

  useLayoutEffect(() => {
    const index = TABS.findIndex((tab) => tab.id === activeTab);
    const button = buttonRefs.current[index];
    if (!button) return;

    const measure = () => {
      const next = { top: button.offsetTop, height: button.offsetHeight };
      setIndicatorStyle((current) => current?.top === next.top && current.height === next.height ? current : next);
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(button);
    window.addEventListener('resize', measure);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [activeTab]);

  useEffect(() => {
    if (prevTabRef.current !== activeTab) {
      setPulsingTab(activeTab);
      const timer = window.setTimeout(() => setPulsingTab(null), 550);
      prevTabRef.current = activeTab;
      return () => window.clearTimeout(timer);
    }
  }, [activeTab]);

  const handleTabKeyDown = (event: ReactKeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') nextIndex = (index + 1) % TABS.length;
    if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') nextIndex = (index - 1 + TABS.length) % TABS.length;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = TABS.length - 1;
    if (nextIndex === null) return;
    event.preventDefault();
    const nextTab = TABS[nextIndex];
    if (!nextTab) return;
    setActiveTab(nextTab.id);
    buttonRefs.current[nextIndex]?.focus();
  };

  return (
    <div className="control-panel surface-card flex min-h-[455px] w-full flex-col overflow-hidden md:flex-row">
      <aside className="flex shrink-0 flex-col justify-between border-b border-white/8 bg-[#0d0c0b] p-4 md:w-48 md:border-b-0 md:border-r">
        <div>
          <div className="mb-4 border-b border-white/8 pb-4">
            <span className="font-display text-xs font-bold tracking-widest text-brand-primary">VANTA PANEL</span>
            <div className="mt-1 font-mono text-[8px] uppercase text-white/58">FRONTEND CONTROL DECK</div>
          </div>
          <div className="relative space-y-1" role="tablist" aria-label="VANTA panel controls" aria-orientation="vertical">
            {indicatorStyle && (
              <div
                className="pointer-events-none absolute left-0 w-0.5 rounded-r bg-brand-primary"
                style={{
                  top: indicatorStyle.top,
                  height: indicatorStyle.height,
                  boxShadow: '0 0 14px var(--color-brand-glow)',
                  transition: 'top 0.4s cubic-bezier(0.16, 1, 0.24, 1), height 0.4s cubic-bezier(0.16, 1, 0.24, 1)',
                }}
              />
            )}
            {TABS.map(({ id, label, icon: Icon }, index) => (
              <button
                type="button"
                key={id}
                ref={(element) => { buttonRefs.current[index] = element; }}
                id={`tab-${id}`}
                role="tab"
                aria-controls={`panel-${id}`}
                aria-selected={activeTab === id}
                tabIndex={activeTab === id ? 0 : -1}
                onClick={() => setActiveTab(id)}
                onKeyDown={(event) => handleTabKeyDown(event, index)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-mono text-[10px] transition-all duration-300 ${activeTab === id ? `bg-brand-primary/10 text-brand-primary${pulsingTab === id ? ' animate-tab-glow' : ''}` : 'text-white/58 hover:bg-white/5 hover:text-white'}`}
              >
                <Icon size={14} /><span>{label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-white/8 pt-3 font-mono text-[8px] leading-5 text-white/58">SIMULATION STATE<br />UI BUILD 10.4</div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[#11100f]">
        <div className="min-w-0 flex-1 overflow-x-hidden p-5 sm:p-6">
          <div key={activeTab} id={`panel-${activeTab}`} role="tabpanel" aria-labelledby={`tab-${activeTab}`} tabIndex={0} className="tab-animate focus:outline-none">
          {activeTab === 'combat' && (
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">Aimbot Core Engine</h3>
              <p className="mt-1 text-[11px] text-white/60">Fine-tune the visual simulation controls and weapon response.</p>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="control-group">
                  <span className="control-kicker">AIM CONTROL</span>
                  <Toggle label="Enable Vector Aim" checked={config.aimEnabled} onChange={() => toggle('aimEnabled')} />
                  <Toggle label="Silent Aim Vector" checked={config.aimSilent} onChange={() => toggle('aimSilent')} />
                  <RangeControl label="Lock-on FOV Limit" value={config.aimFov} min={10} max={220} suffix="px" onChange={(value) => setNumber('aimFov', value)} />
                  <RangeControl label="Aim Path Smoothing" value={config.aimSmoothing} min={1} max={20} suffix="ms" onChange={(value) => setNumber('aimSmoothing', value)} />
                </div>
                <div className="control-group">
                  <span className="control-kicker">WEAPON MODS</span>
                  <Toggle label="No-Recoil" checked={config.recoilEnabled} onChange={() => toggle('recoilEnabled')} />
                  <RangeControl label="No-Recoil Strength" value={config.recoilControl} min={0} max={100} suffix="%" disabled={!config.recoilEnabled} onChange={(value) => setNumber('recoilControl', value)} />
                  <Toggle label="Hitbox Expander" checked={config.thickBullet} onChange={() => toggle('thickBullet')} />
                  <Toggle label="Triggerbot" checked={config.triggerbot} onChange={() => toggle('triggerbot')} />
                  <div className="space-y-2">
                    <span className="font-mono text-[10px] text-white/58">Target lock</span>
                    <div className="grid grid-cols-4 gap-1 rounded-lg border border-white/8 bg-black/25 p-1">
                      {(['Head', 'Chest', 'Neck', 'Random'] as const).map((bone) => <button type="button" key={bone} aria-pressed={config.aimBone === bone} onClick={() => setConfig((previous) => ({ ...previous, aimBone: bone }))} className={`min-h-8 rounded py-1.5 font-mono text-[8px] transition-colors ${config.aimBone === bone ? 'bg-brand-primary text-black' : 'text-white/55 hover:text-white'}`}>{bone.toUpperCase()}</button>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visuals' && (
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">Visual Overlay ESP</h3>
              <p className="mt-1 text-[11px] text-white/60">Keep the viewport clean and control only the useful player information.</p>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="control-group">
                  <span className="control-kicker">TARGET FRAME</span>
                  <Toggle label="Bounding Boxes" checked={config.espBox} onChange={() => toggle('espBox')} />
                  <Toggle label="Player Name" checked={config.espName} onChange={() => toggle('espName')} />
                  <Toggle label="Health Meter" checked={config.espHealth} onChange={() => toggle('espHealth')} />
                </div>
                <div className="control-group">
                  <span className="control-kicker">TARGET DATA</span>
                  <Toggle label="Distance Tags" checked={config.espDistance} onChange={() => toggle('espDistance')} />
                  <Toggle label="Weapon Indicator" checked={config.espWeapon} onChange={() => toggle('espWeapon')} />
                  <Toggle label="Crosshair Snaplines" checked={config.espSnaplines} onChange={() => toggle('espSnaplines')} />
                  <div className="rounded-lg border border-brand-primary/15 bg-brand-primary/5 p-3 font-mono text-[9px] leading-5 text-white/58">Snaplines originate from the fixed center crosshair and terminate at each visible target.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skins' && (
            <div className="grid min-h-[360px] place-items-center">
              <div className="skin-coming-soon max-w-sm text-center">
                <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl border border-brand-primary/25 bg-brand-primary/10 text-brand-primary"><Sparkles size={28} /></span>
                <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-wider">Skin Changer</h3>
                <p className="mt-2 font-mono text-[10px] tracking-[0.18em] text-brand-primary">COMING SOON</p>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">System Information</h3>
              <p className="mt-1 text-[11px] text-white/60">Current hardware and environment detected by the VANTA hypervisor layer.</p>
              <div className="mt-5 space-y-2">
                <div className="control-group">
                  <div className="flex items-center justify-between gap-4 border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/58">OPERATING SYSTEM</span>
                    <span className="min-w-0 text-right font-mono text-[11px] text-white/80">Windows 11</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/58">GPU</span>
                    <span className="min-w-0 text-right font-mono text-[11px] text-white/80">RTX 5090</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/58">CPU</span>
                    <span className="min-w-0 text-right font-mono text-[11px] text-white/80">9950X3D</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/58">RAM</span>
                    <span className="min-w-0 text-right font-mono text-[11px] text-white/80">32 GB</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/58">MOTHERBOARD</span>
                    <span className="min-w-0 text-right font-mono text-[11px] text-white/80">ASUS ROG Strix X870E-E Gaming WiFi</span>
                  </div>
                  <div className="flex items-center justify-between gap-4 border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/58">MONITOR</span>
                    <span className="min-w-0 text-right font-mono text-[11px] text-white/80">240Hz OLED 1440p</span>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] text-white/58">RUST</span>
                    <span className="flex items-center gap-1.5 font-mono text-[11px]"><span className="h-1.5 w-1.5 rounded-full bg-[#65d69b] shadow-[0_0_6px_rgba(101,214,155,0.35)]" />RUNNING</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div>
              <div className="flex items-center justify-between">
                <div><h3 className="font-display text-sm font-bold uppercase tracking-wider">Config</h3><p className="mt-1 text-[11px] text-white/60">Tune interface appearance and session behavior.</p></div>
                <Palette size={18} className="text-brand-primary" />
              </div>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="control-group">
                  <span className="control-kicker">THEME SETTINGS</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['ember', 'crimson', 'arctic'] as const).map((name) => <button type="button" key={name} aria-pressed={theme === name} onClick={() => setTheme(name)} className={`theme-choice ${theme === name ? 'is-selected' : ''}`}><i className={`theme-swatch theme-${name}`} /><span>{name}</span></button>)}
                  </div>
                  <Toggle label="Interface Glow" checked={glow} onChange={() => setGlow((value) => !value)} />
                  <Toggle label="Screenshare Bypass" checked={screenshareBypass} onChange={() => setScreenshareBypass((value) => !value)} />
                  <button type="button" onClick={resetAllSettings} className="flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-mono text-[9px] text-white/60 transition-colors hover:border-brand-primary hover:text-white"><RotateCcw size={12} />RESET ALL SETTINGS</button>
                </div>
                <div className="control-group">
                  <span className="control-kicker">SESSION CONTROLS</span>
                  <Toggle label="Discord Rich Presence" checked={discordPresence} onChange={() => setDiscordPresence((value) => !value)} />
                  <button type="button" className="uninject-button flex min-h-11 items-center justify-center gap-2 rounded-lg border border-red-400/30 bg-red-500/8 px-3 py-2 font-mono text-[9px] font-bold text-red-300"><LogOut size={13} />UNINJECT</button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        <div className="flex items-center justify-end border-t border-white/8 px-5 py-3 font-mono text-[8px] tracking-wider text-white/55 sm:px-6">
          <span className="text-brand-primary">LOCAL FRONTEND PROFILE</span>
        </div>
      </div>
    </div>
  );
}
