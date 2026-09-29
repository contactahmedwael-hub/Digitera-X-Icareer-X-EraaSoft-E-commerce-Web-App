"use client";

import { useState } from "react";
import { isAudioFeedbackEnabled, playSound, setAudioFeedbackEnabled } from "@/lib/audio/sound-effects";

export function AudioToggle() {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window === "undefined") return true;
    return isAudioFeedbackEnabled();
  });

  function toggle() {
    const next = !enabled;
    setEnabled(next);
    setAudioFeedbackEnabled(next);
    if (next) {
      playSound("toggle");
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      title={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      aria-label={enabled ? "Mute interface sounds" : "Enable interface sounds"}
      className="inline-flex items-center gap-1.5 rounded-full border border-on-night/20 bg-on-night/5 px-2.5 py-1 text-[11px] font-medium text-on-night/80 transition-all hover:border-gold hover:text-gold"
    >
      <span>{enabled ? "🔊" : "🔇"}</span>
      <span className="text-[10px] uppercase tracking-wider">
        {enabled ? "Sound On" : "Sound Off"}
      </span>
    </button>
  );
}
