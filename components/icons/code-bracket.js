// Code bracket icon with Excalibur sword in the middle
const CodeBracketIcon = props => {
  return (
    <svg
      width={24}
      height={24}
      viewBox="0 0 48 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      {/* Left bracket < */}
      <polyline points="12,9 2,20 12,31" />
      {/* Right bracket > */}
      <polyline points="36,9 46,20 36,31" />
      {/* Excalibur sword — blade, guard, grip */}
      <g stroke="none" fill="currentColor">
        {/* Blade */}
        <polygon points="24,5 22.2,22 24,24 25.8,22" opacity="0.9" />
        {/* Cross-guard */}
        <rect x="19" y="23" width="10" height="2.5" rx="1" />
        {/* Grip */}
        <rect x="22.5" y="26" width="3" height="6" rx="0.8" opacity="0.7" />
        {/* Pommel */}
        <circle cx="24" cy="34" r="2" opacity="0.8" />
      </g>
    </svg>
  )
}

export default CodeBracketIcon
