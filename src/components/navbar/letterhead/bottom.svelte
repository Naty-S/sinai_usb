<script lang="ts">
  import { session } from "$app/stores";
  
  import type { User } from "$interfaces/auth";
  
  import Sinai from "./sinai.svelte";
	import LogoUSB from './logo_usb.svelte';

  const username = function (user: User) {
    
    const professor = user.professor;  

    let name = '';
    let rank = '';

    if (professor) {
      name = `Prof. ${professor.surname1}, ${professor.name1}. `;

      if (professor.is_dep_chief) {
        rank = `Jefe del Dpto. de ${professor.department.name}`;
  
      } else if (professor.is_dep_representative) {
        rank = `Representante del Dpto. de ${professor.department.name}`;
        
      } else if (professor.coord_chief) {
        rank = `Coordinador de ${professor.coord_chief.name}`;
        
      } else if (professor.division_chief) {
        rank = `Jefe de Division de ${professor.division_chief.name}`;
        
      } else {
        rank = `Dpto. de ${professor?.department.name}`;
      };
    } else if (user.dean) {
      name = `${user.dean}. `;
      rank = "Decano"
    } else {
      name = "Throw Error: No user. Cookie not sent to correct domain";
    };

    return name + rank;
  };
</script>

<svg id="bottom_drawing" viewBox="0 0 1440 78">
  <filter id="bottom_border" x=0 y=0 filterUnits="userSpaceOnUse">
    <feGaussianBlur in="SourceGraphic" stdDeviation=1 result="blur"/>
  </filter>
  <filter id="text_shadow" x=0 y=0 filterUnits="userSpaceOnUse">
    <feOffset result="offOut" in="SourceAlpha" dx=3 dy=3 />
    <feGaussianBlur result="blurOut" in="offOut" stdDeviation=3 />
    <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
  </filter>
  <path
    d="
      M 16 4
      c -10 0 -12 2 -12 11
      v 48
      c 0 9 2 11 12 11
      h 1413
      c 6 0 7 -2 7 -7
      v -20
      c 0 -7 -2 -8 -7 -8
      h -937
      c -6 0 -8 -1 -10 -4
      l -15 -22
      c -5 -8 -7 -9 -13 -9
      z
    "
    stroke="#0099ff"
    stroke-width="4"
    stroke-opacity="80%"
    fill="#2f6388"
    filter="url(#bottom_border)"
  />
  <Sinai />
  <LogoUSB />
  <text x=500 y=22 fill="yellow" textLength=50% filter="url(#text_shadow)">
    Sistema de Informacion de Actividades de Investigacion
  </text>
  <text x=500 y=62 fill="white" textLength=50% filter="url(#text_shadow)">
    {$session.user ? username($session.user) : ''}
  </text>
</svg>
