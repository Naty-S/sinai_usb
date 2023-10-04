import type { RequestHandler } from "@sveltejs/kit";

import type { Professor, ProfessorE } from "$lib/interfaces/professors";
import { handle_error, prisma } from "$api/_api";


/**
 * Query all coordinations chiefs
 * 
 * @returns {Professor}
*/
export const GET: RequestHandler = async function () {
  
  let status = 500;
  let body = {};

  try {
    const coordinations = await prisma.coordinacion.findMany({
      select: {
        id: true,
        nombre: true,
        departamentos: { select: { id: true, nombre: true } },
        Jefe: {
          select: {
            id: true,
            correo: true,
            nombre1: true,
            apellido1: true,
            departamento: true
        }}
      },
      orderBy: { id: "asc" }
    });

    const deparments = await Promise.all(coordinations.map( async c =>
      await prisma.departamento.findUniqueOrThrow({
        select: {
          id: true,
          nombre: true,
          Division: { select: {
            id: true,
            nombre: true,
            departamentos: { select: { id: true, nombre: true } } 
          }}
        },
        where: { id: c.Jefe.departamento }
      })
    ));

    const chiefs: ProfessorE[] = coordinations.map(c => {

      const dep = deparments.find(d => d.id === c.Jefe.departamento);

      if (dep) {
        return {
          id: c.Jefe.id,
          email: c.Jefe.correo,
          name1: c.Jefe.nombre1,
          surname1: c.Jefe.apellido1,
          department: { id: dep.id, nombre: dep.nombre },
          coordination: { id: c.id, nombre: c.nombre, departamentos: c.departamentos },
          division: dep.Division,
        };
      } else {
        throw new Error("No deparment found for coordination chief. Should not happen.")
      };
    });

    status = 200;
    body = chiefs;

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
 * Updates Coordination Chief
 * 
 * @returns The code `Coord Chief Modified`
 */
export const PATCH: RequestHandler = async ({ request }) => {

  const _data = await request.json();

  const data = { jefe: _data.chief };

  let status = 500;
  let body = {};

  try{
    await prisma.coordinacion.update({
      data,
      where: {
        id: Number(_data.coord)
      }
    });

    status = 200;
    body = { code: "Coord Chief Modified" };

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
