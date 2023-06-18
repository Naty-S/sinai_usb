<!-- 
	@component
  Renders top section of letterhead
 -->
<svg id="top_drawing" viewBox="0 0 1440 74">
  <filter id="top_border" x=0 y=0 filterUnits="userSpaceOnUse">
    <feGaussianBlur in="SourceGraphic" stdDeviation="1" result="blur"/>
  </filter>
  <filter id="did_shadow" x=0 y=0 filterUnits="userSpaceOnUse">
    <feOffset result="offOut" in="SourceAlpha" dx=3 dy=3 />
    <feGaussianBlur result="blurOut" in="offOut" stdDeviation=2 />
    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
  </filter>
  <filter id="sinai_shadow" x=0 y=0 filterUnits="userSpaceOnUse">
    <feOffset result="offOut" in="SourceAlpha" dx=3 dy=3 />
    <feGaussianBlur result="blurOut" in="offOut" stdDeviation=2 />
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
    stroke-width=4
    stroke-opacity=80%
    fill="#0099ff"
    filter="url(#top_border)"
  />
  <text x=500 y=22 fill="#fafa96" textLength=44% filter="url(#sinai_shadow)" font-size=18>
    Sistema de Información de Actividades de Investigación
  </text>
  <text x=60 y=28 fill="#91dff5" textLength=24% filter="url(#did_shadow)" font-size=20>
    DECANATO DE INVESTIGACIÓN
  </text>
  <text x=140 y=58 fill="#91dff5" textLength=12% filter="url(#did_shadow)" font-size=20>
    Y DESARROLLO
  </text>
</svg>
