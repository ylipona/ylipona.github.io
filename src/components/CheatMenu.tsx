import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Crosshair, Eye, FolderOpen, Monitor, Palette, RotateCcw, Save, Settings, Trash2 } from 'lucide-react';
import { CheatConfig } from '../types';

interface CheatMenuProps {
  config: CheatConfig;
  setConfig: Dispatch<SetStateAction<CheatConfig>>;
}

type TabType = 'combat' | 'visuals' | 'system' | 'config';
type ThemeName = 'ember' | 'crimson' | 'arctic';

type SavedConfig = {
  id: string;
  name: string;
  config: CheatConfig;
  theme: ThemeName;
  glow: boolean;
};

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
      <span className="flex justify-between font-mono text-[10px] text-white/45"><span>{label}</span><b className="font-medium text-brand-primary">{value}{suffix}</b></span>
      <input type="range" min={min} max={max} value={value} disabled={disabled} onChange={(event) => onChange(Number(event.target.value))} className="h-1 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-brand-primary disabled:cursor-not-allowed" />
    </label>
  );
}

export default function CheatMenu({ config, setConfig }: CheatMenuProps) {
  const [activeTab, setActiveTab] = useState<TabType>('combat');
  const [theme, setTheme] = useState<ThemeName>('ember');
  const [glow, setGlow] = useState(true);
  const [configName, setConfigName] = useState('My config');
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([]);
  const [activeConfigName, setActiveConfigName] = useState('Unsaved changes');
  const [saveNotice, setSaveNotice] = useState(false);
  const [screenshareBypass, setScreenshareBypass] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.uiGlow = String(glow);
  }, [theme, glow]);

  const toggle = (key: keyof CheatConfig) => setConfig((previous) => ({ ...previous, [key]: !previous[key] }));
  const setNumber = (key: keyof CheatConfig, value: number) => setConfig((previous) => ({ ...previous, [key]: value }));

  const saveCurrentConfig = () => {
    const cleanName = configName.trim() || 'Untitled config';
    const entry: SavedConfig = { id: `${Date.now()}`, name: cleanName, config: { ...config }, theme, glow };
    const next = [entry, ...savedConfigs].slice(0, 6);
    setSavedConfigs(next);
    setActiveConfigName(cleanName);
    setSaveNotice(true);
    window.setTimeout(() => setSaveNotice(false), 1800);
  };

  const loadConfig = (entry: SavedConfig) => {
    setConfig(entry.config);
    setTheme(entry.theme);
    setGlow(entry.glow);
    setActiveConfigName(entry.name);
  };

  const deleteConfig = (id: string) => {
    setSavedConfigs((prev) => prev.filter((entry) => entry.id !== id));
  };

  const resetAllSettings = () => {
    setConfig({ aimEnabled: true, aimSilent: false, aimFov: 120, aimSmoothing: 4, aimBone: 'Head', recoilEnabled: true, recoilControl: 100, triggerbot: true, thickBullet: false, espBox: true, espName: true, espHealth: true, espDistance: true, espWeapon: true, espSnaplines: true });
    setScreenshareBypass(false);
    setActiveConfigName('Unsaved changes');
  };

  const tabs: Array<{ id: TabType; label: string; icon: typeof Crosshair }> = [
    { id: 'combat', label: 'COMBAT_AIM', icon: Crosshair },
    { id: 'visuals', label: 'VISUAL_ESP', icon: Eye },
    { id: 'system', label: 'SYSTEM_INFO', icon: Monitor },
    { id: 'config', label: 'CONFIG_THEME', icon: Settings },
  ];

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorStyle, setIndicatorStyle] = useState({ top: 0, height: 0 });
  const [mounted, setMounted] = useState(false);
  const prevTabRef = useRef<TabType>(activeTab);
  const [pulsingTab, setPulsingTab] = useState<TabType | null>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const idx = tabs.findIndex((t) => t.id === activeTab);
    const btn = buttonRefs.current[idx];
    if (btn) {
      setIndicatorStyle({ top: btn.offsetTop, height: btn.offsetHeight });
    }
    if (prevTabRef.current !== activeTab) {
      setPulsingTab(activeTab);
      const timer = setTimeout(() => setPulsingTab(null), 550);
      prevTabRef.current = activeTab;
      return () => clearTimeout(timer);
    }
  }, [activeTab, tabs]);

  return (
    <div className="control-panel surface-card flex min-h-[455px] w-full flex-col overflow-hidden sm:h-[455px] sm:flex-row">
      <aside className="flex shrink-0 flex-col justify-between border-b border-white/8 bg-[#0d0c0b] p-4 sm:w-48 sm:border-b-0 sm:border-r">
        <div>
          <div className="mb-4 border-b border-white/8 pb-4">
            <span className="font-display text-xs font-bold tracking-widest text-brand-primary">VANTA PANEL</span>
            <div className="mt-1 font-mono text-[8px] uppercase text-white/45">FRONTEND CONTROL DECK</div>
          </div>
          <div className="relative space-y-1">
            {mounted && (
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
            {tabs.map(({ id, label, icon: Icon }, idx) => (
              <button
                key={id}
                ref={(el) => { buttonRefs.current[idx] = el; }}
                onClick={() => setActiveTab(id)}
                className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left font-mono text-[10px] transition-all duration-300 ${activeTab === id ? `bg-brand-primary/10 text-brand-primary${pulsingTab === id ? ' animate-tab-glow' : ''}` : 'text-white/38 hover:bg-white/5 hover:text-white'}`}
              >
                <Icon size={14} /><span>{label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="border-t border-white/8 pt-3 font-mono text-[8px] leading-5 text-white/45">LOCAL CONFIG CACHE<br />UI BUILD 10.4</div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col bg-[#11100f]">
        <div className="flex-1 overflow-y-auto p-6">
          <div key={activeTab} className="tab-animate">
          {activeTab === 'combat' && (
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">Aimbot Core Engine</h3>
              <p className="mt-1 text-[11px] text-white/45">Fine-tune the visual simulation controls and weapon response.</p>
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
                    <span className="font-mono text-[10px] text-white/40">Target lock</span>
                    <div className="grid grid-cols-4 gap-1 rounded-lg border border-white/8 bg-black/25 p-1">
                      {(['Head', 'Chest', 'Neck', 'Random'] as const).map((bone) => <button key={bone} onClick={() => setConfig((previous) => ({ ...previous, aimBone: bone }))} className={`rounded py-1.5 font-mono text-[8px] ${config.aimBone === bone ? 'bg-brand-primary text-black' : 'text-white/35 hover:text-white'}`}>{bone.toUpperCase()}</button>)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'visuals' && (
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">Visual Overlay ESP</h3>
              <p className="mt-1 text-[11px] text-white/45">Keep the viewport clean and control only the useful player information.</p>
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
                  <div className="rounded-lg border border-brand-primary/15 bg-brand-primary/5 p-3 font-mono text-[9px] leading-5 text-white/34">Snaplines originate from the fixed center crosshair and terminate at each visible target.</div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div>
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">System Information</h3>
              <p className="mt-1 text-[11px] text-white/45">Current hardware and environment detected by the VANTA hypervisor layer.</p>
              <div className="mt-5 space-y-2">
                <div className="control-group">
                  <div className="flex items-center justify-between border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/40">OPERATING SYSTEM</span>
                    <span className="font-mono text-[11px] text-white/80">Windows 11</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/40">GPU</span>
                    <span className="font-mono text-[11px] text-white/80">RTX 5090</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/40">CPU</span>
                    <span className="font-mono text-[11px] text-white/80">9950X3D</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/40">RAM</span>
                    <span className="font-mono text-[11px] text-white/80">32 GB</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/40">MOTHERBOARD</span>
                    <span className="font-mono text-[11px] text-white/80">ASUS ROG Strix X870E-E Gaming WiFi</span>
                  </div>
                  <div className="flex items-center justify-between border-b border-white/6 pb-2">
                    <span className="font-mono text-[10px] text-white/40">MONITOR</span>
                    <span className="font-mono text-[11px] text-white/80">240Hz OLED 1440p</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-white/40">RUST</span>
                    <span className="flex items-center gap-1.5 font-mono text-[11px]"><span className="h-1.5 w-1.5 rounded-full bg-[#65d69b] shadow-[0_0_6px_rgba(101,214,155,0.35)]" />RUNNING</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'config' && (
            <div>
              <div className="flex items-center justify-between">
                <div><h3 className="font-display text-sm font-bold uppercase tracking-wider">Config &amp; Theme</h3><p className="mt-1 text-[11px] text-white/45">Save complete layouts locally and tune the interface appearance.</p></div>
                <Palette size={18} className="text-brand-primary" />
              </div>
              <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-[1.2fr_0.8fr]">
                <div className="control-group">
                  <span className="control-kicker">THEME SETTINGS</span>
                  <div className="grid grid-cols-3 gap-2">
                    {(['ember', 'crimson', 'arctic'] as const).map((name) => <button key={name} onClick={() => setTheme(name)} className={`theme-choice ${theme === name ? 'is-selected' : ''}`}><i className={`theme-swatch theme-${name}`} /><span>{name}</span></button>)}
                  </div>
                  <Toggle label="Interface Glow" checked={glow} onChange={() => setGlow((value) => !value)} />
                  <Toggle label="Screenshare Bypass" checked={screenshareBypass} onChange={() => setScreenshareBypass((value) => !value)} />
                  <button onClick={resetAllSettings} className="flex items-center justify-center gap-2 rounded-lg border border-white/10 px-3 py-2 font-mono text-[9px] text-white/55 hover:border-brand-primary hover:text-white transition-colors"><RotateCcw size={12} />RESET ALL SETTINGS</button>
                </div>
                <div className="control-group">
                  <span className="control-kicker">LOCAL CONFIGS</span>
                  <div className="flex gap-2">
                    <input value={configName} onChange={(event) => setConfigName(event.target.value)} maxLength={24} className="min-w-0 flex-1 rounded-lg border border-white/10 bg-black/25 px-3 py-2 font-mono text-[10px] text-white outline-none focus:border-brand-primary" aria-label="Configuration name" />
                    <button onClick={saveCurrentConfig} className="flex items-center gap-2 rounded-lg bg-brand-primary px-3 py-2 font-mono text-[9px] font-bold text-black"><Save size={12} />{saveNotice ? 'SAVED' : 'SAVE'}</button>
                  </div>
                  <div className="space-y-2">
                    {savedConfigs.length === 0 && <div className="grid min-h-28 place-items-center rounded-lg border border-dashed border-white/10 text-center font-mono text-[9px] leading-5 text-white/45">NO SAVED CONFIGS<br />CREATE YOUR FIRST LOCAL PROFILE</div>}
                    {savedConfigs.map((entry) => <div key={entry.id} className="flex items-center gap-3 rounded-lg border border-white/8 bg-black/20 px-3 py-2"><FolderOpen size={13} className="text-brand-primary" /><span className="min-w-0 flex-1 truncate font-mono text-[10px] text-white/65">{entry.name}</span><button onClick={() => loadConfig(entry)} className="rounded border border-white/10 px-2 py-1 font-mono text-[8px] text-white/55 hover:border-brand-primary hover:text-white">LOAD</button><button onClick={() => deleteConfig(entry.id)} className="text-white/25 hover:text-brand-primary" aria-label={`Delete ${entry.name}`}><Trash2 size={12} /></button></div>)}
                  </div>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-white/8 px-6 py-3 font-mono text-[8px] tracking-wider text-white/45">
          <span>ACTIVE CONFIG: <b className="text-white/65">{activeConfigName.toUpperCase()}</b></span>
          <span className="text-brand-primary">LOCAL FRONTEND PROFILE</span>
        </div>
      </div>
    </div>
  );
}
