export default function Logo({ width = 48, height = 48, className = "" }) {
  return (
    <svg width={width} height={height} viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" role="img" className={className}>
      <title>DKT — Dhirendra Kumar Thakur</title>
      <defs>
        <path id="tArc" d="M 70,185 A 195,195 0 0,1 430,185" />
        <path id="bArc" d="M 88,328 A 195,195 0 0,0 412,328" />
      </defs>

      <rect width="500" height="500" fill="#120700" />

      <circle cx="250" cy="250" r="195" fill="none" stroke="#C05800" strokeWidth="1" opacity="0.65" />
      <circle cx="250" cy="250" r="185" fill="none" stroke="#C05800" strokeWidth="0.5" opacity="0.3" />

      <text fontFamily="Georgia,'Times New Roman',serif" fontSize="11" fill="#B05200" letterSpacing="4">
        <textPath href="#tArc" startOffset="50%" textAnchor="middle">DHIRENDRA KUMAR THAKUR</textPath>
      </text>

      <text x="164" y="226" fontFamily="Georgia,'Times New Roman',serif" fontSize="98" fontWeight="bold" fill="#FFF6EE" opacity="0.95">D</text>
      <text x="196" y="272" fontFamily="Georgia,'Times New Roman',serif" fontSize="110" fontWeight="bold" fill="#FF6B00">K</text>
      <text x="236" y="314" fontFamily="Georgia,'Times New Roman',serif" fontSize="97" fontWeight="bold" fill="#FFF6EE" opacity="0.92">T</text>

      <line x1="72" y1="252" x2="158" y2="252" stroke="#C05800" strokeWidth="0.7" opacity="0.45" />
      <line x1="334" y1="252" x2="428" y2="252" stroke="#C05800" strokeWidth="0.7" opacity="0.45" />

      <circle cx="55" cy="250" r="2" fill="#C05800" opacity="0.4" />
      <circle cx="445" cy="250" r="2" fill="#C05800" opacity="0.4" />
      <circle cx="250" cy="55" r="2" fill="#C05800" opacity="0.45" />
    </svg>
  );
}
