/* TODO: Redirecciona a la pagina correspondiente dependiendo de si el rol es prof, coord, dpto, etc ... */
import type { RequestHandler } from "@sveltejs/kit";

export const get: RequestHandler = async ({ request, params }) => {
  console.log(params)
  let status = 303;
  let body = {};
  let headers = { location: '/' };
  let rol = "";

  if (rol === "profesor") {
    headers = { location: "/actividades/profesor" }

  } else if (rol === "coordinador") {
    headers = { location: "/actividades/coordinador" }
    
  } else if (rol === "decano") {
    headers = { location: "/actividades/decano" }
    
  } else if (rol === "jefe_departamento") {
    headers = { location: "/actividades/jefe_departamento" }
    
  } else if (rol === "representante_departamento") {
    headers = { location: "/actividades/representante_departamento" }
    
  } else {
    status = 500
  };

  return {
    status,
    headers,
    body
  }
}
