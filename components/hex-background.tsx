export function HexBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-20 crystal-bg">
        {/* Crystal pattern background */}
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="hexagons" width="50" height="43.4" patternUnits="userSpaceOnUse" patternTransform="scale(5)">
              <polygon
                points="25,0 50,14.4 50,43.3 25,57.7 0,43.3 0,14.4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#hexagons)" className="text-cyan-400" />
        </svg>
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-cyan-500/20 filter blur-[100px]"></div>
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 rounded-full bg-purple-500/20 filter blur-[80px]"></div>
      <div className="absolute top-2/3 left-1/2 w-80 h-80 rounded-full bg-blue-600/20 filter blur-[90px]"></div>

      {/* Add floating crystal elements */}
      <div className="absolute top-1/5 right-1/4 w-20 h-20 opacity-20">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="#00c3ff" strokeWidth="2" />
        </svg>
      </div>
      <div className="absolute bottom-1/4 left-1/3 w-16 h-16 opacity-20">
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="#00c3ff" strokeWidth="2" />
        </svg>
      </div>
    </div>
  )
}

