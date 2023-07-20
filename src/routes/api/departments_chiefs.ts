import type { RequestHandler } from "@sveltejs/kit";

import type { Department } from "$lib/interfaces/departments";
import { handle_error, prisma } from "$api/_api";


/**
 * Query all departments chiefs & representatives
 * 
 * @returns {Department[]}
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const departments = await prisma.departamento.findMany({
      select: {
        id: true,
        nombre: true,
        Jefe: {
          select: {
            id: true,
            correo: true,
            nombre1: true,
            apellido1: true,
            departamento: true,
        }},
        Representante: {
          select: {
            id: true,
            correo: true,
            nombre1: true,
            apellido1: true,
            departamento: true,
        }},
        Coordinacion: { select: { id: true, nombre: true } },
        Division: { select: { id: true, nombre: true } }
      },
      orderBy: { id: "asc" }
    });

    const deps_chiefs: Department[] = departments.map(d => (
      {
        id: d.id,
        nombre: d.nombre,
        chief: {
          id: d.Jefe.id,
          email: d.Jefe.correo,
          name: d.Jefe.nombre1,
          surname: d.Jefe.apellido1,
          department: { id: d.id, nombre: d.nombre },
          coordination: d.Coordinacion,
          division: d.Division,
        },
        rep: {
          id: d.Representante.id,
          email: d.Representante.correo,
          name: d.Representante.nombre1,
          surname: d.Representante.apellido1,
          department: { id: d.id, nombre: d.nombre },
          coordination: d.Coordinacion,
          division: d.Division,
        }
      }
    ));

    status = 200;
    body = deps_chiefs;

  } catch (error: any) {
    
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };

  return {
    status,
    body
  };
};


/**
 * Updates Coordination Chief or Representative
 * 
 * @returns The code `Dep Chief Modified` or `Dep Rep Modified`
 */
export const PATCH: RequestHandler = async ({ request }) => {

  const _data = await request.json();

  const data = _data.chief ? { jefe: _data.chief } : { representante: _data.rep };

  let status = 500;
  let body = {};

  try{
    await prisma.departamento.update({
      data,
      where: {
        id: Number(_data.dep)
      }
    });

    status = 200;
    body = { code: _data.chief ? "Dep Chief Modified" : "Dep Rep Modified" };

  } catch (error: any) {
    const message = await handle_error(error);
    const code = error.code || '';

    body = { message, code };
  };


  return {
    status,
    body
  };
};
