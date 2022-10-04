<svg id="top" viewBox="0 0 1440 74">
  <filter id="top_border" x="0" y="0" filterUnits="userSpaceOnUse">
    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur"/>
  </filter>
  <filter id="text_shadow" x="0" y="0" filterUnits="userSpaceOnUse">
    <feOffset result="offOut" in="SourceAlpha" dx="3" dy="3" />
    <feGaussianBlur result="blurOut" in="offOut" stdDeviation="3" />
    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
  </filter>
  <path
    d="
      M 16 4
      c -10 0 -12 2 -12 11
      v 44
      c 0 9 2 11 12 11
      h 437
      c 7 0 9 -1 15 -10
      l 14 -23
      c 2 -4 4 -6 10 -6
      h 937
      c 5 0 7 -1 7 -7
      v -13
      c 0 -5 -1 -7 -7 -7
      z
    "
    stroke="#003c65"
    stroke-width="4"
    stroke-opacity="80%"
    fill="#0099ff"
    filter="url(#top_border)"
  />
  <text x="25" y="42" fill="#91dff5" textLength="30%" filter="url(#text_shadow)">
    DECANATO DE INVESTIGACION
    Y DESARROLLO
  </text>
</svg>
