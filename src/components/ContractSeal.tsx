/**
 * Embossed cattery seal rendered as vector art so it stays crisp in print and
 * PDF export, where the previous emoji-based badge looked like a placeholder.
 *
 * The wording deliberately attests only to things that are actually true — that
 * the cattery itself issued this agreement, and its reference and date. It does
 * not claim accreditation by any outside registry.
 */
export interface ContractSealProps {
  /** Agreement reference stamped across the middle of the seal. */
  reference: string;
  /** Short date shown at the foot of the seal. */
  date: string;
  className?: string;
}

export default function ContractSeal({ reference, date, className = '' }: ContractSealProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      className={className}
      role="img"
      aria-label={`Official cattery seal for agreement ${reference}`}
    >
      <defs>
        {/* Gold leaf gradient for the rings. */}
        <linearGradient id="seal-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b8862b" />
          <stop offset="28%" stopColor="#e8c86a" />
          <stop offset="52%" stopColor="#9c6f1e" />
          <stop offset="78%" stopColor="#e3c062" />
          <stop offset="100%" stopColor="#8a6018" />
        </linearGradient>

        {/* Soft parchment fill so the seal reads as pressed into the page. */}
        <radialGradient id="seal-face" cx="38%" cy="32%" r="78%">
          <stop offset="0%" stopColor="#fffdf6" />
          <stop offset="62%" stopColor="#fbf3dd" />
          <stop offset="100%" stopColor="#f0e2bd" />
        </radialGradient>

        {/* Circular baselines for the rotating text. */}
        <path id="seal-arc-top" d="M100,100 m-72,0 a72,72 0 1,1 144,0" fill="none" />
        <path id="seal-arc-bottom" d="M100,100 m-60,0 a60,60 0 1,0 120,0" fill="none" />
      </defs>

      {/* Pressed-in shadow under the seal body. */}
      <circle cx="100" cy="102" r="92" fill="#000" opacity="0.10" />

      {/* Outer gold band. */}
      <circle cx="100" cy="100" r="92" fill="url(#seal-gold)" />
      <circle cx="100" cy="100" r="92" fill="none" stroke="#7a5314" strokeWidth="1.5" />

      {/* Rope edging — short ticks around the rim read as milled metal. */}
      <g stroke="#7a5314" strokeWidth="1.6" opacity="0.55">
        {Array.from({ length: 72 }, (_, i) => {
          const a = (i / 72) * Math.PI * 2;
          return (
            <line
              key={i}
              x1={100 + Math.cos(a) * 86}
              y1={100 + Math.sin(a) * 86}
              x2={100 + Math.cos(a) * 91}
              y2={100 + Math.sin(a) * 91}
            />
          );
        })}
      </g>

      {/* Inner face. */}
      <circle cx="100" cy="100" r="80" fill="url(#seal-face)" />
      <circle cx="100" cy="100" r="80" fill="none" stroke="#a8791f" strokeWidth="2" />
      <circle cx="100" cy="100" r="66" fill="none" stroke="#a8791f" strokeWidth="1" opacity="0.7" />
      <circle cx="100" cy="100" r="47" fill="none" stroke="#a8791f" strokeWidth="0.8" opacity="0.45" />

      {/* Curved legend. */}
      <text
        fill="#7a5314"
        fontSize="13"
        fontWeight="700"
        letterSpacing="2.4"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        <textPath href="#seal-arc-top" startOffset="50%" textAnchor="middle">
          ROYAL MAINE COON KITTENS
        </textPath>
      </text>
      <text
        fill="#7a5314"
        fontSize="9.5"
        fontWeight="700"
        letterSpacing="2"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        <textPath href="#seal-arc-bottom" startOffset="50%" textAnchor="middle">
          EVANSVILLE · INDIANA · EST. 2010
        </textPath>
      </text>

      {/* Star separators at the seal's waist. */}
      {[-90, 90].map((deg) => (
        <g key={deg} transform={`translate(100 100) rotate(${deg}) translate(0 -73)`}>
          <path
            d="M0,-5 L1.4,-1.6 L5,-1.2 L2.3,1.2 L3.1,4.8 L0,2.9 L-3.1,4.8 L-2.3,1.2 L-5,-1.2 L-1.4,-1.6 Z"
            fill="#a8791f"
          />
        </g>
      ))}

      {/* Paw emblem. */}
      <g fill="#2f5d3f" transform="translate(100 78)">
        <ellipse cx="0" cy="6" rx="11" ry="9" />
        <ellipse cx="-11.5" cy="-6" rx="4.6" ry="6" />
        <ellipse cx="-4" cy="-10.5" rx="4.6" ry="6.4" />
        <ellipse cx="4" cy="-10.5" rx="4.6" ry="6.4" />
        <ellipse cx="11.5" cy="-6" rx="4.6" ry="6" />
      </g>

      {/* Attestation, reference and date. */}
      <text
        x="100"
        y="112"
        textAnchor="middle"
        fill="#7a5314"
        fontSize="8.5"
        fontWeight="800"
        letterSpacing="1.4"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        ISSUED BY THE CATTERY
      </text>

      <line x1="62" y1="119" x2="138" y2="119" stroke="#a8791f" strokeWidth="0.8" opacity="0.6" />

      <text
        x="100"
        y="132"
        textAnchor="middle"
        fill="#2f5d3f"
        fontSize="11"
        fontWeight="800"
        letterSpacing="0.6"
        fontFamily="'Courier New', monospace"
      >
        {reference}
      </text>

      <text
        x="100"
        y="145"
        textAnchor="middle"
        fill="#7a5314"
        fontSize="8"
        fontWeight="700"
        letterSpacing="0.8"
        fontFamily="Georgia, 'Times New Roman', serif"
      >
        {date}
      </text>
    </svg>
  );
}
