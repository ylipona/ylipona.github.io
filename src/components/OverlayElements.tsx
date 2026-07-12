import type { CheatConfig } from '../types';

type EspTargetProps = {
  config: CheatConfig;
  className: string;
  name: string;
  distance: string;
  health?: string;
  weapon?: string;
};

export function EspTarget({ config, className, name, distance, health = '100%', weapon }: EspTargetProps) {
  const hasTarget = config.espBox || config.espName || config.espDistance || config.espHealth || config.espWeapon;
  if (!hasTarget) return null;

  return (
    <div aria-hidden="true" className={`esp-target absolute -translate-x-1/2 -translate-y-1/2 ${className}`}>
      {config.espBox && (
        <div className="esp-frame absolute inset-0">
          <i className="esp-corner esp-corner-tl" />
          <i className="esp-corner esp-corner-tr" />
          <i className="esp-corner esp-corner-bl" />
          <i className="esp-corner esp-corner-br" />
        </div>
      )}

      {(config.espName || config.espDistance) && (
        <span className="esp-tag esp-tag-name">
          {config.espName && name}{config.espName && config.espDistance && ' / '}{config.espDistance && distance}
        </span>
      )}

      {config.espHealth && (
        <span className="esp-health">
          <span style={{ height: health }} />
        </span>
      )}

      {config.espWeapon && weapon && <span className="esp-tag esp-tag-weapon">{weapon}</span>}
    </div>
  );
}

type AimIndicatorProps = {
  enabled: boolean;
  size: number;
  className: string;
};

export function AimIndicator({ enabled, size, className }: AimIndicatorProps) {
  if (!enabled) return null;

  return (
    <div aria-hidden="true" className={`absolute z-20 -translate-x-1/2 -translate-y-1/2 ${className}`}>
      <div className="fov-ring" style={{ width: size, height: size }} />
      <div className="aim-reticle" aria-hidden="true">
        <i className="aim-reticle-top" />
        <i className="aim-reticle-right" />
        <i className="aim-reticle-bottom" />
        <i className="aim-reticle-left" />
        <b />
      </div>
    </div>
  );
}
