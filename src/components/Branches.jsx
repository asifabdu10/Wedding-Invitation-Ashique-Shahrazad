import styles from './Branches.module.css'

export default function Branches({ offset = { x: 0, y: 0 } }) {
  return (
    <>
      {/* Top Left Artistic Branch */}
      <div 
        className={`${styles.branchWrapper} ${styles.topLeft}`}
        style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
      >
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Main Branch Structure */}
          <path d="M-20 -20C100 150 250 180 400 300C450 340 500 380 550 500" stroke="#5D4037" strokeWidth="6" strokeLinecap="round" opacity="0.4"/>
          <path d="M120 180C180 250 250 240 320 300" stroke="#5D4037" strokeWidth="4" strokeLinecap="round" opacity="0.3"/>
          <path d="M280 230C320 280 380 290 450 350" stroke="#5D4037" strokeWidth="3" strokeLinecap="round" opacity="0.2"/>
          
          {/* Blossoms - Clusters of circles for a watercolor look */}
          {[
            {x: 80, y: 120, r: 15, c: '#FFB7C5'},
            {x: 150, y: 210, r: 20, c: '#FF9EB5'},
            {x: 220, y: 240, r: 18, c: '#FFCDD6'},
            {x: 310, y: 290, r: 22, c: '#F4ABBE'},
            {x: 380, y: 340, r: 16, c: '#FCD5DE'},
            {x: 110, y: 190, r: 12, c: '#E8899A'},
            {x: 260, y: 260, r: 14, c: '#FFB7C5'}
          ].map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={b.y} r={b.r} fill={b.c} opacity="0.4">
                <animate attributeName="r" values={`${b.r};${b.r+3};${b.r}`} dur={`${3+i}s`} repeatCount="indefinite" />
              </circle>
              <circle cx={b.x+3} cy={b.y-3} r={b.r/2} fill="#fff" opacity="0.2" />
            </g>
          ))}
        </svg>
      </div>

      {/* Bottom Right Artistic Branch */}
      <div 
        className={`${styles.branchWrapper} ${styles.bottomRight}`}
        style={{ transform: `translate(${-offset.x * 0.8}px, ${-offset.y * 0.8}px)` }}
      >
        <svg viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M520 520C400 350 300 320 200 200C150 140 100 100 -50 0" stroke="#5D4037" strokeWidth="8" strokeLinecap="round" opacity="0.3"/>
          <path d="M350 350C280 280 200 300 150 250" stroke="#5D4037" strokeWidth="5" strokeLinecap="round" opacity="0.2"/>
          
          {[
            {x: 420, y: 450, r: 25, c: '#FFB7C5'},
            {x: 350, y: 380, r: 30, c: '#FF9EB5'},
            {x: 250, y: 310, r: 22, c: '#FFCDD6'},
            {x: 180, y: 250, r: 28, c: '#F4ABBE'},
            {x: 80, y: 150, r: 20, c: '#FCD5DE'}
          ].map((b, i) => (
            <g key={i}>
              <circle cx={b.x} cy={b.y} r={b.r} fill={b.c} opacity="0.4">
                <animate attributeName="opacity" values="0.3;0.6;0.3" dur={`${4+i}s`} repeatCount="indefinite" />
              </circle>
            </g>
          ))}
        </svg>
      </div>
    </>
  )
}
