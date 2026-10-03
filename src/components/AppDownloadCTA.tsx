import { useState } from 'react';
import './AppDownloadCTA.css';

/**
 * AppDownloadCTA
 *
 * A compact floating "Download App" button anchored to the right edge of the
 * screen, positioned above the DesiBarni chatbot launcher.
 *
 * - Desktop  : collapses to a pill icon; expands left on hover to reveal label
 * - Mobile   : compact icon-only tap target (≥ 44 px)
 * - APK path : /DesiBarni.apk (served from public/)
 */
export default function AppDownloadCTA() {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="/DesiBarni.apk"
      download="DesiBarni.apk"
      className={`app-download-cta${hovered ? ' app-download-cta--expanded' : ''}`}
      aria-label="Download DesiBarni Android App"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {/* Mobile phone / download icon — inline SVG, no extra dependency */}
      <span className="app-download-cta__icon" aria-hidden="true">
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Phone outline */}
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          {/* Download arrow */}
          <polyline points="8 13 12 17 16 13" />
          <line x1="12" y1="17" x2="12" y2="9" />
        </svg>
      </span>

      {/* Label shown on hover/focus */}
      <span className="app-download-cta__label" aria-hidden={!hovered}>
        Download App
      </span>
    </a>
  );
}
